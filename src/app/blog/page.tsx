import type { Metadata } from 'next';
import { blogPosts } from '@/data/blogPosts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ErrorBoundary from '@/components/ErrorBoundary';
import BlogHubClient from './BlogHubClient';
import styles from './blog.module.css';

export const metadata: Metadata = {
    title: 'Insights & Writing',
    description: 'Executive field notes on business process architecture (BPMN 2.0), clinical data reporting, social-venture logistics, and community operations at scale.',
    alternates: {
        canonical: '/blog',
        types: {
            'application/rss+xml': '/feed.xml',
        },
    },
    openGraph: {
        title: 'Insights & Writing | Md Rezaul Karim',
        description: 'Executive field notes on business process architecture, clinical data reporting, social-venture logistics, and community operations at scale.',
        url: '/blog',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Insights & Writing | Md Rezaul Karim',
        description: 'Executive field notes on business process architecture, clinical data reporting, social-venture logistics, and community operations at scale.',
    },
};

export default function BlogIndexPage() {
    return (
        <>
            <a href="#main-content" className="skip-nav">Skip to main content</a>
            <Navbar />
            <main id="main-content" className={styles.page}>
                <ErrorBoundary>
                    <BlogHubClient posts={blogPosts} />
                </ErrorBoundary>
            </main>
            <Footer />
            <ScrollToTop />
        </>
    );
}
