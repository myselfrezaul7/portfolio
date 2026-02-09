'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    {/* Greeting */}
                    <motion.div
                        className={styles.greeting}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className={styles.emoji}>👋</span>
                        <span className={styles.greetingText}>Hello, I'm</span>
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        className={styles.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        Karim
                    </motion.h1>

                    {/* Title */}
                    <motion.h2
                        className={styles.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                    >
                        Business Strategist<br />
                        <span className={styles.titleAccent}>&</span> Technical Executor
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        className={styles.description}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        I help organizations optimize operations by bridging business strategy
                        with technical execution using SAP, BPMN, and data-driven insights.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className={styles.actions}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                    >
                        <a href="mailto:myselfrezaul@gmail.com" className={styles.primaryBtn}>
                            Get in Touch
                        </a>
                        <a href="#work" className={styles.secondaryBtn}>
                            View My Work
                        </a>
                    </motion.div>
                </div>

                {/* Profile Image */}
                <motion.div
                    className={styles.imageWrapper}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <div className={styles.imageContainer}>
                        <Image
                            src="/images/profile.jpg"
                            alt="Md Rezaul Karim"
                            fill
                            priority
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
