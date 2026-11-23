'use client';

import { motion } from 'framer-motion';
import { Settings, BarChart3, Code2, CheckCircle2, ArrowRight, type LucideIcon } from 'lucide-react';
import type { ProjectDomainLens } from '@/data/projects';
import { useTilt } from '@/hooks/useTilt';
import ScrollReveal from './animations/ScrollReveal';
import styles from './Services.module.css';

interface ServicePillar {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  deliverables: string[];
  skills: string[];
  lens: Exclude<ProjectDomainLens, 'All'>;
}

const services: ServicePillar[] = [
  {
    number: '01',
    icon: Settings,
    title: 'Process Excellence & Agile PMO',
    description:
      'Map end-to-end operational workflows, eliminate handoff bottlenecks, and run disciplined Jira & BPMN 2.0 execution through the People, Process, and Technology lens.',
    deliverables: [
      'BPMN 2.0 As-Is / To-Be process blueprints',
      'Patient, intake & fulfillment bottleneck audits',
      'Jira Kanban boards & SOP governance playbooks',
    ],
    skills: ['SAP Signavio', 'BPMN 2.0', 'Jira & Confluence', 'PPT Framework'],
    lens: 'Process & Agile PMO',
  },
  {
    number: '02',
    icon: BarChart3,
    title: 'Data Analytics & SAP BI',
    description:
      'Turn fragmented operational logs into structured SAP BW/4HANA data models, clean ETL pipelines, and executive KPI dashboards that drive measurable management decisions.',
    deliverables: [
      'SAP BW/4HANA Star Schema, ADSOs & BW Queries',
      'Power BI, Tableau & validated Excel KPI trackers',
      'Demographic & supply-chain ETL reporting decks',
    ],
    skills: ['SAP BW/4HANA', 'Power BI', 'KNIME & ETL', 'SQL & Excel'],
    lens: 'Data & SAP BI',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Digital Platforms & Systems Delivery',
    description:
      'Bridge business requirements and shipped software—coordinating CMS governance, bilingual web PWAs, Android apps, and self-service Supabase portals.',
    deliverables: [
      'Bilingual Web PWA & native Android ecosystems',
      'Private Supabase self-service tracking portals',
      'Enterprise CMS publishing & Vercel CI/CD ops',
    ],
    skills: ['Next.js / React', 'Supabase', 'FirstSpirit CMS', 'Vercel CI/CD'],
    lens: 'Platforms & Ecosystems',
  },
];

function ServiceCard({
  service,
  index,
  onFilterWork,
}: {
  service: ServicePillar;
  index: number;
  onFilterWork: (lens: Exclude<ProjectDomainLens, 'All'>) => void;
}) {
  const { ref, style, handlers } = useTilt<HTMLDivElement>({
    maxDeg: 2.5,
    perspective: 1000,
    scale: 1.01,
    speed: 380,
  });

  const Icon = service.icon;

  return (
    <motion.div
      className={styles.cardSlot}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.42, delay: index * 0.1 }}
    >
      <div ref={ref} style={style} className={styles.card} {...handlers}>
        <div className={styles.cardInner}>
          <div className={styles.topRow}>
            <div className={styles.iconWrapper} aria-hidden="true">
              <Icon size={25} strokeWidth={1.65} />
            </div>
            <span className={styles.pillarIndex}>PILLAR {service.number}</span>
          </div>

          <h3 className={styles.cardTitle}>{service.title}</h3>
          <p className={styles.cardDescription}>{service.description}</p>

          <div className={styles.deliverablesBox}>
            <span className={styles.deliverablesLabel}>Key Deliverables</span>
            <ul className={styles.deliverablesList}>
              {service.deliverables.map((item) => (
                <li key={item} className={styles.deliverableItem}>
                  <CheckCircle2 size={14} className={styles.checkIcon} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.skills}>
            {service.skills.map((skill) => (
              <span key={skill} className={styles.skillTag}>
                {skill}
              </span>
            ))}
          </div>

          <div className={styles.cardFooter}>
            <button
              type="button"
              onClick={() => onFilterWork(service.lens)}
              className={styles.relatedWorkBtn}
            >
              <span>See Related Work</span>
              <ArrowRight size={15} className={styles.btnArrow} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const handleFilterWork = (lens: Exclude<ProjectDomainLens, 'All'>) => {
    window.dispatchEvent(
      new CustomEvent('portfolio:filter-projects', { detail: { lens } })
    );
    const workSection = document.getElementById('work');
    workSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className={styles.services} aria-label="Core competencies and deliverables">
      <div className={styles.container}>
        <ScrollReveal>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Outcome-Driven Capabilities</span>
            <h2 className={styles.sectionTitle}>Core Competencies</h2>
            <p className={styles.sectionDescription}>
              I operate at the intersection of business processes, SAP &amp; BI analytics, and digital product execution—turning ambiguous bottlenecks into measurable systems.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              onFilterWork={handleFilterWork}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
