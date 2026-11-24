'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { useTilt } from '@/hooks/useTilt';
import styles from './Hero.module.css';

const SupplyChainCanvas = dynamic(() => import('./canvas/SupplyChainCanvas'), {
  ssr: false,
});

const PROFILE_BLUR_DATA_URL =
  'data:image/webp;base64,UklGRroAAABXRUJQVlA4IK4AAAAwBQCdASoUABsAPt1iq08opSQiKAqpEBuJYwDNwA/HHPuxvcUe4ZkVymlLYfqRH848gAD+cbDylKh6E6frigGgShN5MSC2GhLr9kAgCpb9B3s3naDbqzTxTyhLYymSX+Rc7wF/RGcfcEi6HEvc+d8c8mM8yk2ebb9uy4Gw4jxzUVlhidxXjzjGjHCx3ozTtQpzj1PO31NPEUNc9VDH0qM2LkghP5WB2IYyLX/pAAA=';

interface HeroProps {
  id?: string;
}

export default function Hero({ id = 'hero' }: HeroProps) {
  const { ref: portraitTiltRef, style: tiltStyle, handlers: tiltHandlers } = useTilt<HTMLDivElement>({
    maxDeg: 7,
    perspective: 1000,
    scale: 1.02,
    speed: 450,
  });

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', targetId);
      }
    }
  };

  const handleOpenBooking = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('portfolio:open-booking'));
    }
  };

  return (
    <section id={id} className={styles.hero} aria-label="Introduction">
      <SupplyChainCanvas />

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Eyebrow Greeting */}
          <div className={styles.greeting}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span className={styles.greetingText}>Hello, I am</span>
          </div>

          {/* Instant-LCP Headline */}
          <h1 className={styles.name}>Md Rezaul Karim</h1>

          {/* Role Positioning */}
          <h2 className={styles.title}>
            Data Analytics · Supply Chain Operations · IT Project Management
          </h2>

          {/* Executive Summary */}
          <p className={styles.description}>
            Master&apos;s student in International Management &amp; Information Systems (IMIS) in Germany. I bridge business operations and technology, transforming complex workflows into automated, data-driven systems using SAP, Power BI, and modern digital tools.
          </p>

          {/* Availability Badge */}
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, '#contact')}
            className={styles.availabilityBadge}
          >
            <span className={styles.statusDotWrapper} aria-hidden="true">
              <span className={styles.statusDotRipple} />
              <span className={styles.statusDot} />
            </span>
            <span className={styles.statusText}>
              Open to Working Student, Internship &amp; Master Thesis Roles · Selective Consulting
            </span>
          </a>

          {/* Clean Action Bar (Zero SSR mailto:) */}
          <div className={styles.actions}>
            <motion.a
              href="#work"
              onClick={(e) => handleSmoothScroll(e, '#work')}
              className={styles.primaryBtn}
              whileTap={{ scale: 0.97 }}
            >
              <span>View Selected Work</span>
              <ArrowRight size={16} className={styles.btnIcon} strokeWidth={2} />
            </motion.a>

            <motion.button
              type="button"
              onClick={handleOpenBooking}
              className={styles.secondaryBtn}
              whileTap={{ scale: 0.97 }}
            >
              <Calendar size={15} strokeWidth={1.8} />
              <span>Book Call</span>
            </motion.button>
          </div>
        </div>

        {/* Instant-LCP Portrait Stage with 120Hz Specular Tilt */}
        <div className={styles.imageWrapper}>
          <div className={styles.imageGlowBackdrop} aria-hidden="true" />

          <div
            ref={portraitTiltRef}
            style={tiltStyle}
            {...tiltHandlers}
            className={styles.portraitStage}
          >
            <div className={styles.imageContainer}>
              <Image
                src="/images/profile.webp"
                alt="Md Rezaul Karim, Data Analytics, Supply Chain & IT Project Management"
                fill
                priority
                quality={88}
                placeholder="blur"
                blurDataURL={PROFILE_BLUR_DATA_URL}
                sizes="(max-width: 768px) 176px, (max-width: 1024px) 300px, 340px"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
              <div className={styles.specularSheen} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Ambient Background Gradient */}
      <div className={styles.bgGradient} aria-hidden="true" />
    </section>
  );
}
