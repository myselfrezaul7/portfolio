'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';

export interface TiltConfig {
  maxDeg?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
}

export function useTilt<T extends HTMLElement = HTMLDivElement>(config: TiltConfig = {}) {
  const {
    maxDeg = 6,
    perspective = 900,
    scale = 1.02,
    speed = 420,
  } = config;

  const ref = useRef<T>(null);
  const rafRef = useRef<number | null>(null);

  const isInteractionDisabled = useCallback(() => {
    if (typeof window === 'undefined') return true;
    return (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  const handleEnter = useCallback(() => {
    const el = ref.current;
    if (!el || isInteractionDisabled()) return;
    el.style.transition = `transform ${Math.min(120, Math.round(speed * 0.25))}ms cubic-bezier(0.22, 1, 0.36, 1)`;
  }, [isInteractionDisabled, speed]);

  const handleMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el || isInteractionDisabled()) return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
        const y = Math.min(Math.max(clientY - rect.top, 0), rect.height);
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * maxDeg;
        const rotateX = ((centerY - y) / centerY) * maxDeg;

        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;

        el.style.transition = 'transform 75ms cubic-bezier(0.22, 1, 0.36, 1)';
        el.style.transform = `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
        el.style.setProperty('--glare-x', `${glareX.toFixed(1)}%`);
        el.style.setProperty('--glare-y', `${glareY.toFixed(1)}%`);
        el.style.setProperty('--glare-opacity', '1');
      });
    },
    [isInteractionDisabled, maxDeg, perspective, scale]
  );

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    el.style.transition = `transform ${speed}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    el.style.setProperty('--glare-opacity', '0');
  }, [perspective, speed]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handlers = useMemo(
    () => ({
      onMouseEnter: handleEnter,
      onMouseMove: handleMove,
      onMouseLeave: handleLeave,
    }),
    [handleEnter, handleMove, handleLeave]
  );

  const style = useMemo(
    () => ({
      willChange: 'transform',
      transformStyle: 'preserve-3d' as const,
    }),
    []
  );

  return { ref, style, handlers, handleEnter, handleMove, handleLeave };
}
