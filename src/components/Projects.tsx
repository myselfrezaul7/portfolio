'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink, GraduationCap, ShoppingBag, Heart, Dog, Cat } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './Projects.module.css';

const projects = [
    {
        id: 1,
        category: 'Education Consulting',
        title: 'NexTep Edu - International Education Consultancy',
        description: 'Founded an education consultancy where I designed the entire operational workflow for student admissions, from lead tracking to document processing, and built the web platform from scratch.',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        icon: GraduationCap,
        link: 'https://www.nextepedu.com',
        tags: ['Founder', 'Process Design', 'Web Deployment'],
        image: '/images/projects/nextepedu.webp',
        blur: 'data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEF/8QAFhABAQEAAAAAAAAAAAAAAAAAAAEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANi7FAH/2Q==',
    },
    {
        id: 2,
        category: 'E-commerce',
        title: 'PetBhai - Pet Supplies E-commerce Platform',
        description: 'Built a fully functional e-commerce platform from scratch. While currently a prototype, I designed the backend to handle complex inventory logic, mapped out the entire order-to-delivery process, and built the system to track stock levels and automate order statuses.',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        icon: ShoppingBag,
        link: 'https://www.petbhai.com',
        tags: ['Founder', 'Supply Chain', 'E-commerce'],
        image: '/images/projects/petbhai.webp',
        blur: 'data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEF/8QAFhABAQEAAAAAAAAAAAAAAAAAAAEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANi7FAH/2Q==',
    },
    {
        id: 3,
        category: 'Non-Profit',
        title: 'Dog Lovers of Bangladesh',
        description: 'Founded a non-profit for dog welfare in Bangladesh. Built a community platform and designed volunteer coordination, rescue logistics, and adoption workflows to scale impact efficiently.',
        gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
        icon: Dog,
        link: 'https://kuttawaala.com',
        tags: ['Founder', 'Operations', 'Community Platform'],
        image: '/images/projects/kuttawaala.webp',
        blur: 'data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEF/8QAFhABAQEAAAAAAAAAAAAAAAAAAAEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANi7FAH/2Q==',
    },
    {
        id: 4,
        category: 'Non-Profit',
        title: 'Cat Lovers of Bangladesh',
        description: 'Co-founded a non-profit for cat welfare in Bangladesh. Designed the adoption process flow, volunteer management system, and deployed the platform to connect cat lovers nationwide.',
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        icon: Cat,
        link: 'https://catwaala.com',
        tags: ['Founder', 'Operations', 'Community Platform'],
        image: '/images/projects/catwaala.webp',
        blur: 'data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhAAAwEAAwAAAAAAAAAAAAAAAAEDAhEhQf/EABQBAQAAAAAAAAAAAAAAAAAAAAL/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEQMRAD8A06UeJPXqJK+uF0gA0n//2Q==',
    },
    {
        id: 5,
        category: 'Healthcare',
        title: 'Renaissance Diagnostic Care - Operations Excellence',
        description: 'Optimized healthcare operations by redesigning patient workflows, managing the lab supply chain (procurement, inventory, vendor relations), and running marketing campaigns that increased reach by 30% in 6 months.',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        icon: Heart,
        link: null,
        tags: ['Supply Chain', 'Process Analysis', 'Healthcare Ops'],
        image: null,
        blur: null,
    },
];

export default function Projects() {
    return (
        <section id="work" className={styles.projects}>
            <div className={styles.container}>
                {/* Section Header */}
                <ScrollReveal>
                    <div className={styles.header}>
                        <h2 className={styles.sectionTitle}>Recent Projects</h2>
                    </div>
                </ScrollReveal>

                {/* Projects List */}
                <div className={styles.projectsList}>
                    {projects.map((project, index) => (
                        <ScrollReveal key={project.id} delay={index * 0.1}>
                            <motion.article
                                className={styles.projectCard}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Project Visual */}
                                <div className={styles.imageWrapper}>
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            style={{ objectFit: 'cover', objectPosition: 'top' }}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            placeholder={project.blur ? 'blur' : 'empty'}
                                            blurDataURL={project.blur || undefined}
                                        />
                                    ) : (
                                        <div
                                            className={styles.gradientBg}
                                            style={{ background: project.gradient }}
                                        >
                                            <project.icon size={64} strokeWidth={1} className={styles.projectIcon} />
                                        </div>
                                    )}
                                    <span className={styles.category}>{project.category}</span>
                                    {project.link && (
                                        <div className={styles.imageOverlay}>
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.viewButton}
                                            >
                                                <ExternalLink size={20} />
                                                View Live
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Project Content */}
                                <div className={styles.content}>
                                    <h3 className={styles.projectTitle}>
                                        {project.title}
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.titleLink}
                                            >
                                                <ArrowUpRight size={24} />
                                            </a>
                                        )}
                                    </h3>

                                    <p className={styles.projectDescription}>
                                        {project.description}
                                    </p>

                                    <div className={styles.tags}>
                                        {project.tags.map((tag) => (
                                            <span key={tag} className={styles.tag}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.article>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
