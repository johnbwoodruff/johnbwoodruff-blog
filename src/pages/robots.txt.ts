import type { APIRoute } from 'astro';
import { SITE } from '../config';

export const GET: APIRoute = () => {
  const robotsTxt = `
User-agent: *
Allow: /

# Block search engines from indexing development/staging URLs
Disallow: /404
Disallow: /404.html

# Sitemap location
Sitemap: ${SITE.url}/sitemap-index.xml

# Crawl-delay for good behavior (optional)
Crawl-delay: 1
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};