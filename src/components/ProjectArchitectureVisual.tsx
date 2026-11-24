'use client';

import React, { useId } from 'react';

interface ProjectArchitectureVisualProps {
  type: 'sap-bw' | 'renaissance-flow';
  variant?: 'card' | 'expanded';
  className?: string;
}

export default function ProjectArchitectureVisual({
  type,
  variant = 'card',
  className = '',
}: ProjectArchitectureVisualProps) {
  const uid = useId().replace(/:/g, '');

  if (type === 'sap-bw') {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          background: 'var(--bg-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 640 360"
          role="img"
          aria-label="SAP BW/4HANA Enterprise Data Warehouse architecture diagram showing DataSources, Transformations, ADSOs, Master Data InfoObjects, CompositeProvider Star Schema, and Executive BW Queries"
          style={{ width: '100%', height: '100%', display: 'block' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern
              id={`grid-${uid}`}
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1.5" cy="1.5" r="1" fill="var(--border-hover)" opacity="0.45" />
            </pattern>
            <linearGradient id={`accentGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id={`flowGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
              <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.95" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.45" />
            </linearGradient>
            <marker
              id={`arrow-${uid}`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 1 1.5 L 8.5 5 L 1 8.5 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* Subtle architectural dot backdrop */}
          <rect width="640" height="360" fill="var(--bg-secondary)" />
          <rect width="640" height="360" fill={`url(#grid-${uid})`} />

          {/* Soft ambient corner glow */}
          <ellipse
            cx="500"
            cy="70"
            rx="190"
            ry="120"
            fill="var(--accent)"
            opacity="0.07"
          />
          <ellipse
            cx="130"
            cy="300"
            rx="170"
            ry="100"
            fill="var(--accent)"
            opacity="0.05"
          />

          {/* Top Architecture Eyebrow */}
          <g transform="translate(26, 22)">
            <rect
              x="0"
              y="0"
              width="210"
              height="24"
              rx="12"
              fill="var(--bg-card)"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <circle cx="14" cy="12" r="3.5" fill="var(--accent)" />
            <text
              x="25"
              y="15.5"
              fill="var(--text-secondary)"
              fontSize="10"
              fontWeight="600"
              letterSpacing="0.06em"
              fontFamily="var(--font-mono, ui-monospace, monospace)"
            >
              SAP BW/4HANA · LSA++ EDW
            </text>
          </g>

          {variant === 'expanded' && (
            <g transform="translate(466, 22)">
              <rect
                x="0"
                y="0"
                width="148"
                height="24"
                rx="12"
                fill={`url(#accentGrad-${uid})`}
                stroke="var(--accent)"
                strokeOpacity="0.45"
                strokeWidth="1"
              />
              <text
                x="74"
                y="15.5"
                textAnchor="middle"
                fill="var(--accent)"
                fontSize="10"
                fontWeight="700"
                fontFamily="var(--font-mono, ui-monospace, monospace)"
              >
                SAP HANA STUDIO
              </text>
            </g>
          )}

          {/* Horizontal Backbone Flow Connectors */}
          <line
            x1="156"
            y1="142"
            x2="188"
            y2="142"
            stroke={`url(#flowGrad-${uid})`}
            strokeWidth="2"
            markerEnd={`url(#arrow-${uid})`}
          />
          <line
            x1="322"
            y1="142"
            x2="354"
            y2="142"
            stroke={`url(#flowGrad-${uid})`}
            strokeWidth="2"
            markerEnd={`url(#arrow-${uid})`}
          />
          <line
            x1="486"
            y1="142"
            x2="514"
            y2="142"
            stroke={`url(#flowGrad-${uid})`}
            strokeWidth="2"
            markerEnd={`url(#arrow-${uid})`}
          />

          {/* Vertical Master Data Join into CompositeProvider */}
          <path
            d="M 255 244 L 420 244 L 420 206"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.6"
            strokeDasharray="4 4"
            markerEnd={`url(#arrow-${uid})`}
          />

          {/* Stage 1: DataSources */}
          <g transform="translate(26, 86)">
            <rect
              x="0"
              y="0"
              width="126"
              height="112"
              rx="14"
              fill="var(--bg-card)"
              stroke="var(--border)"
              strokeWidth="1.2"
            />
            <text
              x="14"
              y="22"
              fill="var(--accent)"
              fontSize="9.5"
              fontWeight="700"
              letterSpacing="0.07em"
              fontFamily="var(--font-mono, ui-monospace, monospace)"
            >
              01 · INGEST
            </text>
            <text
              x="14"
              y="42"
              fill="var(--text-primary)"
              fontSize="13.5"
              fontWeight="700"
            >
              DataSources
            </text>
            <rect x="14" y="54" width="98" height="20" rx="6" fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth="0.9" />
            <text x="63" y="67.5" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontWeight="500">
              ERP Transactional
            </text>
            <rect x="14" y="80" width="98" height="20" rx="6" fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth="0.9" />
            <text x="63" y="93.5" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontWeight="500">
              DTP Extraction
            </text>
          </g>

          {/* Stage 2: ADSO Core Layer */}
          <g transform="translate(194, 86)">
            <rect
              x="0"
              y="0"
              width="126"
              height="112"
              rx="14"
              fill="var(--bg-card)"
              stroke="var(--accent)"
              strokeOpacity="0.55"
              strokeWidth="1.4"
            />
            <text
              x="14"
              y="22"
              fill="var(--accent)"
              fontSize="9.5"
              fontWeight="700"
              letterSpacing="0.07em"
              fontFamily="var(--font-mono, ui-monospace, monospace)"
            >
              02 · STORE
            </text>
            <text
              x="14"
              y="42"
              fill="var(--text-primary)"
              fontSize="13.5"
              fontWeight="700"
            >
              ADSO Layers
            </text>
            <rect x="14" y="54" width="98" height="20" rx="6" fill={`url(#accentGrad-${uid})`} stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="0.9" />
            <text x="63" y="67.5" textAnchor="middle" fill="var(--text-primary)" fontSize="9.5" fontWeight="600">
              Staging -&gt; Core
            </text>
            <rect x="14" y="80" width="98" height="20" rx="6" fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth="0.9" />
            <text x="63" y="93.5" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontWeight="500">
              Transformations
            </text>
          </g>

          {/* Stage 3: CompositeProvider Star Schema */}
          <g transform="translate(360, 86)">
            <rect
              x="0"
              y="0"
              width="126"
              height="112"
              rx="14"
              fill="var(--bg-card)"
              stroke="var(--accent)"
              strokeWidth="1.6"
            />
            <text
              x="14"
              y="22"
              fill="var(--accent)"
              fontSize="9.5"
              fontWeight="700"
              letterSpacing="0.07em"
              fontFamily="var(--font-mono, ui-monospace, monospace)"
            >
              03 · MODEL
            </text>
            <text
              x="14"
              y="42"
              fill="var(--text-primary)"
              fontSize="13"
              fontWeight="700"
            >
              CompositeProv.
            </text>
            <rect x="14" y="54" width="98" height="20" rx="6" fill={`url(#accentGrad-${uid})`} stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="0.9" />
            <text x="63" y="67.5" textAnchor="middle" fill="var(--text-primary)" fontSize="9.5" fontWeight="600">
              Star Schema Join
            </text>
            <rect x="14" y="80" width="98" height="20" rx="6" fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth="0.9" />
            <text x="63" y="93.5" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontWeight="500">
              Virtual Union
            </text>
          </g>

          {/* Stage 4: BW Queries */}
          <g transform="translate(520, 86)">
            <rect
              x="0"
              y="0"
              width="94"
              height="112"
              rx="14"
              fill={`url(#accentGrad-${uid})`}
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <text
              x="12"
              y="22"
              fill="var(--accent)"
              fontSize="9.5"
              fontWeight="700"
              letterSpacing="0.07em"
              fontFamily="var(--font-mono, ui-monospace, monospace)"
            >
              04 · BI
            </text>
            <text
              x="12"
              y="42"
              fill="var(--text-primary)"
              fontSize="13"
              fontWeight="700"
            >
              BW Queries
            </text>
            {/* Mini bar chart icon */}
            <rect x="14" y="76" width="12" height="20" rx="3" fill="var(--accent)" opacity="0.5" />
            <rect x="31" y="64" width="12" height="32" rx="3" fill="var(--accent)" opacity="0.75" />
            <rect x="48" y="56" width="12" height="40" rx="3" fill="var(--accent)" />
            <rect x="65" y="68" width="12" height="28" rx="3" fill="var(--accent)" opacity="0.85" />
          </g>

          {/* Bottom Master Data Dimension Track */}
          <g transform="translate(26, 224)">
            <rect
              x="0"
              y="0"
              width="228"
              height="48"
              rx="12"
              fill="var(--bg-card)"
              stroke="var(--border)"
              strokeWidth="1.1"
            />
            <circle cx="18" cy="24" r="5" fill="var(--accent)" opacity="0.85" />
            <text x="32" y="21" fill="var(--text-primary)" fontSize="11.5" fontWeight="700">
              InfoObjects &amp; Master Data
            </text>
            <text x="32" y="36" fill="var(--text-secondary)" fontSize="9.5">
              Attributes · Texts · Time &amp; Regional Hierarchies
            </text>
          </g>

          {/* Footer Architecture Metadata Bar */}
          <g transform="translate(26, 296)">
            <rect
              x="0"
              y="0"
              width="588"
              height="38"
              rx="10"
              fill="var(--bg-card)"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <text
              x="16"
              y="23"
              fill="var(--text-secondary)"
              fontSize="10.5"
              fontWeight="600"
              fontFamily="var(--font-mono, ui-monospace, monospace)"
            >
              DATA LINEAGE:
            </text>
            <text
              x="116"
              y="23"
              fill="var(--text-primary)"
              fontSize="10.5"
              fontWeight="500"
            >
              Raw Source -&gt; DTP -&gt; ADSO -&gt; CompositeProvider -&gt; Executive Supply Chain KPIs
            </text>
          </g>
        </svg>
      </div>
    );
  }

  // Renaissance Diagnostic Care: Clinical Patient Flow + Daily Lab ETL Loop
  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'var(--bg-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 640 360"
        role="img"
        aria-label="Renaissance Diagnostic Care operational redesign diagram showing patient journey wait time cut by 25 percent from 40 to 30 minutes and daily 100 plus sample ETL pipeline driving rural outreach"
        style={{ width: '100%', height: '100%', display: 'block' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern
            id={`grid-${uid}`}
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="1" fill="var(--border-hover)" opacity="0.45" />
          </pattern>
          <linearGradient id={`accentGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.24" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.06" />
          </linearGradient>
          <marker
            id={`arrow-${uid}`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 1 1.5 L 8.5 5 L 1 8.5 z" fill="var(--accent)" />
          </marker>
        </defs>

        <rect width="640" height="360" fill="var(--bg-secondary)" />
        <rect width="640" height="360" fill={`url(#grid-${uid})`} />

        <ellipse cx="490" cy="88" rx="180" ry="110" fill="var(--accent)" opacity="0.08" />
        <ellipse cx="140" cy="275" rx="160" ry="95" fill="var(--accent)" opacity="0.05" />

        {/* Eyebrow Pill */}
        <g transform="translate(26, 20)">
          <rect
            x="0"
            y="0"
            width="256"
            height="24"
            rx="12"
            fill="var(--bg-card)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <circle cx="14" cy="12" r="3.5" fill="var(--accent)" />
          <text
            x="25"
            y="15.5"
            fill="var(--text-secondary)"
            fontSize="10"
            fontWeight="600"
            letterSpacing="0.06em"
            fontFamily="var(--font-mono, ui-monospace, monospace)"
          >
            CLINICAL PROCESS &amp; ETL FLOW
          </text>
        </g>

        {/* Highlight Metric Pill top-right */}
        <g transform="translate(446, 20)">
          <rect
            x="0"
            y="0"
            width="168"
            height="24"
            rx="12"
            fill={`url(#accentGrad-${uid})`}
            stroke="var(--accent)"
            strokeOpacity="0.55"
            strokeWidth="1"
          />
          <text
            x="84"
            y="15.5"
            textAnchor="middle"
            fill="var(--accent)"
            fontSize="10.5"
            fontWeight="700"
            fontFamily="var(--font-mono, ui-monospace, monospace)"
          >
            WAIT TIME: 40m -&gt; 30m
          </text>
        </g>

        {/* LANE 1: Patient Journey Redesign */}
        <text
          x="26"
          y="72"
          fill="var(--text-tertiary)"
          fontSize="9.5"
          fontWeight="700"
          letterSpacing="0.08em"
          fontFamily="var(--font-mono, ui-monospace, monospace)"
        >
          LANE A · PATIENT JOURNEY &amp; BOOKING REDESIGN
        </text>

        {/* Connectors Lane A */}
        <line x1="164" y1="118" x2="194" y2="118" stroke="var(--accent)" strokeWidth="1.8" markerEnd={`url(#arrow-${uid})`} />
        <line x1="334" y1="118" x2="364" y2="118" stroke="var(--accent)" strokeWidth="1.8" markerEnd={`url(#arrow-${uid})`} />
        <line x1="470" y1="118" x2="494" y2="118" stroke="var(--accent)" strokeWidth="1.8" markerEnd={`url(#arrow-${uid})`} />

        {/* Node A1 */}
        <g transform="translate(26, 84)">
          <rect width="136" height="68" rx="12" fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="14" y="25" fill="var(--accent)" fontSize="9.5" fontWeight="700" fontFamily="var(--font-mono, ui-monospace, monospace)">
            STEP 01
          </text>
          <text x="14" y="43" fill="var(--text-primary)" fontSize="12.5" fontWeight="700">
            Slot Booking
          </text>
          <text x="14" y="58" fill="var(--text-secondary)" fontSize="9.5">
            Pre-intake triage queue
          </text>
        </g>

        {/* Node A2 */}
        <g transform="translate(200, 84)">
          <rect width="132" height="68" rx="12" fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="14" y="25" fill="var(--accent)" fontSize="9.5" fontWeight="700" fontFamily="var(--font-mono, ui-monospace, monospace)">
            STEP 02
          </text>
          <text x="14" y="43" fill="var(--text-primary)" fontSize="12.5" fontWeight="700">
            Lab Intake
          </text>
          <text x="14" y="58" fill="var(--text-secondary)" fontSize="9.5">
            Streamlined handoff
          </text>
        </g>

        {/* Node A3 */}
        <g transform="translate(370, 84)">
          <rect width="98" height="68" rx="12" fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="12" y="25" fill="var(--accent)" fontSize="9.5" fontWeight="700" fontFamily="var(--font-mono, ui-monospace, monospace)">
            STEP 03
          </text>
          <text x="12" y="43" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            Collection
          </text>
          <text x="12" y="58" fill="var(--text-secondary)" fontSize="9.5">
            100+ / day
          </text>
        </g>

        {/* Outcome A4 */}
        <g transform="translate(500, 84)">
          <rect width="114" height="68" rx="12" fill={`url(#accentGrad-${uid})`} stroke="var(--accent)" strokeWidth="1.6" />
          <text x="57" y="31" textAnchor="middle" fill="var(--accent)" fontSize="18" fontWeight="800" fontFamily="var(--font-mono, ui-monospace, monospace)">
            -25%
          </text>
          <text x="57" y="47" textAnchor="middle" fill="var(--text-primary)" fontSize="10.5" fontWeight="700">
            Wait Time Cut
          </text>
          <text x="57" y="60" textAnchor="middle" fill="var(--text-secondary)" fontSize="9">
            40 min -&gt; 30 min
          </text>
        </g>

        {/* Vertical Bridge from Collection into Daily ETL */}
        <path
          d="M 419 152 L 419 178 L 94 178 L 94 214"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          markerEnd={`url(#arrow-${uid})`}
        />

        {/* LANE 2: Daily ETL & Demographic Analytics */}
        <text
          x="26"
          y="206"
          fill="var(--text-tertiary)"
          fontSize="9.5"
          fontWeight="700"
          letterSpacing="0.08em"
          fontFamily="var(--font-mono, ui-monospace, monospace)"
        >
          LANE B · DAILY ETL, DEMOGRAPHICS &amp; EXECUTIVE BI
        </text>

        {/* Connectors Lane B */}
        <line x1="196" y1="254" x2="226" y2="254" stroke="var(--accent)" strokeWidth="1.8" markerEnd={`url(#arrow-${uid})`} />
        <line x1="406" y1="254" x2="436" y2="254" stroke="var(--accent)" strokeWidth="1.8" markerEnd={`url(#arrow-${uid})`} />

        {/* Node B1 */}
        <g transform="translate(26, 220)">
          <rect width="168" height="68" rx="12" fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="14" y="24" fill="var(--accent)" fontSize="9.5" fontWeight="700" fontFamily="var(--font-mono, ui-monospace, monospace)">
            ETL CAPTURE
          </text>
          <text x="14" y="42" fill="var(--text-primary)" fontSize="12.5" fontWeight="700">
            Daily Reconciliation
          </text>
          <text x="14" y="57" fill="var(--text-secondary)" fontSize="9.5">
            Validated IDs &amp; reagent stock
          </text>
        </g>

        {/* Node B2 */}
        <g transform="translate(232, 220)">
          <rect width="172" height="68" rx="12" fill="var(--bg-card)" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1.3" />
          <text x="14" y="24" fill="var(--accent)" fontSize="9.5" fontWeight="700" fontFamily="var(--font-mono, ui-monospace, monospace)">
            BI REPORTING
          </text>
          <text x="14" y="42" fill="var(--text-primary)" fontSize="12.5" fontWeight="700">
            Urban vs Rural Split
          </text>
          <text x="14" y="57" fill="var(--text-secondary)" fontSize="9.5">
            Test panels &amp; weekly KPIs
          </text>
        </g>

        {/* Node B3 Outcome */}
        <g transform="translate(442, 220)">
          <rect width="172" height="68" rx="12" fill={`url(#accentGrad-${uid})`} stroke="var(--accent)" strokeWidth="1.5" />
          <text x="14" y="24" fill="var(--accent)" fontSize="9.5" fontWeight="700" fontFamily="var(--font-mono, ui-monospace, monospace)">
            ACTIONABLE IMPACT
          </text>
          <text x="14" y="42" fill="var(--text-primary)" fontSize="12.5" fontWeight="700">
            Rural Outreach Plan
          </text>
          <text x="14" y="57" fill="var(--text-secondary)" fontSize="9.5">
            Expanded lab access &amp; supply
          </text>
        </g>

        {/* Bottom Status Bar */}
        <g transform="translate(26, 308)">
          <rect width="588" height="32" rx="9" fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1" />
          <text
            x="16"
            y="20"
            fill="var(--text-secondary)"
            fontSize="10"
            fontWeight="600"
            fontFamily="var(--font-mono, ui-monospace, monospace)"
          >
            {variant === 'expanded'
              ? 'SCOPE: 100+ DAILY SAMPLES · REAGENT LOGISTICS · PATIENT JOURNEY MAPPING · EXECUTIVE DECKS'
              : 'RENAISSANCE DIAGNOSTIC CARE · 02/2023 - 03/2024 · PROCESS + ETL ANALYTICS'}
          </text>
        </g>
      </svg>
    </div>
  );
}
