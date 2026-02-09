'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, GraduationCap, ShoppingBag, Heart, Dog, Cat } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './Projects.module.css';

const projects = [
    {
        id: 1,
        category: 'Consultancy',
        title: 'NexTep Edu — International Education Consultancy',
        description: 'Built a comprehensive education consultancy platform helping students navigate international admission processes. Features BPMN-automated workflows and Vercel deployment.',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        icon: GraduationCap,
        link: 'https://www.nextepedu.com',
        tags: ['Process Design', 'Vercel', 'Education'],
    },
    {
        id: 2,
        category: 'E-commerce',
        title: 'PetBhai — Pet Supplies E-commerce Platform',
        description: 'Directed the full project lifecycle from UI/UX design to deployment. Implemented inventory optimization and automated order tracking workflows.',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        icon: ShoppingBag,
        link: 'https://www.petbhai.com',
        tags: ['E-commerce', 'Bootstrap', 'Automation'],
    },
    {
        id: 3,
        category: 'Non-Profit',
        title: 'Kuttawaala — কুত্তাওয়ালা (Dog Lovers of Bangladesh)',
        description: 'Founded and manage a non-profit organization dedicated to dog welfare in Bangladesh. Building a community platform for dog adoption, rescue, and volunteer coordination.',
        gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
        icon: Dog,
        link: 'https://kuttawaala.com',
        tags: ['Non-Profit', 'Animal Welfare', 'Community'],
    },
    {
        id: 4,
        category: 'Non-Profit',
        title: 'Catwaala — বিলাইওয়ালা (Cat Lovers of Bangladesh)',
        description: 'Co-founded a non-profit organization for cat welfare in Bangladesh. Developing a platform to connect cat lovers, facilitate adoptions, and support rescue operations.',
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        icon: Cat,
        link: 'https://catwaala.com',
        tags: ['Non-Profit', 'Animal Welfare', 'Community'],
    },
    {
        id: 5,
        category: 'Healthcare',
        title: 'Renaissance Diagnostic Care — Operations Excellence',
        description: 'Optimized internal workflows resulting in 30% reach increase within 6 months. Managed supply chain, financial operations, and marketing campaigns.',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        icon: Heart,
        link: null,
        tags: ['Healthcare', 'Operations', 'Supply Chain'],
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
                                    <div
                                        className={styles.gradientBg}
                                        style={{ background: project.gradient }}
                                    >
                                        <project.icon size={64} strokeWidth={1} className={styles.projectIcon} />
                                    </div>
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
