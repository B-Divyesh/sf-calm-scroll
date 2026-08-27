import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const archive = 'dist/site/downloads/calm-scroll-chrome-v1.0.0.zip';

function build() {
  const result = spawnSync('npm', ['run', 'build'], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

async function sha256(path) {
  return createHash('sha256').update(await readFile(path)).digest('hex');
}

build();
const first = await sha256(archive);
build();
const second = await sha256(archive);

if (first !== second) {
  throw new Error(`Extension ZIP is not reproducible: ${first} != ${second}`);
}

console.log(`Reproducible extension ZIP: ${first}`);
