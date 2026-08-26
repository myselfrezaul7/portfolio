'use client';

import { motion } from 'framer-motion';
import { Settings, BarChart3, Code2 } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './Services.module.css';

const services = [
    {
        icon: Settings,
        title: 'Supply Chain & Process Optimization',
        description: 'I map end-to-end operational workflows, eliminate process bottlenecks, and design repeatable systems using BPMN 2.0 and the People, Process, and Technology (PPT) framework.',
        skills: ['SAP Signavio', 'BPMN 2.0', 'PPT Framework', 'Jira & Confluence'],
    },
    {
        icon: BarChart3,
        title: 'Data Analytics & Business Intelligence',
        description: 'I transform operational data into actionable executive dashboards, architect data warehousing models, and monitor supply chain KPIs for data-driven decision making.',
        skills: ['SAP BW/4HANA', 'Power BI', 'KNIME', 'ETL & KPIs'],
    },
    {
        icon: Code2,
        title: 'IT Project Management & Systems Integration',
        description: 'I translate business requirements into agile technical deliverables, manage cross-functional sprint workflows, and integrate modern digital tools to streamline day-to-day operations.',
        skills: ['Agile / Scrum', 'ERP Systems', 'Workflow Automation', 'Vercel / CI/CD'],
    },
];

export default function Services() {
    return (
        <section id="services" className={styles.services} aria-label="Core competencies">
            <div className={styles.container}>
                {/* Section Header */}
                <ScrollReveal>
                    <div className={styles.header}>
                        <h2 className={styles.sectionTitle}>Core Competencies</h2>
                        <p className={styles.sectionDescription}>
                            I sit at the intersection of business operations, data analytics, and digital technology, turning complex challenges into streamlined, scalable systems.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Services Carousel */}
                <div className={styles.scrollStrip}>
                    {services.map((service, index) => (
                        <div key={service.title} className={styles.snapItem}>
                            <motion.div
                                className={styles.card}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.4, delay: index * 0.15 }}
                            >
                                <div className={styles.iconWrapper}>
                                    <service.icon size={28} strokeWidth={1.5} />
                                </div>

                                <h3 className={styles.cardTitle}>{service.title}</h3>

                                <p className={styles.cardDescription}>{service.description}</p>

                                <div className={styles.skills}>
                                    {service.skills.map((skill) => (
                                        <span key={skill} className={styles.skillTag}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
