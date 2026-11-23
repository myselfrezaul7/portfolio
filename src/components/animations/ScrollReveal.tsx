'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.55,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: '0px 0px -36px 0px' });

  const directions = {
    up: { y: 28 },
    down: { y: -28 },
    left: { x: 28 },
    right: { x: -28 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              ...directions[direction],
            }
      }
      animate={
        shouldReduceMotion
          ? { opacity: 1 }
          : isInView
            ? {
                opacity: 1,
                x: 0,
                y: 0,
              }
            : {}
      }
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }
      }
    >
      {children}
    </motion.div>
  );
}
