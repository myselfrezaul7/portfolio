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
                                I bridge the gap between business operations and technology. My goal is simple: make organisations run smarter by combining process thinking with the right technical tools.
                            </p>
                            <p className={styles.bio}>
                                I am pursuing an M.A. in International Management and Information Systems (IMIS), where I focus on supply chain management, process analytics, and how information systems can transform everyday operations. The programme sits right at the crossroads of business and tech, which is exactly where I work best.
                            </p>
                            <p className={styles.bio}>
                                Alongside my studies, I founded two ventures: <strong>NexTep Edu</strong>, an education consultancy where I designed operational workflows and built the platform from the ground up, and <strong>PetBhai</strong>, a fully functional e-commerce platform currently in prototype stage, preparing to launch in Bangladesh soon.
                            </p>
                            <p className={styles.bio}>
                                Before this, I spent two years as an Assistant Manager at a diagnostic clinic. I managed the lab supply chain (procurement, inventory, vendor coordination) and redesigned patient workflows to improve service delivery across the board.
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
                                    <span className={styles.infoValue}>2+ Years in Operations & Supply Chain</span>
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

                    <ScrollReveal delay={0.35}>
                        <div className={styles.toolsSection}>
                            <h3 className={styles.toolsTitle}>Tools & Technologies</h3>
                            <div className={styles.toolsGrid}>
                                <div className={styles.toolItem}>
                                    <span className={styles.toolCategory}>Process</span>
                                    <span className={styles.toolName}>SAP Signavio</span>
                                </div>
                                <div className={styles.toolItem}>
                                    <span className={styles.toolCategory}>Process</span>
                                    <span className={styles.toolName}>BPMN 2.0</span>
                                </div>
                                <div className={styles.toolItem}>
                                    <span className={styles.toolCategory}>Analytics</span>
                                    <span className={styles.toolName}>Power BI</span>
                                </div>
                                <div className={styles.toolItem}>
                                    <span className={styles.toolCategory}>Analytics</span>
                                    <span className={styles.toolName}>KNIME</span>
                                </div>
                                <div className={styles.toolItem}>
                                    <span className={styles.toolCategory}>Analytics</span>
                                    <span className={styles.toolName}>Excel / SQL</span>
                                </div>
                                <div className={styles.toolItem}>
                                    <span className={styles.toolCategory}>Development</span>
                                    <span className={styles.toolName}>Next.js</span>
                                </div>
                                <div className={styles.toolItem}>
                                    <span className={styles.toolCategory}>Development</span>
                                    <span className={styles.toolName}>Vercel / GitHub</span>
                                </div>
                                <div className={styles.toolItem}>
                                    <span className={styles.toolCategory}>Management</span>
                                    <span className={styles.toolName}>Lean Management</span>
                                </div>
                                <div className={styles.toolItem}>
                                    <span className={styles.toolCategory}>Management</span>
                                    <span className={styles.toolName}>Agile (Scrum)</span>
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
