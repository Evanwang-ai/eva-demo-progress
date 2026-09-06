import fs from 'node:fs';
import './verify-sidebar-selection-contract.mjs';

const failures = [];
const fail = message => failures.push(message);
const read = file => {
  if (!fs.existsSync(file)) {
    fail(`missing ${file}`);
    return '';
  }
  return fs.readFileSync(file, 'utf8');
};

const entry = read('index.html');
const manifestText = read('prototype-manifest.json');
const gitignore = read('.gitignore').replace(/\r\n/g, '\n');
let manifest = { blocks: [] };
try { manifest = JSON.parse(manifestText); } catch { fail('prototype-manifest.json is invalid JSON'); }

if (gitignore.split('\n')[0] === '*') fail('.gitignore still uses an inverse whitelist');
for (const ignoredPath of ['node_modules/', 'dist/', '.vercel/', '.env']) {
  if (!gitignore.split('\n').includes(ignoredPath)) fail(`.gitignore does not ignore ${ignoredPath}`);
}

for (const block of manifest.blocks || []) {
  if (!block.file) continue;
  if (!fs.existsSync(block.file)) fail(`manifest references missing file: ${block.file}`);
  if (block.role === 'prototype' && !entry.includes(block.file)) fail(`entry does not load prototype block: ${block.file}`);
}

for (const forbidden of ['EvaCtxIcon=', 'evaMenuIcons={']) {
  for (const block of manifest.blocks || []) {
    if (block.file && read(block.file).includes(forbidden)) fail(`${block.file} contains hand-written icon code: ${forbidden}`);
  }
}

if (entry.length > 100_000) fail(`index.html is too large (${entry.length} characters)`);
if (!manifest.blocks?.some(block => block.file === 'vendor/eva-legacy-runtime.js')) fail('manifest does not declare the build compatibility runtime');
for (const architectureFile of ['prototype/007-runtime-diagnostics.js', 'prototype/010-native-page-registry.js', 'prototype/045-native-page-layout.css']) {
  if (!manifest.blocks?.some(block => block.file === architectureFile)) fail(`manifest does not declare ${architectureFile}`);
}
if (!entry.includes('vendor/eva-runtime.module.js')) fail('index.html does not load the build-time runtime');
if (entry.includes('prototype/009-9-loader.js')) fail('index.html still runs the browser-time runtime loader');

if (failures.length) {
  failures.forEach(message => console.error(`Project contract violation: ${message}`));
  process.exit(1);
}
console.log(`Eva modular project contract passed: ${manifest.blocks.length} ordered blocks.`);
