'use client';

import { motion } from 'framer-motion';
import { Download, MapPin, GraduationCap, Briefcase } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './About.module.css';

const languages = [
    { name: 'Bengali', level: 'Native', dots: 5 },
    { name: 'English', level: 'C1 · IELTS 7.0', dots: 4 },
    { name: 'German', level: 'A2 · Elementary', dots: 2 },
];

const quickFacts = [
    { icon: MapPin, label: 'Location', value: 'Soest, Germany' },
    { icon: GraduationCap, label: 'Education', value: 'M.A. IMIS, Fachhochschule Südwestfalen' },
    { icon: Briefcase, label: 'Focus', value: 'Data & Operations Analysis' },
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
                    {/* Left Column: Editorial Bio + Resume */}
                    <div className={styles.bioColumn}>
                        <ScrollReveal delay={0.1}>
                            <div className={styles.bioSection}>
                                <p className={styles.bio}>
                                    I bridge the gap between business operations and technology. My goal is simple: make organisations run smarter by combining process thinking with the right technical tools. As a 3rd-semester Master&apos;s student in International Management and Information Systems (IMIS) at Fachhochschule Südwestfalen, I focus on SAP-integrated management, data analysis, digital transformation, and information systems. The programme sits right at the crossroads of business and tech, which is exactly where I work best.
                                </p>
                                <p className={styles.bio}>
                                    Currently, I serve as Web and Project Coordinator at <strong>Fachhochschule Südwestfalen</strong>, managing digital content, event coordination, and alumni engagement for the IMIS programme. Previously, I was Technical Project Lead at <strong>NexTep Edu</strong>, where I mapped the consultancy&apos;s workflow with BPMN 2.0, built its website, and set up a private application tracker for students. Before that, as a Data and Operations Analyst at Renaissance Diagnostic Care, I entered and organised daily lab data in Excel and Google Sheets and turned it into charts and PowerPoint reports that helped management make decisions. I also founded <strong>PetBhai</strong>, an e-commerce platform prototype, and two community platforms reaching 450,000+ members.
                                </p>
                                <p className={styles.bio}>
                                    I work through the lens of People, Process, and Technology (PPT). I understand stakeholders first, design efficient workflows, and select the right tools to support them. I am deeply comfortable leveraging AI tools to accelerate everything I do, from data analysis and process mapping to web deployment and presentation design. I adapt quickly, pick up new systems with minimal onboarding, and consistently look for ways to work smarter, not harder.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2}>
                            <motion.a
                                href="/resume.pdf"
                                download
                                className={styles.resumeButton}
                                whileTap={{ scale: 0.96 }}
                            >
                                <Download size={18} className={styles.downloadIcon} />
                                <span>Download Resume</span>
                            </motion.a>
                        </ScrollReveal>
                    </div>

                    {/* Right Column: At a Glance & Languages Sidebar */}
                    <ScrollReveal delay={0.15}>
                        <aside className={styles.sidebarCard} aria-label="Profile overview">
                            <h3 className={styles.sidebarHeading}>At a Glance</h3>
                            <div className={styles.factsList}>
                                {quickFacts.map((fact) => (
                                    <div key={fact.label} className={styles.factRow}>
                                        <div className={styles.factIcon} aria-hidden="true">
                                            <fact.icon size={18} strokeWidth={1.75} />
                                        </div>
                                        <div className={styles.factText}>
                                            <span className={styles.infoLabel}>{fact.label}</span>
                                            <span className={styles.infoValue}>{fact.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.sidebarDivider} />

                            <h3 className={styles.sidebarHeading}>Languages</h3>
                            <div className={styles.languagesList}>
                                {languages.map((lang) => (
                                    <div
                                        key={lang.name}
                                        className={styles.languageRow}
                                        aria-label={`${lang.name}: ${lang.level}`}
                                    >
                                        <div className={styles.languageMeta}>
                                            <span className={styles.languageName}>{lang.name}</span>
                                            <span className={styles.languageLevel}>{lang.level}</span>
                                        </div>
                                        <div className={styles.langDots} aria-hidden="true">
                                            {[1, 2, 3, 4, 5].map((dot) => (
                                                <span
                                                    key={dot}
                                                    className={`${styles.langDot} ${dot <= lang.dots ? styles.langDotFilled : ''}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </aside>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
