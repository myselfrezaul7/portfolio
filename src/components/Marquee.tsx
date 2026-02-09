'use client';

import { motion } from 'framer-motion';
import styles from './Marquee.module.css';

interface MarqueeProps {
    items: string[];
    speed?: number;
}

export default function Marquee({ items, speed = 30 }: MarqueeProps) {
    // Duplicate items for seamless loop
    const duplicatedItems = [...items, ...items];

    return (
        <div className={styles.marqueeContainer}>
            <motion.div
                className={styles.marqueeTrack}
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                    duration: speed,
                    ease: 'linear',
                    repeat: Infinity,
                }}
            >
                {duplicatedItems.map((item, index) => (
                    <span key={index} className={styles.marqueeItem}>
                        {item}
                        <span className={styles.separator}>•</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
