'use client';

import { motion } from 'framer-motion';
import { Calendar, Mail } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './Contact.module.css';

export default function Contact() {
    return (
        <section id="contact" className={styles.contact} aria-label="Contact me">
            <div className={styles.container}>
                <ScrollReveal>
                    <div className={styles.card}>
                        <span className={styles.label}>Get in Touch</span>
                        <h2 className={styles.title}>Let's Connect</h2>
                        <p className={styles.description}>
                            I am actively seeking Working Student (Werkstudent), Master Thesis, and Graduate positions in
                            Data Analytics, Supply Chain Operations, and IT Project Management across Germany.
                            Let's schedule an introductory chat or connect directly via email.
                        </p>

                        <div className={styles.actions}>
                            {/* Primary CTA - Schedule Intro Chat */}
                            <motion.a
                                href="https://cal.eu/myself-karim/30min"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.bookCallBtn}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Schedule Intro Chat
                                <Calendar size={18} strokeWidth={1.5} />
                            </motion.a>

                            {/* Secondary - Email */}
                            <motion.a
                                href="mailto:myselfrezaul@gmail.com"
                                className={styles.emailBtn}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Mail size={18} />
                                Send an Email
                            </motion.a>
                        </div>

                        {/* Powered by Cal.com */}
                        <p className={styles.bookingNote}>
                            Powered by <a href="https://cal.com" target="_blank" rel="noopener noreferrer">Cal.com</a>
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
