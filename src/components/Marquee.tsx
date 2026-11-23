'use client';

import { useEffect, useRef } from 'react';
import styles from './Marquee.module.css';

interface MarqueeProps {
  items: string[];
  speed?: number;
}

type DomainLensTarget =
  | { type: 'filter'; lens: 'Process & Agile PMO' | 'Data & SAP BI' | 'Platforms & Ecosystems' }
  | { type: 'skills' };

const ITEM_TARGETS: Record<string, DomainLensTarget> = {
  'Supply Chain Optimization': { type: 'filter', lens: 'Process & Agile PMO' },
  'SAP Signavio': { type: 'filter', lens: 'Process & Agile PMO' },
  'BPMN 2.0': { type: 'filter', lens: 'Process & Agile PMO' },
  'PPT Framework': { type: 'filter', lens: 'Process & Agile PMO' },
  'Agile Product Management': { type: 'filter', lens: 'Process & Agile PMO' },
  'Jira & Confluence': { type: 'filter', lens: 'Process & Agile PMO' },
  'Process Analytics': { type: 'filter', lens: 'Data & SAP BI' },
  'SAP BW/4HANA': { type: 'filter', lens: 'Data & SAP BI' },
  'Power BI': { type: 'filter', lens: 'Data & SAP BI' },
  KNIME: { type: 'filter', lens: 'Data & SAP BI' },
  'ETL Data Pipelines': { type: 'filter', lens: 'Data & SAP BI' },
  'KPI Tracking': { type: 'filter', lens: 'Data & SAP BI' },
  'Digital Transformation': { type: 'filter', lens: 'Platforms & Ecosystems' },
  'AI-Assisted Workflows': { type: 'skills' },
  'Prompt Engineering': { type: 'skills' },
};

export default function Marquee({ items, speed = 30 }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);

  const isDeceleratedRef = useRef(false);

  // Silky rAF marquee with smooth hover deceleration (no abrupt freeze) & reduced-motion guard
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const firstGroup = firstGroupRef.current;
    if (!container || !track || !firstGroup) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionQuery.matches;
    let isVisible = true;
    let rafId: number | null = null;
    let lastTime = 0;
    let offsetPx = 0;
    let velocityFactor = 1.0;

    const tick = (now: number) => {
      if (reducedMotion || !isVisible) {
        rafId = null;
        return;
      }

      const dt = lastTime > 0 ? Math.min((now - lastTime) / 1000, 0.1) : 1 / 60;
      lastTime = now;

      const copyWidth = firstGroup.offsetWidth;
      if (copyWidth > 0) {
        const targetFactor = isDeceleratedRef.current ? 0.18 : 1.0;
        const smoothLerp = 1 - Math.exp(-5.5 * dt);
        velocityFactor += (targetFactor - velocityFactor) * smoothLerp;

        const basePxPerSec = copyWidth / Math.max(speed, 10);
        offsetPx += basePxPerSec * velocityFactor * dt;
        if (offsetPx >= copyWidth) {
          offsetPx -= copyWidth;
        }
        track.style.transform = `translate3d(${-offsetPx.toFixed(2)}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reducedMotion || !isVisible || rafId !== null) return;
      lastTime = 0;
      rafId = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
      if (reducedMotion) {
        stop();
        track.style.transform = '';
      } else {
        start();
      }
    };
    motionQuery.addEventListener('change', handleMotionChange);

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? false;
        if (isVisible && !reducedMotion) {
          start();
        } else {
          stop();
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    if (!reducedMotion) {
      start();
    }

    return () => {
      stop();
      observer.disconnect();
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, [speed, items]);

  const handlePillClick = (item: string) => {
    const target = ITEM_TARGETS[item] ?? { type: 'skills' };
    if (target.type === 'filter') {
      window.dispatchEvent(
        new CustomEvent('portfolio:filter-projects', { detail: { lens: target.lens } })
      );
      const workEl = document.getElementById('work');
      workEl?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const skillsEl = document.getElementById('skills');
      skillsEl?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getPillTitle = (item: string) => {
    const target = ITEM_TARGETS[item];
    if (target?.type === 'filter') {
      return `Filter projects by ${target.lens}`;
    }
    return 'Jump to Skills Matrix';
  };

  return (
    <div
      ref={containerRef}
      className={styles.marqueeContainer}
      aria-label="Interactive skill and domain highlights"
      onMouseEnter={() => {
        isDeceleratedRef.current = true;
      }}
      onMouseLeave={() => {
        isDeceleratedRef.current = false;
      }}
      onFocus={() => {
        isDeceleratedRef.current = true;
      }}
      onBlur={() => {
        isDeceleratedRef.current = false;
      }}
    >
      <div ref={trackRef} className={styles.marqueeTrack}>
        {/* Copy 1 (Interactive & Keyboard Focusable) */}
        <div ref={firstGroupRef} className={styles.marqueeGroup}>
          {items.map((item, index) => (
            <span key={`c0-${index}`} className={styles.marqueeItemWrap}>
              <button
                type="button"
                className={styles.marqueePill}
                onClick={() => handlePillClick(item)}
                title={getPillTitle(item)}
              >
                {item}
              </button>
              <span className={styles.separator} aria-hidden="true">•</span>
            </span>
          ))}
        </div>

        {/* Copy 2 (Seamless Loop) */}
        <div className={`${styles.marqueeGroup} ${styles.duplicateGroup}`} aria-hidden="true">
          {items.map((item, index) => (
            <span key={`c1-${index}`} className={styles.marqueeItemWrap}>
              <button
                type="button"
                tabIndex={-1}
                className={styles.marqueePill}
                onClick={() => handlePillClick(item)}
                title={getPillTitle(item)}
              >
                {item}
              </button>
              <span className={styles.separator}>•</span>
            </span>
          ))}
        </div>

        {/* Copy 3 (Ultrawide Display Coverage) */}
        <div className={`${styles.marqueeGroup} ${styles.duplicateGroup}`} aria-hidden="true">
          {items.map((item, index) => (
            <span key={`c2-${index}`} className={styles.marqueeItemWrap}>
              <button
                type="button"
                tabIndex={-1}
                className={styles.marqueePill}
                onClick={() => handlePillClick(item)}
                title={getPillTitle(item)}
              >
                {item}
              </button>
              <span className={styles.separator}>•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
