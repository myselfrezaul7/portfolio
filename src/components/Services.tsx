'use client';

import { motion } from 'framer-motion';
import { Settings, BarChart3, Code2 } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './Services.module.css';

const services = [
    {
        icon: Settings,
        title: 'Supply Chain & Process Optimization',
        description: 'I map and improve supply chain workflows, identify operational bottlenecks, and design repeatable systems that keep things moving smoothly.',
        skills: ['SAP Signavio', 'BPMN 2.0', 'Lean Management'],
    },
    {
        icon: BarChart3,
        title: 'Data Analytics & Business Intelligence',
        description: 'I turn operational data into actionable insights by building dashboards for supply chain KPIs, process performance, and data-driven decision support.',
        skills: ['SAP B/W', 'Power BI', 'KNIME', 'SQL'],
    },
    {
        icon: Code2,
        title: 'Digital Transformation & Tech Integration',
        description: 'I translate business requirements into technical solutions, from automating workflows to deploying web platforms that support day-to-day operations.',
        skills: ['ERP Systems', 'Vercel/GitHub', 'Process Automation'],
    },
];

export default function Services() {
    return (
        <section id="services" className={styles.services}>
            <div className={styles.container}>
                {/* Section Header */}
                <ScrollReveal>
                    <div className={styles.header}>
                        <h2 className={styles.sectionTitle}>What I do</h2>
                        <p className={styles.sectionDescription}>
                            I sit at the intersection of operations and technology, turning complex business challenges into streamlined, data-driven systems.
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
