'use client';

import { motion } from 'framer-motion';
import { Calendar, Mail } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './Contact.module.css';

export default function Contact() {
    return (
        <section className={styles.contact}>
            <div className={styles.container}>
                <ScrollReveal>
                    <div className={styles.card}>
                        <span className={styles.label}>Have an operations challenge?</span>
                        <h2 className={styles.title}>Let's talk</h2>
                        <p className={styles.description}>
                            Book a free 30-minute intro call to discuss your supply chain, process, or operational challenges
                            and discover how we can turn them into efficient, data-driven systems.
                        </p>

                        <div className={styles.actions}>
                            {/* Primary CTA - Book a Call (Outline Style) */}
                            <motion.a
                                href="https://cal.eu/myself-karim/30min"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.bookCallBtn}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                BOOK A CALL
                                <Calendar size={18} strokeWidth={1.5} />
                            </motion.a>

                            {/* Secondary - Email */}
                            <motion.a
                                href="mailto:myselfrezaul@gmail.com"
                                className={styles.emailBtn}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
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
