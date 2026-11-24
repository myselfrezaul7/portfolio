'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

export interface UseMobileCarouselOptions {
  itemCount: number;
  resetKey?: string | number;
}

export interface UseMobileCarouselResult {
  trackRef: RefObject<HTMLDivElement | null>;
  activeIndex: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollToIndex: (index: number) => void;
  step: (delta: -1 | 1) => void;
}

interface CarouselMetrics {
  activeIndex: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

const SCROLL_EDGE_THRESHOLD = 4;

function getVisibleSlides(track: HTMLElement): HTMLElement[] {
  return Array.from(track.children).filter((child): child is HTMLElement => {
    if (!(child instanceof HTMLElement)) return false;
    if (child.hidden) return false;
    return child.offsetWidth > 0 || child.offsetHeight > 0;
  });
}

export function useMobileCarousel(
  options: UseMobileCarouselOptions
): UseMobileCarouselResult {
  const { itemCount, resetKey } = options;

  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const initialMetrics: CarouselMetrics = {
    activeIndex: 0,
    canScrollPrev: false,
    canScrollNext: itemCount > 1,
  };

  const [metrics, setMetrics] = useState<CarouselMetrics>(initialMetrics);
  const metricsRef = useRef<CarouselMetrics>(initialMetrics);

  const commitMetrics = useCallback((next: CarouselMetrics) => {
    const prev = metricsRef.current;
    if (
      prev.activeIndex === next.activeIndex &&
      prev.canScrollPrev === next.canScrollPrev &&
      prev.canScrollNext === next.canScrollNext
    ) {
      return;
    }
    metricsRef.current = next;
    setMetrics(next);
  }, []);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track || itemCount <= 1) {
      commitMetrics({
        activeIndex: 0,
        canScrollPrev: false,
        canScrollNext: false,
      });
      return;
    }

    const slides = getVisibleSlides(track);
    const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);
    const scrollLeft = track.scrollLeft;

    const nextCanScrollPrev = scrollLeft > SCROLL_EDGE_THRESHOLD;
    const nextCanScrollNext = scrollLeft < maxScrollLeft - SCROLL_EDGE_THRESHOLD;

    if (slides.length === 0 || maxScrollLeft <= SCROLL_EDGE_THRESHOLD) {
      commitMetrics({
        activeIndex: 0,
        canScrollPrev: false,
        canScrollNext: false,
      });
      return;
    }

    const slideCount = Math.min(slides.length, itemCount);
    let nextActiveIndex = 0;

    if (!nextCanScrollNext) {
      nextActiveIndex = slideCount - 1;
    } else if (!nextCanScrollPrev) {
      nextActiveIndex = 0;
    } else {
      const firstChildOffset = slides[0].offsetLeft;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      for (let i = 0; i < slideCount; i += 1) {
        const slideTargetLeft = Math.min(
          Math.max(0, slides[i].offsetLeft - firstChildOffset),
          maxScrollLeft
        );
        const distance = Math.abs(slideTargetLeft - scrollLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }

      nextActiveIndex = closestIndex;
    }

    commitMetrics({
      activeIndex: Math.max(0, Math.min(nextActiveIndex, itemCount - 1)),
      canScrollPrev: nextCanScrollPrev,
      canScrollNext: nextCanScrollNext,
    });
  }, [commitMetrics, itemCount]);

  const scheduleMeasure = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (rafIdRef.current !== null) return;
    rafIdRef.current = window.requestAnimationFrame(() => {
      rafIdRef.current = null;
      measure();
    });
  }, [measure]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      scheduleMeasure();
    };

    track.addEventListener('scroll', handleScroll, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        scheduleMeasure();
      });
      resizeObserver.observe(track);
    }

    scheduleMeasure();

    return () => {
      track.removeEventListener('scroll', handleScroll);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (rafIdRef.current !== null && typeof window !== 'undefined') {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [itemCount, scheduleMeasure]);

  useEffect(() => {
    const track = trackRef.current;
    if (track && track.scrollLeft !== 0) {
      track.scrollTo({ left: 0, behavior: 'auto' });
    }
    scheduleMeasure();
  }, [itemCount, resetKey, scheduleMeasure]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track || itemCount <= 0) return;

      const clampedIndex = Math.max(0, Math.min(index, itemCount - 1));
      const slides = getVisibleSlides(track);
      if (slides.length === 0) return;

      const targetSlide = slides[Math.min(clampedIndex, slides.length - 1)];
      if (!targetSlide) return;

      const firstChildOffset = slides[0].offsetLeft;
      const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);
      const targetLeft = Math.min(
        Math.max(0, targetSlide.offsetLeft - firstChildOffset),
        maxScrollLeft
      );

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      track.scrollTo({
        left: targetLeft,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    },
    [itemCount]
  );

  const step = useCallback(
    (delta: -1 | 1) => {
      scrollToIndex(metricsRef.current.activeIndex + delta);
    },
    [scrollToIndex]
  );

  const safeActiveIndex =
    itemCount > 0 ? Math.min(metrics.activeIndex, itemCount - 1) : 0;

  return {
    trackRef,
    activeIndex: safeActiveIndex,
    canScrollPrev: metrics.canScrollPrev,
    canScrollNext: metrics.canScrollNext,
    scrollToIndex,
    step,
  };
}
