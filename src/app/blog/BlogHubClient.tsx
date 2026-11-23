'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import {
    Calendar,
    Clock,
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Search,
    X,
    Sparkles,
    FolderKanban,
    Rss,
} from 'lucide-react';
import type { BlogPost } from '@/data/blogPosts';
import { formatDate, getCategoryClassName } from '@/utils/blogUtils';
import CalBookingModal from '@/components/CalBookingModal';
import styles from './blog.module.css';

interface BlogHubClientProps {
    posts: BlogPost[];
}

const LEGACY_HASH_REDIRECTS: Record<string, string> = {
    'lab-supply-chain': '/blog/lab-data',
    'lab-data': '/blog/lab-data',
    'building-petbhai': '/blog/building-petbhai',
    'decentralized-community-operations': '/blog/community-moderators',
    'community-moderators': '/blog/community-moderators',
    'building-nextep-edu': '/blog/building-nextep-edu',
};

export default function BlogHubClient({ posts }: BlogHubClientProps) {
    const router = useRouter();
    const shouldReduceMotion = useReducedMotion();

    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);

    // Preserve legacy hash fragment links
    useEffect(() => {
        const hash = window.location.hash.replace(/^#/, '');
        if (!hash) return;
        const target = LEGACY_HASH_REDIRECTS[hash];
        if (target) {
            router.replace(target);
        }
    }, [router]);

    // Support global CommandPalette booking shortcut on /blog
    useEffect(() => {
        const handleOpenBooking = () => setIsBookingOpen(true);
        window.addEventListener('portfolio:open-booking', handleOpenBooking);
        return () => window.removeEventListener('portfolio:open-booking', handleOpenBooking);
    }, []);

    const categories = useMemo(() => {
        const unique = Array.from(new Set(posts.map((post) => post.category)));
        return ['All', ...unique];
    }, [posts]);

    const categoryCounts = useMemo(() => {
        const map: Record<string, number> = { All: posts.length };
        for (const post of posts) {
            map[post.category] = (map[post.category] ?? 0) + 1;
        }
        return map;
    }, [posts]);

    const normalizedQuery = searchQuery.trim().toLowerCase();
    const isFiltering = activeCategory !== 'All' || normalizedQuery.length > 0;

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            if (activeCategory !== 'All' && post.category !== activeCategory) {
                return false;
            }
            if (!normalizedQuery) return true;

            const haystack = [
                post.title,
                post.excerpt,
                post.category,
                post.relatedProjectTitle ?? '',
                ...(post.tags ?? []),
                ...(post.tldr ?? []),
            ]
                .join(' ')
                .toLowerCase();

            return haystack.includes(normalizedQuery);
        });
    }, [posts, activeCategory, normalizedQuery]);

    const featuredPost = !isFiltering && posts.length > 0 ? posts[0] : null;
    const gridPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;

    const handleResetFilters = () => {
        setActiveCategory('All');
        setSearchQuery('');
    };

    return (
        <div className={styles.container}>
            {/* Top Utility Bar */}
            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className={styles.topRow}
            >
                <Link href="/" className={styles.backLink}>
                    <ArrowLeft size={16} aria-hidden="true" />
                    <span>Back to Home</span>
                </Link>

                <a
                    href="/feed.xml"
                    className={styles.rssLink}
                    aria-label="Subscribe via RSS feed"
                >
                    <Rss size={14} aria-hidden="true" />
                    <span>RSS Feed</span>
                </a>
            </motion.div>

            {/* Editorial Header */}
            <header className={styles.header}>
                <span className={styles.eyebrow}>Field Notes · Operations &amp; Systems</span>
                <h1 className={styles.pageTitle}>Insights &amp; Writing</h1>
                <p className={styles.pageDescription}>
                    Practical essays on translating business processes into clean data systems, resilient operations, and production software.
                </p>
            </header>

            {/* Discovery Controls: Animated Category Pills + Keyword Search */}
            <section className={styles.controlsBar} aria-label="Filter and search essays">
                <div className={styles.filterPills} role="group" aria-label="Filter essays by category">
                    {categories.map((category) => {
                        const isActive = activeCategory === category;
                        return (
                            <button
                                key={category}
                                type="button"
                                aria-pressed={isActive}
                                onClick={() => setActiveCategory(category)}
                                className={`${styles.filterPill} ${isActive ? styles.filterPillActive : ''}`}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="blogHubActiveCategoryPill"
                                        className={styles.activePillBg}
                                        transition={
                                            shouldReduceMotion
                                                ? { duration: 0 }
                                                : { type: 'spring', stiffness: 460, damping: 34 }
                                        }
                                    />
                                )}
                                <span className={styles.filterPillLabel}>
                                    <span>{category}</span>
                                    <span className={styles.filterCount}>{categoryCounts[category] ?? 0}</span>
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className={styles.searchWrap}>
                    <Search size={15} className={styles.searchIcon} aria-hidden="true" />
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search by topic, title, or tag..."
                        aria-label="Search essays by topic, title, or tag"
                        className={styles.searchInput}
                    />
                    {searchQuery.length > 0 && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className={styles.clearSearchBtn}
                            aria-label="Clear search query"
                        >
                            <X size={14} aria-hidden="true" />
                        </button>
                    )}
                </div>
            </section>

            {/* Accessible status readout */}
            <div className={styles.resultsStatus} aria-live="polite">
                {isFiltering ? (
                    <span>
                        Showing <strong>{filteredPosts.length}</strong> of {posts.length} essays
                        {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
                        {normalizedQuery ? ` matching "${searchQuery.trim()}"` : ''}
                    </span>
                ) : (
                    <span>{posts.length} published essays · Linked directly to portfolio case studies</span>
                )}
            </div>

            {/* Featured Lead Essay Hero Card */}
            {featuredPost && (
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={styles.featuredWrapper}
                >
                    <Link href={`/blog/${featuredPost.slug}`} className={styles.featuredCard}>
                        <div className={styles.featuredGlow} aria-hidden="true" />

                        <div className={styles.featuredMetaRow}>
                            <div className={styles.metaLeftGroup}>
                                <span className={styles.featuredBadge}>
                                    <Sparkles size={12} aria-hidden="true" />
                                    <span>Featured Essay</span>
                                </span>
                                <span
                                    className={`${styles.category} ${getCategoryClassName(featuredPost.category, styles)}`}
                                >
                                    {featuredPost.category}
                                </span>
                            </div>

                            <div className={styles.postMeta}>
                                <span className={styles.metaItem}>
                                    <Calendar size={13} aria-hidden="true" />
                                    <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time>
                                </span>
                                <span className={styles.metaDot} aria-hidden="true">·</span>
                                <span className={styles.metaItem}>
                                    <Clock size={13} aria-hidden="true" />
                                    <span>{featuredPost.readTime}</span>
                                </span>
                            </div>
                        </div>

                        <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
                        <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>

                        {featuredPost.tldr && featuredPost.tldr.length > 0 && (
                            <ul className={styles.featuredTakeaways}>
                                {featuredPost.tldr.slice(0, 2).map((item, idx) => (
                                    <li key={idx} className={styles.featuredTakeawayItem}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className={styles.featuredFooter}>
                            <div className={styles.badgeCluster}>
                                {featuredPost.relatedProjectSlug && (
                                    <span className={styles.projectBadge}>
                                        <FolderKanban size={13} aria-hidden="true" />
                                        <span>Case Study: {featuredPost.relatedProjectMetric ?? featuredPost.relatedProjectTitle}</span>
                                    </span>
                                )}
                                {(featuredPost.tags ?? []).slice(0, 3).map((tag) => (
                                    <span key={tag} className={styles.tagPill}>{tag}</span>
                                ))}
                            </div>

                            <span className={styles.readMore}>
                                <span>Read Featured Essay</span>
                                <ArrowRight size={15} className={styles.arrowIcon} aria-hidden="true" />
                            </span>
                        </div>
                    </Link>
                </motion.div>
            )}

            {/* Essay List / Grid */}
            {filteredPosts.length === 0 ? (
                <div className={styles.emptyState}>
                    <p className={styles.emptyTitle}>No essays match your current filter.</p>
                    <p className={styles.emptyDesc}>
                        Try another keyword like &ldquo;BPMN&rdquo;, &ldquo;Excel&rdquo;, &ldquo;PetBhai&rdquo;, or reset filters to browse everything.
                    </p>
                    <button
                        type="button"
                        onClick={handleResetFilters}
                        className={styles.resetBtn}
                    >
                        Reset Filters
                    </button>
                </div>
            ) : (
                <div className={styles.postList}>
                    <AnimatePresence mode="popLayout">
                        {gridPosts.map((post, index) => (
                            <motion.div
                                key={post.slug}
                                layout={!shouldReduceMotion}
                                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.3, delay: Math.min(index * 0.06, 0.2) }}
                            >
                                <Link href={`/blog/${post.slug}`} className={styles.postCard}>
                                    <div className={styles.postHeader}>
                                        <div className={styles.metaLeftGroup}>
                                            <span
                                                className={`${styles.category} ${getCategoryClassName(post.category, styles)}`}
                                            >
                                                {post.category}
                                            </span>
                                            {post.updatedAt && (
                                                <span className={styles.updatedChip}>
                                                    Updated {formatDate(post.updatedAt)}
                                                </span>
                                            )}
                                        </div>

                                        <div className={styles.postMeta}>
                                            <span className={styles.metaItem}>
                                                <Calendar size={13} aria-hidden="true" />
                                                <time dateTime={post.date}>{formatDate(post.date)}</time>
                                            </span>
                                            <span className={styles.metaDot} aria-hidden="true">·</span>
                                            <span className={styles.metaItem}>
                                                <Clock size={13} aria-hidden="true" />
                                                <span>{post.readTime}</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className={styles.cardTitleRow}>
                                        <h2 className={styles.postTitle}>{post.title}</h2>
                                        <ArrowUpRight size={19} className={styles.cardArrow} aria-hidden="true" />
                                    </div>

                                    <p className={styles.postExcerpt}>{post.excerpt}</p>

                                    <div className={styles.cardFooter}>
                                        <div className={styles.badgeCluster}>
                                            {post.relatedProjectSlug && (
                                                <span className={styles.projectBadge}>
                                                    <FolderKanban size={12} aria-hidden="true" />
                                                    <span>Linked Case Study</span>
                                                </span>
                                            )}
                                            {(post.tags ?? []).slice(0, 3).map((tag) => (
                                                <span key={tag} className={styles.tagPill}>{tag}</span>
                                            ))}
                                        </div>

                                        <span className={styles.readMore}>
                                            <span>Read Article</span>
                                            <ArrowRight size={14} className={styles.arrowIcon} aria-hidden="true" />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            <CalBookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </div>
    );
}
