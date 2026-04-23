'use client';

import { motion } from 'framer-motion';
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
                                I bridge the gap between business operations and technology. My goal is simple: make organisations run smarter by combining process thinking with the right technical tools. I am currently pursuing an M.A. in International Management and Information Systems (IMIS), where I focus on supply chain management, process analytics, and how information systems can transform everyday operations. The programme sits right at the crossroads of business and tech, which is exactly where I work best.
                            </p>
                            <p className={styles.bio}>
                                Alongside my studies, I founded two ventures: <strong>NexTep Edu</strong>, an education consultancy where I designed operational workflows and built the platform from the ground up, and <strong>PetBhai</strong>, a fully functional e-commerce platform currently in prototype stage, preparing to launch in Bangladesh soon. Before this, I spent two years as an Assistant Manager at a diagnostic clinic, where I managed the lab supply chain (procurement, inventory, vendor coordination) and redesigned patient workflows to improve service delivery across the board.
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
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <GraduationCap size={20} />
                            <div>
                                <span className={styles.infoLabel}>Education</span>
                                <span className={styles.infoValue}>M.A. IMIS, South Westphalia University</span>
                            </div>
                        </motion.div>

                        {/* Experience */}
                        <motion.div
                            className={styles.infoCard}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                        >
                            <Briefcase size={20} />
                            <div>
                                <span className={styles.infoLabel}>Experience</span>
                                <span className={styles.infoValue}>2+ Years in Operations & Supply Chain</span>
                            </div>
                        </motion.div>
                    </div>

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

                    <ScrollReveal delay={0.45}>
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
