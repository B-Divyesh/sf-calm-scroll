import sharp from 'sharp';

const hero = 'assets/src/calm-scroll-hero.png';
const outputs = [
  [1280, 853, 'webp', 'public/assets/calm-scroll-hero-1280.webp'],
  [768, 512, 'webp', 'public/assets/calm-scroll-hero-768.webp'],
  [1280, 853, 'avif', 'public/assets/calm-scroll-hero-1280.avif'],
  [768, 512, 'avif', 'public/assets/calm-scroll-hero-768.avif']
];

for (const [width, height, format, destination] of outputs) {
  let pipeline = sharp(hero).resize(width, height, { fit: 'cover' });
  pipeline = format === 'avif'
    ? pipeline.avif({ quality: width === 768 ? 45 : 50, effort: 5 })
    : pipeline.webp({ quality: width === 768 ? 72 : 76, effort: 5 });
  await pipeline.toFile(`${destination}.next`);
  await import('node:fs/promises').then(({ rename }) => rename(`${destination}.next`, destination));
}

for (const size of [16, 32, 48, 128]) {
  await sharp('extension-public/icons/icon.svg').resize(size, size).png().toFile(`extension-public/icons/icon-${size}.png`);
}
