'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  BookOpen,
  Check,
  Link2,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';
import type { ProjectCaseStudy } from '@/data/projects';
import ProjectArchitectureVisual from './ProjectArchitectureVisual';
import styles from './ProjectCaseStudyDrawer.module.css';

interface ProjectCaseStudyDrawerProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onSelectProject?: (slug: string) => void;
  prevSlug?: string | null;
  nextSlug?: string | null;
}

export default function ProjectCaseStudyDrawer({
  project,
  onClose,
  onSelectProject,
  prevSlug,
  nextSlug,
}: ProjectCaseStudyDrawerProps) {
  const [gallerySelection, setGallerySelection] = useState<{ slug: string; idx: number }>({
    slug: '',
    idx: 0,
  });
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const scrollBodyRef = useRef<HTMLDivElement>(null);

  const activeImageIdx =
    project && gallerySelection.slug === project.slug ? gallerySelection.idx : 0;
  const copiedLink = Boolean(project && copiedSlug === project.slug);

  // Reset scroll position when switching projects
  useEffect(() => {
    if (scrollBodyRef.current) {
      scrollBodyRef.current.scrollTop = 0;
    }
  }, [project?.slug]);

  // Body scroll lock, Escape handler, and focus management
  useEffect(() => {
    if (!project) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 60);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight' && nextSlug && onSelectProject) {
        if ((e.target as HTMLElement)?.tagName !== 'BUTTON' && (e.target as HTMLElement)?.tagName !== 'A') {
          onSelectProject(nextSlug);
        }
      } else if (e.key === 'ArrowLeft' && prevSlug && onSelectProject) {
        if ((e.target as HTMLElement)?.tagName !== 'BUTTON' && (e.target as HTMLElement)?.tagName !== 'A') {
          onSelectProject(prevSlug);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [project, onClose, prevSlug, nextSlug, onSelectProject]);

  const handleCopyShareLink = async () => {
    if (!project || typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.searchParams.set('project', project.slug);
    url.hash = 'work';
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopiedSlug(project.slug);
      window.setTimeout(() => {
        setCopiedSlug((prev) => (prev === project.slug ? null : prev));
      }, 2000);
    } catch {
      // Clipboard blocked in restricted contexts
    }
  };

  const handleDiscussArchitecture = () => {
    onClose();
    window.setTimeout(() => {
      const contactEl = document.getElementById('contact');
      contactEl?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  const activeGalleryItem =
    project && project.gallery.length > 0
      ? project.gallery[Math.min(activeImageIdx, project.gallery.length - 1)]
      : null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-drawer-title"
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 36 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <header className={styles.topBar}>
              <div className={styles.topMeta}>
                <span className={styles.categoryPill}>{project.category}</span>
                <span className={styles.periodTag}>{project.period}</span>
              </div>
              <div className={styles.topActions}>
                <button
                  type="button"
                  onClick={handleCopyShareLink}
                  className={styles.iconBtn}
                  aria-label="Copy direct link to this case study"
                >
                  {copiedLink ? <Check size={14} /> : <Link2 size={14} />}
                  <span>{copiedLink ? 'Copied' : 'Share'}</span>
                </button>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={onClose}
                  className={`${styles.iconBtn} ${styles.closeBtn}`}
                  aria-label="Close case study drawer"
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            {/* Scrollable Body */}
            <div ref={scrollBodyRef} className={styles.scrollBody}>
              <div className={styles.heroHeader}>
                <span className={styles.roleLine}>{project.role}</span>
                <h2 id="case-study-drawer-title" className={styles.title}>
                  {project.title}
                </h2>
                <p className={styles.subtitle}>{project.subtitle}</p>
                {project.platformBadges && project.platformBadges.length > 0 && (
                  <div className={styles.badgeRow}>
                    {project.platformBadges.map((badge) => (
                      <span key={badge} className={styles.platformBadge}>
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Visual Showcase or Theme-Adaptive Architecture SVG */}
              <div className={styles.visualStage}>
                <div className={styles.mediaFrame}>
                  {project.diagramType ? (
                    <ProjectArchitectureVisual type={project.diagramType} variant="expanded" />
                  ) : activeGalleryItem ? (
                    <Image
                      key={activeGalleryItem.src}
                      src={activeGalleryItem.src}
                      alt={activeGalleryItem.alt}
                      fill
                      sizes="(max-width: 767px) 100vw, 680px"
                      className={styles.mediaImage}
                      placeholder={activeGalleryItem.blurDataURL ? 'blur' : 'empty'}
                      blurDataURL={activeGalleryItem.blurDataURL}
                    />
                  ) : null}
                </div>

                {!project.diagramType && activeGalleryItem && (
                  <div className={styles.mediaCaptionBar}>
                    <p className={styles.mediaCaption}>{activeGalleryItem.caption}</p>
                    {project.gallery.length > 1 && (
                      <div className={styles.gallerySwitcher} role="tablist" aria-label="Project gallery views">
                        {project.gallery.map((item, idx) => (
                          <button
                            key={item.src}
                            type="button"
                            role="tab"
                            aria-selected={activeImageIdx === idx}
                            onClick={() =>
                              setGallerySelection({ slug: project.slug, idx })
                            }
                            className={`${styles.galleryTab} ${
                              activeImageIdx === idx ? styles.galleryTabActive : ''
                            }`}
                          >
                            0{idx + 1}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Quantified Impact KPI Strip */}
              <div className={styles.kpiGrid} aria-label="Headline impact metrics">
                {project.impactMetrics.map((metric) => (
                  <div key={metric.label} className={styles.kpiCard}>
                    <span className={styles.kpiValue}>{metric.value}</span>
                    <span className={styles.kpiLabel}>{metric.label}</span>
                  </div>
                ))}
              </div>

              {/* 01: Operational Challenge */}
              <section className={styles.sectionBlock} aria-label="Operational Challenge">
                <h3 className={styles.blockHeading}>
                  <span className={styles.blockIndex}>01</span>
                  Operational Challenge
                </h3>
                <p className={styles.problemText}>{project.problem}</p>
              </section>

              {/* 02: System & Process Architecture */}
              <section className={styles.sectionBlock} aria-label="System and Process Architecture">
                <h3 className={styles.blockHeading}>
                  <span className={styles.blockIndex}>02</span>
                  System &amp; Process Architecture
                </h3>
                <ol className={styles.archList}>
                  {project.architecture.map((step, idx) => (
                    <li key={step} className={styles.archItem}>
                      <span className={styles.archBullet}>{idx + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {/* 03: Capabilities & Tech Stack */}
              <section className={styles.sectionBlock} aria-label="Capabilities and Tooling">
                <h3 className={styles.blockHeading}>
                  <span className={styles.blockIndex}>03</span>
                  Capabilities &amp; Tooling
                </h3>
                <div className={styles.techStackWrap}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.techPill}>
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer Action Bar */}
            <footer className={styles.footerBar}>
              <div className={styles.ctaGroup}>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primaryCta}
                  >
                    <ExternalLink size={15} />
                    <span>Launch Live Platform</span>
                  </a>
                )}

                {project.relatedBlogSlug && (
                  <Link
                    href={`/blog/${project.relatedBlogSlug}`}
                    onClick={onClose}
                    className={project.liveUrl ? styles.secondaryCta : styles.primaryCta}
                  >
                    <BookOpen size={15} />
                    <span>Read Deep-Dive Essay &rarr;</span>
                  </Link>
                )}

                {!project.liveUrl && !project.relatedBlogSlug && (
                  <button
                    type="button"
                    onClick={handleDiscussArchitecture}
                    className={styles.primaryCta}
                  >
                    <MessageSquare size={15} />
                    <span>Discuss This Architecture</span>
                  </button>
                )}
              </div>

              {onSelectProject && (prevSlug || nextSlug) && (
                <div className={styles.navStepGroup}>
                  <button
                    type="button"
                    disabled={!prevSlug}
                    onClick={() => prevSlug && onSelectProject(prevSlug)}
                    className={styles.navStepBtn}
                    aria-label="Previous case study"
                    title="Previous case study"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    disabled={!nextSlug}
                    onClick={() => nextSlug && onSelectProject(nextSlug)}
                    className={styles.navStepBtn}
                    aria-label="Next case study"
                    title="Next case study"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </footer>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
