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
                        Business isn't just about numbers.
                    </h2>
                </ScrollReveal>

                <div className={styles.content}>
                    <ScrollReveal delay={0.1}>
                        <div className={styles.bioSection}>
                            <p className={styles.bio}>
                                I'm a Master's student in <strong>International Management & Information System</strong> with
                                a strong background in operational leadership and technical deployment.
                            </p>
                            <p className={styles.bio}>
                                My goal is simple: create systems that businesses love and teams enjoy using.
                                I work like a chameleon, adapting to every phase of the process—from strategy
                                research to the final deployment—always using the latest technologies.
                            </p>
                            <p className={styles.bio}>
                                I focus on what really matters: <strong>Operational Efficiency</strong> and <strong>Digital Transformation</strong>.
                                Whether it's a healthcare facility or an e-commerce platform, the goal is always the same.
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
                                    <span className={styles.infoValue}>M.A. IMIS – South Westphalia University</span>
                                </div>
                            </div>

                            {/* Experience */}
                            <div className={styles.infoCard}>
                                <Briefcase size={20} />
                                <div>
                                    <span className={styles.infoLabel}>Experience</span>
                                    <span className={styles.infoValue}>2+ Years in Operations Management</span>
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
                                    <span className={styles.languageLevel}>A1 → A2</span>
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
