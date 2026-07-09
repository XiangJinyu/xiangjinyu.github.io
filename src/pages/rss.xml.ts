import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const sorted = posts
    .filter(p => !p.slug.endsWith('-zh'))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: "Jinyu Xiang's Blog",
    description: 'Thoughts on AI Agents, Self-Evolution, and Foundation Models.',
    site: context.site!,
    items: sorted.map(post => ({
      title: post.data.title,
      description: post.data.abstract,
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
    })),
    customData: '<language>en</language>',
  });
}
