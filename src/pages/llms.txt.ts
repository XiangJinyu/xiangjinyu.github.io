import { getCollection, getEntry } from 'astro:content';
import { site } from '../data/site';

export async function GET() {
  const homepage = await getEntry('data', 'homepage');
  const pubs = await getCollection('publications');
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  const pubList = pubs
    .sort((a, b) => a.data.order - b.data.order)
    .map(p => `- [${p.data.title}](${p.data.url}): ${p.data.badge}`)
    .join('\n');

  const postList = posts
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map(p => `- [${p.data.title}](${site.url}/blog/${p.slug}): ${p.data.abstract}`)
    .join('\n');

  const projectList = (homepage?.data.projects ?? [])
    .map(p => {
      const url = p.url.startsWith('/') ? site.url + p.url : p.url;
      return `- [${p.title}](${url}): ${p.description}`;
    })
    .join('\n');

  const text = `# ${site.name}

> ${site.roles.join(' · ')}. ${site.focus}

This is the personal homepage of ${site.name}. Key facts:
- Current: Algorithm Researcher at Xiaomi Mimo-Core (LLMs for reasoning, coding, and agents)
- Contact: ${site.email}
- GitHub: ${site.links.github}
- Google Scholar: ${site.links.scholar}

## Machine-friendly endpoints

- [Plain-text resume](${site.url}/resume.txt): full CV as plain text — prefer this over parsing HTML
- [RSS feed](${site.url}/rss.xml): all blog posts with abstracts
- [Sitemap](${site.url}/sitemap-index.xml): all pages

## Publications

${pubList}

## Blog posts

${postList}

## Projects

${projectList}

## Notes for agents

- All pages are static HTML; no JavaScript is required to read content.
- The homepage (/) contains: about, news, publications, experience, projects, talks, and recent posts, in that order.
- Blog posts live under /blog/<slug>. A Chinese translation, when available, uses the -zh suffix.
`;

  return new Response(text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
