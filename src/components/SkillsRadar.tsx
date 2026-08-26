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
        title: 'Product & Process Management',
        skills: [
            { name: 'Agile Product Management', level: 4 },
            { name: 'PPT Framework', level: 4 },
            { name: 'SAP Signavio', level: 4 },
            { name: 'BPMN 2.0', level: 4 },
            { name: 'Jira & Confluence', level: 3 },
        ]
    },
    {
        title: 'Data & ERP',
        skills: [
            { name: 'SAP BW/4HANA', level: 4 },
            { name: 'Power BI', level: 4 },
            { name: 'KPI Tracking & Dashboards', level: 4 },
            { name: 'KNIME', level: 3 },
            { name: 'ETL Pipelines', level: 3 },
        ]
    },
    {
        title: 'Tech, AI & Deployment',
        skills: [
            { name: 'AI-Assisted Workflows', level: 5 },
            { name: 'Prompt Engineering', level: 4 },
            { name: 'Vercel / CI/CD', level: 4 },
            { name: 'Rapid Tool Adoption', level: 5 },
        ]
    },
    {
        title: 'Productivity & Design',
        skills: [
            { name: 'Microsoft PowerPoint', level: 4 },
            { name: 'Google Slides', level: 4 },
            { name: 'MS Office 365', level: 4 },
            { name: 'Canva', level: 3 },
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

    const handleToggle = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setHoveredIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section id="skills" className={styles.skills} aria-label="Skills and Expertise">
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
                            <svg viewBox="-40 -20 380 340" className={styles.radarSvg} aria-label="Skills competency radar chart">
                                <title>Radar chart showing competency levels across 6 skill areas</title>
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
                                            fill={level % 2 === 1 ? 'rgba(74, 155, 155, 0.035)' : 'none'}
                                        />
                                    );
                                })}

                                {/* Axis scale percentage ticks */}
                                {Array.from({ length: levels }).map((_, level) => {
                                    const r = ((level + 1) / levels) * maxR;
                                    return (
                                        <text
                                            key={`tick-${level}`}
                                            x={cx + 4}
                                            y={cy - r + 3}
                                            className={styles.scaleTick}
                                        >
                                            {(level + 1) * 20}%
                                        </text>
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
                                    const labelPt = polarToCartesian(cx, cy, maxR + 20, i * angleStep);
                                    const isHovered = hoveredIndex === i;
                                    const tooltipY = pt.y < 65 ? pt.y + 20 : pt.y - 14;

                                    return (
                                        <g
                                            key={skill.name}
                                            tabIndex={0}
                                            role="button"
                                            aria-label={`${skill.name}: ${skill.value}% competency`}
                                            onClick={(e) => handleToggle(e, i)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    handleToggle(e as unknown as React.MouseEvent, i);
                                                }
                                            }}
                                            onMouseEnter={() => {
                                                if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
                                                    setHoveredIndex(i);
                                                }
                                            }}
                                            onMouseLeave={() => {
                                                if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
                                                    setHoveredIndex(null);
                                                }
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {/* Invisible expanded touch hit target for mobile */}
                                            <circle
                                                cx={pt.x}
                                                cy={pt.y}
                                                r={18}
                                                fill="transparent"
                                            />
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
                                                <g>
                                                    <rect
                                                        x={pt.x - 20}
                                                        y={tooltipY - 11}
                                                        width={40}
                                                        height={18}
                                                        rx={5}
                                                        className={styles.tooltipPill}
                                                    />
                                                    <text
                                                        x={pt.x}
                                                        y={tooltipY + 2}
                                                        textAnchor="middle"
                                                        className={styles.valueTooltip}
                                                    >
                                                        {skill.value}%
                                                    </text>
                                                </g>
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
                                            whileTap={{ scale: 0.98 }}
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
