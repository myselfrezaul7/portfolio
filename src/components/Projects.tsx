'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, ExternalLink, Images } from 'lucide-react';
import {
  PROJECTS,
  PROJECT_DOMAIN_LENSES,
  type ProjectCaseStudy,
  type ProjectDomainLens,
  getProjectBySlug,
} from '@/data/projects';
import { useTilt } from '@/hooks/useTilt';
import { useMobileCarousel } from '@/hooks/useMobileCarousel';
import ScrollReveal from './animations/ScrollReveal';
import MobileCarouselControls from './ui/MobileCarouselControls';
import ProjectArchitectureVisual from './ProjectArchitectureVisual';
import ProjectCaseStudyDrawer from './ProjectCaseStudyDrawer';
import styles from './Projects.module.css';

interface ProjectCardProps {
  project: ProjectCaseStudy;
  isLoaded: boolean;
  onImageLoad: (id: number) => void;
  onOpen: (slug: string) => void;
}

function ProjectCard({ project, isLoaded, onImageLoad, onOpen }: ProjectCardProps) {
  const { ref, style, handlers } = useTilt<HTMLDivElement>({
    maxDeg: 3,
    perspective: 1000,
    scale: 1.01,
    speed: 380,
  });

  const handleCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen(project.slug);
    }
  };

  const displayBadges = (project.platformBadges ?? project.tags.slice(0, 3)).filter(
    (badge) => badge !== project.projectNature
  );

  return (
    <div
      ref={ref}
      style={style}
      role="button"
      tabIndex={0}
      aria-label={`Explore case study: ${project.title}`}
      className={styles.projectCard}
      {...handlers}
      onClick={() => onOpen(project.slug)}
      onKeyDown={handleCardKeyDown}
    >
      {/* Card Visual Frame */}
      <div className={styles.imageWrapper}>
        {project.diagramType ? (
          <ProjectArchitectureVisual type={project.diagramType} variant="card" />
        ) : (
          <>
            {!isLoaded && <div className={styles.imageSkeleton} aria-hidden="true" />}
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className={`${styles.projectImage} ${
                isLoaded ? styles.imageLoaded : styles.imageLoading
              }`}
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
              sizes="(max-width: 767px) 86vw, (max-width: 1119px) 48vw, 33vw"
              placeholder={project.blurDataURL ? 'blur' : 'empty'}
              blurDataURL={project.blurDataURL}
              onLoad={() => onImageLoad(project.id)}
            />
          </>
        )}

        <div className={styles.visualBadgesTop}>
          <span className={styles.category}>{project.category}</span>
          <span className={styles.metricBadge}>{project.headlineMetric}</span>
        </div>

        {!project.diagramType && project.gallery.length > 1 && (
          <span className={styles.galleryCountPill}>
            <Images size={11} />
            {project.gallery.length} Visuals
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className={styles.content}>
        <div className={styles.cardMetaRow}>
          <span className={styles.cardRole}>{project.role}</span>
          <span className={styles.cardPeriod}>{project.period}</span>
        </div>

        {project.projectNature && (
          <div className={styles.natureRow}>
            <span className={styles.natureBadge}>
              <span className={styles.natureDot} aria-hidden="true" />
              <span>{project.projectNature}</span>
            </span>
          </div>
        )}

        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDescription}>{project.shortDescription}</p>

        <div className={styles.platformRow}>
          {displayBadges.map((badge) => (
            <span key={badge} className={styles.tag}>
              {badge}
            </span>
          ))}
        </div>

        <div className={styles.cardFooter}>
          <span className={styles.exploreBtn}>
            Explore Case Study
            <ArrowRight size={15} aria-hidden="true" />
          </span>

          <div className={styles.quickActions}>
            {project.relatedBlogSlug && (
              <Link
                href={`/blog/${project.relatedBlogSlug}`}
                className={styles.quickActionLink}
                aria-label={`Read essay for ${project.title}`}
                title="Read deep-dive essay"
                onClick={(e) => e.stopPropagation()}
              >
                <BookOpen size={14} />
              </Link>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.quickActionLink}
                aria-label={`Launch ${project.title} live platform`}
                title="Launch live platform"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeLens, setActiveLens] = useState<ProjectDomainLens>('All');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(max-width: 767px)');
    const syncViewport = () => setIsMobileViewport(mq.matches);
    syncViewport();
    mq.addEventListener('change', syncViewport);
    return () => mq.removeEventListener('change', syncViewport);
  }, []);

  const syncQueryParam = useCallback((slug: string | null) => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (slug) {
      url.searchParams.set('project', slug);
    } else {
      url.searchParams.delete('project');
    }
    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    window.history.replaceState(null, '', nextUrl);
  }, []);

  const openProject = useCallback(
    (slug: string) => {
      if (!getProjectBySlug(slug)) return;
      setSelectedSlug(slug);
      syncQueryParam(slug);
    },
    [syncQueryParam]
  );

  const closeProject = useCallback(() => {
    setSelectedSlug(null);
    syncQueryParam(null);
  }, [syncQueryParam]);

  // Read `?project=<slug>` on mount & subscribe to cross-component custom events
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const rafId = window.requestAnimationFrame(() => {
      const initialSlug = new URLSearchParams(window.location.search).get('project');
      if (initialSlug && getProjectBySlug(initialSlug)) {
        setSelectedSlug(initialSlug);
      }
    });

    const handleOpenEvent = (event: Event) => {
      const detail = (event as CustomEvent<{ slug?: string }>).detail;
      if (detail?.slug && getProjectBySlug(detail.slug)) {
        openProject(detail.slug);
      }
    };

    const handleFilterEvent = (event: Event) => {
      const detail = (event as CustomEvent<{ lens?: string }>).detail;
      if (
        detail?.lens &&
        (PROJECT_DOMAIN_LENSES as readonly string[]).includes(detail.lens)
      ) {
        setActiveLens(detail.lens as ProjectDomainLens);
      }
    };

    window.addEventListener('portfolio:open-project', handleOpenEvent);
    window.addEventListener('portfolio:filter-projects', handleFilterEvent);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('portfolio:open-project', handleOpenEvent);
      window.removeEventListener('portfolio:filter-projects', handleFilterEvent);
    };
  }, [openProject]);

  const handleImageLoad = useCallback((id: number) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeLens === 'All') return PROJECTS;
    return PROJECTS.filter((project) => project.domainLenses.includes(activeLens));
  }, [activeLens]);

  const {
    trackRef,
    activeIndex,
    canScrollPrev,
    canScrollNext,
    scrollToIndex,
    step,
  } = useMobileCarousel({
    itemCount: filteredProjects.length,
    resetKey: activeLens,
  });

  const selectedProject = useMemo(
    () => (selectedSlug ? getProjectBySlug(selectedSlug) ?? null : null),
    [selectedSlug]
  );

  const { prevSlug, nextSlug } = useMemo(() => {
    if (!selectedSlug) return { prevSlug: null, nextSlug: null };
    const list = filteredProjects.some((p) => p.slug === selectedSlug)
      ? filteredProjects
      : PROJECTS;
    const idx = list.findIndex((p) => p.slug === selectedSlug);
    if (idx === -1) return { prevSlug: null, nextSlug: null };
    return {
      prevSlug: idx > 0 ? list[idx - 1].slug : null,
      nextSlug: idx < list.length - 1 ? list[idx + 1].slug : null,
    };
  }, [filteredProjects, selectedSlug]);

  return (
    <section id="work" className={styles.projects} aria-label="Selected projects and case studies">
      <div className={styles.container}>
        <ScrollReveal>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Case Studies &amp; Architecture</span>
            <h2 className={styles.sectionTitle}>Selected Work</h2>
            <p className={styles.sectionSubtitle}>
              From SAP BW/4HANA data warehousing and clinical process redesign to bilingual web &amp; Android ecosystems. Select any card to inspect the challenge, architecture, and measured outcomes.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Multi-Hit Domain Lenses */}
        <div
          className={styles.filterBar}
          role="group"
          aria-label="Filter projects by domain lens"
        >
          {PROJECT_DOMAIN_LENSES.map((lens) => {
            const count =
              lens === 'All'
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.domainLenses.includes(lens)).length;
            const isActive = activeLens === lens;

            return (
              <motion.button
                key={lens}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveLens(lens)}
                className={`${styles.filterChip} ${
                  isActive ? styles.filterChipActive : ''
                }`}
                whileTap={{ scale: 0.96 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeProjectLensPill"
                    className={styles.activePill}
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className={styles.chipText}>
                  {lens}
                  <span className={styles.chipCount}>{count}</span>
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Projects Grid / Mobile Horizontal Scroll-Snap Carousel */}
        <div
          ref={trackRef}
          className={styles.projectsGrid}
          data-count={filteredProjects.length}
        >
          {isMobileViewport ? (
            filteredProjects.map((project) => (
              <div key={project.slug} className={styles.gridItem}>
                <ProjectCard
                  project={project}
                  isLoaded={!!loadedImages[project.id]}
                  onImageLoad={handleImageLoad}
                  onOpen={openProject}
                />
              </div>
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.slug}
                  className={styles.gridItem}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard
                    project={project}
                    isLoaded={!!loadedImages[project.id]}
                    onImageLoad={handleImageLoad}
                    onOpen={openProject}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        <MobileCarouselControls
          count={filteredProjects.length}
          activeIndex={activeIndex}
          canScrollPrev={canScrollPrev}
          canScrollNext={canScrollNext}
          onSelect={scrollToIndex}
          onStep={step}
          label="project"
        />
      </div>

      {/* Interactive Case Study Deep-Dive Drawer */}
      <ProjectCaseStudyDrawer
        project={selectedProject}
        onClose={closeProject}
        onSelectProject={openProject}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
      />
    </section>
  );
}
