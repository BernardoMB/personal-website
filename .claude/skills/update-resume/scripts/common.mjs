// Shared paths and helpers for the update-resume scripts.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

// Pinned to the version whose renderer was reviewed.
export const MCP_PACKAGE = 'markdown2pdf-mcp@2.3.0';
export const MCP_NAME = 'markdown2pdf';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(scriptDir, '..', '..', '..', '..');
export const resumeDir = path.join(repoRoot, 'src', 'assets');

export const stylesheet = path.join(resumeDir, 'Resume En.css');
export const documents = [
  { source: path.join(resumeDir, 'Resume En.md'), pdf: 'Resume En.pdf' },
  { source: path.join(resumeDir, 'Resume Es.md'), pdf: 'Resume Es.pdf' },
];
export const zipName = 'Resume Bernardo Mondragon.zip';

// The render job, its manifest, and the previous PDFs while a run is in progress.
// Kept outside the repo.
export const workDir = process.platform === 'win32'
  ? path.join(process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local'), 'resume-pdf')
  : path.join(process.env.XDG_CACHE_HOME || path.join(os.homedir(), '.cache'), 'resume-pdf');
export const backupDir = path.join(workDir, 'previous');
export const jobPath = path.join(workDir, 'job.json');
export const manifestPath = path.join(workDir, 'manifest.json');

export function sha256File(file) {
  return createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

// Moves the PDFs that prepare.mjs set aside back to the output folder,
// replacing whatever the unfinished or failed run left there.
export function restorePrevious() {
  if (!fs.existsSync(manifestPath)) return [];
  const { outDir } = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (!outDir) return [];
  const restored = [];
  for (const d of documents) {
    const saved = path.join(backupDir, d.pdf);
    if (!fs.existsSync(saved)) continue;
    fs.renameSync(saved, path.join(outDir, d.pdf));
    restored.push(d.pdf);
  }
  return restored;
}

export function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}
