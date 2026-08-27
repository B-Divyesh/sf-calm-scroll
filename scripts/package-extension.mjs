import { createWriteStream } from 'node:fs';
import { mkdir, cp, rm, stat } from 'node:fs/promises';
import archiver from 'archiver';

const source = '.output/chrome-mv3';
await stat(`${source}/manifest.json`);
await mkdir('dist/extension', { recursive: true });
await mkdir('dist/site/downloads', { recursive: true });
await rm('dist/extension/chrome-mv3', { recursive: true, force: true });
await cp(source, 'dist/extension/chrome-mv3', { recursive: true });

const output = createWriteStream('dist/site/downloads/calm-scroll-chrome-v1.0.0.zip');
const archive = archiver('zip', { zlib: { level: 9 } });
const completed = new Promise((resolve, reject) => {
  output.on('close', resolve);
  output.on('error', reject);
  archive.on('error', reject);
});
archive.pipe(output);
archive.directory(source, false);
await archive.finalize();
await completed;
