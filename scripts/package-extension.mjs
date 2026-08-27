import { createWriteStream } from 'node:fs';
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, relative, sep } from 'node:path';
import archiver from 'archiver';

const source = '.output/chrome-mv3';
const archiveName = 'calm-scroll-chrome-v1.0.0.zip';
const archivePath = `dist/site/downloads/${archiveName}`;
// ZIP dates cannot be earlier than 1980. Keeping both this and the mode fixed
// makes the published archive byte-for-byte reproducible across builds.
const ZIP_EPOCH = new Date('1980-01-01T00:00:00.000Z');

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  }));
  return paths.flat();
}

await stat(`${source}/manifest.json`);
await mkdir('dist/extension', { recursive: true });
await mkdir('dist/site/downloads', { recursive: true });
await rm('dist/extension/chrome-mv3', { recursive: true, force: true });
await cp(source, 'dist/extension/chrome-mv3', { recursive: true });

const output = createWriteStream(archivePath);
const archive = archiver('zip', { forceLocalTime: false, zlib: { level: 9 } });
const completed = new Promise((resolve, reject) => {
  output.on('close', resolve);
  output.on('error', reject);
  archive.on('error', reject);
});
archive.pipe(output);
const files = await filesIn(source);
for (const path of files.sort()) {
  const name = relative(source, path).split(sep).join('/');
  // `archive.file()` schedules filesystem reads. Those reads can complete in a
  // different order, which changes an otherwise identical ZIP's central
  // directory. Read and append each payload serially so the lexical order
  // above is the order written to the archive on every machine.
  archive.append(await readFile(path), { name, date: ZIP_EPOCH, mode: 0o100644 });
}
await archive.finalize();
await completed;

const checksum = createHash('sha256').update(await readFile(archivePath)).digest('hex');
await writeFile(`${archivePath}.sha256`, `${checksum}  ${archiveName}\n`);
console.log(`SHA-256 ${checksum}  ${archiveName}`);
