'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Eye,
  MapPin,
  GraduationCap,
  Briefcase,
  ArrowUpRight,
  Compass,
} from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import CvPreviewModal from './CvPreviewModal';
import styles from './About.module.css';

const impactTiles = [
  {
    value: '450K+',
    label: 'Community Members',
    sub: 'Scaled across 2 platforms',
  },
  {
    value: '-25%',
    label: 'Clinical Wait-Time Cut',
    sub: '40 min -> 30 min redesign',
  },
  {
    value: '17',
    label: 'Study Guides & Tracker',
    sub: 'Bilingual Next.js + Supabase',
  },
  {
    value: '3',
    label: 'Bridged Domains',
    sub: 'PMO · SAP/BI · Web/App',
  },
];

interface TimelineEntry {
  id: string;
  period: string;
  role: string;
  org: string;
  type: 'work' | 'education';
  summary: string;
  projectSlug?: string;
}

const timelineEntries: TimelineEntry[] = [
  {
    id: 'fh-swf-coord',
    period: '03/2026 – Present',
    role: 'Web & Project Coordinator',
    org: 'Fachhochschule Südwestfalen',
    type: 'work',
    summary:
      'Administer the official IMIS university portal with FirstSpirit CMS privileges and coordinate cross-functional campus events and web releases on Jira Kanban boards.',
    projectSlug: 'fh-swf-digital-ops',
  },
  {
    id: 'nextep-edu',
    period: '05/2025 – 03/2026',
    role: 'Technical Project Lead',
    org: 'NexTep Edu',
    type: 'work',
    summary:
      'Mapped end-to-end student admissions in BPMN 2.0, deployed the bilingual 17-country Next.js platform, and shipped a private Supabase self-service application tracker.',
    projectSlug: 'nextep-edu',
  },
  {
    id: 'ma-imis',
    period: '03/2025 – Present',
    role: 'M.A. International Management & Information Systems (IMIS)',
    org: 'Fachhochschule Südwestfalen · Soest, Germany',
    type: 'education',
    summary:
      'Graduate specialization in SAP BW/4HANA data warehousing, BPMN 2.0 process management, enterprise information systems, and digital transformation.',
    projectSlug: 'sap-bw4hana-edw',
  },
  {
    id: 'renaissance',
    period: '02/2023 – 03/2024',
    role: 'Data & Operations Analyst',
    org: 'Renaissance Diagnostic Care',
    type: 'work',
    summary:
      'Mapped clinical patient flows to cut average on-site wait times by 25% (40 to 30 min) and ran daily ETL demographic & reagent analytics across 100+ patient samples.',
    projectSlug: 'renaissance-diagnostic',
  },
  {
    id: 'bba',
    period: '10/2016 – 05/2022',
    role: 'B.B.A. in Management (Grade: 2.1)',
    org: 'National University, Bangladesh',
    type: 'education',
    summary:
      'Built core foundations in Business Statistics, Operations & Supply Chain Management, Information Technology, and Financial Management.',
  },
];

const languages = [
  { name: 'Bengali', level: 'Native', dots: 5 },
  { name: 'English', level: 'C1 · IELTS 7.0', dots: 4 },
  { name: 'German', level: 'A2 · Elementary', dots: 2 },
];

const quickFacts = [
  { icon: MapPin, label: 'Location', value: 'Soest, Germany (CET/CEST)' },
  { icon: GraduationCap, label: 'Degree', value: 'M.A. IMIS · 3rd Semester' },
  { icon: Briefcase, label: 'Target Roles', value: 'Working Student · PMO · SAP/BI' },
];

export default function About() {
  const [activeTimelineId, setActiveTimelineId] = useState<string>(timelineEntries[0].id);
  const [isCvOpen, setIsCvOpen] = useState(false);

  // Listen for global `portfolio:open-cv` events from Navbar, Hero, CommandPalette, or Contact
  useEffect(() => {
    const handleOpenCv = () => setIsCvOpen(true);
    window.addEventListener('portfolio:open-cv', handleOpenCv);
    return () => window.removeEventListener('portfolio:open-cv', handleOpenCv);
  }, []);

  const handleOpenProjectCaseStudy = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('portfolio:open-project', { detail: { slug } }));
    const workSection = document.getElementById('work');
    workSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className={styles.about} aria-label="About Md Rezaul Karim">
      <div className={styles.container}>
        <ScrollReveal>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Executive Profile</span>
            <h2 className={styles.sectionTitle}>People · Process · Technology</h2>
          </div>
        </ScrollReveal>

        {/* 4-Tile Animated Impact Strip */}
        <ScrollReveal delay={0.05}>
          <div className={styles.impactStrip} aria-label="Quantified career highlights">
            {impactTiles.map((tile, idx) => (
              <motion.div
                key={tile.label}
                className={styles.impactTile}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.38, delay: idx * 0.07 }}
              >
                <span className={styles.impactValue}>{tile.value}</span>
                <span className={styles.impactLabel}>{tile.label}</span>
                <span className={styles.impactSub}>{tile.sub}</span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        <div className={styles.bentoGrid} style={{ marginTop: 22 }}>
          {/* Left Column: Editorial Thesis + Interactive Career Timeline */}
          <div className={styles.leftStack}>
            <ScrollReveal delay={0.1}>
              <div className={styles.bentoCard}>
                <span className={styles.cardLabel}>
                  <Compass size={14} aria-hidden="true" />
                  Operating Thesis
                </span>
                <h3 className={styles.thesisHeadline}>
                  Making organizations run measurably smarter where operational rigor meets applied engineering.
                </h3>
                <p className={styles.bio}>
                  I am a 3rd-semester Master&apos;s candidate in{' '}
                  <strong>International Management and Information Systems (IMIS)</strong> at
                  Fachhochschule Südwestfalen, specializing in SAP BW/4HANA data warehousing,
                  BPMN 2.0 process optimization, and agile IT project delivery. Across roles at{' '}
                  <strong>FH Südwestfalen</strong>, <strong>NexTep Edu</strong>, and{' '}
                  <strong>Renaissance Diagnostic Care</strong>, I have translated messy operational
                  bottlenecks into structured Jira workflows, self-service tracking systems, and a{' '}
                  <strong>25% reduction in clinical patient wait times</strong>.
                </p>
                <p className={styles.bio}>
                  Beyond institutional work, I founded <strong>PetBhai</strong>—a live bilingual
                  (EN/BN) Web PWA and native Android ecosystem combining pet commerce, multi-tier
                  SKU inventory logic, live community Q&amp;A, and clinic booking to fund street
                  animal rescue—alongside two community networks scaled to{' '}
                  <strong>450,000+ members</strong>. I approach every initiative through{' '}
                  <strong>People, Process, and Technology</strong>: understand stakeholders first,
                  map clean workflows second, and ship practical systems that teams actually adopt.
                </p>

                <div className={styles.cvActions}>
                  <motion.button
                    type="button"
                    onClick={() => setIsCvOpen(true)}
                    className={styles.previewCvBtn}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Eye size={17} />
                    <span>Preview CV</span>
                  </motion.button>
                  <motion.a
                    href="/resume.pdf"
                    download="Md-Rezaul-Karim-CV.pdf"
                    className={styles.downloadCvBtn}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Download size={17} />
                    <span>Download PDF</span>
                  </motion.a>
                </div>
              </div>
            </ScrollReveal>

            {/* Interactive Career & Education Timeline */}
            <ScrollReveal delay={0.16}>
              <div className={styles.bentoCard}>
                <div className={styles.timelineHeader}>
                  <h3 className={styles.timelineTitle}>Career &amp; Education Timeline</h3>
                  <span className={styles.timelineHint}>Select any milestone</span>
                </div>

                <div className={styles.timelineList} role="list">
                  {timelineEntries.map((entry) => {
                    const isActive = activeTimelineId === entry.id;
                    const Icon = entry.type === 'education' ? GraduationCap : Briefcase;

                    return (
                      <div
                        key={entry.id}
                        role="listitem"
                        className={`${styles.timelineItem} ${
                          isActive ? styles.timelineItemActive : ''
                        }`}
                      >
                        <button
                          type="button"
                          aria-expanded={isActive}
                          onClick={() => setActiveTimelineId(entry.id)}
                          className={styles.timelineTrigger}
                        >
                          <div className={styles.timelineTop}>
                            <div className={styles.timelineLeft}>
                              <span className={styles.timelineDot} aria-hidden="true">
                                <Icon size={15} />
                              </span>
                              <div>
                                <span className={styles.timelineRole}>{entry.role}</span>
                                <span className={styles.timelineOrg}>{entry.org}</span>
                              </div>
                            </div>
                            <span className={styles.timelinePeriod}>{entry.period}</span>
                          </div>
                        </button>

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.22 }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div className={styles.timelineDetails}>
                                <p className={styles.timelineSummary}>{entry.summary}</p>
                                {entry.projectSlug && (
                                  <button
                                    type="button"
                                    onClick={(e) =>
                                      handleOpenProjectCaseStudy(e, entry.projectSlug!)
                                    }
                                    className={styles.timelineCaseLink}
                                  >
                                    Inspect related case study
                                    <ArrowUpRight size={14} />
                                  </button>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: At a Glance, Languages & PPT Pillars */}
          <div className={styles.rightStack}>
            <ScrollReveal delay={0.14}>
              <aside className={styles.bentoCard} aria-label="Profile overview and languages">
                <h3 className={styles.sidebarHeading}>At a Glance</h3>
                <div className={styles.factsList}>
                  {quickFacts.map((fact) => (
                    <div key={fact.label} className={styles.factRow}>
                      <div className={styles.factIcon} aria-hidden="true">
                        <fact.icon size={18} strokeWidth={1.75} />
                      </div>
                      <div className={styles.factText}>
                        <span className={styles.infoLabel}>{fact.label}</span>
                        <span className={styles.infoValue}>{fact.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.sidebarDivider} />

                <h3 className={styles.sidebarHeading}>Languages</h3>
                <div className={styles.languagesList}>
                  {languages.map((lang) => (
                    <div
                      key={lang.name}
                      className={styles.languageRow}
                      aria-label={`${lang.name}: ${lang.level}`}
                    >
                      <div className={styles.languageMeta}>
                        <span className={styles.languageName}>{lang.name}</span>
                        <span className={styles.languageLevel}>{lang.level}</span>
                      </div>
                      <div className={styles.langDots} aria-hidden="true">
                        {[1, 2, 3, 4, 5].map((dot) => (
                          <span
                            key={dot}
                            className={`${styles.langDot} ${
                              dot <= lang.dots ? styles.langDotFilled : ''
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.sidebarDivider} />

                <h3 className={styles.sidebarHeading}>PPT Decision Lens</h3>
                <div className={styles.pptGrid}>
                  <div className={styles.pptCell}>
                    <span className={styles.pptKey}>01 People</span>
                    <p className={styles.pptDesc}>Align owners &amp; incentives first.</p>
                  </div>
                  <div className={styles.pptCell}>
                    <span className={styles.pptKey}>02 Process</span>
                    <p className={styles.pptDesc}>Map BPMN &amp; strip handoff drag.</p>
                  </div>
                  <div className={styles.pptCell}>
                    <span className={styles.pptKey}>03 Tech</span>
                    <p className={styles.pptDesc}>Ship lean SAP, BI &amp; web tools.</p>
                  </div>
                </div>
              </aside>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Inline CV Preview Modal */}
      <CvPreviewModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
    </section>
  );
}
