export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    readTime: string;
    category: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        slug: 'lab-supply-chain',
        title: 'What Managing a Clinical Lab Supply Chain Actually Taught Me',
        excerpt: 'Two years managing clinical procurement and inventory in Dhaka taught me how variance, safety stock formulas, and vendor SLAs turn operational chaos into predictable healthcare delivery.',
        content: `When I joined Renaissance Diagnostic Care in Dhaka, the clinical supply chain operated through fragmented communication channels and outdated spreadsheets. Laboratory technicians frequently experienced stockouts on critical diagnostic reagents, while perishable chemical assays expired unused on storage shelves. In a healthcare facility running over 500 patient tests daily, procurement delays directly impacted patient care.

My first initiative was establishing a centralized inventory ledger. I categorized reagents into high-velocity routine panels (such as Complete Blood Counts and lipid profiles) and specialized low-frequency assays. By tracking daily test consumption distributions and supplier lead times, I calculated dynamic safety stock levels and automated reorder points.

To address vendor reliability, I introduced a vendor scorecard evaluated on three core metrics: on-time delivery adherence, cold-chain compliance, and price stability. Consolidating orders with top-tier suppliers allowed us to negotiate volume discounts while establishing enforceable service level agreements (SLAs).

Within the first year, this structured approach reduced expired reagent waste by 18% and virtually eliminated emergency stockouts. The primary lesson was clear: operational resilience is built on disciplined data tracking, clear process boundaries, and continuous supplier alignment.`,
        date: '2026-01-15',
        readTime: '4 min read',
        category: 'Operations',
    },
    {
        id: 2,
        slug: 'building-petbhai',
        title: 'Building PetBhai: Supply Chain Architecture Under Constraints',
        excerpt: 'Architecting an e-commerce platform for an emerging market taught me that code is only as good as the underlying inventory state machines and fulfillment workflows.',
        content: `In emerging e-commerce markets like Bangladesh, the pet supplies sector has historically depended on informal social media storefronts with zero visibility into inventory availability or order fulfillment. Building PetBhai as a full-stack platform prototype from Germany required solving complex logistics constraints before writing frontend code.

The fundamental engineering challenge was inventory state management. In informal supply chains, multiple retail channels often pull from the same physical stock. I designed an atomic state machine in the database to manage product lifecycles across five distinct states: Available, Reserved (in active checkout), Dispatched, Delivered, and Returned. This prevented overselling during peak traffic while enabling real-time stock reconciliations.

Fulfillment presented another challenge. Courier infrastructure outside major urban hubs often involves multi-hop handoffs and cash-on-delivery reconciliation. I mapped end-to-end logistics workflows, integrating automated webhook updates for shipment tracking and exception handling for partial deliveries.

Building PetBhai demonstrated that technical platforms succeed or fail based on how accurately software architecture models real-world operational constraints.`,
        date: '2025-10-10',
        readTime: '5 min read',
        category: 'Entrepreneurship',
    },
    {
        id: 3,
        slug: 'solo-sprints',
        title: 'Solo Sprints: Agile Governance for Independent Builders',
        excerpt: 'Applying 2-week timeboxed sprint ceremonies, Work-In-Progress limits, and retrospective logs to keep complex master research and product development on schedule.',
        content: `Agile methodologies and Scrum ceremonies are traditionally designed for cross-functional engineering teams. However, applying sprint structures to independent software engineering and master thesis research has been one of the most effective productivity frameworks I have adopted.

The primary pitfall of solo technical work is scope creep and premature optimization: spending weeks refining visual micro-details while core architectural milestones stall. To counter this, I structure my work into strict two-week timeboxed sprint cycles.

Each sprint begins with a backlog grooming session where deliverables are decomposed into discrete, testable user stories with defined story points. I enforce a strict Work-In-Progress (WIP) limit: no more than two active tasks at any given time. A clear Definition of Done (DoD) ensures that features are only closed when automated tests pass, responsive mobile layouts are verified, and documentation is complete.

At the end of each sprint, I conduct a structured retrospective auditing estimated vs actual velocity. This practice transforms vague ambitions into measurable execution, creating transparency and sustained momentum across complex technical projects.`,
        date: '2025-05-05',
        readTime: '4 min read',
        category: 'Productivity',
    },
];
