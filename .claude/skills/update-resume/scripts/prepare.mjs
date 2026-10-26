#!/usr/bin/env node
// Step 1: adapt Resume En.css to the markdown2pdf-mcp page template, move the
// current PDFs aside so the server writes to their exact names, and write the
// batch_create_pdf arguments. `--out <dir>` targets another folder (dry run).
import fs from 'node:fs';
import path from 'node:path';
import {
  MCP_NAME, MCP_PACKAGE, repoRoot, resumeDir, stylesheet, documents, workDir,
  backupDir, jobPath, manifestPath, sha256File, restorePrevious, fail,
} from './common.mjs';

const outFlag = process.argv.indexOf('--out');
const outDir = outFlag > 0 ? path.resolve(process.argv[outFlag + 1]) : resumeDir;

const sources = [stylesheet, ...documents.map(d => d.source)];
for (const file of sources) {
  if (!fs.existsSync(file)) fail(`Missing source file: ${file}`);
}

let css = fs.readFileSync(stylesheet, 'utf8');
if (/url\(/i.test(css)) {
  console.error('WARNING: Resume En.css uses url(...). The renderer blocks external resources, so they will not load.');
}
// mdtoword.org scopes its themes to `.markdown-preview.pdf-<theme>`;
// markdown2pdf-mcp renders the document inside `.content`.
css = css.replace(/\.markdown-preview(?:\.[\w-]+)*/g, '.content');

// A previous run that never reached finalize.mjs may still hold PDFs aside.
restorePrevious();
fs.rmSync(workDir, { recursive: true, force: true });
fs.mkdirSync(backupDir, { recursive: true });
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(manifestPath, JSON.stringify({
  repoRoot,
  outDir,
  startedAt: Date.now(),
  sources: Object.fromEntries(sources.map(f => [f, sha256File(f)])),
}, null, 2));

// The server never overwrites: when the target exists it writes `name-1.pdf`.
// Moving the current PDFs aside lets it write the real names; finalize.mjs
// deletes them once the new PDFs pass, or puts them back if they don't.
for (const d of documents) {
  const target = path.join(outDir, d.pdf);
  if (!fs.existsSync(target)) continue;
  try {
    fs.renameSync(target, path.join(backupDir, d.pdf));
  } catch (err) {
    restorePrevious();
    fail(`Could not move ${target} aside (${err.code}). Close it if it's open in a viewer, then run prepare.mjs again.`);
  }
}

fs.writeFileSync(jobPath, JSON.stringify({
  documents: documents.map(d => ({
    inputPath: d.source,
    outputFilename: path.join(outDir, d.pdf),
  })),
  sharedConfig: {
    paperFormat: 'a4',
    paperBorder: '12mm',
    theme: 'default',
    customCss: css,
  },
}, null, 2));

console.log(JSON.stringify({
  jobFile: jobPath,
  outDir,
  mcpAddCommand: `claude mcp add ${MCP_NAME} -- npx -y ${MCP_PACKAGE}`,
}, null, 2));
