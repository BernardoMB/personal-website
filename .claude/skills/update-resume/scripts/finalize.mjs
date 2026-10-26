#!/usr/bin/env node
// Step 3: validate the PDFs the server wrote, then rebuild the zip with exactly
// those two PDFs. If validation fails, the previous PDFs are put back.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import {
  repoRoot, stylesheet, documents, zipName, backupDir, jobPath, manifestPath,
  sha256File, restorePrevious, fail,
} from './common.mjs';

if (!fs.existsSync(manifestPath) || !fs.existsSync(jobPath)) fail('No build in progress. Run prepare.mjs first.');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const job = JSON.parse(fs.readFileSync(jobPath, 'utf8'));
if (manifest.repoRoot !== repoRoot) fail(`The build in progress belongs to ${manifest.repoRoot}. Run prepare.mjs again.`);
if (typeof zlib.crc32 !== 'function') fail('Node 22.2 or newer is required (zlib.crc32).');
const { outDir } = manifest;

const checks = [];
const check = (label, ok, detail = '') => checks.push({ label, ok: Boolean(ok), detail });
function report() {
  for (const c of checks) console.log(`${c.ok ? 'PASS' : 'FAIL'}  ${c.label}${c.detail ? ` (${c.detail})` : ''}`);
  return checks.every(c => c.ok);
}

// --- What the stylesheet promises: the body and heading colors ---

function styleColors(css) {
  const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(m => ({ selector: m[1].trim(), body: m[2] }));
  const color = rule => rule?.body.match(/(?:^|[;\s])color\s*:\s*#([0-9a-f]{3}|[0-9a-f]{6})\s*(?:;|$)/i)?.[1];
  return [
    ['body', color(rules.find(r => /^\.markdown-preview(?:\.[\w-]+)*$/.test(r.selector)))],
    ['headings', color(rules.find(r => /\bh1\b/.test(r.selector) && color(r)))],
  ].filter(([, hex]) => hex);
}

function hexToRgb(hex) {
  const full = hex.length === 3 ? [...hex].map(c => c + c).join('') : hex;
  return [0, 2, 4].map(i => parseInt(full.slice(i, i + 2), 16) / 255);
}

// --- PDF inspection: page count and the fill colors its pages use ---

function inspectPdf(file) {
  const buf = fs.readFileSync(file);
  const text = buf.toString('latin1');
  const fills = [];
  const streamStart = /(?<!end)stream\r?\n/g;
  for (let m; (m = streamStart.exec(text));) {
    const start = m.index + m[0].length;
    const end = text.indexOf('endstream', start);
    if (end < 0) break;
    streamStart.lastIndex = end;
    let content;
    try { content = zlib.inflateSync(buf.subarray(start, end)).toString('latin1'); } catch { continue; }
    for (const c of content.matchAll(/(-?[\d.]+)\s+(-?[\d.]+)\s+(-?[\d.]+)\s+rg\b/g)) fills.push([+c[1], +c[2], +c[3]]);
  }
  return {
    isPdf: text.startsWith('%PDF-'),
    pages: (text.match(/\/Type\s*\/Page(?![s\w])/g) || []).length,
    usesFill: rgb => fills.some(f => f.every((v, i) => Math.abs(v - rgb[i]) < 0.004)),
    mtime: fs.statSync(file).mtimeMs,
  };
}

// --- Validate the new PDFs ---

for (const [file, hash] of Object.entries(manifest.sources)) {
  check(`${path.basename(file)} unchanged since prepare`, fs.existsSync(file) && sha256File(file) === hash);
}

const colors = styleColors(fs.readFileSync(stylesheet, 'utf8'));
for (const d of documents) {
  const target = path.join(outDir, d.pdf);
  const numbered = path.join(outDir, d.pdf.replace(/\.pdf$/i, '-1.pdf'));
  const jobDoc = job.documents.find(j => j.outputFilename === target);
  check(`${d.pdf} rendered from ${path.basename(d.source)}`, jobDoc?.inputPath === d.source);
  check(`${d.pdf} written to its own name, not ${path.basename(numbered)}`, !fs.existsSync(numbered));
  if (!fs.existsSync(target)) {
    check(`${d.pdf} generated`, false, `missing ${target}`);
    continue;
  }
  const pdf = inspectPdf(target);
  check(`${d.pdf} is a new PDF`, pdf.isPdf && pdf.pages > 0 && pdf.mtime >= manifest.startedAt, `${pdf.pages} pages`);
  for (const [label, hex] of colors) {
    check(`${d.pdf} uses the stylesheet's ${label} color #${hex}`, pdf.usesFill(hexToRgb(hex)));
  }
}
if (!checks.every(c => c.ok)) {
  report();
  const restored = restorePrevious();
  fail(`The new PDFs failed validation. ${restored.length ? `Restored the previous ${restored.join(' and ')}.` : 'There were no previous PDFs to restore.'}`);
}
fs.rmSync(backupDir, { recursive: true, force: true });

// --- Rebuild the zip ---

const entries = documents.map(d => ({ name: d.pdf, data: fs.readFileSync(path.join(outDir, d.pdf)) }));
const zipPath = path.join(outDir, zipName);
fs.writeFileSync(`${zipPath}.tmp`, buildZip(entries));
try {
  fs.renameSync(`${zipPath}.tmp`, zipPath);
} catch (err) {
  fail(`Could not replace ${zipPath} (${err.code}). Close it if it's open, then run finalize.mjs again.`);
}

const zipped = readZip(fs.readFileSync(zipPath));
const names = zipped.map(e => e.name);
check(`${zipName} contains exactly ${entries.map(e => e.name).join(' and ')}`,
  names.length === entries.length && entries.every(e => names.includes(e.name)), names.join(', '));
check(`${zipName} entries match the PDFs byte for byte`,
  zipped.every(e => e.crcOk && e.data.equals(entries.find(x => x.name === e.name)?.data ?? Buffer.alloc(0))));

process.exit(report() ? 0 : 1);

// --- Minimal zip writer/reader (deflate, UTF-8 names) ---

function buildZip(files) {
  const now = new Date();
  const time = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1);
  const date = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
  const parts = [];
  const central = [];
  let offset = 0;
  for (const { name, data } of files) {
    const nameBuf = Buffer.from(name, 'utf8');
    const packed = zlib.deflateRawSync(data, { level: 9 });
    const crc = zlib.crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(8, 8);
    local.writeUInt16LE(time, 10);
    local.writeUInt16LE(date, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(packed.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    const header = Buffer.alloc(46);
    header.writeUInt32LE(0x02014b50, 0);
    header.writeUInt16LE(20, 4);
    header.writeUInt16LE(20, 6);
    header.writeUInt16LE(0x0800, 8);
    header.writeUInt16LE(8, 10);
    header.writeUInt16LE(time, 12);
    header.writeUInt16LE(date, 14);
    header.writeUInt32LE(crc, 16);
    header.writeUInt32LE(packed.length, 20);
    header.writeUInt32LE(data.length, 24);
    header.writeUInt16LE(nameBuf.length, 28);
    header.writeUInt32LE(offset, 42);
    parts.push(local, nameBuf, packed);
    central.push(header, nameBuf);
    offset += local.length + nameBuf.length + packed.length;
  }
  const directory = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(directory.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...parts, directory, end]);
}

function readZip(buf) {
  const end = buf.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  if (end < 0) fail('The zip has no end-of-central-directory record.');
  const result = [];
  let p = buf.readUInt32LE(end + 16);
  for (let i = 0; i < buf.readUInt16LE(end + 10); i++) {
    const method = buf.readUInt16LE(p + 10);
    const crc = buf.readUInt32LE(p + 16);
    const size = buf.readUInt32LE(p + 20);
    const nameLength = buf.readUInt16LE(p + 28);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.toString('utf8', p + 46, p + 46 + nameLength);
    const start = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
    const raw = buf.subarray(start, start + size);
    const data = method === 8 ? zlib.inflateRawSync(raw) : raw;
    result.push({ name, data, crcOk: zlib.crc32(data) === crc });
    p += 46 + nameLength + buf.readUInt16LE(p + 30) + buf.readUInt16LE(p + 32);
  }
  return result;
}
