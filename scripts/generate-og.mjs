// Generates OG card images (site-wide + per blog post) into public/images/og/
// Run: node scripts/generate-og.mjs
import sharp from 'sharp';
import { mkdir, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const OUT = 'public/images/og';
const W = 1200, H = 630;

const PAPER = '#fcfbf9';
const INK = '#1a1a1a';
const GREY = '#5f5f5f';
const TERRA = '#c2401f';
const HAIR = '#e7e2d9';

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Greedy line wrap by estimated char width
function wrap(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > maxChars && cur) {
      lines.push(cur.trim());
      cur = w;
    } else {
      cur += ' ' + w;
    }
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}

function cardSvg({ label, title, subtitle, titleSize = 64 }) {
  const maxChars = Math.floor(1040 / (titleSize * 0.48));
  let lines = wrap(title, maxChars);
  if (lines.length > 4) {
    lines = lines.slice(0, 4);
    lines[3] = lines[3].replace(/\s+\S*$/, '') + '…';
  }
  const lineHeight = titleSize * 1.18;
  const titleBlockH = lines.length * lineHeight;
  const titleY = (H - titleBlockH) / 2 + titleSize * 0.8 + 10;

  const titleSpans = lines
    .map((l, i) => `<tspan x="80" y="${titleY + i * lineHeight}">${escapeXml(l)}</tspan>`)
    .join('');

  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <rect x="0" y="0" width="${W}" height="6" fill="${TERRA}"/>
  <circle cx="88" cy="92" r="9" fill="${TERRA}"/>
  <text x="112" y="102" font-family="Georgia, 'Times New Roman', serif" font-size="30" font-weight="600" fill="${INK}">Jinyu Xiang</text>
  <text x="80" y="170" font-family="'Courier New', monospace" font-size="21" letter-spacing="3" fill="${GREY}">${escapeXml(label.toUpperCase())}</text>
  <text font-family="Georgia, 'Times New Roman', serif" font-size="${titleSize}" font-weight="600" fill="${INK}">${titleSpans}</text>
  <line x1="80" y1="${H - 110}" x2="${W - 80}" y2="${H - 110}" stroke="${HAIR}" stroke-width="2"/>
  <text x="80" y="${H - 62}" font-family="'Courier New', monospace" font-size="22" fill="${GREY}">${escapeXml(subtitle)}</text>
</svg>`;
}

async function render(svg, file) {
  await sharp(Buffer.from(svg)).png({ quality: 90 }).toFile(path.join(OUT, file));
  console.log('  ✓', file);
}

async function main() {
  await mkdir(OUT, { recursive: true });

  await render(cardSvg({
    label: 'xiangjinyu.github.io',
    title: 'AI Agents, Self-Evolution, and Foundation Models',
    subtitle: 'Algorithm Researcher at Xiaomi Mimo-Core',
    titleSize: 66,
  }), 'site.png');

  const postsDir = 'src/content/posts';
  for (const f of await readdir(postsDir)) {
    if (!f.endsWith('.md')) continue;
    const raw = await readFile(path.join(postsDir, f), 'utf8');
    const title = raw.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1];
    const date = raw.match(/^date:\s*(\S+)/m)?.[1] ?? '';
    if (!title) continue;
    const slug = f.replace(/\.md$/, '');
    await render(cardSvg({
      label: 'Blog',
      title,
      subtitle: date,
      titleSize: 58,
    }), `${slug}.png`);
  }
}

main();
