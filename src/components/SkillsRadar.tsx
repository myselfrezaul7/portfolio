'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './animations/ScrollReveal';
import styles from './SkillsRadar.module.css';

const skills = [
    { name: 'Supply Chain Optimization', value: 85 },
    { name: 'Data Analytics', value: 80 },
    { name: 'Process Design', value: 90 },
    { name: 'Tech Integration', value: 75 },
    { name: 'Project Management', value: 85 },
    { name: 'Business Strategy', value: 70 },
];

const skillCategories = [
    {
        title: 'Operations',
        skills: [
            { name: 'Supply Chain Optimization', level: 4 },
            { name: 'Process Design (BPMN 2.0)', level: 4 },
            { name: 'Project Management', level: 3 },
            { name: 'Lean Management', level: 3 },
        ]
    },
    {
        title: 'Technology & Data',
        skills: [
            { name: 'Data Analytics', level: 4 },
            { name: 'Tech Integration', level: 4 },
            { name: 'SAP Signavio / B/W', level: 3 },
            { name: 'Power BI / SQL', level: 3 },
        ]
    }
];

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    };
};

export default function SkillsRadar() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const cx = 150;
    const cy = 150;
    const maxR = 100;
    const n = skills.length;
    const angleStep = 360 / n;
    const levels = 5;

    const radarPoints = skills
        .map((skill, i) => {
            const r = (skill.value / 100) * maxR;
            const pt = polarToCartesian(cx, cy, r, i * angleStep);
            return `${pt.x},${pt.y}`;
        })
        .join(' ');

    const handleToggle = (index: number) => {
        setHoveredIndex(hoveredIndex === index ? null : index);
    };

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

                <ScrollReveal delay={0.1}>
                    <div className={styles.radarWrapper}>
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
                    </div>
                </ScrollReveal>

                <div className={styles.scrollStrip}>
                    {skillCategories.map((category, catIdx) => (
                        <div key={category.title} className={styles.snapItem}>
                            <div className={styles.categoryGroup}>
                                <h3 className={styles.categoryTitle}>{category.title}</h3>
                                <div className={styles.chipsContainer}>
                                    {category.skills.map((skill, index) => (
                                        <motion.div
                                            key={skill.name}
                                            className={styles.skillChip}
                                            whileHover={{ y: -2 }}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: (catIdx * 0.1) + (index * 0.05) }}
                                        >
                                            <span className={styles.skillName}>{skill.name}</span>
                                            <div className={styles.dotMeter}>
                                                {[1, 2, 3, 4, 5].map((dot) => (
                                                    <span 
                                                        key={dot} 
                                                        className={`${styles.dot} ${dot <= skill.level ? styles.dotFilled : ''}`}
                                                    />
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
