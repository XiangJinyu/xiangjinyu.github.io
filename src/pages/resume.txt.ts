import { getCollection, getEntry } from 'astro:content';
import { site } from '../data/site';

function enDash(period: string): string {
  return period.replace(/\s*-\s*/, '–').replace('Present', 'present');
}

function rule(len = 53): string {
  return '─'.repeat(len);
}

export async function GET() {
  const homepage = await getEntry('data', 'homepage');
  const pubs = await getCollection('publications');

  const jobLines = (homepage?.data.jobs ?? [])
    .map(j => `  ${enDash(j.period).padEnd(18)}${j.title}, ${j.company}`)
    .join('\n');

  const pubLines = pubs
    .sort((a, b) => a.data.order - b.data.order)
    .slice(0, 5)
    .map(p => `  [${p.data.badge}] ${p.data.title}\n      ${p.data.url}`)
    .join('\n\n');

  const talkLines = (homepage?.data.talks ?? [])
    .map(t => `  ${t.date}   ${t.title}`)
    .join('\n');

  const linkRows = [
    ['web', site.url],
    ['github', site.links.github],
    ['twitter', site.links.twitter],
    ['scholar', site.links.scholar],
    ['email', site.email],
  ].map(([k, v]) => `  ${k.padEnd(11)}${v}`).join('\n');

  const text = `
        ●  ${site.name.toUpperCase()}
        ${rule(45)}
        ${site.roles.join(' · ')}

        ${site.focus}


  EXPERIENCE
  ${rule()}
${jobLines}


  SELECTED WORK
  ${rule()}
${pubLines}


  INVITED TALKS
  ${rule()}
${talkLines}


  LINKS
  ${rule()}
${linkRows}


  You found the plain-text resume. The web is still
  a good place for text.                          — J.X.
`;

  return new Response(text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
