import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve('dist/site');
const port = Number(process.env.PORT ?? 4173);
const types = {
  '.avif': 'image/avif', '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png',
  '.svg': 'image/svg+xml', '.txt': 'text/plain; charset=utf-8', '.webp': 'image/webp', '.xml': 'application/xml; charset=utf-8',
  '.zip': 'application/zip'
};

function resolvePath(pathname) {
  const decoded = decodeURIComponent(pathname).replace(/^\/+/, '');
  const candidate = normalize(join(root, decoded));
  if (!candidate.startsWith(root)) return undefined;
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  const index = join(candidate, 'index.html');
  return existsSync(index) ? index : undefined;
}

createServer((request, response) => {
  const pathname = new URL(request.url ?? '/', 'http://127.0.0.1').pathname;
  const file = resolvePath(pathname);
  const target = file ?? join(root, '404.html');
  response.statusCode = file ? 200 : 404;
  response.setHeader('Content-Type', types[extname(target)] ?? 'application/octet-stream');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  createReadStream(target).pipe(response);
}).listen(port, '127.0.0.1', () => console.log(`Calm Scroll preview: http://127.0.0.1:${port}`));
