import { getCollection } from 'astro:content';

const SITE = 'https://myvisadtv.com';

// Pages traduites en /en/ et /de/ (le blog reste français pour l'instant).
const translatedPaths = [
  '/',
  '/a-propos/',
  '/confidentialite/',
  '/fiche-renseignement/',
  '/mentions-legales/',
  '/visa-dtv/comprendre-le-dtv/',
  '/visa-dtv/demande-accompagnee/',
];

// Pages françaises supplémentaires sans équivalent traduit.
const frenchOnlyPaths = ['/blog/'];

export async function GET() {
  const posts = await getCollection('blog');
  const blogPaths = posts.map((post) => `/blog/${post.slug}/`);

  const allPaths = [
    ...translatedPaths,
    ...translatedPaths.map((p) => `/en${p}`.replace(/\/{2,}/g, '/')),
    ...translatedPaths.map((p) => `/de${p}`.replace(/\/{2,}/g, '/')),
    ...frenchOnlyPaths,
    ...blogPaths,
  ];

  const urlEntries = allPaths
    .map((path) => `  <url>\n    <loc>${SITE}${path}</loc>\n  </url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}

