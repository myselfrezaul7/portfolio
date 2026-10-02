'use client';

import { useCallback, useRef } from 'react';

interface TiltConfig {
  maxDeg?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
}

export function useTilt(config: TiltConfig = {}) {
  const {
    maxDeg = 6,
    perspective = 800,
    scale = 1.02,
    speed = 400,
  } = config;

  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    // Skip on touch/coarse pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * maxDeg;
      const rotateX = ((centerY - y) / centerY) * maxDeg;

      // Glare position (percentage from top-left)
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
      el.style.setProperty('--glare-x', `${glareX}%`);
      el.style.setProperty('--glare-y', `${glareY}%`);
      el.style.setProperty('--glare-opacity', '1');
    });
  }, [maxDeg, perspective, scale]);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    el.style.transform = '';
    el.style.setProperty('--glare-opacity', '0');
  }, []);

  return { ref, handleMove, handleLeave };
}
