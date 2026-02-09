'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Mail, Video, Clock } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './Contact.module.css';

export default function Contact() {
    return (
        <section className={styles.contact}>
            <div className={styles.container}>
                <ScrollReveal>
                    <div className={styles.card}>
                        <span className={styles.label}>Have an idea?</span>
                        <h2 className={styles.title}>Let's talk</h2>
                        <p className={styles.description}>
                            Book a free 30-minute intro call to discuss your operational challenges
                            and discover how we can transform them into efficient systems.
                        </p>

                        {/* Meeting Info */}
                        <div className={styles.meetingInfo}>
                            <div className={styles.meetingDetail}>
                                <Video size={18} />
                                <span>Google Meet</span>
                            </div>
                            <div className={styles.meetingDetail}>
                                <Clock size={18} />
                                <span>30 min</span>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            {/* Primary CTA - Book a Call with Cal.com */}
                            <motion.a
                                href="https://cal.eu/myself-karim/30min"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.primaryBtn}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Calendar size={18} />
                                Book an Intro Call
                                <ArrowRight size={16} />
                            </motion.a>

                            {/* Secondary - Email */}
                            <motion.a
                                href="mailto:myselfrezaul@gmail.com"
                                className={styles.secondaryBtn}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Mail size={18} />
                                Send an Email
                            </motion.a>
                        </div>

                        {/* Powered by Cal.com */}
                        <p className={styles.bookingNote}>
                            📅 Select a time that works for you • Powered by <a href="https://cal.com" target="_blank" rel="noopener noreferrer">Cal.com</a>
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
