export type ProjectDomainLens =
  | 'All'
  | 'Process & Agile PMO'
  | 'Data & SAP BI'
  | 'Platforms & Ecosystems';

export const PROJECT_DOMAIN_LENSES: readonly ProjectDomainLens[] = [
  'All',
  'Process & Agile PMO',
  'Data & SAP BI',
  'Platforms & Ecosystems',
] as const;

export interface ProjectGalleryItem {
  src: string;
  alt: string;
  caption: string;
  blurDataURL?: string;
}

export interface ProjectCaseStudy {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  domainLenses: Exclude<ProjectDomainLens, 'All'>[];
  period: string;
  role: string;
  projectNature?: string;
  featured?: boolean;
  headlineMetric: string;
  shortDescription: string;
  problem: string;
  architecture: string[];
  impactMetrics: { label: string; value: string }[];
  gallery: ProjectGalleryItem[];
  image: string;
  blurDataURL?: string;
  tags: string[];
  platformBadges?: string[];
  liveUrl?: string | null;
  relatedBlogSlug?: string;
  diagramType?: 'sap-bw' | 'renaissance-flow';
}

const BLUR_IMIS =
  'data:image/jpeg;base64,/9j/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAAGAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUG/8QAHxAAAgIBBAMAAAAAAAAAAAAAAQIAAxEEEiExE0HB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABURAQEAAAAAAAAAAAAAAAAAAABB/9oADAMBAAIRAxEAPwDXtRV4XYU19E8AD5J7aal66malNxTnOGPZ94ERFH//2Q==';

const BLUR_AGILE =
  'data:image/jpeg;base64,/9j/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAAHAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEG/8QAGBAAAwEBAAAAAAAAAAAAAAAAAAERIQL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A2nK14RWAAf/Z';

const BLUR_NEXTEP =
  'data:image/jpeg;base64,/9j/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAAHAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAIG/8QAGRAAAwEBAQAAAAAAAAAAAAAAAAERAiIx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANNhc5b9ipSoAh//2Q==';

const BLUR_PETBHAI =
  'data:image/jpeg;base64,/9j/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAAGAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEG/8QAGxAAAgMAAwAAAAAAAAAAAAAAAQIAAxETUmH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANhbTylSLLEzoc2WusVrhZn9Y6YiUf/Z';

const BLUR_CATWAALA =
  'data:image/jpeg;base64,/9j/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAAHAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMG/8QAHBAAAwACAwEAAAAAAAAAAAAAAQIDABESITGB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDXWa4oQkOSg9EU1vLRLNJWpMTc+qDvX3GMg//Z';

const BLUR_KUTTAWAALA =
  'data:image/jpeg;base64,/9j/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAAHAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEG/8QAGhAAAgMBAQAAAAAAAAAAAAAAAAECESExwf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A2TnTfM9KpXe8wAI//9k=';

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: 1,
    slug: 'petbhai-ecosystem',
    title: 'PetBhai · Bilingual Web PWA & Android Ecosystem',
    subtitle: 'Non-Commercial Project: bilingual pet care architecture, live community Q&A, adoption & vet clinic booking supporting street animal welfare',
    category: 'Platforms & Animal Welfare',
    domainLenses: ['Platforms & Ecosystems'],
    period: '2025 - Present',
    role: 'Creator & Product Architect (Voluntary)',
    projectNature: 'Non-Commercial Project',
    featured: true,
    headlineMetric: 'Web + Android',
    shortDescription:
      'Non-Commercial Project: a student-built bilingual (EN/BN) Web PWA and native Android architecture exploring pet care workflows, multi-tier SKU inventory state machines, live community visitor Q&A, adoption listings, and vet clinic booking to support street animal welfare with zero commercial revenue.',
    problem:
      'Street animal welfare groups in Bangladesh rely on unpredictable emergency appeals while pet owners struggle with fragmented social-media listings, uncoordinated adoption posts, and hard-to-find veterinary services. PetBhai was architected as a non-commercial student software and community welfare project to prototype unified pet care, inventory tracking, and clinic discovery workflows without operating a commercial business.',
    architecture: [
      'Non-Commercial Project built independently alongside IMIS graduate studies with zero commercial revenue, exploring a bilingual (English / Bangla) Web Progressive Web App and native Android application sharing a unified pet care, adoption, and community domain model.',
      'Engineered multi-tier SKU inventory state machines (Available -> In Basket -> Confirmed -> Dispatched) with low-stock threshold alerts and reorder-point visibility in a modeled admin logistics console.',
      'Integrated live community visitor Q&A, verified adoption listings, and veterinary clinic booking workflows alongside modeled cash-on-delivery courier reconciliation states.',
      'Designed strictly as a non-commercial architecture & community welfare showcase demonstrating how structured digital workflows can support emergency veterinary coordination and street-animal feeding initiatives.',
    ],
    impactMetrics: [
      { label: 'Project Status', value: 'Non-Commercial Project' },
      { label: 'Platforms Live', value: 'Web PWA + Android' },
      { label: 'Core Modules', value: 'Adoption · Q&A · Vet' },
      { label: 'Inventory Control', value: '4-State SKU Machine' },
    ],
    gallery: [
      {
        src: '/images/projects/petbhai.webp',
        alt: 'PetBhai Admin Logistics Overview showing real-time SKU stock levels, reorder alerts, and bilingual interface',
        caption: 'Admin Logistics Overview: Real-time SKU inventory state tracking, reorder points, and stock-health monitoring.',
        blurDataURL: BLUR_PETBHAI,
      },
    ],
    image: '/images/projects/petbhai.webp',
    blurDataURL: BLUR_PETBHAI,
    tags: ['Non-Commercial Project', 'Web PWA', 'Android App', 'SKU State Machine', 'Supply Chain Logic'],
    platformBadges: ['Non-Commercial Project', 'Web PWA', 'Android App', 'Multi-Tier SKU'],
    liveUrl: 'https://www.petbhai.com',
    relatedBlogSlug: 'building-petbhai',
  },
  {
    id: 2,
    slug: 'renaissance-diagnostic',
    title: 'Renaissance Diagnostic Care · Process Redesign & Analytics',
    subtitle: 'Patient-journey redesign, ETL demographic analytics & daily lab KPI governance',
    category: 'Healthcare Operations & BI',
    domainLenses: ['Data & SAP BI', 'Process & Agile PMO'],
    period: '02/2023 - 03/2024',
    role: 'Data & Operations Analyst',
    featured: true,
    headlineMetric: '-25% Wait Time',
    shortDescription:
      'Mapped the end-to-end patient journey and redesigned appointment booking to cut average on-site wait time by 25% (40 min to 30 min), while running ETL demographic reporting across 100+ daily patient samples to unlock rural outreach.',
    problem:
      'High-volume diagnostic intake (100+ daily pathology samples) suffered from front-desk bottlenecks, 40-minute average patient queues, and manual spreadsheets that hid reagent depletion and underserved rural patient segments from clinic leadership.',
    architecture: [
      'Mapped the physical patient journey from reception registration to sample collection and redesigned appointment booking & triage handoffs to cut wait times from 40 to 30 minutes.',
      'Built structured daily ETL & reconciliation routines across Excel and Google Sheets with validation locks to eliminate duplicate sample IDs and inventory drift.',
      'Transformed raw sample, test-panel, and origin logs into weekly executive visual dashboards and PowerPoint decision briefs for clinic leadership.',
      'Uncovered an urban-vs-rural diagnostic panel gap that directly prompted management to launch targeted rural outreach and simplified lab booking guides.',
    ],
    impactMetrics: [
      { label: 'On-Site Wait Time', value: '-25% (40 -> 30m)' },
      { label: 'Daily Sample Volume', value: '100+ Records / Day' },
      { label: 'Data Governance', value: 'Daily Reconciliation' },
      { label: 'Strategic Outcome', value: 'Rural Outreach Launch' },
    ],
    gallery: [],
    image: '/images/projects/renaissance.jpg',
    tags: ['Patient Journey Mapping', 'ETL & KPIs', 'Power BI / Excel', 'Operations Analytics'],
    platformBadges: ['Patient Journey', 'ETL & KPIs', 'Operations BI'],
    liveUrl: null,
    relatedBlogSlug: 'lab-data',
    diagramType: 'renaissance-flow',
  },
  {
    id: 3,
    slug: 'nextep-edu',
    title: 'NexTep Edu · BPMN 2.0 Playbook & Self-Service Platform',
    subtitle: 'Non-Commercial Project: voluntary BPMN 2.0 process mapping, bilingual web platform & private student tracker',
    category: 'Process & Web Delivery',
    domainLenses: ['Process & Agile PMO', 'Platforms & Ecosystems'],
    period: '05/2025 - 03/2026',
    role: 'Voluntary Technical Project Lead',
    projectNature: 'Non-Commercial Project',
    featured: true,
    headlineMetric: '17 Country Guides',
    shortDescription:
      'Non-Commercial Project: a voluntary technical and BPMN 2.0 process modeling project that mapped the student application lifecycle, engineered a bilingual Next.js platform with 17 destination guides, and shipped a private Supabase-backed self-service tracker.',
    problem:
      'Counselors managed multi-stage study abroad applications across disconnected chat threads, causing recurring "any update on my file?" inquiries and inconsistent handoffs between eligibility checks, document prep, and visa filing.',
    architecture: [
      'Executed as a voluntary Non-Commercial Project with zero commercial compensation, applying IMIS business process modeling and web architecture coursework to a real educational workflow.',
      'Modeled the full inquiry-to-enrollment procedure in BPMN 2.0 with explicit decision gateways (Eligibility Check, Offer Received, Pathway/Reapply loops) adopted as the team playbook.',
      'Engineered and deployed the production Next.js website in English and Bangla featuring 17 structured study-abroad country guides, dark/light themes, and organization JSON-LD.',
      'Built a private Supabase-backed application tracker where students check live stage progress via unique tracking codes and email links without exposing peer records, aligned 1:1 with the BPMN 2.0 milestone definitions.',
    ],
    impactMetrics: [
      { label: 'Project Status', value: 'Non-Commercial Project' },
      { label: 'Destination Guides', value: '17 Countries (EN/BN)' },
      { label: 'Process Standard', value: 'BPMN 2.0 Playbook' },
      { label: 'Client Portal', value: 'Supabase Self-Service' },
    ],
    gallery: [
      {
        src: '/images/projects/nextepedu.png',
        alt: 'NexTep Edu BPMN 2.0 Student Application Process diagram showing consultation, eligibility gateway, university shortlisting, offer gateway, and visa guidance',
        caption: 'BPMN 2.0 Process Architecture: Standardized student journey with explicit eligibility and offer decision gateways.',
        blurDataURL: BLUR_NEXTEP,
      },
    ],
    image: '/images/projects/nextepedu.png',
    blurDataURL: BLUR_NEXTEP,
    tags: ['Non-Commercial Project', 'BPMN 2.0', 'Next.js & Supabase', 'Voluntary Project Lead', 'Bilingual UX'],
    platformBadges: ['Non-Commercial Project', 'BPMN 2.0', 'Next.js', 'Supabase'],
    liveUrl: 'https://www.nextepedu.com',
    relatedBlogSlug: 'building-nextep-edu',
  },
  {
    id: 4,
    slug: 'fh-swf-digital-ops',
    title: 'FH Südwestfalen · IMIS Portal & Agile Event PMO',
    subtitle: 'University CMS administration, Jira Kanban event delivery & alumni engagement',
    category: 'Agile PMO & Digital Ops',
    domainLenses: ['Process & Agile PMO', 'Platforms & Ecosystems'],
    period: '03/2026 - Present',
    role: 'Web & Project Coordinator',
    featured: true,
    headlineMetric: 'CMS Admin · Jira',
    shortDescription:
      'Administer the official IMIS university web portal with faculty-granted CMS access, coordinate campus events via Jira Kanban boards, and publish structured news and alumni initiatives across Fachhochschule Südwestfalen.',
    problem:
      'International Master program announcements, alumni stories, and cross-team campus events required structured editorial governance and transparent task tracking so releases stayed consistent across faculty leadership and student organizers.',
    architecture: [
      'Maintain and publish official IMIS portal pages with FirstSpirit CMS administrator privileges granted by faculty leadership and the university web office.',
      'Run cross-functional campus event execution (including the 2026 IMIS Smart Cricket Championship and Badminton Day) on Jira Kanban boards with clear subtask owners, priority tiers, and cost tracking.',
      'Translate faculty and student committee requirements into actionable tickets, editorial standards, and localized web content.',
    ],
    impactMetrics: [
      { label: 'Portal Access', value: 'CMS Administrator' },
      { label: 'Event Sprint Board', value: '100% Subtasks Done' },
      { label: 'Coordination Stack', value: 'Jira · FirstSpirit' },
      { label: 'Stakeholders', value: 'Faculty & Alumni' },
    ],
    gallery: [
      {
        src: '/images/projects/imis-content.jpg',
        alt: 'Fachhochschule Südwestfalen FirstSpirit ContentCreator CMS admin panel editing the official IMIS News and Alumni pages',
        caption: 'University CMS Administration: Live editorial publishing inside FH Südwestfalen ContentCreator for IMIS News & Alumni.',
        blurDataURL: BLUR_IMIS,
      },
      {
        src: '/images/projects/agile-event.jpg',
        alt: 'Jira Kanban subtask breakdown showing 100% completion across venue, sponsorship, cost calculation, registration, and match execution',
        caption: 'Agile Event PMO (Jira): Cross-functional subtask ownership and 100% completion tracking for campus milestones.',
        blurDataURL: BLUR_AGILE,
      },
    ],
    image: '/images/projects/imis-content.jpg',
    blurDataURL: BLUR_IMIS,
    tags: ['Agile / Scrum', 'Jira Kanban', 'Enterprise CMS', 'Stakeholder Alignment'],
    platformBadges: ['Jira PMO', 'FirstSpirit CMS'],
    liveUrl: 'https://www.fh-swf.de/en/karriere/alumni/ehemalige/imis_alumni/index.php',
  },
  {
    id: 5,
    slug: 'sap-bw4hana-edw',
    title: 'SAP BW/4HANA · Enterprise Data Warehousing',
    subtitle: 'Multi-layer LSA++ data acquisition, ADSO transformations & executive BW Queries',
    category: 'SAP BI & Data Architecture',
    domainLenses: ['Data & SAP BI'],
    period: '09/2025 - 12/2025',
    role: 'SAP BI Architect (IMIS Project)',
    headlineMetric: 'Star Schema · ADSO',
    shortDescription:
      'Architected a multi-layer Enterprise Data Warehouse in SAP HANA Studio, building DataSources, InfoObjects, ADSO transformations, CompositeProviders, and Master Data hierarchies powering executive BW Queries.',
    problem:
      'Raw operational transaction extracts lack harmonized master data, hierarchical rollups, and query-optimized modeling required for accurate supply-chain KPI monitoring and multi-dimensional sales analysis.',
    architecture: [
      'Designed an LSA++-aligned multi-layer EDW inside SAP HANA Studio separating raw acquisition staging from harmonized corporate memory and reporting layers.',
      'Configured DataSources, Master Data InfoObjects with time/text hierarchies, and transformation mappings with Data Transfer Processes (DTPs) into Advanced DataStore Objects (ADSOs).',
      'Modeled Star Schema joins through CompositeProviders to unify transactional fact cubes with dimensional master data without unnecessary data duplication.',
      'Authored parameterized BW Queries exposing regional KPIs, revenue trends, and drill-down variance views for executive BI reporting.',
    ],
    impactMetrics: [
      { label: 'Core Engine', value: 'SAP BW/4HANA' },
      { label: 'Data Model', value: 'Star Schema · ADSO' },
      { label: 'Virtual Layer', value: 'CompositeProvider' },
      { label: 'Reporting Output', value: 'KPI BW Queries' },
    ],
    gallery: [],
    image: '/images/projects/sap-bw.jpg',
    tags: ['SAP BW/4HANA', 'SAP HANA Studio', 'ADSO & DTP', 'CompositeProvider'],
    platformBadges: ['SAP BW/4HANA', 'Star Schema', 'ADSO'],
    liveUrl: null,
    diagramType: 'sap-bw',
  },
  {
    id: 6,
    slug: 'community-operations',
    title: 'Community Operations Platform · 450K+ Member Network',
    subtitle: 'Cross-timezone moderation governance, rescue intake SOPs & 68-district vet directory',
    category: 'Operations at Scale',
    domainLenses: ['Platforms & Ecosystems', 'Process & Agile PMO'],
    period: '2018 - Present',
    role: 'Founder & Operations Steward',
    headlineMetric: '450K+ Members',
    shortDescription:
      'Founded and scaled two nationwide animal-welfare ecosystems (Catwaala & Kuttawaala) to 450,000+ members with 5-moderator shift governance, automated emergency keyword alerts, and a 68-district veterinary directory.',
    problem:
      'Rapid growth to 450,000+ members turned founder-led moderation into a critical bottleneck, delaying urgent trauma rescue appeals while leaving members vulnerable to unverified fundraising posts.',
    architecture: [
      'Transitioned daily frontline operations to a structured 5-moderator governance model with shift coverage, clear escalation rules, and cross-timezone stewardship from Germany.',
      'Introduced standardized adoption screening templates and strict clinic-verified documentation rules for medical appeals, eliminating fraudulent fundraising posts.',
      'Configured automated emergency keyword alerts (poisoning, accidents, blood donors) to surface life-critical cases ahead of standard approval queues.',
      'Built companion web hubs (Catwaala Community Hub & Kuttawaala 68-District Veterinary Directory) with service-type filters, 24/7 emergency toggles, and direct clinic routing.',
    ],
    impactMetrics: [
      { label: 'Network Scale', value: '450,000+ Members' },
      { label: 'Clinic Directory', value: '68 Districts Covered' },
      { label: 'Core Team', value: '5 Shift Moderators' },
      { label: 'Emergency Triage', value: 'Automated Alerts' },
    ],
    gallery: [
      {
        src: '/images/projects/catwaala.webp',
        alt: 'Catwaala Community Hub displaying adoption drives, charity events, and bilingual community portal navigation',
        caption: 'Catwaala Community Hub: Adoption drives, community Q&A events, and structured rescue intake workflows.',
        blurDataURL: BLUR_CATWAALA,
      },
      {
        src: '/images/projects/kuttawaala.webp',
        alt: 'Kuttawaala 68-district veterinary directory showing service filters, 24/7 emergency badges, ratings, and direct call/directions links',
        caption: 'Kuttawaala 68-District Vet Directory: Nationwide clinic search with 24/7 emergency toggle and direct triage access.',
        blurDataURL: BLUR_KUTTAWAALA,
      },
    ],
    image: '/images/projects/catwaala.webp',
    blurDataURL: BLUR_CATWAALA,
    tags: ['Operations at Scale', 'Governance SOPs', '68-District Directory', 'Emergency Triage'],
    platformBadges: ['450K+ Scale', '68 Districts', '5-Mod Ops'],
    liveUrl: 'https://catwaala.com',
    relatedBlogSlug: 'community-moderators',
  },
];

export function getProjectBySlug(slug: string): ProjectCaseStudy | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
