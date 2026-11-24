'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useMobileCarousel } from '@/hooks/useMobileCarousel';
import MobileCarouselControls from './ui/MobileCarouselControls';
import ScrollReveal from './animations/ScrollReveal';
import styles from './SkillsRadar.module.css';

type RoleFitLens = 'Full Profile' | 'PMO & Process' | 'Data & SAP BI';

interface RadarAxis {
  id: string;
  name: string;
  shortLabel: string;
  summary: string;
  proofProjects: { slug: string; label: string }[];
}

const RADAR_AXES: RadarAxis[] = [
  {
    id: 'process',
    name: 'Process Design',
    shortLabel: 'Process Design',
    summary: 'BPMN 2.0 modeling, patient-journey redesign, and SOP workflows that remove operational drag.',
    proofProjects: [
      { slug: 'renaissance-diagnostic', label: 'Renaissance (-25% Wait)' },
      { slug: 'nextep-edu', label: 'NexTep Edu (BPMN 2.0)' },
    ],
  },
  {
    id: 'pmo',
    name: 'Project Management',
    shortLabel: 'Agile PMO',
    summary: 'Cross-functional Jira Kanban execution, CMS governance, and stakeholder delivery.',
    proofProjects: [
      { slug: 'fh-swf-digital-ops', label: 'FH SWF (Jira + CMS)' },
      { slug: 'nextep-edu', label: 'NexTep Edu (Tech Lead)' },
    ],
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain Ops',
    shortLabel: 'Supply Chain',
    summary: 'Multi-tier SKU inventory state machines, fulfillment routing, and clinical stock tracking.',
    proofProjects: [
      { slug: 'petbhai-ecosystem', label: 'PetBhai (SKU Logic)' },
      { slug: 'renaissance-diagnostic', label: 'Renaissance (Lab Stock)' },
    ],
  },
  {
    id: 'tech',
    name: 'Tech Integration',
    shortLabel: 'Tech & Systems',
    summary: 'Shipping Next.js web PWAs, Android apps, Supabase portals, and AI-assisted workflows.',
    proofProjects: [
      { slug: 'petbhai-ecosystem', label: 'PetBhai (Web + Android)' },
      { slug: 'nextep-edu', label: 'NexTep Edu (Supabase)' },
    ],
  },
  {
    id: 'data',
    name: 'Data & SAP BI',
    shortLabel: 'Data & SAP BI',
    summary: 'SAP BW/4HANA Star Schema EDW modeling, ETL cleaning, Power BI, and KPI reporting.',
    proofProjects: [
      { slug: 'sap-bw4hana-edw', label: 'SAP BW/4HANA EDW' },
      { slug: 'renaissance-diagnostic', label: 'Renaissance (ETL BI)' },
    ],
  },
  {
    id: 'strategy',
    name: 'Business Strategy',
    shortLabel: 'Strategy & Scale',
    summary: 'People-Process-Tech alignment, executive storytelling, and 450K+ community governance.',
    proofProjects: [
      { slug: 'community-operations', label: 'Community Ops (450K+)' },
      { slug: 'petbhai-ecosystem', label: 'PetBhai (Animal Welfare)' },
    ],
  },
];

const LENS_PROFILES: Record<RoleFitLens, number[]> = {
  'Full Profile': [90, 86, 84, 82, 85, 78],
  'PMO & Process': [95, 93, 86, 78, 74, 86],
  'Data & SAP BI': [82, 76, 88, 84, 95, 74],
};

const ROLE_LENSES: RoleFitLens[] = ['Full Profile', 'PMO & Process', 'Data & SAP BI'];

interface SkillChipItem {
  name: string;
  level: number;
  axisIndex: number;
  proof: string;
  projectSlug: string;
  projectLabel: string;
}

interface SkillCategory {
  title: string;
  skills: SkillChipItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Product & Process Management',
    skills: [
      {
        name: 'BPMN 2.0',
        level: 5,
        axisIndex: 0,
        proof: 'Mapped NexTep Edu admissions into a decision-gateway playbook used daily by staff.',
        projectSlug: 'nextep-edu',
        projectLabel: 'NexTep Edu',
      },
      {
        name: 'SAP Signavio',
        level: 4,
        axisIndex: 0,
        proof: 'Process modeling and handoff-bottleneck optimization across IMIS case studies.',
        projectSlug: 'renaissance-diagnostic',
        projectLabel: 'Renaissance Care',
      },
      {
        name: 'Agile Scrum & Kanban',
        level: 4,
        axisIndex: 1,
        proof: 'Delivered 100% of tracked campus event subtasks across teams at FH Südwestfalen.',
        projectSlug: 'fh-swf-digital-ops',
        projectLabel: 'FH Südwestfalen',
      },
      {
        name: 'Jira & Confluence',
        level: 4,
        axisIndex: 1,
        proof: 'Owned backlog decomposition, assignees, cost tracking, and release documentation.',
        projectSlug: 'fh-swf-digital-ops',
        projectLabel: 'FH Südwestfalen',
      },
      {
        name: 'PPT Framework',
        level: 5,
        axisIndex: 5,
        proof: 'Structured 5-moderator shift governance and emergency SOPs for 450K+ members.',
        projectSlug: 'community-operations',
        projectLabel: 'Community Ops',
      },
    ],
  },
  {
    title: 'Data Analytics & SAP ERP',
    skills: [
      {
        name: 'SAP BW/4HANA',
        level: 4,
        axisIndex: 4,
        proof: 'Engineered DataSources, ADSO layers, CompositeProviders, and executive BW Queries.',
        projectSlug: 'sap-bw4hana-edw',
        projectLabel: 'SAP BW/4HANA EDW',
      },
      {
        name: 'Power BI',
        level: 4,
        axisIndex: 4,
        proof: 'Turned raw operational datasets into clear weekly KPI dashboards for management.',
        projectSlug: 'renaissance-diagnostic',
        projectLabel: 'Renaissance Care',
      },
      {
        name: 'KNIME & ETL Pipelines',
        level: 4,
        axisIndex: 4,
        proof: 'Extracted & reconciled urban/rural patient demographics across 100+ daily lab samples.',
        projectSlug: 'renaissance-diagnostic',
        projectLabel: 'Renaissance Care',
      },
      {
        name: 'Supply Chain & SKU Logic',
        level: 4,
        axisIndex: 2,
        proof: 'Modeled 4-state SKU stock machines, reorder alerts, and courier flows for PetBhai.',
        projectSlug: 'petbhai-ecosystem',
        projectLabel: 'PetBhai Ecosystem',
      },
      {
        name: 'KPI Tracking & Audits',
        level: 5,
        axisIndex: 2,
        proof: 'Cut clinical wait time 25% (40m -> 30m) and eliminated reagent stock discrepancies.',
        projectSlug: 'renaissance-diagnostic',
        projectLabel: 'Renaissance Care',
      },
    ],
  },
  {
    title: 'Tech, AI & Operations',
    skills: [
      {
        name: 'AI-Assisted Workflows',
        level: 5,
        axisIndex: 3,
        proof: 'Accelerated NexTep Edu & PetBhai delivery from BPMN design to live production.',
        projectSlug: 'nextep-edu',
        projectLabel: 'NexTep Edu',
      },
      {
        name: 'Prompt Engineering',
        level: 4,
        axisIndex: 3,
        proof: 'Automated documentation, multilingual content QA, and structured data checks.',
        projectSlug: 'petbhai-ecosystem',
        projectLabel: 'PetBhai Ecosystem',
      },
      {
        name: 'Enterprise CMS Ops',
        level: 4,
        axisIndex: 1,
        proof: 'Administer official FH Südwestfalen IMIS web pages in FirstSpirit ContentCreator.',
        projectSlug: 'fh-swf-digital-ops',
        projectLabel: 'FH Südwestfalen',
      },
      {
        name: 'Operations at Scale',
        level: 5,
        axisIndex: 5,
        proof: 'Built 68-district vet clinic directory and cross-timezone triage for 450K+ users.',
        projectSlug: 'community-operations',
        projectLabel: 'Community Ops',
      },
    ],
  },
  {
    title: 'Full-Stack, Cloud & Applied Systems',
    skills: [
      {
        name: 'SQL & Supabase',
        level: 4,
        axisIndex: 3,
        proof: 'Built code-gated private student application tracker backed by Supabase.',
        projectSlug: 'nextep-edu',
        projectLabel: 'NexTep Edu',
      },
      {
        name: 'Next.js / React / TS',
        level: 4,
        axisIndex: 3,
        proof: 'Shipped PetBhai Web PWA + Android ecosystem and NexTep Edu 17-country site.',
        projectSlug: 'petbhai-ecosystem',
        projectLabel: 'PetBhai Ecosystem',
      },
      {
        name: 'Tableau & Advanced Excel',
        level: 4,
        axisIndex: 4,
        proof: 'Built locked-formula lab trackers & demographic charts that drove rural outreach.',
        projectSlug: 'renaissance-diagnostic',
        projectLabel: 'Renaissance Care',
      },
      {
        name: 'Git / Vercel CI/CD',
        level: 4,
        axisIndex: 3,
        proof: 'Managed versioned releases, automated deployments, and production web ops.',
        projectSlug: 'petbhai-ecosystem',
        projectLabel: 'PetBhai Ecosystem',
      },
      {
        name: 'Executive Storytelling',
        level: 4,
        axisIndex: 5,
        proof: 'Synthesized clinical & consultancy data into high-signal leadership decision decks.',
        projectSlug: 'renaissance-diagnostic',
        projectLabel: 'Renaissance Care',
      },
    ],
  },
];

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const getLabelAnchor = (index: number): 'start' | 'middle' | 'end' => {
  if (index === 0 || index === 3) return 'middle';
  if (index === 1 || index === 2) return 'start';
  return 'end';
};

export default function SkillsRadar() {
  const [activeLens, setActiveLens] = useState<RoleFitLens>('Full Profile');
  const [hoveredAxis, setHoveredAxis] = useState<number | null>(null);
  const [pinnedAxis, setPinnedAxis] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<SkillChipItem | null>(null);
  const [pinnedSkill, setPinnedSkill] = useState<SkillChipItem | null>(null);
  const lastScrubAxisRef = useRef<number | null>(null);

  const {
    trackRef: matrixTrackRef,
    activeIndex: matrixActiveIndex,
    canScrollPrev: canScrollMatrixPrev,
    canScrollNext: canScrollMatrixNext,
    scrollToIndex: scrollMatrixToIndex,
    step: stepMatrix,
  } = useMobileCarousel({ itemCount: SKILL_CATEGORIES.length });

  const scrollMatrixToAxis = useCallback(
    (axisIndex: number) => {
      if (typeof window === 'undefined' || window.innerWidth >= 768) return;
      const firstMatchingCategoryIdx = SKILL_CATEGORIES.findIndex((cat) =>
        cat.skills.some((s) => s.axisIndex === axisIndex)
      );
      if (firstMatchingCategoryIdx !== -1) {
        scrollMatrixToIndex(firstMatchingCategoryIdx);
      }
    },
    [scrollMatrixToIndex]
  );

  const activeSkill = hoveredSkill ?? pinnedSkill;

  const targetValues = LENS_PROFILES[activeLens];
  const [displayValues, setDisplayValues] = useState<number[]>(() => [...LENS_PROFILES['Full Profile']]);
  const displayValuesRef = useRef<number[]>(displayValues);

  const effectiveAxis = activeSkill
    ? activeSkill.axisIndex
    : hoveredAxis !== null
      ? hoveredAxis
      : pinnedAxis;

  // Smooth requestAnimationFrame interpolation when Role-Fit Lens or active axis boost changes
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const endValues = targetValues.map((val, idx) =>
      effectiveAxis === idx ? Math.min(100, val * 1.055) : val
    );

    if (prefersReduced) {
      displayValuesRef.current = endValues;
      const frame = requestAnimationFrame(() => setDisplayValues(endValues));
      return () => cancelAnimationFrame(frame);
    }

    const startValues = [...displayValuesRef.current];
    const duration = 360;
    const startTime = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      const next = startValues.map((s, idx) => s + (endValues[idx] - s) * eased);
      displayValuesRef.current = next;
      setDisplayValues(next);
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [targetValues, effectiveAxis]);

  const cx = 150;
  const cy = 150;
  const maxR = 100;
  const n = RADAR_AXES.length;
  const angleStep = 360 / n;
  const levels = 5;

  const radarPoints = useMemo(
    () =>
      displayValues
        .map((val, i) => {
          const r = (val / 100) * maxR;
          const pt = polarToCartesian(cx, cy, r, i * angleStep);
          return `${pt.x.toFixed(2)},${pt.y.toFixed(2)}`;
        })
        .join(' '),
    [displayValues, angleStep]
  );

  const handleTouchScrub = (e: React.TouchEvent<SVGSVGElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = touch.clientX - centerX;
    const dy = touch.clientY - centerY;
    let deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    if (deg < 0) deg += 360;
    const closestIndex = Math.round(deg / 60) % 6;
    setHoveredSkill(null);
    setPinnedSkill(null);
    setPinnedAxis(closestIndex);
    if (lastScrubAxisRef.current !== closestIndex) {
      lastScrubAxisRef.current = closestIndex;
      scrollMatrixToAxis(closestIndex);
    }
  };

  const handleAxisClick = (e: React.SyntheticEvent, index: number) => {
    e.stopPropagation();
    setHoveredSkill(null);
    setPinnedSkill(null);
    const nextPinned = pinnedAxis === index ? null : index;
    setPinnedAxis(nextPinned);
    lastScrubAxisRef.current = nextPinned;
    if (nextPinned !== null) {
      scrollMatrixToAxis(nextPinned);
    }
  };

  const handleOpenProjectProof = (slug: string) => {
    window.dispatchEvent(new CustomEvent('portfolio:open-project', { detail: { slug } }));
    const workSection = document.getElementById('work');
    workSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeAxisMeta = effectiveAxis !== null ? RADAR_AXES[effectiveAxis] : null;
  const activeAxisValue = effectiveAxis !== null ? targetValues[effectiveAxis] : null;

  return (
    <section id="skills" className={styles.skills} aria-label="Skills and competency proof matrix">
      <div className={styles.container}>
        <ScrollReveal>
          <div className={styles.headerRow}>
            <div className={styles.headerCopy}>
              <span className={styles.eyebrow}>Bidirectional Proof Matrix</span>
              <h2 className={styles.sectionTitle}>Skills &amp; Domain Depth</h2>
              <p className={styles.sectionDescription}>
                Switch role-fit lenses or inspect any vertex or skill chip to trace every capability back to a real shipped system.
              </p>
            </div>

            {/* Role-Fit Lens Toggle */}
            <div
              className={styles.lensToggleGroup}
              role="group"
              aria-label="Select role-fit radar profile"
            >
              {ROLE_LENSES.map((lens) => {
                const isSelected = activeLens === lens;
                return (
                  <button
                    key={lens}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setActiveLens(lens)}
                    className={`${styles.lensBtn} ${isSelected ? styles.lensBtnActive : ''}`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="skillsRoleFitLensPill"
                        className={styles.lensPillBg}
                        transition={{ type: 'spring', stiffness: 450, damping: 36 }}
                      />
                    )}
                    <span className={styles.lensBtnLabel}>{lens}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        <div className={styles.bentoGrid}>
          {/* Left: Interactive Radar + Live Proof Strip */}
          <ScrollReveal delay={0.08}>
            <div className={styles.radarBentoCard}>
              <div className={styles.radarCardTop}>
                <span className={styles.bentoEyebrow}>Competency Balance</span>
                <span className={styles.lensBadge}>{activeLens}</span>
              </div>

              <svg
                viewBox="-74 -26 448 352"
                className={styles.radarSvg}
                aria-label={`Skills competency radar chart under ${activeLens} lens`}
                onTouchStart={handleTouchScrub}
                onTouchMove={handleTouchScrub}
              >
                <title>Interactive 6-domain competency radar chart with role-fit lenses</title>

                {/* Concentric Grid Polygons */}
                {Array.from({ length: levels }).map((_, level) => {
                  const r = ((level + 1) / levels) * maxR;
                  const points = Array.from({ length: n })
                    .map((_, i) => {
                      const pt = polarToCartesian(cx, cy, r, i * angleStep);
                      return `${pt.x},${pt.y}`;
                    })
                    .join(' ');
                  return (
                    <polygon
                      key={level}
                      points={points}
                      className={styles.gridLevel}
                      fill={level % 2 === 1 ? 'rgba(74, 155, 155, 0.04)' : 'none'}
                    />
                  );
                })}

                {/* Scale Percentage Ticks */}
                {Array.from({ length: levels }).map((_, level) => {
                  const r = ((level + 1) / levels) * maxR;
                  return (
                    <text
                      key={`tick-${level}`}
                      x={cx + 5}
                      y={cy - r + 3}
                      className={styles.scaleTick}
                    >
                      {(level + 1) * 20}%
                    </text>
                  );
                })}

                {/* Axis Spokes */}
                {RADAR_AXES.map((axis, i) => {
                  const pt = polarToCartesian(cx, cy, maxR, i * angleStep);
                  const isActive = effectiveAxis === i;
                  return (
                    <line
                      key={axis.id}
                      x1={cx}
                      y1={cy}
                      x2={pt.x}
                      y2={pt.y}
                      className={`${styles.axisLine} ${isActive ? styles.axisLineActive : ''}`}
                    />
                  );
                })}

                {/* Interpolated Data Polygon */}
                <polygon points={radarPoints} className={styles.dataPolygon} />

                {/* Interactive Vertices & Directional Labels */}
                {RADAR_AXES.map((axis, i) => {
                  const isActive = effectiveAxis === i;
                  const val = displayValues[i];
                  const r = (val / 100) * maxR;
                  const pt = polarToCartesian(cx, cy, r, i * angleStep);

                  const anchor = getLabelAnchor(i);
                  const labelRadius = i === 0 || i === 3 ? maxR + 20 : maxR + 14;
                  const labelPt = polarToCartesian(cx, cy, labelRadius, i * angleStep);
                  const tooltipY = pt.y < 68 ? pt.y + 22 : pt.y - 16;

                  return (
                    <g
                      key={axis.id}
                      tabIndex={0}
                      role="button"
                      aria-label={`${axis.name}: ${targetValues[i]}% under ${activeLens}`}
                      aria-pressed={pinnedAxis === i}
                      onClick={(e) => handleAxisClick(e, i)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleAxisClick(e, i);
                        }
                      }}
                      onMouseEnter={() => {
                        if (
                          typeof window !== 'undefined' &&
                          window.matchMedia('(hover: hover)').matches
                        ) {
                          setHoveredSkill(null);
                          setHoveredAxis(i);
                        }
                      }}
                      onMouseLeave={() => {
                        if (
                          typeof window !== 'undefined' &&
                          window.matchMedia('(hover: hover)').matches
                        ) {
                          setHoveredAxis(null);
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <circle cx={pt.x} cy={pt.y} r={20} fill="transparent" />
                      {isActive && <circle cx={pt.x} cy={pt.y} className={styles.beaconRing} />}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isActive ? 6 : 4.2}
                        className={`${styles.dataPoint} ${isActive ? styles.dataPointHovered : ''}`}
                      />
                      <text
                        x={labelPt.x}
                        y={labelPt.y}
                        textAnchor={anchor}
                        dominantBaseline="central"
                        className={`${styles.label} ${isActive ? styles.labelHovered : ''}`}
                      >
                        {axis.shortLabel}
                      </text>
                      {isActive && (
                        <g style={{ pointerEvents: 'none' }}>
                          <rect
                            x={pt.x - 21}
                            y={tooltipY - 11}
                            width={42}
                            height={18}
                            rx={5}
                            className={styles.tooltipPill}
                          />
                          <path
                            d={
                              pt.y < 68
                                ? `M ${pt.x - 4} ${tooltipY - 11} L ${pt.x} ${tooltipY - 15} L ${pt.x + 4} ${tooltipY - 11} Z`
                                : `M ${pt.x - 4} ${tooltipY + 7} L ${pt.x} ${tooltipY + 11} L ${pt.x + 4} ${tooltipY + 7} Z`
                            }
                            className={styles.tooltipArrow}
                          />
                          <text
                            x={pt.x}
                            y={tooltipY + 2}
                            textAnchor="middle"
                            className={styles.valueTooltip}
                          >
                            {targetValues[i]}%
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Clickable Live Proof Strip */}
              <div className={styles.proofPanel} aria-live="polite">
                {activeSkill ? (
                  <>
                    <div className={styles.proofHeader}>
                      <span className={styles.proofTitle}>
                        {activeSkill.name} · {RADAR_AXES[activeSkill.axisIndex].shortLabel}
                      </span>
                      <span className={styles.proofScore}>Lvl {activeSkill.level}/5</span>
                    </div>
                    <p className={styles.proofLine}>{activeSkill.proof}</p>
                    <div className={styles.proofPills}>
                      <button
                        type="button"
                        onClick={() => handleOpenProjectProof(activeSkill.projectSlug)}
                        className={styles.proofProjectBtn}
                      >
                        <span>Proof: {activeSkill.projectLabel}</span>
                        <ArrowUpRight size={13} />
                      </button>
                    </div>
                  </>
                ) : activeAxisMeta ? (
                  <>
                    <div className={styles.proofHeader}>
                      <span className={styles.proofTitle}>{activeAxisMeta.name}</span>
                      <span className={styles.proofScore}>{activeAxisValue}%</span>
                    </div>
                    <p className={styles.proofLine}>{activeAxisMeta.summary}</p>
                    <div className={styles.proofPills}>
                      {activeAxisMeta.proofProjects.map((proof) => (
                        <button
                          key={proof.slug + proof.label}
                          type="button"
                          onClick={() => handleOpenProjectProof(proof.slug)}
                          className={styles.proofProjectBtn}
                        >
                          <span>{proof.label}</span>
                          <ArrowUpRight size={13} />
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.proofHeader}>
                      <span className={styles.proofTitle}>Live Proof Strip</span>
                      <span className={styles.proofScore}>6 Domains</span>
                    </div>
                    <p className={styles.proofHint}>
                      Select any radar vertex or skill card to see real project evidence and jump directly into its case study.
                    </p>
                  </>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Right: 2x2 Coupled Skill Matrix (Mobile Horizontal Scroll-Snap Carousel) */}
          <div className={styles.matrixColumn}>
            <div ref={matrixTrackRef} className={styles.matrixGrid}>
              {SKILL_CATEGORIES.map((category) => {
                const categoryMatchesAxis =
                  effectiveAxis !== null &&
                  category.skills.some((s) => s.axisIndex === effectiveAxis);

                return (
                  <div
                    key={category.title}
                    className={`${styles.categoryGroup} ${
                      categoryMatchesAxis ? styles.categoryGroupHighlighted : ''
                    }`}
                  >
                    <h3 className={styles.categoryTitle}>{category.title}</h3>
                    <div className={styles.chipsContainer}>
                      {category.skills.map((skill) => {
                        const isDirectSkill = activeSkill?.name === skill.name;
                        const isAxisMatch =
                          effectiveAxis !== null && skill.axisIndex === effectiveAxis;
                        const isDimmed =
                          effectiveAxis !== null && !isAxisMatch && !isDirectSkill;

                        return (
                          <button
                            key={skill.name}
                            type="button"
                            aria-label={`${skill.name}: Level ${skill.level} of 5. ${skill.proof}`}
                            aria-pressed={isDirectSkill}
                            className={`${styles.skillChip} ${
                              isDirectSkill || isAxisMatch ? styles.skillChipActive : ''
                            } ${isDimmed ? styles.skillChipDimmed : ''}`}
                            onMouseEnter={() => {
                              if (
                                typeof window !== 'undefined' &&
                                window.matchMedia('(hover: hover)').matches
                              ) {
                                setHoveredSkill(skill);
                              }
                            }}
                            onMouseLeave={() => {
                              if (
                                typeof window !== 'undefined' &&
                                window.matchMedia('(hover: hover)').matches
                              ) {
                                setHoveredSkill(null);
                              }
                            }}
                            onFocus={() => setHoveredSkill(skill)}
                            onBlur={() => setHoveredSkill(null)}
                            onClick={() => {
                              setPinnedAxis(null);
                              setPinnedSkill((prev) =>
                                prev?.name === skill.name ? null : skill
                              );
                            }}
                          >
                            <div className={styles.skillChipRow}>
                              <span className={styles.skillName}>{skill.name}</span>
                              <div className={styles.dotMeter} aria-hidden="true">
                                {[1, 2, 3, 4, 5].map((dot) => (
                                  <span
                                    key={dot}
                                    className={`${styles.dot} ${
                                      dot <= skill.level ? styles.dotFilled : ''
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            {isDirectSkill && (
                              <span className={styles.skillInlineProof}>{skill.proof}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <MobileCarouselControls
              count={SKILL_CATEGORIES.length}
              activeIndex={matrixActiveIndex}
              canScrollPrev={canScrollMatrixPrev}
              canScrollNext={canScrollMatrixNext}
              onSelect={scrollMatrixToIndex}
              onStep={stepMatrix}
              label="skill category"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
