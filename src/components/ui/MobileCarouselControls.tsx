'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './MobileCarouselControls.module.css';

export interface MobileCarouselControlsProps {
  count: number;
  activeIndex: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onSelect: (index: number) => void;
  onStep: (delta: -1 | 1) => void;
  label?: string;
  compact?: boolean;
}

function formatCounter(value: number): string {
  return String(value).padStart(2, '0');
}

export function MobileCarouselControls({
  count,
  activeIndex,
  canScrollPrev,
  canScrollNext,
  onSelect,
  onStep,
  label,
  compact = false,
}: MobileCarouselControlsProps) {
  if (count <= 1) {
    return null;
  }

  const itemLabel = label?.trim() || 'slide';
  const clampedActiveIndex = Math.max(0, Math.min(activeIndex, count - 1));
  const currentText = formatCounter(clampedActiveIndex + 1);
  const totalText = formatCounter(count);

  return (
    <div
      className={`${styles.controls} ${compact ? styles.compact : ''}`}
      role="group"
      aria-label={`${itemLabel} carousel navigation`}
    >
      <div className={styles.dots}>
        {Array.from({ length: count }, (_, index) => {
          const isActive = index === clampedActiveIndex;
          return (
            <button
              key={index}
              type="button"
              className={`${styles.dotButton} ${isActive ? styles.dotButtonActive : ''}`}
              onClick={() => onSelect(index)}
              aria-label={`Go to ${itemLabel} ${index + 1} of ${count}`}
              aria-current={isActive ? 'true' : undefined}
            >
              <span className={styles.dot} aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <div className={styles.metaControls}>
        <span className={styles.counter} aria-live="polite" aria-atomic="true">
          <span className={styles.counterCurrent}>{currentText}</span>
          <span className={styles.counterDivider} aria-hidden="true">
            /
          </span>
          <span className={styles.counterTotal}>{totalText}</span>
        </span>

        <div className={styles.navGroup}>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => onStep(-1)}
            disabled={!canScrollPrev}
            aria-label={`Previous ${itemLabel}`}
          >
            <ChevronLeft size={15} strokeWidth={2.2} aria-hidden="true" />
          </button>

          <button
            type="button"
            className={`${styles.navButton} ${styles.nextButton} ${
              canScrollNext ? styles.nextButtonActive : ''
            }`}
            onClick={() => onStep(1)}
            disabled={!canScrollNext}
            aria-label={`Next ${itemLabel}`}
          >
            <span className={styles.moreCue} aria-hidden="true">
              More
            </span>
            <ChevronRight
              size={15}
              strokeWidth={2.2}
              className={styles.nextChevron}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileCarouselControls;
