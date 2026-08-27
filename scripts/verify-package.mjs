import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { execFileSync, spawnSync } from 'node:child_process';

const archive = 'dist/site/downloads/calm-scroll-chrome-v1.0.0.zip';
const releaseMetadata = 'dist/site/release.json';

function build() {
  const result = spawnSync('npm', ['run', 'build'], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

function zipEntryNames(bytes) {
  // The end-of-central-directory record is at most 65,557 bytes from EOF.
  const minimum = Math.max(0, bytes.length - 65_557);
  let end = -1;
  for (let index = bytes.length - 22; index >= minimum; index -= 1) {
    if (bytes.readUInt32LE(index) === 0x06054b50) {
      end = index;
      break;
    }
  }
  if (end < 0) throw new Error('ZIP end-of-central-directory record is missing');

  const entries = bytes.readUInt16LE(end + 10);
  let offset = bytes.readUInt32LE(end + 16);
  const names = [];
  for (let index = 0; index < entries; index += 1) {
    if (bytes.readUInt32LE(offset) !== 0x02014b50) throw new Error('ZIP central-directory entry is invalid');
    const nameLength = bytes.readUInt16LE(offset + 28);
    const extraLength = bytes.readUInt16LE(offset + 30);
    const commentLength = bytes.readUInt16LE(offset + 32);
    names.push(bytes.subarray(offset + 46, offset + 46 + nameLength).toString('utf8'));
    offset += 46 + nameLength + extraLength + commentLength;
  }
  return names;
}

async function verifyReleaseMetadata(expectedChecksum) {
  const metadata = JSON.parse(await readFile(releaseMetadata, 'utf8'));
  const commit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  if (metadata.source_commit !== commit) {
    throw new Error(`Release metadata commit mismatch: ${metadata.source_commit} != ${commit}`);
  }
  if (metadata.extension?.path !== archive.slice('dist/site'.length)) {
    throw new Error('Release metadata does not identify the published extension archive');
  }
  if (metadata.extension?.sha256 !== expectedChecksum) {
    throw new Error(`Release metadata checksum mismatch: ${metadata.extension?.sha256} != ${expectedChecksum}`);
  }
}

const hashes = [];
for (let attempt = 0; attempt < 3; attempt += 1) {
  build();
  const bytes = await readFile(archive);
  const names = zipEntryNames(bytes);
  const sorted = [...names].sort((left, right) => left.localeCompare(right));
  if (names.join('\n') !== sorted.join('\n')) throw new Error(`Extension ZIP entries are not sorted: ${names.join(', ')}`);
  const checksum = createHash('sha256').update(bytes).digest('hex');
  await verifyReleaseMetadata(checksum);
  hashes.push(checksum);
}

if (new Set(hashes).size !== 1) {
  throw new Error(`Extension ZIP is not reproducible: ${hashes.join(' != ')}`);
}

console.log(`Reproducible extension ZIP across ${hashes.length} clean builds: ${hashes[0]}`);
