'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './animations/ScrollReveal';
import styles from './SkillsRadar.module.css';

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

export default function SkillsRadar() {
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

                <div className={styles.grid}>
                    {skillCategories.map((category, catIdx) => (
                        <ScrollReveal key={category.title} delay={catIdx * 0.1}>
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
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
