import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../config';

export async function GET() {
  const posts = await getCollection('blog', ({ data }) => data.published);
  
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.url,
    items: posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/posts/${post.slug}/`,
      })),
  });
}