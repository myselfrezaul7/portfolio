'use client';

import styles from './Marquee.module.css';

interface MarqueeProps {
    items: string[];
    speed?: number;
}

export default function Marquee({ items, speed = 35 }: MarqueeProps) {
    // Duplicate items for seamless loop
    const duplicatedItems = [...items, ...items];

    return (
        <div
            className={styles.marqueeContainer}
            style={{ '--speed': `${speed}s` } as React.CSSProperties}
            aria-label="Skill highlights ticker"
        >
            <div className={styles.marqueeTrack}>
                {duplicatedItems.map((item, index) => (
                    <span key={index} className={styles.marqueeItem}>
                        {item}
                        <span className={styles.separator}>•</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
