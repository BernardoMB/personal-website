#!/usr/bin/env node
// Fallback for step 2: calls the markdown2pdf MCP server's batch_create_pdf tool
// over stdio, for sessions where its tools aren't loaded (e.g. right after
// `claude mcp add`; MCP tools only load when a session starts).
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import { MCP_PACKAGE, jobPath, fail } from './common.mjs';

if (!fs.existsSync(jobPath)) fail(`No job found at ${jobPath}. Run prepare.mjs first.`);
const job = JSON.parse(fs.readFileSync(jobPath, 'utf8'));

// npx is a .cmd shim on Windows, which Node only spawns through a shell; the
// command is a constant, so passing it as one string is safe.
const server = spawn(`npx -y ${MCP_PACKAGE}`, {
  stdio: ['pipe', 'pipe', 'inherit'],
  shell: true,
});

const pending = new Map();
let buffer = '';
server.stdout.setEncoding('utf8');
server.stdout.on('data', chunk => {
  buffer += chunk;
  let newline;
  while ((newline = buffer.indexOf('\n')) >= 0) {
    const line = buffer.slice(0, newline).trim();
    buffer = buffer.slice(newline + 1);
    let message;
    try { message = JSON.parse(line); } catch { continue; }
    pending.get(message.id)?.(message);
    pending.delete(message.id);
  }
});
server.on('exit', code => {
  if (pending.size) fail(`markdown2pdf-mcp exited before answering (code ${code}).`);
});

let nextId = 1;
function request(method, params) {
  const id = nextId++;
  server.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
  return new Promise(resolve => pending.set(id, resolve));
}

// The first run installs puppeteer's Chrome for Testing, which takes a few minutes.
const timeout = setTimeout(() => {
  server.kill();
  fail('Timed out after 10 minutes waiting for markdown2pdf-mcp.');
}, 10 * 60 * 1000);

const init = await request('initialize', {
  protocolVersion: '2024-11-05',
  capabilities: {},
  clientInfo: { name: 'update-resume', version: '1.0.0' },
});
if (init.error) fail(`initialize failed: ${init.error.message}`);
server.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');

const response = await request('tools/call', { name: 'batch_create_pdf', arguments: job });
clearTimeout(timeout);
server.stdin.end();

if (response.error) fail(`batch_create_pdf failed: ${response.error.message}`);
const text = (response.result?.content ?? []).map(c => c.text).join('\n');
console.log(text);
process.exit(response.result?.isError || text.includes('Failed |') ? 1 : 0);
