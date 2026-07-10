// Regenerate favicons from public/favicon.svg so every icon slot matches.
// Run: node scripts/generate-favicons.mjs
import sharp from 'sharp';
import { writeFile, readFile } from 'node:fs/promises';

const svgBuf = await readFile('public/favicon.svg');

async function png(size) {
  return sharp(svgBuf, { density: 384 })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

// Minimal ICO container wrapping a single PNG frame (widely supported).
function pngToIco(pngBuf, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);       // reserved
  header.writeUInt16LE(1, 2);       // type: icon
  header.writeUInt16LE(1, 4);       // image count
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2);           // palette
  entry.writeUInt8(0, 3);           // reserved
  entry.writeUInt16LE(1, 4);        // color planes
  entry.writeUInt16LE(32, 6);       // bpp
  entry.writeUInt32LE(pngBuf.length, 8);
  entry.writeUInt32LE(6 + 16, 12);  // offset to image data
  return Buffer.concat([header, entry, pngBuf]);
}

async function main() {
  const p16 = await png(16);
  const p32 = await png(32);
  const p180 = await png(180);
  const p192 = await png(192);
  const p512 = await png(512);

  await writeFile('public/images/favicon-16x16.png', p16);
  await writeFile('public/images/favicon-32x32.png', p32);
  await writeFile('public/images/apple-touch-icon.png', p180);
  await writeFile('public/images/android-chrome-192x192.png', p192);
  await writeFile('public/images/android-chrome-512x512.png', p512);
  await writeFile('public/images/favicon.ico', pngToIco(p32, 32));

  console.log('  ✓ favicons regenerated from favicon.svg');
}

main();
