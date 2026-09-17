import styles from './Marquee.module.css';

interface MarqueeProps {
    items: string[];
    speed?: number;
}

export default function Marquee({ items, speed = 35 }: MarqueeProps) {
    return (
        <div
            className={styles.marqueeContainer}
            style={{ '--speed': `${speed}s` } as React.CSSProperties}
            aria-label="Skill highlights ticker"
        >
            <div className={styles.marqueeTrack}>
                {items.map((item, index) => (
                    <span key={`item-${index}`} className={styles.marqueeItem}>
                        {item}
                        <span className={styles.separator}>•</span>
                    </span>
                ))}
                {items.map((item, index) => (
                    <span key={`dup-${index}`} className={styles.marqueeItem} aria-hidden="true">
                        {item}
                        <span className={styles.separator}>•</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
