import type { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blogPosts';

const SITE_URL = 'https://mdkarim.vercel.app';

function parseUtcDate(dateStr: string): Date {
    const parts = dateStr.split('-').map(Number);
    if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
        const [year, month, day] = parts;
        return new Date(Date.UTC(year, month - 1, day));
    }
    const fallback = new Date(dateStr);
    return Number.isNaN(fallback.getTime()) ? new Date() : fallback;
}

function getLatestPostDate(): Date {
    if (blogPosts.length === 0) {
        return new Date();
    }
    let latestMs = -Infinity;
    for (const post of blogPosts) {
        const ms = parseUtcDate(post.updatedAt ?? post.date).getTime();
        if (ms > latestMs) {
            latestMs = ms;
        }
    }
    return Number.isFinite(latestMs) ? new Date(latestMs) : new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
    const latestPostDate = getLatestPostDate();

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
            lastModified: latestPostDate,
            changeFrequency: 'monthly',
            priority: 1.0,
        },
        {
            url: `${SITE_URL}/blog`,
            lastModified: latestPostDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: parseUtcDate(post.updatedAt ?? post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    return [...staticRoutes, ...blogRoutes];
}
