import { NextResponse } from "next/server";

export async function GET() {
    const siteUrl = "https://footloosemonkey.club";

    const robotsTxt = `
User-agent: *
Disallow: /api/
Disallow: /admin/

User-agent: *
Allow: /ads.txt

User-agent: Googlebot
Allow: /

User-agent: Googlebot-News
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Googlebot-Video
Allow: /

User-agent: Googlebot-Mobile
Allow: /

User-agent: Mediapartners-Google
Allow: /

User-agent: AdsBot-Google
Allow: /
Disallow: /admin/

User-agent: Googlebot-Ads
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`.trim();

    return new NextResponse(robotsTxt, {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}