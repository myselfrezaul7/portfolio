'use client';

import Link from 'next/link';
import {
  Calendar,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  FolderKanban,
} from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import { formatDate, getCategoryClassName } from '@/utils/blogUtils';
import { useMobileCarousel } from '@/hooks/useMobileCarousel';
import MobileCarouselControls from './ui/MobileCarouselControls';
import ScrollReveal from './animations/ScrollReveal';
import styles from './Blog.module.css';

export default function Blog() {
  const [leadPost, ...otherPosts] = blogPosts;

  const {
    trackRef,
    activeIndex,
    canScrollPrev,
    canScrollNext,
    scrollToIndex,
    step,
  } = useMobileCarousel({ itemCount: blogPosts.length });

  if (!leadPost) {
    return null;
  }

  return (
    <section id="blog" className={styles.blog} aria-label="Blog and insights">
      <div className={styles.container}>
        <ScrollReveal>
          <div className={styles.headerRow}>
            <div className={styles.header}>
              <span className={styles.eyebrow}>Field Notes &amp; Essays</span>
              <h2 className={styles.sectionTitle}>Insights &amp; Writing</h2>
              <p className={styles.sectionDescription}>
                Lessons from clinical data reporting, BPMN process architecture, animal-welfare logistics, and scaling volunteer operations.
              </p>
            </div>

            <Link href="/blog" className={styles.headerExploreLink}>
              <span>Explore All Essays</span>
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Curated Lead Essay + Compact Insights Split (Unified Horizontal Carousel on Mobile) */}
        <ScrollReveal delay={0.05}>
          <div
            ref={trackRef}
            className={styles.editorialGrid}
            data-other-count={otherPosts.length}
          >
            {/* Lead Essay Feature Card */}
            <div className={styles.leadSlot}>
              <Link href={`/blog/${leadPost.slug}`} className={styles.leadCard}>
                <div className={styles.leadGlow} aria-hidden="true" />

                <div className={styles.leadMetaTop}>
                  <span className={styles.leadBadge}>
                    <Sparkles size={12} aria-hidden="true" />
                    <span>Lead Essay</span>
                  </span>
                  <span
                    className={`${styles.category} ${getCategoryClassName(leadPost.category, styles)}`}
                  >
                    {leadPost.category}
                  </span>
                </div>

                <div className={styles.leadMetaDates}>
                  <span className={styles.metaItem}>
                    <Calendar size={13} aria-hidden="true" />
                    <time dateTime={leadPost.date}>{formatDate(leadPost.date)}</time>
                  </span>
                  <span className={styles.metaDot} aria-hidden="true">·</span>
                  <span className={styles.metaItem}>
                    <Clock size={13} aria-hidden="true" />
                    <span>{leadPost.readTime}</span>
                  </span>
                </div>

                <h3 className={styles.leadTitle}>{leadPost.title}</h3>
                <p className={styles.leadExcerpt}>{leadPost.excerpt}</p>

                {leadPost.tldr && leadPost.tldr.length > 0 && (
                  <ul className={styles.leadTakeaways}>
                    {leadPost.tldr.slice(0, 2).map((point, idx) => (
                      <li key={idx} className={styles.leadTakeawayItem}>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                <div className={styles.leadFooter}>
                  {leadPost.relatedProjectSlug && (
                    <span className={styles.projectPill}>
                      <FolderKanban size={12} aria-hidden="true" />
                      <span>Linked Case Study</span>
                    </span>
                  )}
                  <span className={styles.leadCta}>
                    <span>Read Essay</span>
                    <ArrowRight size={15} className={styles.leadCtaArrow} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </div>

            {/* Compact Insights Cards */}
            {otherPosts.map((post) => (
              <div key={post.slug} className={styles.rowItem}>
                <Link href={`/blog/${post.slug}`} className={styles.rowCard}>
                  <div className={styles.rowMeta}>
                    <span
                      className={`${styles.category} ${getCategoryClassName(post.category, styles)}`}
                    >
                      {post.category}
                    </span>
                    <span className={styles.metaItem}>
                      <Calendar size={12} aria-hidden="true" />
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </span>
                    <span className={styles.metaDot} aria-hidden="true">·</span>
                    <span className={styles.metaItem}>
                      <Clock size={12} aria-hidden="true" />
                      <span>{post.readTime}</span>
                    </span>
                    {post.updatedAt && (
                      <span className={styles.updatedDotPill}>2026 Update</span>
                    )}
                  </div>

                  <div className={styles.rowHeader}>
                    <h3 className={styles.rowTitle}>{post.title}</h3>
                    <ArrowUpRight size={17} className={styles.arrow} aria-hidden="true" />
                  </div>

                  <p className={styles.rowExcerpt}>{post.excerpt}</p>

                  <div className={styles.rowFooter}>
                    {post.relatedProjectSlug && (
                      <span className={styles.projectPillSubtle}>
                        <FolderKanban size={11} aria-hidden="true" />
                        <span>
                          Case Study{post.relatedProjectMetric ? ` · ${post.relatedProjectMetric}` : ''}
                        </span>
                      </span>
                    )}
                    <span className={styles.rowMobileCta}>
                      <span>Read Essay</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <MobileCarouselControls
            count={blogPosts.length}
            activeIndex={activeIndex}
            canScrollPrev={canScrollPrev}
            canScrollNext={canScrollNext}
            onSelect={scrollToIndex}
            onStep={step}
            label="essay"
          />
        </ScrollReveal>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.14}>
          <div className={styles.viewAll}>
            <Link href="/blog" className={styles.viewAllLink}>
              <span>Explore All Essays ({blogPosts.length})</span>
              <ArrowRight size={16} className={styles.viewAllArrow} aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
