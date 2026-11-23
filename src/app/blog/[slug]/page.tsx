import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts, getPostBySlug, getAdjacentPosts } from '@/data/blogPosts';
import ArticleView from './ArticleView';

const SITE_URL = 'https://mdkarim.vercel.app';
const AUTHOR_NAME = 'Md Rezaul Karim';

function toIsoDate(dateStr: string): string {
    const parsed = new Date(dateStr.includes('T') ? dateStr : `${dateStr}T00:00:00.000Z`);
    return Number.isNaN(parsed.getTime()) ? dateStr : parsed.toISOString();
}

function serializeJsonLd(data: Record<string, unknown>): string {
    return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const publishedTime = toIsoDate(post.date);
    const modifiedTime = toIsoDate(post.updatedAt ?? post.date);
    const canonicalPath = `/blog/${post.slug}`;
    const articleTags = post.tags && post.tags.length > 0 ? post.tags : [post.category];

    return {
        title: post.title,
        description: post.excerpt,
        keywords: articleTags,
        authors: [{ name: AUTHOR_NAME, url: 'https://linkedin.com/in/myselfkarim' }],
        alternates: {
            canonical: canonicalPath,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: canonicalPath,
            siteName: AUTHOR_NAME,
            locale: 'en_US',
            type: 'article',
            publishedTime,
            modifiedTime,
            authors: [AUTHOR_NAME],
            section: post.category,
            tags: articleTags,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
        },
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const { prev, next } = getAdjacentPosts(slug);
    const publishedTime = toIsoDate(post.date);
    const modifiedTime = toIsoDate(post.updatedAt ?? post.date);
    const articleUrl = `${SITE_URL}/blog/${post.slug}`;
    const wordCount = post.content.trim().split(/\s+/).filter(Boolean).length;
    const keywords = post.tags && post.tags.length > 0 ? post.tags.join(', ') : post.category;

    const blogPostingJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: publishedTime,
        dateModified: modifiedTime,
        articleSection: post.category,
        keywords,
        wordCount,
        inLanguage: 'en',
        url: articleUrl,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': articleUrl,
        },
        image: `${SITE_URL}/blog/${post.slug}/opengraph-image`,
        author: {
            '@type': 'Person',
            name: AUTHOR_NAME,
            url: SITE_URL,
            sameAs: [
                'https://linkedin.com/in/myselfkarim',
                'https://github.com/myselfrezaul7',
            ],
        },
        publisher: {
            '@type': 'Person',
            name: AUTHOR_NAME,
            url: SITE_URL,
        },
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: SITE_URL,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Insights & Writing',
                item: `${SITE_URL}/blog`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: articleUrl,
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogPostingJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
            />
            <ArticleView post={post} prevPost={prev} nextPost={next} />
        </>
    );
}
