'use client';

import { Download, MapPin, GraduationCap, Briefcase } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './About.module.css';

export default function About() {
    return (
        <section id="about" className={styles.about}>
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
                                I help organisations improve inefficient operations by turning complex workflows into clear and repeatable systems.
                            </p>
                            <p className={styles.bio}>
                                I am currently pursuing an M.A. in International Management and Information Systems, where I focus on business process management and data-driven decision making. Alongside my studies, I am involved in two early-stage ventures in education consulting and e-commerce.
                            </p>
                            <p className={styles.bio}>
                                My focus areas are <strong>Operational Efficiency</strong> and <strong>Digital Transformation</strong>. Whether it is a healthcare facility or an e-commerce platform, the goal is always to create systems that work better for everyone.
                            </p>
                            <p className={styles.bio}>
                                Previously, I worked for two years as an Assistant Manager at a diagnostic clinic. I redesigned patient workflows, managed lab inventory, and supported daily operations to ensure smooth service delivery.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <div className={styles.infoCards}>
                            {/* Location */}
                            <div className={styles.infoCard}>
                                <MapPin size={20} />
                                <div>
                                    <span className={styles.infoLabel}>Location</span>
                                    <span className={styles.infoValue}>Soest, Germany</span>
                                </div>
                            </div>

                            {/* Education */}
                            <div className={styles.infoCard}>
                                <GraduationCap size={20} />
                                <div>
                                    <span className={styles.infoLabel}>Education</span>
                                    <span className={styles.infoValue}>M.A. IMIS, South Westphalia University</span>
                                </div>
                            </div>

                            {/* Experience */}
                            <div className={styles.infoCard}>
                                <Briefcase size={20} />
                                <div>
                                    <span className={styles.infoLabel}>Experience</span>
                                    <span className={styles.infoValue}>2+ Years in Operations</span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3}>
                        <div className={styles.languagesSection}>
                            <h3 className={styles.languagesTitle}>Languages</h3>
                            <div className={styles.languagesGrid}>
                                <div className={styles.languageItem}>
                                    <span className={styles.languageName}>Bengali</span>
                                    <span className={styles.languageLevel}>Native</span>
                                </div>
                                <div className={styles.languageItem}>
                                    <span className={styles.languageName}>English</span>
                                    <span className={styles.languageLevel}>IELTS 7.0</span>
                                </div>
                                <div className={styles.languageItem}>
                                    <span className={styles.languageName}>German</span>
                                    <span className={styles.languageLevel}>A1 to A2</span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.4}>
                        <a href="/resume.pdf" download className={styles.resumeButton}>
                            <Download size={18} />
                            Download Resume
                        </a>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
