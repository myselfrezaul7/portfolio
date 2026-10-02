import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Insights & Writing',
    description: 'Thoughts on operations, supply chain, technology, and building digital products.',
    alternates: {
        canonical: '/blog',
    },
    openGraph: {
        title: 'Insights & Writing | Md Rezaul Karim',
        description: 'Thoughts on operations, supply chain, technology, and building digital products.',
        url: '/blog',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Insights & Writing | Md Rezaul Karim',
        description: 'Thoughts on operations, supply chain, technology, and building digital products.',
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
