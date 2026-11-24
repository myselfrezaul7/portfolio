import { blogPosts } from '@/data/blogPosts';

export const dynamic = 'force-static';

const SITE_URL = 'https://mdkarim.vercel.app';
const AUTHOR_NAME = 'Md Rezaul Karim';

function escapeXml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function parseUtcDate(dateStr: string): Date {
    const parts = dateStr.split('-').map(Number);
    if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
        const [year, month, day] = parts;
        return new Date(Date.UTC(year, month - 1, day));
    }
    const fallback = new Date(dateStr);
    return Number.isNaN(fallback.getTime()) ? new Date() : fallback;
}

export function GET() {
    const sortedPosts = [...blogPosts].sort(
        (a, b) => parseUtcDate(b.date).getTime() - parseUtcDate(a.date).getTime()
    );

    const latestBuildMs = sortedPosts.reduce((maxMs, post) => {
        const postMs = parseUtcDate(post.updatedAt ?? post.date).getTime();
        return Math.max(maxMs, postMs);
    }, 0);

    const latestBuildDate =
        latestBuildMs > 0
            ? new Date(latestBuildMs).toUTCString()
            : new Date().toUTCString();

    const itemsXml = sortedPosts
        .map((post) => {
            const articleUrl = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`;
            const pubDate = parseUtcDate(post.date).toUTCString();
            const categories = Array.from(
                new Set([post.category, ...(post.tags ?? [])])
            );
            const categoryTags = categories
                .map((cat) => `      <category>${escapeXml(cat)}</category>`)
                .join('\n');

            return [
                '    <item>',
                `      <title>${escapeXml(post.title)}</title>`,
                `      <link>${escapeXml(articleUrl)}</link>`,
                `      <guid isPermaLink="true">${escapeXml(articleUrl)}</guid>`,
                `      <description>${escapeXml(post.excerpt)}</description>`,
                categoryTags,
                `      <dc:creator>${escapeXml(AUTHOR_NAME)}</dc:creator>`,
                `      <pubDate>${escapeXml(pubDate)}</pubDate>`,
                '    </item>',
            ].join('\n');
        })
        .join('\n');

    const rssXml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
        '  <channel>',
        `    <title>${escapeXml(`Insights & Writing - ${AUTHOR_NAME}`)}</title>`,
        `    <link>${SITE_URL}/blog</link>`,
        `    <description>${escapeXml('Field notes on operations analytics, supply chain execution, BPMN 2.0 process modeling, and building digital products.')}</description>`,
        '    <language>en-us</language>',
        `    <lastBuildDate>${escapeXml(latestBuildDate)}</lastBuildDate>`,
        `    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />`,
        itemsXml,
        '  </channel>',
        '</rss>',
        '',
    ].join('\n');

    return new Response(rssXml, {
        status: 200,
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
