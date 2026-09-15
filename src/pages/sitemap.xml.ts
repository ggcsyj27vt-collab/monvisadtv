import { getCollection } from 'astro:content';

const SITE = 'https://myvisadtv.com';

// Pages statiques du site (hors articles de blog, ajoutés dynamiquement plus bas).
const staticPaths = [
  '/',
  '/a-propos/',
  '/blog/',
  '/confidentialite/',
  '/fiche-renseignement/',
  '/mentions-legales/',
  '/visa-dtv/comprendre-le-dtv/',
  '/visa-dtv/demande-accompagnee/',
];

export async function GET() {
  const posts = await getCollection('blog');
  const blogPaths = posts.map((post) => `/blog/${post.slug}/`);

  const allPaths = [...staticPaths, ...blogPaths];

  const urlEntries = allPaths
    .map((path) => `  <url>\n    <loc>${SITE}${path}</loc>\n  </url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
