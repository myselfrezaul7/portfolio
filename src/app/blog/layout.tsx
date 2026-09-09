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
        images: [
            {
                url: '/images/profile.jpg',
                width: 800,
                height: 800,
                alt: 'Md Rezaul Karim',
            },
        ],
    },
    twitter: {
        card: 'summary',
        title: 'Insights & Writing | Md Rezaul Karim',
        description: 'Thoughts on operations, supply chain, technology, and building digital products.',
        images: ['/images/profile.jpg'],
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
