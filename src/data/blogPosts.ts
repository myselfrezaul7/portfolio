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
        excerpt: 'Counting reagent bottles at 4°C, negotiating with distributors in Dhaka traffic, and learning why textbook formulas break down when patients are waiting outside.',
        content: `Sitting in a quiet lecture hall here in Germany, watching the autumn rain outside, the silence sometimes catches me off guard. My head still instinctively listens for a different sound: the heavy, low rattle of a diesel backup generator kicking on when the power cuts out in Dhaka.

For nearly two years as a Data and Operations Analyst at Renaissance Diagnostic Care, that mechanical thrum was the soundtrack to our afternoons. Whenever the lights flickered, our team had about three seconds of breath-holding before the generator took over to protect the analyzers and the cold room compressors.

When I first took the job, I honestly thought my work would be clean and analytical. I had studied computing and business, and I imagined building neat dashboards, writing SQL queries, and tracking high-level metrics from an air-conditioned desk.

Instead, the job hit me with the weight of raw physical reality.

Renaissance was processing over 500 patient samples every single day. Blood, urine, biopsies, tissue cultures. In a diagnostic center, data doesn't start in a clean database. It starts with an 8-milliliter purple-top EDTA tube handed across a reception counter by someone who is worried about their health or their child's fever.

To keep those analyzers running, you need reagents: diluents, lysing agents, enzymatic washes, and control sera. Most of them are biologically active chemicals that must stay strictly between 2°C and 8°C.

I spent hours inside our cold room at 4°C, wearing an oversized jacket over my clothes, counting boxes by hand while my fingers went numb. If an analyzer ran out of CBC (Complete Blood Count) diluent in the middle of a shift, testing stopped immediately. If a batch of hormone assays spoiled because someone left a box on a receiving table during a shift handover, thousands of taka evaporated.

Like many facilities in Dhaka, our supply chain ran on instinct, phone calls, and chaotic WhatsApp voice notes. Whenever a technician noticed a shelf looking thin, they would ping an informal group: "Distributor on Mirpur Road said lyse will arrive Thursday." But Thursday would come, Mirpur Road would turn into a parking lot, or the importer's shipment would stall at Chittagong port, and nobody had answers.

Then August arrived, bringing the peak of the monsoon and Dhaka's Dengue season.

Overnight, our test volume exploded. Patients flooded the clinic with crushing body aches and high fevers. Requests for CBCs to monitor dropping platelet counts and Dengue NS1 antigen tests jumped fivefold within forty-eight hours. We burned through three weeks of inventory in five days.

One night around 2 AM, our night-shift hematology tech called me in a panic. We had four bottles of CBC lyse left, and thirty patients were waiting outside in the emergency triage area. I jumped on my motorbike, rode through flooded streets, and knocked on the back door of a friendly peer lab across town to borrow two boxes of reagent packs until our morning distributor could deliver.

Handing those bottles over while anxious families paced the corridor cured me forever of viewing supply chain as mere paperwork. A stockout in a diagnostic center isn't a lost retail sale. It is a worried mother waiting in tears because a doctor cannot confirm whether her child needs an immediate platelet transfusion.

After that Dengue surge, our team decided we were done operating on adrenaline. We needed a system that actually matched reality.

My first instinct was to implement textbook FIFO: First-In, First-Out. Whatever inventory arrives first should be consumed first.

It took us three weeks to realize FIFO was actively creating waste.

Here was the catch: distributors in Dhaka don't always receive homogeneous inventory from overseas manufacturers. In June, a supplier might deliver reagents with an expiration date of December. But in July, their shipment from Europe or China might contain a batch produced earlier, with an expiration date of October.

If we strictly followed FIFO, we pushed the July arrival behind the June arrival on our shelves. The result? Reagents with shorter shelf lives sat quietly at the back of our racks until they expired unused.

We threw out the textbook rule and switched strictly to FEFO: First-Expired, First-Out.

We didn't buy expensive software for this. We reorganized our cold room bins with clear color-coded physical tags based on expiry month—red for less than 60 days, yellow for 90 days, green for six months plus. Every technician who grabbed a bottle was trained to take from the front-left bin, regardless of when it had arrived at the loading dock.

That single operational change—pairing physical bin discipline with FEFO tracking—cut our expired reagent waste by 18% over the next four months.

The second challenge was figuring out when to reorder.

When people talk about operations nowadays, the conversation instantly jumps to artificial intelligence and predictive algorithms. But in a city where delivery times can swing from four hours to four days depending on weather, traffic, or supplier shortages, fancy black-box models are useless.

What worked was simple, disciplined arithmetic.

We sat down and calculated our actual daily burn rate across high-volume test profiles, and more importantly, we mapped out our lead-time variance. Instead of assuming a supplier took 48 hours because they promised 48 hours, we tracked their actual delivery stamps over the previous six months. We factored in buffer margins for rainy days and customs delays.

We established transparent Reorder Points (ROP) with explicit safety stock thresholds:

Reorder Point = (Average Daily Usage × Average Lead Time) + Safety Stock

Where our safety stock directly reflected the worst-case delivery delays we had logged during peak traffic and import bottlenecks.

We also shut down the informal WhatsApp ordering. Requisitions went through a shared, standardized log that required batch numbers, current stock on hand, and supplier confirmation timestamps. When our shared Excel sheet started lagging and locking up under 40,000 test records, I built a lightweight Power BI dashboard connected directly to our test exports so floor supervisors could see stockout risks 72 hours in advance.

The outcome wasn't glamorous, but it was real. We eliminated midnight emergency dashes to borrow supplies from other clinics, brought our stockout rate on essential test profiles to zero, and freed up our medical technologists to focus on sample quality rather than tracking down delivery vans.

Now, as an IMIS Master's student in Germany, I spend my days studying enterprise architectures, information systems, and process modeling.

In seminar discussions about digital transformation, it is easy for conversations to stay abstract. It's tempting to think that better data just means cleaner database schemas or sleeker user interfaces.

Whenever I find myself drifting into pure theory, I think back to that 4°C cold room in Dhaka, shivering in my jacket, writing lot numbers on a clipboard.

Real systems don't exist in a vacuum. They live in physical spaces where generators vibrate the floorboards, where distributors drop off mismatched batches, and where traffic jams make a mockery of clean timelines. Good data management isn't about building the most complex system possible; it is about building processes sturdy enough to hold up when the pressure spikes and people's health is on the line.

Technology and data are only as good as the physical reality they support. And sometimes, the most useful thing an analyst can do is grab a colored sticker, do some honest math, and make sure the lab never runs out of lyse when the waiting room is full.`,
        date: '2026-01-15',
        readTime: '6 min read',
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
