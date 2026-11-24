import { getReadMinutes } from '@/utils/blogUtils';

export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    readTime: string;
    category: string;
    tldr?: string[];
    relatedProjectSlug?: string;
    relatedProjectTitle?: string;
    relatedProjectUrl?: string;
    relatedProjectMetric?: string;
    tags?: string[];
    updatedAt?: string;
}

export function getReadTime(content: string): string {
    return `${getReadMinutes(content)} min read`;
}

const rawBlogPosts: Omit<BlogPost, 'readTime'>[] = [
    {
        id: 1,
        slug: 'lab-data',
        title: 'From Data Entry to Charts: What a Diagnostic Lab Taught Me About Useful Data',
        excerpt: 'Entering daily records for over 100 patient samples in Excel and Google Sheets, building PowerPoint charts for managers, and learning why clean data matters before any complex analysis.',
        category: 'Data & Reporting',
        date: '2026-01-15',
        relatedProjectSlug: 'renaissance-diagnostic',
        relatedProjectTitle: 'Renaissance Diagnostic Care · Clinical Data & Ops',
        relatedProjectMetric: '-25% Wait Time · 100+ Daily Samples',
        tags: ['Data Quality', 'Excel & Sheets', 'Management Reporting', 'Healthcare Ops', 'BPMN 2.0'],
        tldr: [
            'Clean capture discipline (nightly physical-log reconciliation, validation rules, and locked formulas) beats brittle complexity on high-volume clinical floors.',
            'Converting raw rows into weekly visual briefings exposed an underserved rural diagnostic gap and directly triggered a regional outreach campaign.',
            'Operational tools must match the team using them: simple, transparent columns survive shift handoffs far better than deeply nested multi-sheet workbooks.',
        ],
        content: `## The Daily Volume

When people picture data analysis, they often imagine complex algorithms, real-time dashboards, and automated pipelines. My time at Renaissance Diagnostic Care taught me a very different reality. For over a year, I worked as a Data and Operations Analyst at our diagnostic center in Dhaka. Every single day, we handled over 100 patient samples: blood tests, urine screenings, tissue cultures, and urgent pathology orders.

In a clinical diagnostic center, data does not begin in a tidy data warehouse. It starts at a reception desk with a handwritten doctor prescription, a patient registration slip, and a labelled purple-top collection tube. Each sample represents a patient waiting for an answer. Behind that sample is a chain of data points: patient demographics, test categories, reagent batch numbers, and stock deductions.

## Getting the Data Right in Spreadsheets

My primary responsibility was entering and maintaining this daily stream of records. We worked primarily in Excel and Google Sheets, logging test counts, sample types, patient records, and inventory movements.

Early on, I realized how fragile spreadsheet data can be. In a fast-paced environment where samples arrive continuously, one miskeyed digit in a sample ID or an accidental paste into the wrong column can silently distort an entire weekly summary. If an entry error goes unnoticed, inventory logs show stock that does not exist, or test volume numbers misrepresent clinic throughput.

### Four Guardrails That Protected Baseline Accuracy

To prevent silent errors without slowing down the front desk, I built four disciplined routines directly into our workbooks:

- **End-of-day physical reconciliation**: Every evening, I matched spreadsheet row counts against the physical registration slips from reception before closing the daily log.
- **Input validation gates**: Data validation rules blocked duplicate patient IDs and highlighted missing test codes the moment an entry was typed.
- **Reagent threshold alerts**: Conditional formatting flagged low reagent batches early so procurement never scrambled mid-week.
- **Protected calculation layers**: Locking summary formula cells ensured accidental keystrokes during busy shifts could never corrupt monthly totals.

These were not complex software engineering feats, but disciplined spreadsheet habits that kept our baseline numbers trustworthy.

## Turning Rows into Management Charts

Spreadsheets with thousands of rows are necessary for record-keeping, but they are nearly useless for quick decision making. Our clinic managers, chief medical officers, and administrative heads did not have the time to scroll through rows of test codes during morning meetings.

To make the data actionable, I converted our daily logs into visual charts and weekly PowerPoint presentations. I built pivot tables to aggregate test categories, calculated week-over-week volume changes, and plotted trend lines showing which diagnostic panels were rising or falling.

Presenting data visually changed the conversation in our operations meetings. Instead of guessing whether our laboratory analyzers were operating near capacity, the management team could see clear bar charts comparing morning versus afternoon sample arrivals. They could see how reagent consumption aligned with patient volume and identify which days of the week experienced the heaviest testing bottlenecks.

## The Decision: Stepping Up Rural Marketing

The most significant outcome of this reporting came from analyzing patient origins alongside test selections. While our urban center traffic remained steady, our charts showed that several advanced diagnostic panels were almost never requested by patients traveling from neighboring rural areas.

When I presented these geographical breakdowns and test distributions in our PowerPoint deck, the clinic manager spotted an important gap. Patients in rural communities outside the main city were not avoiding these tests because they did not need them; they simply did not know that our facility offered them, or they found the booking process intimidating.

Following that presentation, the manager decided to step up outreach and marketing efforts in those rural districts. The center published clear informational materials detailing our testing services, fee structures, and sample turnaround times. We simplified access so rural patients and their families could understand exactly how to reach the lab and avail the services with minimal friction. Seeing a managerial decision translate directly into better healthcare access for underserved communities confirmed for me the true value of accessible, well-presented data.

## What Didn't Go to Plan

Not every attempt at improvement went smoothly. During my third month, I tried to introduce an intricate multi-sheet workbook with nested lookup formulas to track stock reorders automatically. I felt proud of its complexity.

A week later, our floor supervisor tried to update a supplier phone number, inadvertently deleted a reference column, and caused reference errors across three linked sheets. The night shift could not log their counts, and I had to spend hours restoring backups and apologizing for creating a bottleneck.

> In operational settings, a simple system that everyone understands is far superior to a clever system that breaks under pressure.

The lesson was humbling and immediate. I redesigned the tracker with straightforward, transparent columns and clear documentation so any shift supervisor could maintain it safely.

## What I Would Do Differently Today

Now, as a Master's student in International Management and Information Systems (IMIS) in Germany, I study formal business process modeling, enterprise data warehousing, and system architectures.

Looking back at my time at Renaissance with what I know today, I would design our data intake differently. Instead of relying on manual spreadsheet entries, I would map our sample intake using standard **BPMN 2.0** workflows to identify handoff friction between receptionists and lab technologists. I would implement structured data validation at the point of initial capture to remove repetitive double-entry work entirely.

Yet the core principle remains unchanged. Whether you are building an enterprise data warehouse or typing entries into a Google Sheet, technology is only as valuable as the decisions it enables. The most rewarding part of working with data is not the complexity of your formulas, but whether your reports help responsible leaders make sound decisions that improve people's lives.`,
    },
    {
        id: 2,
        slug: 'building-petbhai',
        title: 'PetBhai: From Animal Welfare Prototype to Live Bilingual Pet Care Ecosystem',
        excerpt: 'A non-commercial student software and animal welfare initiative: exploring pet care inventory state machines, logistics lessons studied in Dhaka, and how PetBhai evolved into a live bilingual Web PWA and Native Android showcase with zero commercial trading.',
        category: 'Social Venture',
        date: '2025-10-10',
        updatedAt: '2026-04-20',
        relatedProjectSlug: 'petbhai-ecosystem',
        relatedProjectTitle: 'PetBhai · Bilingual Web PWA & Native Android Ecosystem',
        relatedProjectUrl: 'https://www.petbhai.com',
        relatedProjectMetric: 'Non-Commercial · Web PWA + Android · EN/BN',
        tags: ['Non-Commercial Project', 'Animal Welfare', 'Supply Chain Logic', 'Web PWA', 'Android App', 'SKU State Machine'],
        tldr: [
            'Non-Commercial Project: PetBhai is a student software architecture and community animal welfare initiative built alongside IMIS graduate studies with zero active commercial revenue or trading.',
            'Designing explicit SKU inventory state machines (Available -> In Basket -> Confirmed -> Dispatched) and modeling local courier reconciliation cycles solved real supply-chain architecture challenges before any real-world deployment.',
            'Updated in 2026: PetBhai evolved from an architected prototype into a live bilingual (EN/BN) non-commercial showcase at petbhai.com spanning a Web PWA and Native Android app with pet care, adoption, community Q&A, and vet clinic workflows.',
        ],
        content: `> **Non-Commercial Project & 2026 Platform Update:** PetBhai is strictly a **non-commercial student software architecture and community animal welfare initiative** built independently alongside my graduate studies, with **zero active commercial trading, sales operations, or revenue generation**. Originally written while PetBhai was an architected prototype, the platform is now live at [petbhai.com](https://www.petbhai.com) as a bilingual (English & Bangla) **Web PWA and Native Android ecosystem** showcasing pet care inventory workflows, community Q&A, adoption listings, and veterinary clinic discovery.

## Why Grassroots Animal Welfare Inspired This Architecture

Anyone who has participated in street animal welfare knows the emotional and coordination strain it creates. Over the years of running volunteer animal welfare initiatives in Bangladesh, my friends and I routinely faced urgent emergencies: injured stray dogs hit by vehicles, malnourished litters of kittens abandoned in alleyways, and animals suffering from severe infections.

Every single rescue requires rapid coordination, reliable veterinary information, and sustained community awareness. For years, volunteer rescuers relied on fragmented social media posts and urgent emergency appeals whenever an animal needed critical medical care. At the same time, thousands of pet owners struggled with disorganized online listings, stockouts, and hard-to-find veterinary services.

That contrast sparked the architectural concept behind PetBhai: designing a dedicated, non-commercial digital software showcase that models structured pet care catalogs, adoption discovery, community Q&A, and veterinary clinic workflows in one cohesive platform supporting street animal welfare.

## Designing the Core Architecture

To explore the technical and operational feasibility of this idea, I built PetBhai strictly as a rigorously modeled non-commercial student software project. The goal was to engineer clean domain logic, catalog structure, and inventory state transitions purely as a systems engineering and animal welfare initiative, without operating a commercial business or holding physical warehouse stock.

I structured the platform around three core architectural capabilities:

- **Structured dietary & life-stage catalog**: Items organized cleanly by dietary needs, age stages, and pet types, replacing the cluttered social media listings typical in the local ecosystem.
- **Deterministic SKU inventory state machine**: Explicit stock states (**Available**, **In Basket**, **Confirmed**, and **Dispatched**) engineered to prevent stock drift and keep simulated warehouse counts synchronized under concurrency.
- **Local courier routing workflow**: A fulfillment state pipeline modeled directly around regional courier handoffs, tracking each modeled parcel milestone from dispatch hub to residential doorstep.

## What Didn't Go to Plan

Building the software layer was straightforward; modeling physical logistics under local constraints proved much harder.

During our early logistics simulations and research in Dhaka, we identified major challenges with product handling and courier reliability. Heavy items like twenty-kilogram bags of dog food or clay cat litter require careful handling, and standard courier networks frequently damaged packaging in transit during rainy monsoon days.

Furthermore, cash on delivery remains the dominant payment habit in the region. Modeling cash-on-delivery reconciliations in our workflow architecture revealed that settlements often take several days to clear from courier partners. Studying those settlement lags taught me how heavily cash-conversion cycles and reconciliation controls determine whether a logistics system can function smoothly in practice.

> Writing working web code is only ten percent of the challenge; physical fulfillment and reconciliation cycles determine whether a logistics architecture holds up in the real world.

## Staying Disciplined Through Graduate Studies

When I moved to Germany to pursue my Master's degree in International Management and Information Systems (IMIS) at Fachhochschule Südwestfalen, I kept PetBhai strictly as a non-commercial student software and welfare project with zero commercial trading or inventory operations.

Instead, I treated PetBhai as a living non-commercial systems laboratory, applying enterprise information systems, structured database modeling, and supply chain discipline from my IMIS coursework to harden the platform piece by piece.

## 2026 Live-Platform Milestone: Web PWA & Native Android Ecosystem

That disciplined architecture paid off. In 2026, PetBhai graduated from a conceptual blueprint into a live, non-commercial bilingual (English and Bangla) digital showcase at [petbhai.com](https://www.petbhai.com), shipped across both a **Progressive Web App (PWA)** and a **Native Android application**.

### What Runs Live in the Ecosystem Today

1. **Multi-tier catalog & inventory state engine**: Full bilingual architecture backed by deterministic SKU state tracking, clear catalog organization, and structured order lifecycle modeling (built as a non-commercial student showcase with zero active commercial sales).
2. **Adoption & veterinary clinic booking workflows**: Dedicated discovery pathways connecting pet parents with verified veterinary clinics and responsible local adoptions.
3. **Community Q&A & pet-care editorial hub**: A moderated knowledge space where pet owners exchange practical guidance and veterinary-reviewed articles in both English and Bangla.
4. **Offline-resilient mobile experience**: Service-worker caching for editorial guides combined with network-first live data synchronization so users on variable mobile networks get fast, reliable access.

## The Long-Term Vision

The core purpose remains rooted in community welfare and responsible systems design: creating accessible digital tools that strengthen care, adoption, and veterinary discovery for voiceless street animals.

Building PetBhai as a non-commercial student initiative alongside my IMIS studies proved how powerfully process modeling, disciplined architecture, and empathy reinforce each other, turning a grassroots animal welfare need into a resilient, production-grade software ecosystem.`,
    },
    {
        id: 3,
        slug: 'community-moderators',
        title: 'Handing Over a 450,000-Member Community to Five Moderators',
        excerpt: 'Founding two large animal welfare groups, handling the burnout of answering every message alone, and building clear rules and automated alerts that let a small team run the platform.',
        category: 'Community Operations',
        date: '2026-04-18',
        relatedProjectSlug: 'community-operations',
        relatedProjectTitle: 'Animal Welfare Community Operations (450K+ Members)',
        relatedProjectUrl: 'https://catwaala.com',
        relatedProjectMetric: '450K+ Members · 5 Moderators · Cross-Timezone',
        tags: ['Operations at Scale', 'Moderation Playbooks', 'Automated Triage', 'Leadership', 'Animal Welfare'],
        tldr: [
            'Founder-as-bottleneck fails catastrophically at scale: solo moderation delayed life-critical rescue posts and let unverified fundraising slip through.',
            'Three lightweight operational controls (mandatory clinic proof, standardized intake templates, and emergency keyword alerts) allowed five trusted moderators to run 450,000+ members reliably.',
            'Relocating to Germany (+4 to 5h timezone delta) stress-tested the handover: clear governance enabled uninterrupted daily rescues without founder intervention.',
        ],
        content: `## Founding the Communities

Years ago, I founded Dog Lovers of Bangladesh and Cat Lovers of Bangladesh. At the time, there was no centralized online space where pet owners and animal rescuers in Bangladesh could connect, find reliable veterinary advice, or report lost pets.

What began as modest discussion groups grew rapidly. Month after month, thousands of new members joined. Today, across both communities, over 450,000 members share advice, arrange adoptions, and report animals in distress. Seeing that community grow from zero was inspiring, but as the numbers climbed, the operational burden grew alongside them.

## The Bottleneck and Personal Burnout

In the early stages, I made the classic founder mistake of trying to handle everything myself. My notifications never stopped. At 7 AM, someone would message about a lost puppy in Dhanmondi. At noon, someone would report an injured cat in Chittagong. At midnight, someone would post an emotional appeal for urgent veterinary donations.

I felt personally responsible for every animal mentioned in the groups. I spent hours answering direct messages, approving posts, and trying to connect rescuers with clinics.

Inevitably, this approach collapsed into severe burnout. When you try to be the single point of contact for tens of thousands of people, you become the primary bottleneck. Urgent medical appeals sat in the approval queue while I was working or sleeping, while fraudulent fundraising posts occasionally slipped through because I was too tired to review documentation properly. It became painfully clear that passion without organization harms the very animals you want to protect.

## Handing Over to Five Dedicated Moderators

I realized the groups needed a real operational structure. I could not run them alone, nor did we need a massive, bloated bureaucracy. What we needed was a focused, trustworthy team.

I selected five active, reliable community members who had demonstrated good judgment, deep empathy for animals, and emotional calm during online conflicts. I invited them to step up as our core moderation team.

Instead of dividing the team into complex corporate tiers, we kept the structure practical and direct. Each moderator took ownership of specific time windows during the day and specific focus areas: reviewing daily submissions, vetting adoption listings, and verifying critical medical cases directly with clinics.

## Standard Formats and Automated Keyword Alerts

To make the moderators' work sustainable without burning them out too, we codified three explicit operational rules and automated triage safeguards:

1. **Mandatory clinical verification for fundraising**: We banned open, unverified donation appeals. Anyone requesting financial help for an animal must provide a clear photograph, the name and location of the treating veterinary clinic, and an itemized prescription or doctor note, eliminating fraudulent claims and protecting member trust.
2. **Structured adoption and lost-pet templates**: Every listing must include the animal's age, medical history, exact neighborhood location, and verified contact numbers prior to approval, cutting dozens of back-and-forth comment threads per post.
3. **Automated emergency keyword alerts**: High-priority moderation triggers watch for life-threatening terms: poisonings, vehicular accidents, critical fractures, and urgent blood donor calls. Whenever a trigger fires, a moderator receives an instant alert, reviews the post ahead of the general queue, and pins it so nearby rescuers mobilize immediately.

## Managing Across Time Zones

The true test of this operational setup came when I moved to Germany to begin my Master's studies in International Management and Information Systems at Fachhochschule Südwestfalen.

Germany is four to five hours behind Bangladesh, depending on daylight saving time. If our communities had still depended on my personal daily approvals, the groups would have stalled every morning. Because our five moderators operated with clear guidelines, established posting formats, and automated alerts, the groups continued running smoothly without interruption.

Our team communicates through a shared coordination chat where moderators discuss edge cases, flag repeat offenders, and coordinate complex rescues. My role shifted from frontline moderator to community steward: I handle technical configuration, policy evolution, and rare escalations while the five moderators lead day-to-day operations with full autonomy.

## What True Operations Looks Like

> Founding a project is exciting, but building systems that function reliably without your constant intervention is the real test of leadership.

A community of 450,000 members does not stay orderly because one person works eighteen hours a day. It works because a small team of dedicated people has clear rules, practical tools, and the trust to make decisions independently. Knowing that injured animals are still being rescued and adopted every single day while I study in Germany is the most satisfying proof that good operations matter.`,
    },
    {
        id: 4,
        slug: 'building-nextep-edu',
        title: 'From BPMN Diagrams to My First Live Website: Building NexTep Edu',
        excerpt: 'A voluntary, non-commercial project mapping a study abroad workflow with BPMN 2.0, building my first live bilingual website, and adding a private application tracker backed by Supabase.',
        category: 'Web & Process',
        date: '2026-03-10',
        relatedProjectSlug: 'nextep-edu',
        relatedProjectTitle: 'NexTep Edu · BPMN 2.0 Playbook & Bilingual Web Platform',
        relatedProjectUrl: 'https://www.nextepedu.com',
        relatedProjectMetric: 'Non-Commercial · 17 Country Guides · Supabase Tracker',
        tags: ['Non-Commercial Project', 'BPMN 2.0', 'Next.js', 'Supabase', 'Voluntary Project Lead', 'Bilingual Web'],
        tldr: [
            'Non-Commercial Project: completed as a voluntary, uncompensated technical and BPMN 2.0 process modeling initiative alongside my IMIS graduate studies.',
            'Drawing the end-to-end student admissions workflow in BPMN 2.0 before writing code exposed handoff gaps and gave the team its daily operational playbook.',
            'Built and shipped a bilingual (English & Bangla) Next.js site featuring 17 country study guides and a private Supabase-backed application tracker linked directly to the BPMN stages.',
        ],
        content: `> **Non-Commercial Project Disclosure:** NexTep Edu was carried out strictly as a **voluntary, non-commercial technical and BPMN 2.0 process-modeling project** with zero financial compensation, completed to apply business process management and web architecture concepts from my IMIS graduate studies to a real-world educational workflow.

## Why I Said Yes

From the very beginning of my studies, I have been drawn to the space where management meets technology. I like understanding how a business actually runs, and then finding the right tools to make that work easier. So when I volunteered with [NexTep Edu](https://www.nextepedu.com), a study abroad consultancy helping students from Bangladesh apply to universities in Germany and other countries, as a voluntary Technical Project Lead in May 2025, I saw a chance to do exactly that.

There was one catch. I had never built a full website before. NexTep Edu was my first real web project, and I learned most of what I know about web building along the way.

## Mapping the Process Before Writing Any Code

Before touching the website, I wanted to understand how the consultancy worked. A student's journey has many steps: the first inquiry, a consultation, university selection, preparing documents and a statement of purpose, the offer letter, proof of funds, and finally the visa. Each step involves different people and different documents, and it is easy for things to fall through the cracks.

Around that time I was learning **BPMN 2.0** in my IMIS classes. As soon as I had access to a modelling tool, I used it to draw out the consultancy's workflow: who does what, in which order, and where a file waits for the next action.

I want to be honest about what this did and did not become. The BPMN models are not running inside any software. Nothing is automated by a process engine. What changed is that the team now has a clear visual map of the procedure, and they manage their daily work based on those diagrams and the plan we built from them. For a small team, that shared picture turned out to be more useful than any complicated system would have been.

## Building the Website

With the process clear, I moved on to the website itself. I built it by pairing process clarity with AI-assisted iteration: describing what each component needed to accomplish, reading and testing every output carefully, fixing edge cases, and repeating that loop until every interaction behaved reliably.

### Production Architecture Delivered

- **Bilingual experience (English & Bangla)** with persistent dark and light themes tailored for both students and parents.
- **17 destination country guides** structuring tuition, intake timelines, and visa prerequisites into clear reference pages.
- **Search-ready semantic foundation** combining Organization structured data, concise FAQs, and a streamlined inquiry flow.

None of this was planned perfectly at the start. Every feature taught me something concrete about server/client rendering, routing hygiene, and how small layout decisions shape mobile usability.

## The Private Application Tracker

The part I am proudest of is the application tracker.

Students applying abroad are understandably anxious, and the most common message the team received was some version of *"Is there any update on my file?"* Answering those one by one pulled counselors away from actual application reviews.

So I built a dedicated tracking portal backed by **Supabase**:

1. When a student's file opens, they receive an email containing a unique tracking code and private link.
2. Opening that link reveals their live application stage at any hour, without calling or messaging staff.
3. Only authenticated staff admins can update progress states, while row-level isolation guarantees each student sees strictly their own personal record.

> Every stage a student sees on the tracker maps one-to-one with a milestone in the BPMN diagram we drew before writing a single line of code.

## What I Would Do Differently

Because this was my first production web build, there are clear architectural improvements I would make from day one on future projects:

- **Plan bilingual content schemas upfront** before building individual destination pages so translations stay structurally aligned.
- **Audit SEO and crawler rendering early** rather than checking visual layouts exclusively in my local browser.
- **Document the staff admin handbook on day one** instead of explaining edge cases ad hoc as questions arose.

## What It Gave Me

My voluntary role as Technical Project Lead on the NexTep Edu project concluded in March 2026. Looking back, the biggest thing I took from it was not a specific framework or library; it was operational confidence. I went in having never shipped a website, and I came out knowing I could take a real business process, map it rigorously, and ship a live system people depend on every day.

That confidence is the reason this portfolio exists, and it is the same mindset I bring to my work now: understand the people and the process first, then choose the technology that supports them.`,
    },
];

export const blogPosts: BlogPost[] = rawBlogPosts
    .map((post) => ({
        ...post,
        readTime: getReadTime(post.content),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));

export function getPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug: string): { prev: BlogPost | null; next: BlogPost | null } {
    const index = blogPosts.findIndex((post) => post.slug === slug);
    if (index === -1) {
        return { prev: null, next: null };
    }
    return {
        prev: index > 0 ? blogPosts[index - 1] : null,
        next: index < blogPosts.length - 1 ? blogPosts[index + 1] : null,
    };
}
