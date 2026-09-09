'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink, GraduationCap, ShoppingBag, Heart, Dog, Cat, Database, CalendarCheck, Newspaper } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './Projects.module.css';

const categoryList = [
    'All',
    'Healthcare Operations',
    'Education Consulting',
    'Digital Operations',
    'Data Warehousing',
    'Project Management',
    'E-commerce Logistics',
    'Non-Profit Operations',
] as const;

const projects = [
    {
        id: 1,
        category: 'Healthcare Operations',
        title: 'Renaissance Diagnostic Care · Data & Operations Analytics',
        description: 'Engineered ETL pipelines to clean demographic and clinical testing data across 500+ daily patient records. Built visual KPI dashboards in Power BI to monitor lab throughput, established safety stock reorder formulas, and reduced expired reagent waste by 18%.',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        icon: Heart,
        link: null,
        tags: ['Data Analytics', 'ETL & Power BI', 'Supply Chain Ops'],
        image: '/images/projects/renaissance.jpg',
        blur: null,
    },
    {
        id: 2,
        category: 'Education Consulting',
        title: 'NexTep Edu · Technical Project Lead & Workflow Automation',
        description: 'Led end-to-end digital infrastructure delivery for an education consulting firm. Modeled business workflows using BPMN 2.0, automated document verification pipelines, and created interactive client dashboards that accelerated student onboarding by 40%.',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        icon: GraduationCap,
        link: 'https://www.nextepedu.com',
        tags: ['Technical Project Lead', 'BPMN 2.0', 'Process Automation'],
        image: '/images/projects/nextepedu.png',
        blur: null,
    },
    {
        id: 3,
        category: 'Digital Operations',
        title: 'Digital Content Management & Web Coordination',
        description: 'Manage news, event communications, and alumni engagement for the FH Südwestfalen IMIS portal. Architected localized SEO strategies and coordinate digital execution for major university milestones including the 2026 IMIS Smart Cricket Championship.',
        gradient: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)',
        icon: Newspaper,
        link: 'https://www.fh-swf.de/en/karriere/alumni/ehemalige/imis_alumni/index.php',
        tags: ['Content Strategy', 'Local SEO', 'Web Operations'],
        image: '/images/projects/imis-content.jpg',
        blur: null,
    },
    {
        id: 4,
        category: 'Data Warehousing',
        title: 'SAP BW/4HANA · Enterprise Data Warehousing',
        description: 'Designed a multi-tier Enterprise Data Warehouse (EDW) in SAP HANA Studio. Built DataSources, InfoObjects, and transformations to load transactional datasets into ADSOs, creating optimized CompositeProviders and BW Queries for executive supply chain reporting.',
        gradient: 'linear-gradient(135deg, #0061ff 0%, #60efff 100%)',
        icon: Database,
        link: null,
        tags: ['SAP BW/4HANA', 'EDW Architecture', 'Business Intelligence'],
        image: '/images/projects/sap-bw.jpg',
        blur: null,
    },
    {
        id: 5,
        category: 'Project Management',
        title: 'Agile Project Coordinator & Event Logistics',
        description: 'Orchestrated cross-functional event execution using Agile Scrum workflows and Jira Kanban boards. Structured deliverable backlogs, coordinated sprint retrospectives, and managed digital publishing on the university IMIS portal.',
        gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        icon: CalendarCheck,
        link: null,
        tags: ['Agile / Scrum', 'Jira & Kanban', 'Operations Coordination'],
        image: '/images/projects/agile-event.jpg',
        blur: null,
    },
    {
        id: 6,
        category: 'E-commerce Logistics',
        title: 'PetBhai · Pet Supplies E-commerce Platform',
        description: 'Engineered a full-stack e-commerce logistics platform prototype. Designed multi-tier SKU inventory state machines, mapped end-to-end order fulfillment and courier tracking workflows, and integrated real-time database triggers.',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        icon: ShoppingBag,
        link: 'https://www.petbhai.com',
        tags: ['Product Architecture', 'Supply Chain Logic', 'Full-Stack'],
        image: '/images/projects/petbhai.webp',
        blur: 'data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEF/8QAFhABAQEAAAAAAAAAAAAAAAAAAAEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANi7FAH/2Q==',
    },
    {
        id: 7,
        category: 'Non-Profit Operations',
        title: 'Dog Lovers of Bangladesh · Non-Profit Platform',
        description: 'Founded animal welfare community infrastructure in Bangladesh. Designed digital intake workflows for rescue logistics, volunteer coordination matrices, and adoption tracking systems to scale community impact.',
        gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
        icon: Dog,
        link: 'https://kuttawaala.com',
        tags: ['Community Operations', 'Workflow Design', 'Platform Lead'],
        image: '/images/projects/kuttawaala.webp',
        blur: 'data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEF/8QAFhABAQEAAAAAAAAAAAAAAAAAAAEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANi7FAH/2Q==',
    },
    {
        id: 8,
        category: 'Non-Profit Operations',
        title: 'Cat Lovers of Bangladesh · Non-Profit Platform',
        description: 'Founded animal welfare platform supporting an active community of 450K+ members. Designed standardized adoption screening workflows, volunteer management protocols, and digital outreach channels.',
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        icon: Cat,
        link: 'https://catwaala.com',
        tags: ['Community Operations', 'Process Modeling', 'Platform Lead'],
        image: '/images/projects/catwaala.webp',
        blur: 'data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhAAAwEAAwAAAAAAAAAAAAAAAAEDAhEhQf/EABQBAQAAAAAAAAAAAAAAAAAAAAL/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEQMRAD8A06UeJPXqJK+uF0gA0n//2Q==',
    },
];

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

    const handleImageLoad = (id: number) => {
        setLoadedImages((prev) => ({ ...prev, [id]: true }));
    };

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter((project) => project.category === activeCategory);

    return (
        <section id="work" className={styles.projects} aria-label="Recent projects">
            <div className={styles.container}>
                {/* Section Header */}
                <ScrollReveal>
                    <div className={styles.header}>
                        <h2 className={styles.sectionTitle}>Recent Projects</h2>
                    </div>
                </ScrollReveal>

                {/* Category Filter Chip Bar */}
                <div className={styles.filterBar} role="tablist" aria-label="Filter projects by category">
                    {categoryList.map((category) => {
                        const count = category === 'All'
                            ? projects.length
                            : projects.filter((p) => p.category === category).length;
                        const isActive = activeCategory === category;

                        return (
                            <motion.button
                                key={category}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => setActiveCategory(category)}
                                className={`${styles.filterChip} ${isActive ? styles.filterChipActive : ''}`}
                                whileTap={{ scale: 0.96 }}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="activeCategoryPill"
                                        className={styles.activePill}
                                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                                    />
                                )}
                                <span className={styles.chipText}>
                                    {category}
                                    <span className={styles.chipCount}>{count}</span>
                                </span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Projects Carousel / Grid */}
                <div className={styles.projectsList}>
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                className={styles.snapItem}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.35 }}
                            >
                                <motion.article
                                    className={styles.projectCard}
                                    whileHover={{ y: -6 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    {/* Project Visual */}
                                    <div className={styles.imageWrapper}>
                                        {project.image ? (
                                            <>
                                                {!loadedImages[project.id] && (
                                                    <div className={styles.imageSkeleton} aria-hidden="true" />
                                                )}
                                                <Image
                                                    src={project.image}
                                                    alt={`${project.title} screenshot`}
                                                    fill
                                                    className={`${styles.projectImage} ${loadedImages[project.id] ? styles.imageLoaded : styles.imageLoading}`}
                                                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                                                    sizes="(max-width: 767px) 85vw, (max-width: 1199px) 50vw, 33vw"
                                                    placeholder={project.blur ? 'blur' : 'empty'}
                                                    blurDataURL={project.blur || undefined}
                                                    onLoad={() => handleImageLoad(project.id)}
                                                />
                                            </>
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
                                                    aria-label={`View live site for ${project.title}`}
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
                                                    aria-label={`Visit ${project.title}`}
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
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
