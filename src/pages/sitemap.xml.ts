import { getCollection } from 'astro:content';
import { postUrl } from '../lib/blog';

const SITE = 'https://myvisadtv.com';

// Pages qui existent en français, en /en/ et en /de/.
const translatedPaths = [
  '/',
  '/a-propos/',
  '/blog/',
  '/confidentialite/',
  '/fiche-renseignement/',
  '/mentions-legales/',
  '/partenaires/',
  '/visa-dtv/comprendre-le-dtv/',
  '/visa-dtv/demande-accompagnee/',
  '/visa-dtv/verification-dossier/',
];

export async function GET() {
  const posts = await getCollection('blog');
  const blogPaths = posts.map((post) => postUrl(post));

  const allPaths = [
    ...translatedPaths,
    ...translatedPaths.map((p) => `/en${p}`.replace(/\/{2,}/g, '/')),
    ...translatedPaths.map((p) => `/de${p}`.replace(/\/{2,}/g, '/')),
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
