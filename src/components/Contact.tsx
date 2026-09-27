'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mail, Check, Copy } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './Contact.module.css';

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const handleCopyEmail = async () => {
        const email = 'myselfrezaul@gmail.com';
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(email);
            } else {
                throw new Error('Clipboard API unavailable');
            }
            setCopied(true);
        } catch {
            try {
                const textarea = document.createElement('textarea');
                textarea.value = email;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                setCopied(true);
            } catch (err) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('Failed to copy email:', err);
                }
            }
        }

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), 2200);
    };

    return (
        <section id="contact" className={styles.contact} aria-label="Contact me">
            <div className={styles.container}>
                <ScrollReveal>
                    <div className={styles.card}>
                        {/* Atmospheric Radial Gradient Mesh */}
                        <div className={styles.cardGradientMesh} aria-hidden="true" />

                        {/* Pulsing Response Pill Badge */}
                        <div className={styles.pillBadge}>
                            <span className={styles.pillPulseDot} />
                            <span className={styles.pillText}>Open to Opportunities · Fast Response</span>
                        </div>

                        <span className={styles.label}>Get in Touch</span>
                        <h2 className={styles.title}>Let&apos;s Connect</h2>
                        <p className={styles.description}>
                            I am actively seeking Working Student (Werkstudent), Master Thesis, and Graduate positions in
                            Data Analytics, Supply Chain Operations, and IT Project Management across Germany.
                            Let&apos;s schedule an introductory chat or connect directly via email.
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

                            {/* Instant Copy Email Button */}
                            <motion.button
                                type="button"
                                onClick={handleCopyEmail}
                                className={styles.copyBtn}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Copy email address"
                            >
                                {copied ? (
                                    <>
                                        <Check size={18} className={styles.copiedIcon} />
                                        <span>Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy size={18} />
                                        <span>Copy Email</span>
                                    </>
                                )}
                            </motion.button>
                        </div>
                        <div className="sr-only" aria-live="polite">
                            {copied ? 'Email address copied to clipboard.' : ''}
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
