'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink, GraduationCap, ShoppingBag, Heart, Dog, Cat, Database, CalendarCheck, Newspaper } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './Projects.module.css';

const projects = [
    {
        id: 1,
        category: 'Healthcare',
        title: 'Renaissance Diagnostic Care - Data & Operations Analytics',
        description: 'Extracted and cleaned demographic data for urban and rural patients using ETL processes, redesigned the appointment booking journey to reduce wait times, and built visual KPI dashboards to monitor supply chain logistics and clinic workflows.',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        icon: Heart,
        link: null,
        tags: ['Data Analytics', 'ETL & KPIs', 'Healthcare Ops'],
        image: '/images/projects/renaissance.jpg',
        blur: null,
    },
    {
        id: 2,
        category: 'Education Consulting',
        title: 'NexTep Edu - Technical Project Lead & Workflow Automation',
        description: 'Architected digital infrastructure and automated administrative workflows using BPMN 2.0 and AI tools. Designed client-facing presentation decks and implemented a self-service tracking model that streamlined student admissions.',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        icon: GraduationCap,
        link: 'https://www.nextepedu.com',
        tags: ['Technical Lead', 'BPMN 2.0', 'Process Automation'],
        image: '/images/projects/nextepedu.png',
        blur: null,
    },
    {
        id: 3,
        category: 'Digital Content',
        title: 'Digital Content Management & Web Coordination',
        description: 'Officially manage the news and events section for the FH Sudwestfalen IMIS alumni webpage. Create engaging content bridging students, faculty, and alumni, designed a Google Maps SEO strategy for the university, and coordinate digital presence for events like the 2026 IMIS Smart Cricket Championship.',
        gradient: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)',
        icon: Newspaper,
        link: 'https://www.fh-swf.de/en/karriere/alumni/ehemalige/imis_alumni/index.php',
        tags: ['Content Strategy', 'Local SEO', 'Web Coordination'],
        image: '/images/projects/imis-content.jpg',
        blur: null,
    },
    {
        id: 4,
        category: 'Data Warehousing',
        title: 'SAP BW/4HANA: End-to-End Data Warehousing Project',
        description: 'Built a multi-layer Enterprise Data Warehouse (EDW) structure using SAP HANA Studio, creating DataSources and transformations to move raw data into ADSOs, and designed complex BW Queries to analyze KPIs and sales trends.',
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
        description: 'Implemented Agile methodologies and set up Jira Kanban boards to manage workflows and deliverables for large-scale university events. Translated project logistics into actionable tickets and managed web publishing for the IMIS portal.',
        gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        icon: CalendarCheck,
        link: null,
        tags: ['Agile / Scrum', 'Jira & Kanban', 'Event Logistics'],
        image: '/images/projects/agile-event.jpg',
        blur: null,
    },
    {
        id: 6,
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
        id: 7,
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
        id: 8,
        category: 'Non-Profit',
        title: 'Cat Lovers of Bangladesh',
        description: 'Founded a non-profit for cat welfare in Bangladesh with over 450K+ members. Designed the adoption process flow, volunteer management system, and deployed the platform to connect cat lovers nationwide.',
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        icon: Cat,
        link: 'https://catwaala.com',
        tags: ['Founder', 'Operations', 'Community Platform'],
        image: '/images/projects/catwaala.webp',
        blur: 'data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhAAAwEAAwAAAAAAAAAAAAAAAAEDAhEhQf/EABQBAQAAAAAAAAAAAAAAAAAAAAL/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEQMRAD8A06UeJPXqJK+uF0gA0n//2Q==',
    },
];

export default function Projects() {
    return (
        <section id="work" className={styles.projects} aria-label="Recent projects">
            <div className={styles.container}>
                {/* Section Header */}
                <ScrollReveal>
                    <div className={styles.header}>
                        <h2 className={styles.sectionTitle}>Recent Projects</h2>
                    </div>
                </ScrollReveal>

                {/* Projects Carousel */}
                <div className={styles.projectsList}>
                    {projects.map((project, index) => (
                        <div key={project.id} className={styles.snapItem}>
                            <motion.article
                                className={styles.projectCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -6 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                {/* Project Visual */}
                                <div className={styles.imageWrapper}>
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={`${project.title} screenshot`}
                                            fill
                                            style={{ objectFit: 'cover', objectPosition: 'top' }}
                                            sizes="(max-width: 767px) 85vw, (max-width: 1199px) 50vw, 33vw"
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
