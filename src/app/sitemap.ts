import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://mdkarim.vercel.app';
    return [
        {
            url: baseUrl,
            lastModified: new Date('2026-08-27'),
            changeFrequency: 'monthly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date('2026-08-27'),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];
}
