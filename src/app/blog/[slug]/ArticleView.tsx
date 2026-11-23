'use client';

import {
    useState,
    useRef,
    useEffect,
    useMemo,
    useCallback,
    useSyncExternalStore,
    type ReactNode,
} from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
    Calendar,
    Clock,
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Link2,
    Check,
    Share2,
    Linkedin,
    List,
    ChevronDown,
    Sparkles,
    FolderKanban,
    ExternalLink,
    Hash,
} from 'lucide-react';
import type { BlogPost } from '@/data/blogPosts';
import {
    formatDate,
    getCategoryClassName,
    extractHeadings,
    getReadMinutes,
    slugifyHeading,
    copyTextToClipboard,
    type ArticleHeading,
} from '@/utils/blogUtils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ErrorBoundary from '@/components/ErrorBoundary';
import CalBookingModal from '@/components/CalBookingModal';
import styles from './article.module.css';

interface ArticleViewProps {
    post: BlogPost;
    prevPost: BlogPost | null;
    nextPost: BlogPost | null;
}

type ContentBlock =
    | { type: 'heading'; level: 2 | 3; id: string; text: string }
    | { type: 'blockquote'; lines: string[] }
    | { type: 'ul'; items: string[] }
    | { type: 'ol'; items: string[] }
    | { type: 'paragraph'; text: string };

const CANONICAL_SITE_URL = 'https://mdkarim.vercel.app';

function isSafeHref(href: string): boolean {
    return href.startsWith('https://') || href.startsWith('http://') || href.startsWith('/');
}

/**
 * Pure React inline markdown renderer supporting **bold**, *italic*, `code`, and [label](url).
 */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
    const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`)/g;
    const parts = text.split(tokenRegex);

    return parts.map((part, index) => {
        if (!part) return null;
        const key = `${keyPrefix}-${index}`;

        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
            return (
                <strong key={key} className={styles.strongText}>
                    {part.slice(2, -2)}
                </strong>
            );
        }

        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
            return (
                <em key={key} className={styles.italicText}>
                    {part.slice(1, -1)}
                </em>
            );
        }

        if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
            return (
                <code key={key} className={styles.inlineCode}>
                    {part.slice(1, -1)}
                </code>
            );
        }

        const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (linkMatch) {
            const [, label, href] = linkMatch;
            if (!isSafeHref(href)) {
                return <span key={key}>{label}</span>;
            }
            if (href.startsWith('/')) {
                return (
                    <Link key={key} href={href} className={styles.inlineLink}>
                        {label}
                    </Link>
                );
            }
            return (
                <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.inlineLink}
                >
                    {label}
                </a>
            );
        }

        return part;
    });
}

/**
 * Parses Markdown article blocks cleanly while assigning heading IDs identical to extractHeadings().
 */
function parseArticleBlocks(content: string): ContentBlock[] {
    const lines = content.split(/\r?\n/);
    const blocks: ContentBlock[] = [];
    const seenIds = new Map<string, number>();

    let i = 0;
    while (i < lines.length) {
        const trimmed = lines[i].trim();

        if (!trimmed) {
            i += 1;
            continue;
        }

        // Heading (## or ###)
        if (trimmed.startsWith('### ') || trimmed.startsWith('## ')) {
            const level: 2 | 3 = trimmed.startsWith('### ') ? 3 : 2;
            const rawText = trimmed.slice(level + 1).trim();
            const baseId = slugifyHeading(rawText);
            const count = seenIds.get(baseId) ?? 0;
            seenIds.set(baseId, count + 1);
            const id = count === 0 ? baseId : `${baseId}-${count + 1}`;
            blocks.push({ type: 'heading', level, id, text: rawText });
            i += 1;
            continue;
        }

        // Blockquote (> ...)
        if (trimmed.startsWith('> ')) {
            const quoteLines: string[] = [];
            while (i < lines.length && lines[i].trim().startsWith('> ')) {
                quoteLines.push(lines[i].trim().slice(2).trim());
                i += 1;
            }
            blocks.push({ type: 'blockquote', lines: quoteLines });
            continue;
        }

        // Unordered list (- ... or * ...)
        if (/^[-*]\s+/.test(trimmed)) {
            const items: string[] = [];
            while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
                items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
                i += 1;
            }
            blocks.push({ type: 'ul', items });
            continue;
        }

        // Ordered list (1. ...)
        if (/^\d+\.\s+/.test(trimmed)) {
            const items: string[] = [];
            while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
                items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
                i += 1;
            }
            blocks.push({ type: 'ol', items });
            continue;
        }

        // Paragraph (group contiguous non-structural lines)
        const paraLines: string[] = [];
        while (
            i < lines.length &&
            lines[i].trim() !== '' &&
            !lines[i].trim().startsWith('## ') &&
            !lines[i].trim().startsWith('### ') &&
            !lines[i].trim().startsWith('> ') &&
            !/^[-*]\s+/.test(lines[i].trim()) &&
            !/^\d+\.\s+/.test(lines[i].trim())
        ) {
            paraLines.push(lines[i].trim());
            i += 1;
        }
        if (paraLines.length > 0) {
            blocks.push({ type: 'paragraph', text: paraLines.join(' ') });
        }
    }

    return blocks;
}

const subscribeNoop = () => () => {};
function getSupportsNativeShare(): boolean {
    return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
}
function getServerSupportsNativeShare(): boolean {
    return false;
}

export default function ArticleView({ post, prevPost, nextPost }: ArticleViewProps) {
    const articleRef = useRef<HTMLElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: articleRef,
        offset: ['start start', 'end end'],
    });
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 280,
        damping: 34,
        restDelta: 0.001,
    });

    const totalMinutes = useMemo(() => getReadMinutes(post.content), [post.content]);
    const headings: ArticleHeading[] = useMemo(() => extractHeadings(post.content), [post.content]);
    const blocks: ContentBlock[] = useMemo(() => parseArticleBlocks(post.content), [post.content]);

    const [progressPct, setProgressPct] = useState(0);
    const [activeHeadingId, setActiveHeadingId] = useState<string>(headings[0]?.id ?? '');
    const [mobileTocOpen, setMobileTocOpen] = useState(false);
    const [copiedType, setCopiedType] = useState<'link' | 'anchor' | null>(null);
    const [statusAnnouncement, setStatusAnnouncement] = useState('');
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const supportsNativeShare = useSyncExternalStore(
        subscribeNoop,
        getSupportsNativeShare,
        getServerSupportsNativeShare
    );

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        const clamped = Math.max(0, Math.min(100, Math.round(latest * 100)));
        setProgressPct((prev) => (prev === clamped ? prev : clamped));
    });

    // Listen to global portfolio:open-booking so CommandPalette & Author CTA open modal in-page
    useEffect(() => {
        const handleOpenBooking = () => setIsBookingOpen(true);
        window.addEventListener('portfolio:open-booking', handleOpenBooking);
        return () => window.removeEventListener('portfolio:open-booking', handleOpenBooking);
    }, []);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        };
    }, []);

    // Track active section heading with IntersectionObserver
    useEffect(() => {
        if (headings.length === 0) return;

        const elements = headings
            .map((heading) => document.getElementById(heading.id))
            .filter((el): el is HTMLElement => el !== null);

        if (elements.length === 0) return;

        const visibleIds = new Set<string>();

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        visibleIds.add(entry.target.id);
                    } else {
                        visibleIds.delete(entry.target.id);
                    }
                }

                if (visibleIds.size > 0) {
                    const firstVisible = headings.find((h) => visibleIds.has(h.id));
                    if (firstVisible) {
                        setActiveHeadingId(firstVisible.id);
                    }
                    return;
                }

                // Fallback: pick the last heading scrolled past the top threshold
                let lastPassed = headings[0].id;
                for (const el of elements) {
                    if (el.getBoundingClientRect().top <= 140) {
                        lastPassed = el.id;
                    }
                }
                setActiveHeadingId(lastPassed);
            },
            {
                rootMargin: '-96px 0px -65% 0px',
                threshold: [0, 1],
            }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [headings]);

    const announceCopy = useCallback((type: 'link' | 'anchor', message: string) => {
        setCopiedType(type);
        setStatusAnnouncement(message);
        if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        copyTimerRef.current = setTimeout(() => {
            setCopiedType(null);
            setStatusAnnouncement('');
        }, 2200);
    }, []);

    const handleCopyLink = async () => {
        const url = typeof window !== 'undefined'
            ? window.location.href
            : `${CANONICAL_SITE_URL}/blog/${post.slug}`;
        const ok = await copyTextToClipboard(url);
        if (ok) {
            announceCopy('link', 'Article link copied to clipboard.');
        }
    };

    const handleCopyHeadingLink = async (headingId: string) => {
        if (typeof window === 'undefined') return;
        const url = `${window.location.origin}${window.location.pathname}#${headingId}`;
        const ok = await copyTextToClipboard(url);
        if (ok) {
            announceCopy('anchor', 'Section anchor link copied to clipboard.');
        }
    };

    const handleNativeShare = async () => {
        if (typeof navigator === 'undefined' || typeof navigator.share !== 'function') return;
        try {
            await navigator.share({
                title: post.title,
                text: post.excerpt,
                url: window.location.href,
            });
        } catch {
            // User dismissed native share sheet
        }
    };

    const handleScheduleClick = () => {
        window.dispatchEvent(new CustomEvent('portfolio:open-booking'));
    };

    const handleJumpToHeading = (headingId: string) => {
        setMobileTocOpen(false);
        setActiveHeadingId(headingId);
    };

    const minutesRemaining = Math.max(1, Math.ceil(totalMinutes * (1 - progressPct / 100)));
    const readingStatusText = progressPct >= 96
        ? 'Finished reading'
        : progressPct <= 3
            ? post.readTime
            : `${progressPct}% read · ~${minutesRemaining} min left`;

    const canonicalUrl = `${CANONICAL_SITE_URL}/blog/${post.slug}`;
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`;

    const categoryBadgeClass = getCategoryClassName(post.category, styles);

    return (
        <>
            <a href="#main-content" className="skip-nav">Skip to main content</a>

            {/* Scoped article reading progress bar */}
            <motion.div
                className={styles.progressBar}
                style={{ scaleX: shouldReduceMotion ? scrollYProgress : smoothProgress }}
                aria-hidden="true"
            />

            <Navbar />

            <main id="main-content" className={styles.page}>
                <ErrorBoundary>
                    <div className={styles.pageShell}>
                        <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                            className={styles.topBar}
                        >
                            <Link href="/blog" className={styles.backLink}>
                                <ArrowLeft size={16} aria-hidden="true" />
                                <span>All Insights &amp; Writing</span>
                            </Link>

                            <span className={styles.progressReadout} aria-live="off">
                                <Clock size={13} aria-hidden="true" />
                                <span>{readingStatusText}</span>
                            </span>
                        </motion.div>

                        <div className={styles.readerLayout}>
                            {/* Primary Article Column */}
                            <article ref={articleRef} className={styles.articleColumn}>
                                <header className={styles.articleHeader}>
                                    <div className={styles.headerMeta}>
                                        <div className={styles.metaLeft}>
                                            <span className={`${styles.category} ${categoryBadgeClass}`}>
                                                {post.category}
                                            </span>
                                            <div className={styles.metaInfo}>
                                                <span className={styles.metaItem}>
                                                    <Calendar size={13} aria-hidden="true" />
                                                    <time dateTime={post.date}>{formatDate(post.date, 'long')}</time>
                                                </span>
                                                <span className={styles.metaDot} aria-hidden="true">·</span>
                                                <span className={styles.metaItem}>
                                                    <Clock size={13} aria-hidden="true" />
                                                    <span>{post.readTime}</span>
                                                </span>
                                                {post.updatedAt && (
                                                    <>
                                                        <span className={styles.metaDot} aria-hidden="true">·</span>
                                                        <span className={styles.updatedBadge}>
                                                            Updated {formatDate(post.updatedAt)}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleCopyLink}
                                            className={styles.shareButton}
                                            aria-label="Copy article link"
                                        >
                                            {copiedType === 'link' ? (
                                                <Check size={14} className={styles.copiedIcon} aria-hidden="true" />
                                            ) : (
                                                <Link2 size={14} aria-hidden="true" />
                                            )}
                                            <span>{copiedType === 'link' ? 'Copied!' : 'Copy link'}</span>
                                        </button>
                                    </div>

                                    <h1 className={styles.articleTitle}>{post.title}</h1>
                                    <p className={styles.articleExcerpt}>{post.excerpt}</p>

                                    {post.tags && post.tags.length > 0 && (
                                        <div className={styles.tagRow} aria-label="Article topics">
                                            {post.tags.map((tag) => (
                                                <span key={tag} className={styles.tagChip}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </header>

                                {/* Executive Summary / Key Takeaways */}
                                {post.tldr && post.tldr.length > 0 && (
                                    <section
                                        className={styles.tldrCard}
                                        aria-labelledby="executive-summary-heading"
                                    >
                                        <div className={styles.tldrHeader}>
                                            <Sparkles size={15} className={styles.tldrIcon} aria-hidden="true" />
                                            <h2 id="executive-summary-heading" className={styles.tldrEyebrow}>
                                                Executive Summary · Key Takeaways
                                            </h2>
                                        </div>
                                        <ul className={styles.tldrList}>
                                            {post.tldr.map((point, index) => (
                                                <li key={index} className={styles.tldrItem}>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}

                                {/* Mobile / Tablet Collapsible Jump Bar */}
                                {headings.length > 0 && (
                                    <div className={styles.mobileToc}>
                                        <button
                                            type="button"
                                            className={styles.mobileTocTrigger}
                                            onClick={() => setMobileTocOpen((open) => !open)}
                                            aria-expanded={mobileTocOpen}
                                            aria-controls="mobile-toc-list"
                                        >
                                            <span className={styles.mobileTocLabel}>
                                                <List size={15} aria-hidden="true" />
                                                <span>On this page ({headings.length} sections)</span>
                                            </span>
                                            <ChevronDown
                                                size={16}
                                                aria-hidden="true"
                                                className={`${styles.mobileTocChevron} ${mobileTocOpen ? styles.mobileTocChevronOpen : ''}`}
                                            />
                                        </button>

                                        {mobileTocOpen && (
                                            <nav
                                                id="mobile-toc-list"
                                                className={styles.mobileTocNav}
                                                aria-label="Table of contents"
                                            >
                                                <ul className={styles.tocList}>
                                                    {headings.map((heading) => (
                                                        <li
                                                            key={heading.id}
                                                            className={heading.level === 3 ? styles.tocItemSub : styles.tocItem}
                                                        >
                                                            <a
                                                                href={`#${heading.id}`}
                                                                onClick={() => handleJumpToHeading(heading.id)}
                                                                className={`${styles.tocLink} ${activeHeadingId === heading.id ? styles.tocLinkActive : ''}`}
                                                            >
                                                                {heading.text}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </nav>
                                        )}
                                    </div>
                                )}

                                {/* Rich Markdown Body */}
                                <div className={styles.articleBody}>
                                    {blocks.map((block, idx) => {
                                        if (block.type === 'heading') {
                                            if (block.level === 3) {
                                                return (
                                                    <h3 key={idx} id={block.id} className={styles.subHeading}>
                                                        <span>{renderInline(block.text, `h3-${idx}`)}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleCopyHeadingLink(block.id)}
                                                            className={styles.headingAnchor}
                                                            aria-label={`Copy link to section: ${block.text}`}
                                                            title="Copy section link"
                                                        >
                                                            <Hash size={15} aria-hidden="true" />
                                                        </button>
                                                    </h3>
                                                );
                                            }
                                            return (
                                                <h2 key={idx} id={block.id} className={styles.sectionHeading}>
                                                    <span>{renderInline(block.text, `h2-${idx}`)}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleCopyHeadingLink(block.id)}
                                                        className={styles.headingAnchor}
                                                        aria-label={`Copy link to section: ${block.text}`}
                                                        title="Copy section link"
                                                    >
                                                        <Hash size={16} aria-hidden="true" />
                                                    </button>
                                                </h2>
                                            );
                                        }

                                        if (block.type === 'blockquote') {
                                            return (
                                                <blockquote key={idx} className={styles.calloutQuote}>
                                                    {block.lines.map((line, lineIdx) => (
                                                        <p key={lineIdx} className={styles.calloutText}>
                                                            {renderInline(line, `bq-${idx}-${lineIdx}`)}
                                                        </p>
                                                    ))}
                                                </blockquote>
                                            );
                                        }

                                        if (block.type === 'ul') {
                                            return (
                                                <ul key={idx} className={styles.bulletList}>
                                                    {block.items.map((item, itemIdx) => (
                                                        <li key={itemIdx} className={styles.listItem}>
                                                            {renderInline(item, `ul-${idx}-${itemIdx}`)}
                                                        </li>
                                                    ))}
                                                </ul>
                                            );
                                        }

                                        if (block.type === 'ol') {
                                            return (
                                                <ol key={idx} className={styles.numberedList}>
                                                    {block.items.map((item, itemIdx) => (
                                                        <li key={itemIdx} className={styles.listItem}>
                                                            {renderInline(item, `ol-${idx}-${itemIdx}`)}
                                                        </li>
                                                    ))}
                                                </ol>
                                            );
                                        }

                                        return (
                                            <p key={idx} className={styles.paragraph}>
                                                {renderInline(block.text, `p-${idx}`)}
                                            </p>
                                        );
                                    })}
                                </div>

                                {/* Executive Article Footer */}
                                <footer className={styles.articleFooter}>
                                    {/* Accessible live feedback for clipboard actions */}
                                    <div className="sr-only" role="status" aria-live="polite">
                                        {statusAnnouncement}
                                    </div>

                                    {/* Share Row */}
                                    <div className={styles.footerShare}>
                                        <div className={styles.footerShareCopy}>
                                            <span className={styles.footerShareLabel}>Share this essay</span>
                                            <span className={styles.footerShareSub}>
                                                Useful for your team or peers? Pass it along.
                                            </span>
                                        </div>
                                        <div className={styles.shareActions}>
                                            <button
                                                type="button"
                                                onClick={handleCopyLink}
                                                className={styles.shareButton}
                                                aria-label="Copy article link"
                                            >
                                                {copiedType === 'link' ? (
                                                    <Check size={14} className={styles.copiedIcon} aria-hidden="true" />
                                                ) : (
                                                    <Link2 size={14} aria-hidden="true" />
                                                )}
                                                <span>{copiedType === 'link' ? 'Copied!' : 'Copy Link'}</span>
                                            </button>

                                            <a
                                                href={linkedInShareUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.shareButton}
                                                aria-label="Share article on LinkedIn"
                                            >
                                                <Linkedin size={14} aria-hidden="true" />
                                                <span>LinkedIn</span>
                                            </a>

                                            {supportsNativeShare && (
                                                <button
                                                    type="button"
                                                    onClick={handleNativeShare}
                                                    className={styles.shareButton}
                                                    aria-label="Share using device share sheet"
                                                >
                                                    <Share2 size={14} aria-hidden="true" />
                                                    <span>Share</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Linked Project Case-Study Card */}
                                    {post.relatedProjectSlug && (
                                        <div className={styles.caseStudyCard}>
                                            <div className={styles.caseStudyContent}>
                                                <div className={styles.caseStudyMeta}>
                                                    <span className={styles.caseStudyEyebrow}>
                                                        <FolderKanban size={13} aria-hidden="true" />
                                                        <span>Linked Project Case Study</span>
                                                    </span>
                                                    {post.relatedProjectMetric && (
                                                        <span className={styles.caseStudyMetric}>
                                                            {post.relatedProjectMetric}
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className={styles.caseStudyTitle}>
                                                    {post.relatedProjectTitle ?? 'Explore the Full Project Architecture'}
                                                </h3>
                                                <p className={styles.caseStudyDesc}>
                                                    Inspect the end-to-end system breakdown, KPI outcomes, and deliverables behind this essay.
                                                </p>
                                            </div>
                                            <div className={styles.caseStudyActions}>
                                                <Link
                                                    href={`/?project=${post.relatedProjectSlug}#work`}
                                                    className={styles.caseStudyPrimaryBtn}
                                                >
                                                    <span>Open Case Study</span>
                                                    <ArrowRight size={15} aria-hidden="true" />
                                                </Link>
                                                {post.relatedProjectUrl && (
                                                    <a
                                                        href={post.relatedProjectUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={styles.caseStudySecondaryBtn}
                                                    >
                                                        <span>Live Platform</span>
                                                        <ExternalLink size={14} aria-hidden="true" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Author Credibility & Conversion Card */}
                                    <div className={styles.authorCard}>
                                        <div className={styles.authorIdentity}>
                                            <div className={styles.authorAvatarWrap}>
                                                <Image
                                                    src="/images/profile.webp"
                                                    alt="Md Rezaul Karim"
                                                    width={68}
                                                    height={68}
                                                    className={styles.authorAvatar}
                                                />
                                            </div>
                                            <div className={styles.authorDetails}>
                                                <span className={styles.authorEyebrow}>Written by</span>
                                                <h3 className={styles.authorName}>Md Rezaul Karim</h3>
                                                <p className={styles.authorRole}>
                                                    M.A. IMIS · Fachhochschule Südwestfalen · Soest, Germany
                                                </p>
                                                <p className={styles.authorBio}>
                                                    Bridging business processes, SAP/BI analytics, and modern web systems. Open to Working Student, Internship, and Master Thesis roles across Germany.
                                                </p>
                                            </div>
                                        </div>

                                        <div className={styles.authorActions}>
                                            <button
                                                type="button"
                                                onClick={handleScheduleClick}
                                                className={styles.authorPrimaryBtn}
                                            >
                                                <Calendar size={15} aria-hidden="true" />
                                                <span>Schedule 30-Min Chat</span>
                                            </button>
                                            <a
                                                href="https://www.linkedin.com/in/myselfkarim"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.authorSecondaryBtn}
                                            >
                                                <Linkedin size={15} aria-hidden="true" />
                                                <span>LinkedIn</span>
                                                <ArrowUpRight size={14} aria-hidden="true" />
                                            </a>
                                            <Link href="/#contact" className={styles.authorGhostBtn}>
                                                <span>Contact Hub</span>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Prev / Next Essay Navigation */}
                                    <nav className={styles.navigation} aria-label="Adjacent articles">
                                        {prevPost ? (
                                            <Link
                                                href={`/blog/${prevPost.slug}`}
                                                className={`${styles.navCard} ${styles.navPrev}`}
                                            >
                                                <span className={styles.navDirection}>
                                                    <ArrowLeft size={14} aria-hidden="true" /> Newer Essay
                                                </span>
                                                <span className={styles.navTitle}>{prevPost.title}</span>
                                            </Link>
                                        ) : (
                                            <div className={styles.navPlaceholder} aria-hidden="true" />
                                        )}

                                        {nextPost ? (
                                            <Link
                                                href={`/blog/${nextPost.slug}`}
                                                className={`${styles.navCard} ${styles.navNext}`}
                                            >
                                                <span className={styles.navDirection}>
                                                    Earlier Essay <ArrowRight size={14} aria-hidden="true" />
                                                </span>
                                                <span className={styles.navTitle}>{nextPost.title}</span>
                                            </Link>
                                        ) : (
                                            <div className={styles.navPlaceholder} aria-hidden="true" />
                                        )}
                                    </nav>
                                </footer>
                            </article>

                            {/* Sticky Desktop Table of Contents Sidebar */}
                            {headings.length > 0 && (
                                <aside className={styles.tocSidebar} aria-label="Table of contents">
                                    <div className={styles.tocSticky}>
                                        <div className={styles.tocProgressBlock}>
                                            <div className={styles.tocProgressHeader}>
                                                <span className={styles.tocEyebrow}>On this page</span>
                                                <span className={styles.tocPercent}>{progressPct}%</span>
                                            </div>
                                            <div className={styles.tocTrack} aria-hidden="true">
                                                <div
                                                    className={styles.tocTrackFill}
                                                    style={{ width: `${progressPct}%` }}
                                                />
                                            </div>
                                            <span className={styles.tocMinutesLeft}>{readingStatusText}</span>
                                        </div>

                                        <nav aria-label="Article sections">
                                            <ul className={styles.tocList}>
                                                {headings.map((heading) => (
                                                    <li
                                                        key={heading.id}
                                                        className={heading.level === 3 ? styles.tocItemSub : styles.tocItem}
                                                    >
                                                        <a
                                                            href={`#${heading.id}`}
                                                            onClick={() => handleJumpToHeading(heading.id)}
                                                            aria-current={activeHeadingId === heading.id ? 'location' : undefined}
                                                            className={`${styles.tocLink} ${activeHeadingId === heading.id ? styles.tocLinkActive : ''}`}
                                                        >
                                                            {heading.text}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </nav>

                                        {post.relatedProjectSlug && (
                                            <div className={styles.tocProjectShortcut}>
                                                <Link
                                                    href={`/?project=${post.relatedProjectSlug}#work`}
                                                    className={styles.tocProjectLink}
                                                >
                                                    <FolderKanban size={13} aria-hidden="true" />
                                                    <span>View Linked Case Study</span>
                                                    <ArrowUpRight size={13} aria-hidden="true" />
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </aside>
                            )}
                        </div>
                    </div>
                </ErrorBoundary>
            </main>

            <Footer />
            <ScrollToTop />

            <CalBookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                contextLabel={`Re: ${post.category}`}
            />
        </>
    );
}
