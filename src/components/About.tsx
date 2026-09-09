'use client';

import { motion } from 'framer-motion';
import { Download, MapPin, GraduationCap, Briefcase } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './About.module.css';

const languages = [
    { name: 'Bengali', level: 'Native', percentage: 100 },
    { name: 'English', level: 'IELTS 7.0', percentage: 90 },
    { name: 'German', level: 'A1 (Learning A2)', percentage: 35 },
];

export default function About() {
    return (
        <section id="about" className={styles.about} aria-label="About me">
            <div className={styles.container}>
                <ScrollReveal>
                    <h2 className={styles.sectionTitle}>
                        A bit about me
                    </h2>
                </ScrollReveal>

                <div className={styles.content}>
                    <ScrollReveal delay={0.1}>
                        <div className={styles.bioSection}>
                            <p className={styles.bio}>
                                I bridge the gap between business operations and technology. My goal is simple: make organisations run smarter by combining process thinking with the right technical tools. As a 3rd-semester Master&apos;s student in International Management and Information Systems (IMIS) at Fachhochschule Südwestfalen, I focus on SAP-integrated management, data analysis, digital transformation, and information systems. The programme sits right at the crossroads of business and tech, which is exactly where I work best.
                            </p>
                            <p className={styles.bio}>
                                Alongside my studies, I served as Technical Project Lead at <strong>NexTep Edu</strong>, where I built digital infrastructure, automated workflows with BPMN 2.0, and designed a self-service client tracking model. I also founded <strong>PetBhai</strong>, an e-commerce platform prototype. Previously, as a Data & Operations Analyst at Renaissance Diagnostic Care, I extracted and cleaned demographic data via ETL pipelines, built visual dashboards, redesigned appointment booking systems, and tracked daily KPIs for supply chain logistics.
                            </p>
                            <p className={styles.bio}>
                                I work through the lens of People, Process, and Technology (PPT). I understand stakeholders first, design efficient workflows, and select the right tools to support them. I am deeply comfortable leveraging AI tools to accelerate everything I do, from data analysis and process mapping to web deployment and presentation design. I adapt quickly, pick up new systems with minimal onboarding, and consistently look for ways to work smarter, not harder.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className={styles.infoCards}>
                        {/* Location */}
                        <motion.div
                            className={styles.infoCard}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            <MapPin size={20} />
                            <div>
                                <span className={styles.infoLabel}>Location</span>
                                <span className={styles.infoValue}>Soest, Germany</span>
                            </div>
                        </motion.div>

                        {/* Education */}
                        <motion.div
                            className={styles.infoCard}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <GraduationCap size={20} />
                            <div>
                                <span className={styles.infoLabel}>Education</span>
                                <span className={styles.infoValue}>M.A. IMIS, Fachhochschule Südwestfalen</span>
                            </div>
                        </motion.div>

                        {/* Experience */}
                        <motion.div
                            className={styles.infoCard}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                        >
                            <Briefcase size={20} />
                            <div>
                                <span className={styles.infoLabel}>Experience</span>
                                <span className={styles.infoValue}>Data & Operations Analysis</span>
                            </div>
                        </motion.div>
                    </div>

                    <ScrollReveal delay={0.3}>
                        <div className={styles.languagesSection}>
                            <h3 className={styles.languagesTitle}>Languages</h3>
                            <div className={styles.languagesGrid}>
                                {languages.map((lang) => (
                                    <div key={lang.name} className={styles.languageCard}>
                                        <div className={styles.languageHeader}>
                                            <span className={styles.languageName}>{lang.name}</span>
                                            <span className={styles.languageLevel}>{lang.level}</span>
                                        </div>
                                        <div className={styles.progressTrack}>
                                            <motion.div
                                                className={styles.progressFill}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${lang.percentage}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.45}>
                        <motion.a 
                            href="/resume.pdf" 
                            download 
                            className={styles.resumeButton} 
                            whileTap={{ scale: 0.95 }}
                        >
                            <Download size={18} className={styles.downloadIcon} />
                            <span>Download Resume</span>
                        </motion.a>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
