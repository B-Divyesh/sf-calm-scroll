import { createHash } from 'node:crypto';

const origin = (process.env.LIVE_URL ?? 'https://calm-scroll.sociobot.in').replace(/\/$/, '');
const immutable = /(?:^|,)\s*max-age=31536000(?:,|$)/i;

async function request(path) {
  const response = await fetch(`${origin}${path}`);
  if (!response.ok) throw new Error(`${path} returned ${response.status}`);
  return response;
}

function header(response, name) {
  const value = response.headers.get(name);
  if (!value) throw new Error(`${name} is missing`);
  return value;
}

function expectIncludes(value, expected, label) {
  if (!value.includes(expected)) throw new Error(`${label} must include ${expected}; received ${value}`);
}

const home = await request('/');
const csp = header(home, 'content-security-policy');
expectIncludes(csp, "default-src 'self'", 'CSP');
expectIncludes(csp, 'connect-src', 'CSP');
expectIncludes(csp, 'https://api.sociobot.in', 'CSP');
expectIncludes(csp, "frame-ancestors 'none'", 'CSP');
const permissions = header(home, 'permissions-policy');
expectIncludes(permissions, 'camera=()', 'Permissions-Policy');
expectIncludes(permissions, 'geolocation=()', 'Permissions-Policy');

const html = await home.text();
const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+\.(?:js|css|avif|webp))"/g)].map((match) => match[1]);
if (!assets.length) throw new Error('No built assets found in home HTML');
for (const path of [...new Set(assets)]) {
  const response = await request(path);
  const cache = header(response, 'cache-control');
  if (!immutable.test(cache) || !/\bimmutable\b/i.test(cache)) throw new Error(`${path} is not immutable: ${cache}`);
}

const zipPath = '/downloads/calm-scroll-chrome-v1.0.0.zip';
const zip = await request(zipPath);
const zipCache = header(zip, 'cache-control');
if (!immutable.test(zipCache) || !/\bimmutable\b/i.test(zipCache)) throw new Error(`${zipPath} is not immutable: ${zipCache}`);
const expectedChecksum = (await (await request(`${zipPath}.sha256`)).text()).trim().split(/\s+/)[0];
const actualChecksum = createHash('sha256').update(Buffer.from(await zip.arrayBuffer())).digest('hex');
if (!/^[a-f0-9]{64}$/.test(expectedChecksum) || expectedChecksum !== actualChecksum) {
  throw new Error(`Published ZIP checksum mismatch: expected ${expectedChecksum}, got ${actualChecksum}`);
}

const release = await (await request('/release.json')).json();
if (!/^[a-f0-9]{40}$/.test(release.source_commit ?? '')) {
  throw new Error(`Live release identity has an invalid source_commit: ${release.source_commit}`);
}
if (release.extension?.path !== zipPath || release.extension?.sha256 !== actualChecksum) {
  throw new Error('Live release identity does not match the published extension archive');
}
const expectedRelease = process.env.EXPECTED_RELEASE_SHA;
if (expectedRelease && release.source_commit !== expectedRelease) {
  throw new Error(`Live release commit mismatch: ${release.source_commit} != ${expectedRelease}`);
}

const serviceWorker = await request('/sw.js');
const swCache = header(serviceWorker, 'cache-control');
if (/\bimmutable\b/i.test(swCache)) throw new Error(`/sw.js must revalidate, received ${swCache}`);

console.log(`Live delivery policy, identity, and ZIP checksum pass: ${origin} (${release.source_commit}, ${actualChecksum})`);
