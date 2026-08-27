import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';

const archiveName = 'calm-scroll-chrome-v1.0.0.zip';
const archivePath = `dist/site/downloads/${archiveName}`;
const commit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const checksum = createHash('sha256').update(await readFile(archivePath)).digest('hex');

if (!/^[0-9a-f]{40}$/.test(commit)) throw new Error(`Invalid release commit: ${commit}`);

await writeFile('dist/site/release.json', `${JSON.stringify({
  product: 'calm-scroll',
  source_commit: commit,
  extension: {
    path: `/downloads/${archiveName}`,
    sha256: checksum
  }
}, null, 2)}\n`);

console.log(`Release identity: ${commit} (${checksum})`);
