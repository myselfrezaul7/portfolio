'use client';

import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, ArrowUp } from 'lucide-react';
import styles from './Footer.module.css';

const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/myselfkarim', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/myselfrezaul7', label: 'GitHub' },
    { icon: Mail, href: 'mailto:myselfrezaul@gmail.com', label: 'Email' },
];

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    {/* Logo */}
                    <a href="#" className={styles.logo}>M—K</a>

                    {/* Social Links */}
                    <div className={styles.socialLinks}>
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                                rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                                className={styles.socialLink}
                                whileHover={{ y: -3 }}
                                aria-label={social.label}
                            >
                                <social.icon size={20} />
                            </motion.a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p className={styles.copyright}>
                        © 2026 — Crafted by Md Rezaul Karim
                    </p>
                </div>

                {/* Back to Top */}
                <motion.button
                    className={styles.backToTop}
                    onClick={scrollToTop}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Back to top"
                >
                    <ArrowUp size={20} />
                </motion.button>
            </div>
        </footer>
    );
}
