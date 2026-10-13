import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts, getPostBySlug, getAdjacentPosts } from '@/data/blogPosts';
import ArticleView from './ArticleView';

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
            title: 'Post Not Found | Md Rezaul Karim',
        };
    }

    return {
        title: `${post.title} | Md Rezaul Karim`,
        description: post.excerpt,
        alternates: {
            canonical: `/blog/${post.slug}`,
        },
        openGraph: {
            title: `${post.title} | Md Rezaul Karim`,
            description: post.excerpt,
            url: `/blog/${post.slug}`,
            type: 'article',
            publishedTime: post.date,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${post.title} | Md Rezaul Karim`,
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

    return <ArticleView post={post} prevPost={prev} nextPost={next} />;
}
