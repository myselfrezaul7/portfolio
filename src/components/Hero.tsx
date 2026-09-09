'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero} aria-label="Hero">
            <div className={styles.container}>
                <div className={styles.content}>
                    {/* Greeting */}
                    <motion.div
                        className={styles.greeting}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className={styles.emoji}>👋</span>
                        <span className={styles.greetingText}>Hello, I am</span>
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        className={styles.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Md Rezaul Karim
                    </motion.h1>

                    {/* Title */}
                    <motion.h2
                        className={styles.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Data Analytics · Supply Chain Operations · IT Project Management
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        className={styles.description}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Master&apos;s student in International Management & Information Systems (IMIS) in Germany. I bridge business operations and technology, transforming complex workflows into automated, data-driven systems using SAP, Power BI, and modern digital tools.
                    </motion.p>

                    {/* Availability Badge */}
                    <motion.div
                        className={styles.availabilityBadge}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className={styles.statusDotWrapper}>
                            <span className={styles.statusDotRipple} />
                            <span className={styles.statusDot} />
                        </span>
                        <span className={styles.statusText}>Available for Internship, Working Student & Master Thesis Roles</span>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        className={styles.actions}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.a 
                            href="mailto:myselfrezaul@gmail.com" 
                            className={styles.primaryBtn}
                            whileTap={{ scale: 0.96 }}
                        >
                            <span>Get in Touch</span>
                            <ArrowRight size={16} className={styles.btnIcon} strokeWidth={2} />
                        </motion.a>
                        <motion.a 
                            href="#work" 
                            className={styles.secondaryBtn}
                            whileTap={{ scale: 0.96 }}
                        >
                            View My Work
                        </motion.a>
                    </motion.div>
                </div>

                {/* Profile Image */}
                <motion.div
                    className={styles.imageWrapper}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className={styles.imageGlowBackdrop} aria-hidden="true" />
                    <div className={styles.imageContainer}>
                        <Image
                            src="/images/profile.jpg"
                            alt="Md Rezaul Karim"
                            fill
                            priority
                            sizes="(max-width: 768px) 200px, (max-width: 1024px) 300px, 340px"
                            style={{ objectFit: 'cover', objectPosition: 'center top' }}
                        />
                        <div className={styles.imageGlow} />
                    </div>
                </motion.div>
            </div>

            {/* Background Elements */}
            <div className={styles.bgGradient} />
        </section>
    );
}
