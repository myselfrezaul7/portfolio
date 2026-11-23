'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  LayoutList,
  MapPin,
  Linkedin,
  Globe,
} from 'lucide-react';
import styles from './CvPreviewModal.module.css';

interface CvPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CvModalInner({ onClose }: { onClose: () => void }) {
  const [viewMode, setViewMode] = useState<'pdf' | 'summary'>(() =>
    typeof window !== 'undefined' && window.innerWidth < 768 ? 'summary' : 'pdf'
  );
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 60);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-preview-modal-title"
        className={styles.modal}
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 18 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <div className={styles.docBadge} aria-hidden="true">
              <FileText size={18} />
            </div>
            <div>
              <h2 id="cv-preview-modal-title" className={styles.modalTitle}>
                Curriculum Vitae · Md Rezaul Karim
              </h2>
              <span className={styles.modalSubtitle}>
                M.A. IMIS · Agile PMO · SAP BI &amp; Process Operations
              </span>
            </div>
          </div>

          <div className={styles.controls}>
            <div className={styles.modeSwitch} role="tablist" aria-label="CV view format">
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'summary'}
                onClick={() => setViewMode('summary')}
                className={`${styles.modeBtn} ${
                  viewMode === 'summary' ? styles.modeBtnActive : ''
                }`}
              >
                <LayoutList size={13} />
                <span>Executive View</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'pdf'}
                onClick={() => setViewMode('pdf')}
                className={`${styles.modeBtn} ${
                  viewMode === 'pdf' ? styles.modeBtnActive : ''
                }`}
              >
                <FileText size={13} />
                <span>PDF Document</span>
              </button>
            </div>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.actionBtn} ${styles.openNewTabBtn}`}
            >
              <ExternalLink size={13} />
              <span>Open Tab</span>
            </a>

            <a
              href="/resume.pdf"
              download="Md-Rezaul-Karim-CV.pdf"
              className={`${styles.actionBtn} ${styles.downloadBtn}`}
            >
              <Download size={13} />
              <span>Download PDF</span>
            </a>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className={styles.closeBtn}
              aria-label="Close CV preview"
            >
              <X size={17} />
            </button>
          </div>
        </header>

        {/* Modal Body */}
        <div className={styles.body}>
          {viewMode === 'pdf' ? (
            <div className={styles.pdfStage}>
              <iframe
                src="/resume.pdf#view=FitH"
                title="Md Rezaul Karim Curriculum Vitae PDF"
                className={styles.pdfFrame}
              />
              <div className={styles.pdfFallbackBar}>
                <span>
                  Reading on mobile or prefer instant skimming?{' '}
                  <button
                    type="button"
                    onClick={() => setViewMode('summary')}
                    className={styles.inlineLinkBtn}
                  >
                    Switch to Executive View
                  </button>
                </span>
                <span>2-page English CV · Updated 2026</span>
              </div>
            </div>
          ) : (
            <div className={styles.summaryScroll}>
              <div className={styles.cvSheet}>
                {/* Header Summary */}
                <section className={styles.cvHeaderCard}>
                  <h3 className={styles.cvName}>Md Rezaul Karim</h3>
                  <p className={styles.cvHeadline}>
                    Master&apos;s Student in International Management &amp; Information Systems (IMIS)
                  </p>
                  <div className={styles.cvMetaPills}>
                    <span className={styles.cvMetaPill}>
                      <MapPin size={12} />
                      Soest, Germany
                    </span>
                    <a
                      href="https://www.linkedin.com/in/myselfkarim"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.cvMetaPill}
                    >
                      <Linkedin size={12} />
                      linkedin.com/in/myselfkarim
                    </a>
                    <span className={styles.cvMetaPill}>
                      <Globe size={12} />
                      Download PDF for direct phone &amp; email
                    </span>
                  </div>
                  <p className={styles.cvSummaryText}>
                    IMIS Master&apos;s student with hands-on experience in agile project coordination, BPMN 2.0 process improvement, and operational BI reporting. Skilled in managing Jira task backlogs, administering university web portals via CMS, building SAP BW/4HANA and Power BI analytics, and shipping production web &amp; Android ecosystems. Seeking Working Student, Internship, or Master Thesis opportunities in IT Project Management, PMO, Process Excellence, or BI Analytics.
                  </p>
                </section>

                {/* Experience */}
                <section className={styles.cvSection}>
                  <h4 className={styles.cvSectionTitle}>Experience</h4>
                  <div className={styles.cvEntries}>
                    <div>
                      <div className={styles.cvEntryHeader}>
                        <div>
                          <span className={styles.cvRole}>Web &amp; Project Coordinator (Volunteer)</span>{' '}
                          <span className={styles.cvOrg}>· Fachhochschule Südwestfalen</span>
                        </div>
                        <span className={styles.cvPeriod}>03/2026 – Present</span>
                      </div>
                      <ul className={styles.cvBullets}>
                        <li>
                          Maintain and update the official IMIS web portal with CMS administrator access granted by faculty leadership and the university web office.
                        </li>
                        <li>
                          Coordinate web releases and campus event logistics, tracking deliverables and deadlines across cross-functional teams on Jira Kanban boards.
                        </li>
                        <li>
                          Translate stakeholder requirements into actionable tickets and clear editorial documentation.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <div className={styles.cvEntryHeader}>
                        <div>
                          <span className={styles.cvRole}>Technical Project Lead</span>{' '}
                          <span className={styles.cvOrg}>· NexTep Edu (nextepedu.com)</span>
                        </div>
                        <span className={styles.cvPeriod}>05/2025 – 03/2026</span>
                      </div>
                      <ul className={styles.cvBullets}>
                        <li>
                          Architected and deployed the bilingual digital platform (Next.js, 17 country guides) and hosting infrastructure for an international education consultancy.
                        </li>
                        <li>
                          Mapped end-to-end operational procedures using BPMN 2.0 and AI-assisted workflows, reducing manual data entry and processing overhead.
                        </li>
                        <li>
                          Shipped a private Supabase-backed self-service application tracker giving students live stage visibility without manual follow-ups.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <div className={styles.cvEntryHeader}>
                        <div>
                          <span className={styles.cvRole}>Data &amp; Operations Analyst</span>{' '}
                          <span className={styles.cvOrg}>· Renaissance Diagnostic Care</span>
                        </div>
                        <span className={styles.cvPeriod}>02/2023 – 03/2024</span>
                      </div>
                      <ul className={styles.cvBullets}>
                        <li>
                          Mapped the clinical patient journey and redesigned appointment booking, cutting average on-site wait time by 25% (from 40 to 30 minutes).
                        </li>
                        <li>
                          Extracted and cleaned demographic data on urban and rural patients through ETL processes across 100+ daily lab samples to guide resource and outreach planning.
                        </li>
                        <li>
                          Built visual KPI reports, dashboards, and supply-chain reagent tracking routines for clinic leadership.
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Education & SAP Project */}
                <section className={styles.cvSection}>
                  <h4 className={styles.cvSectionTitle}>Education &amp; Enterprise BI Project</h4>
                  <div className={styles.cvEntries}>
                    <div>
                      <div className={styles.cvEntryHeader}>
                        <div>
                          <span className={styles.cvRole}>
                            M.A. International Management &amp; Information Systems (IMIS)
                          </span>{' '}
                          <span className={styles.cvOrg}>· Fachhochschule Südwestfalen</span>
                        </div>
                        <span className={styles.cvPeriod}>03/2025 – Present</span>
                      </div>
                      <ul className={styles.cvBullets}>
                        <li>
                          Focus: SAP-integrated management, business intelligence, digital transformation, and enterprise information systems.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <div className={styles.cvEntryHeader}>
                        <div>
                          <span className={styles.cvRole}>
                            SAP BW/4HANA: End-to-End Enterprise Data Warehousing
                          </span>{' '}
                          <span className={styles.cvOrg}>· Academic BI Architecture</span>
                        </div>
                        <span className={styles.cvPeriod}>09/2025 – 12/2025</span>
                      </div>
                      <ul className={styles.cvBullets}>
                        <li>
                          Built a multi-layer EDW in SAP HANA Studio with DataSources, Transformations, ADSOs, Master Data hierarchies, CompositeProviders, and executive BW Queries.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <div className={styles.cvEntryHeader}>
                        <div>
                          <span className={styles.cvRole}>
                            B.B.A. in Management (Grade: 2.1)
                          </span>{' '}
                          <span className={styles.cvOrg}>· National University, Bangladesh</span>
                        </div>
                        <span className={styles.cvPeriod}>10/2016 – 05/2022</span>
                      </div>
                      <ul className={styles.cvBullets}>
                        <li>
                          Business Statistics, Information Technology, Operations &amp; Supply Chain Management, and Financial Management.
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Skills & Languages */}
                <section className={styles.cvSection}>
                  <h4 className={styles.cvSectionTitle}>Skills &amp; Languages</h4>
                  <div className={styles.cvSkillsGrid}>
                    <div className={styles.cvSkillBox}>
                      <span className={styles.cvSkillLabel}>Project &amp; Process Management</span>
                      <p className={styles.cvSkillItems}>
                        Agile (Scrum, Kanban), BPMN 2.0, Process Mapping, Jira, Confluence, SAP Signavio
                      </p>
                    </div>
                    <div className={styles.cvSkillBox}>
                      <span className={styles.cvSkillLabel}>Data Analytics &amp; ERP</span>
                      <p className={styles.cvSkillItems}>
                        Power BI, Tableau, Advanced Excel, SQL, SAP BW/4HANA, KNIME, ETL Pipelines
                      </p>
                    </div>
                    <div className={styles.cvSkillBox}>
                      <span className={styles.cvSkillLabel}>Full-Stack, Cloud &amp; Applied Systems</span>
                      <p className={styles.cvSkillItems}>
                        Next.js, React, TypeScript, Supabase, Git/GitHub, Vercel CI/CD, AI Workflow Automation
                      </p>
                    </div>
                    <div className={styles.cvSkillBox}>
                      <span className={styles.cvSkillLabel}>Languages</span>
                      <p className={styles.cvSkillItems}>
                        Bengali (Native) · English (C1 · IELTS 7.0) · German (A2 · Elementary)
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CvPreviewModal({ isOpen, onClose }: CvPreviewModalProps) {
  return (
    <AnimatePresence>
      {isOpen && <CvModalInner key="cv-modal-instance" onClose={onClose} />}
    </AnimatePresence>
  );
}
