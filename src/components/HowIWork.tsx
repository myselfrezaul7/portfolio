'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Rocket, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './HowIWork.module.css';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Diagnose & Analyse',
    description:
      'Audit existing operational workflows through stakeholder interviews, log reconciliation, and BPMN 2.0 As-Is mapping to isolate root-cause bottlenecks and handoff drag.',
    artifacts: ['BPMN 2.0 As-Is Map', 'Stakeholder Audit', 'Baseline KPIs'],
  },
  {
    icon: FileText,
    number: '02',
    title: 'Design & Optimise',
    description:
      'Architect clean To-Be process models, normalized SAP or SQL schemas, and focused dashboards so teams see exceptions before they become delays.',
    artifacts: ['To-Be Process Flow', 'ADSO / SQL Schema', 'Interactive Prototype'],
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Implement & Scale',
    description:
      'Ship production tooling with plain-language documentation, KPI governance routines, and agile review loops that stay reliable without constant manual babysitting.',
    artifacts: ['Production Release', 'SOP Playbook', 'KPI Governance'],
  },
];

interface TraceExample {
  id: string;
  label: string;
  metric: string;
  projectSlug: string;
  outcome: string;
  diagnose: string;
  design: string;
  implement: string;
}

const TRACE_EXAMPLES: TraceExample[] = [
  {
    id: 'renaissance',
    label: 'Renaissance Care',
    metric: '-25% Wait',
    projectSlug: 'renaissance-diagnostic',
    outcome: 'Result: Average wait cut from 40 min -> 30 min + rural outreach launched',
    diagnose:
      'Mapped reception-to-lab patient queues across 100+ daily pathology samples and reconciled manual stock & demographic logs.',
    design:
      'Redesigned appointment booking handoffs and built locked validation sheets feeding weekly urban-vs-rural PowerPoint BI decks.',
    implement:
      'Rolled out simplified slot triage (-25% wait time) and enabled management to launch targeted rural diagnostic outreach.',
  },
  {
    id: 'nextep',
    label: 'NexTep Edu',
    metric: '17 Guides',
    projectSlug: 'nextep-edu',
    outcome: 'Result: Shared BPMN 2.0 playbook + self-service Supabase tracking portal',
    diagnose:
      'Identified scattered counselor chat handoffs and repetitive "any update on my file?" student inquiries across admissions.',
    design:
      'Modeled end-to-end eligibility and offer gateways in BPMN 2.0 and mapped every stage 1:1 to a private Supabase tracking schema.',
    implement:
      'Shipped the bilingual Next.js platform with 17 destination guides and code-gated student application status links.',
  },
  {
    id: 'petbhai',
    label: 'PetBhai',
    metric: 'Web + Android',
    projectSlug: 'petbhai-ecosystem',
    outcome: 'Result: Live bilingual Web PWA + Android ecosystem funding animal rescue',
    diagnose:
      'Pinpointed fragile donation-based street rescue funding alongside fragmented pet commerce, stockouts, and clinic discovery.',
    design:
      'Architected a 4-state SKU inventory machine, COD courier reconciliation, live community visitor Q&A, and vet booking flows.',
    implement:
      'Launched the bilingual (EN/BN) Web PWA and native Android app channeling commerce utility into sustainable animal rescue.',
  },
];

export default function HowIWork() {
  const [activeTraceId, setActiveTraceId] = useState<string>(TRACE_EXAMPLES[0].id);
  const activeTrace =
    TRACE_EXAMPLES.find((t) => t.id === activeTraceId) ?? TRACE_EXAMPLES[0];

  const handleOpenCaseStudy = (slug: string) => {
    window.dispatchEvent(new CustomEvent('portfolio:open-project', { detail: { slug } }));
    const workEl = document.getElementById('work');
    workEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="process" className={styles.howIWork} aria-label="How I work delivery process">
      <div className={styles.container}>
        <ScrollReveal>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Execution Methodology</span>
            <h2 className={styles.sectionTitle}>How I Work</h2>
            <p className={styles.sectionSubtitle}>
              A repeatable three-stage operating loop connecting diagnostic clarity to deployed business systems.
            </p>
          </div>
        </ScrollReveal>

        {/* Animated 3-Stage Pipeline */}
        <div className={styles.stepsContainer}>
          <div className={styles.pipelineTrack} aria-hidden="true">
            <div className={styles.pipelineBeam} />
          </div>

          <div className={styles.stepsGrid}>
            {steps.map((step, index) => (
              <div key={step.number} className={styles.stepSlot}>
                <ScrollReveal delay={index * 0.12} className={styles.revealWrapper}>
                  <motion.div
                    className={styles.stepCard}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className={styles.stepTopRow}>
                      <div className={styles.iconWrapper} aria-hidden="true">
                        <step.icon size={22} strokeWidth={1.65} />
                      </div>
                      <span className={styles.stepNumber}>PHASE {step.number}</span>
                    </div>

                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>

                    <div className={styles.artifactsWrap}>
                      <span className={styles.artifactsLabel}>Concrete Artifacts</span>
                      <div className={styles.artifactChips}>
                        {step.artifacts.map((artifact) => (
                          <span key={artifact} className={styles.artifactChip}>
                            {artifact}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>

        {/* Compact "See It In Action" Interactive Project Trace Switcher */}
        <ScrollReveal delay={0.18}>
          <div className={styles.traceCard}>
            <div className={styles.traceHeader}>
              <div className={styles.traceTitleGroup}>
                <span className={styles.traceEyebrow}>See It In Action</span>
                <h3 className={styles.traceHeading}>Real 3-Step Delivery Trace</h3>
              </div>

              <div
                className={styles.traceSwitcher}
                role="tablist"
                aria-label="Choose a real project process trace"
              >
                {TRACE_EXAMPLES.map((example) => {
                  const isActive = example.id === activeTrace.id;
                  return (
                    <button
                      key={example.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTraceId(example.id)}
                      className={`${styles.traceTab} ${
                        isActive ? styles.traceTabActive : ''
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="howIWorkActiveTraceTab"
                          className={styles.traceTabBg}
                          transition={{ type: 'spring', stiffness: 450, damping: 36 }}
                        />
                      )}
                      <span className={styles.traceTabText}>
                        <span>{example.label}</span>
                        <span className={styles.traceTabMetric}>({example.metric})</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrace.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.traceSteps}>
                  <div className={styles.traceStepBox}>
                    <span className={styles.traceStepTag}>01 · DIAGNOSE</span>
                    <p className={styles.traceStepText}>{activeTrace.diagnose}</p>
                  </div>
                  <div className={styles.traceStepBox}>
                    <span className={styles.traceStepTag}>02 · DESIGN</span>
                    <p className={styles.traceStepText}>{activeTrace.design}</p>
                  </div>
                  <div className={styles.traceStepBox}>
                    <span className={styles.traceStepTag}>03 · IMPLEMENT</span>
                    <p className={styles.traceStepText}>{activeTrace.implement}</p>
                  </div>
                </div>

                <div className={styles.traceFooter}>
                  <span className={styles.traceOutcomePill}>{activeTrace.outcome}</span>
                  <button
                    type="button"
                    onClick={() => handleOpenCaseStudy(activeTrace.projectSlug)}
                    className={styles.traceCaseLink}
                  >
                    <span>Inspect {activeTrace.label} Case Study</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
