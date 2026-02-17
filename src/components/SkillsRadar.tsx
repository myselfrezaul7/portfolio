'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './animations/ScrollReveal';
import styles from './SkillsRadar.module.css';

const skills = [
    { name: 'Supply Chain', value: 65 },
    { name: 'Process Design', value: 65 },
    { name: 'Data Analytics', value: 60 },
    { name: 'Tech Integration', value: 70 },
    { name: 'Project Management', value: 60 },
    { name: 'Business Strategy', value: 55 },
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180;
    return {
        x: cx + r * Math.cos(angleRad),
        y: cy + r * Math.sin(angleRad),
    };
}

export default function SkillsRadar() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const cx = 150;
    const cy = 150;
    const maxR = 120;
    const levels = 4;
    const n = skills.length;
    const angleStep = 360 / n;

    const handleToggle = (index: number) => {
        setHoveredIndex(prev => prev === index ? null : index);
    };

    const radarPoints = skills
        .map((skill, i) => {
            const r = (skill.value / 100) * maxR;
            const pt = polarToCartesian(cx, cy, r, i * angleStep);
            return `${pt.x},${pt.y}`;
        })
        .join(' ');

    return (
        <section id="skills" className={styles.skills}>
            <div className={styles.container}>
                <ScrollReveal>
                    <div className={styles.header}>
                        <h2 className={styles.sectionTitle}>Skills & Expertise</h2>
                        <p className={styles.sectionDescription}>
                            Where I bring the most value, across operations, analytics, and technology.
                        </p>
                    </div>
                </ScrollReveal>

                <div className={styles.content}>
                    <ScrollReveal delay={0.1}>
                        <motion.div
                            className={styles.radarCard}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <svg viewBox="0 0 300 300" className={styles.radarSvg}>
                                {/* Grid levels */}
                                {Array.from({ length: levels }).map((_, level) => {
                                    const r = ((level + 1) / levels) * maxR;
                                    const points = Array.from({ length: n })
                                        .map((_, i) => {
                                            const pt = polarToCartesian(cx, cy, r, i * angleStep);
                                            return `${pt.x},${pt.y}`;
                                        })
                                        .join(' ');
                                    return (
                                        <polygon
                                            key={level}
                                            points={points}
                                            className={styles.gridLevel}
                                        />
                                    );
                                })}

                                {/* Axis lines */}
                                {skills.map((_, i) => {
                                    const pt = polarToCartesian(cx, cy, maxR, i * angleStep);
                                    return (
                                        <line
                                            key={i}
                                            x1={cx}
                                            y1={cy}
                                            x2={pt.x}
                                            y2={pt.y}
                                            className={styles.axisLine}
                                        />
                                    );
                                })}

                                {/* Data polygon */}
                                <motion.polygon
                                    points={radarPoints}
                                    className={styles.dataPolygon}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                />

                                {/* Data points + labels */}
                                {skills.map((skill, i) => {
                                    const r = (skill.value / 100) * maxR;
                                    const pt = polarToCartesian(cx, cy, r, i * angleStep);
                                    const labelPt = polarToCartesian(cx, cy, maxR + 24, i * angleStep);
                                    const isHovered = hoveredIndex === i;

                                    return (
                                        <g
                                            key={skill.name}
                                            onClick={() => handleToggle(i)}
                                            onMouseEnter={() => setHoveredIndex(i)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <circle
                                                cx={pt.x}
                                                cy={pt.y}
                                                r={isHovered ? 6 : 4}
                                                className={`${styles.dataPoint} ${isHovered ? styles.dataPointHovered : ''}`}
                                            />
                                            <text
                                                x={labelPt.x}
                                                y={labelPt.y}
                                                textAnchor="middle"
                                                dominantBaseline="central"
                                                className={`${styles.label} ${isHovered ? styles.labelHovered : ''}`}
                                            >
                                                {skill.name}
                                            </text>
                                            {isHovered && (
                                                <text
                                                    x={pt.x}
                                                    y={pt.y - 14}
                                                    textAnchor="middle"
                                                    className={styles.valueTooltip}
                                                >
                                                    {skill.value}%
                                                </text>
                                            )}
                                        </g>
                                    );
                                })}
                            </svg>
                        </motion.div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <div className={styles.skillsList}>
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    className={`${styles.skillBar} ${hoveredIndex === index ? styles.skillBarHovered : ''}`}
                                    onClick={() => handleToggle(index)}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <div className={styles.skillInfo}>
                                        <span className={styles.skillName}>{skill.name}</span>
                                        <span className={styles.skillValue}>{skill.value}%</span>
                                    </div>
                                    <div className={styles.progressTrack}>
                                        <motion.div
                                            className={styles.progressFill}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.value}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
