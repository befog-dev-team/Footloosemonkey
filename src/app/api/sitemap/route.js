import { NextResponse } from 'next/server';

export async function GET() {
  const siteUrl = 'https://footloosemonkey.club';

  // Define your site's static routes
  const staticRoutes = [
    '/',
    '/about',
    '/register',
    '/upload-video',
    '/spotlight',
    '/verifyuser',
    '/submission',
    '/terms-condition-policy',
    '/privacy-policy',
    '/refund-policy',
    '/payment-checkout',
    '/leaderboard',
    '/acting',
    '/dancing',
    '/singing',
    '/mimicry',
    '/forgettokenid'
  ];

  // Generate XML entries for static routes
  const sitemapItems = staticRoutes.map(route => `
      <url>
        <loc>${siteUrl}${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.8</priority>
      </url>
    `).join('');

  // Full XML Sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapItems}
    </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400', // Cache for 1 day
    },
  });
}
