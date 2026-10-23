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

export function getReadTime(content: string): string {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
}

const rawBlogPosts: Omit<BlogPost, 'readTime'>[] = [
    {
        id: 1,
        slug: 'lab-data',
        title: 'From Data Entry to Charts: What a Diagnostic Lab Taught Me About Useful Data',
        excerpt: 'Entering daily records for over 100 patient samples in Excel and Google Sheets, building PowerPoint charts for managers, and learning why clean data matters before any complex analysis.',
        category: 'Data & Reporting',
        date: '2026-01-15',
        content: `## The Daily Volume

When people picture data analysis, they often imagine complex algorithms, real-time dashboards, and automated pipelines. My time at Renaissance Diagnostic Care taught me a very different reality. For over a year, I worked as a Data and Operations Analyst at our diagnostic center in Dhaka. Every single day, we handled over 100 patient samples: blood tests, urine screenings, tissue cultures, and urgent pathology orders.

In a clinical diagnostic center, data does not begin in a tidy data warehouse. It starts at a reception desk with a handwritten doctor prescription, a patient registration slip, and a labelled purple-top collection tube. Each sample represents a patient waiting for an answer. Behind that sample is a chain of data points: patient demographics, test categories, reagent batch numbers, and stock deductions.

## Getting the Data Right in Spreadsheets

My primary responsibility was entering and maintaining this daily stream of records. We worked primarily in Excel and Google Sheets, logging test counts, sample types, patient records, and inventory movements.

Early on, I realized how fragile spreadsheet data can be. In a fast-paced environment where samples arrive continuously, one miskeyed digit in a sample ID or an accidental paste into the wrong column can silently distort an entire weekly summary. If an entry error goes unnoticed, inventory logs show stock that does not exist, or test volume numbers misrepresent clinic throughput.

To prevent errors, I developed strict entry routines. Every evening, I reconciled our spreadsheet row counts against the physical registration logs from the front desk. I set up data validation rules to block duplicate patient IDs and highlight missing test codes. I used conditional formatting to flag low reagent quantities and locked formula cells so accidental keystrokes could not corrupt monthly sums. These were not complex software engineering feats, but disciplined spreadsheet habits that kept our baseline numbers trustworthy.

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

The lesson was humbling and immediate: in operational settings, a simple system that everyone understands is far superior to a clever system that breaks under pressure. I redesigned the tracker with straightforward, transparent columns and clear documentation.

## What I Would Do Differently Today

Now, as a Master's student in International Management and Information Systems (IMIS) in Germany, I study formal business process modeling, enterprise data warehousing, and system architectures.

Looking back at my time at Renaissance with what I know today, I would design our data intake differently. Instead of relying on manual spreadsheet entries, I would map our sample intake using standard BPMN 2.0 workflows to identify handoff friction between receptionists and lab technologists. I would implement structured data validation at the point of initial capture to remove repetitive double-entry work entirely.

Yet the core principle remains unchanged. Whether you are building an enterprise data warehouse or typing entries into a Google Sheet, technology is only as valuable as the decisions it enables. The most rewarding part of working with data is not the complexity of your formulas, but whether your reports help responsible leaders make sound decisions that improve people's lives.`,
    },
    {
        id: 2,
        slug: 'building-petbhai',
        title: 'PetBhai: Planning a Pet Shop That Funds Animal Rescue',
        excerpt: 'Why our animal rescue work led to building an e-commerce prototype, how the revenue model supports voiceless animals, and what remains to be solved before launch.',
        category: 'Social Venture',
        date: '2025-10-10',
        content: `## Why Rescue Needs a Sustainable Model

Anyone who has participated in street animal welfare knows the emotional and financial strain it creates. Over the years of running animal welfare initiatives in Bangladesh, my friends and I routinely faced urgent emergencies: injured stray dogs hit by vehicles, malnourished litters of kittens abandoned in alleyways, and animals suffering from severe infections.

Every single rescue requires immediate funds. Veterinary consultations, antibiotics, wound dressing, surgery, and daily feeding all require reliable money. For years, we funded these operations through personal pockets and emergency appeals within our community. But relying solely on spontaneous donations and personal savings is exhausting and precarious. Some months funds run dry right when an animal needs critical medical care.

At the same time, thousands of conscientious pet owners across the country buy pet food, cat litter, grooming supplies, and accessories every month through retail shops. That contrast sparked the idea for PetBhai: what if we built a dedicated pet supplies business whose primary purpose is to channel its revenue directly into rescuing and rehabilitating stray and voiceless animals?

## Designing the Prototype

To test the feasibility of this social venture, I set out to build PetBhai as a working software prototype. The goal was to prove the operational logic, catalogue structure, and order fulfillment flows before investing financial capital into warehouse leases or physical stock.

I structured the prototype with several core capabilities:
First, a clean product catalogue organized by dietary needs, age stages, and pet types, avoiding the cluttered social media marketplace listings typical in the local market.
Second, an inventory tracking model with explicit stock states: Available, In Basket, Confirmed, and Dispatched. This state flow ensures that products cannot be oversold during high-traffic campaigns.
Third, a checkout and delivery routing workflow designed around the local courier ecosystem, mapping how orders move from fulfillment hubs to residential doorsteps.

## What Didn't Go to Plan

Building the software prototype was straightforward; modeling the physical logistics under local constraints proved much harder.

During our initial delivery simulations, we encountered major challenges with product handling and courier reliability. In Dhaka, heavy items like twenty-kilogram bags of dog food or clay cat litter require careful handling. Standard courier services frequently damaged packaging in transit during rainy monsoon days, leading to rejected deliveries and lost revenue.

Furthermore, cash on delivery remains the dominant payment method in the region. Modeling cash-on-delivery reconciliations in our order pipeline revealed that payments often take several days to clear back from courier partners to the business account. For a venture meant to provide immediate cash flow for urgent veterinary surgeries, delayed courier reconciliations would create serious cash crunches. These logistical roadblocks demonstrated that writing working web code is only ten percent of the challenge; physical fulfillment and cash cycles determine whether a social venture survives.

## Keeping It a Prototype While Studying

People often ask why PetBhai has not launched as an active commercial storefront yet. The answer comes down to operational honesty.

Running a reliable e-commerce business requires full-time, hands-on attention on the ground. It demands managing vendor relationships, inspecting product storage quality, supervising packing teams, and handling customer support calls every morning. When I moved to Germany to pursue my Master's degree in International Management and Information Systems (IMIS) at Fachhochschule Südwestfalen, I had to be realistic about my capacity.

Attempting to run a fragile, early-stage logistics business from seven thousand kilometers away while handling full-time graduate studies would have compromised both my education and the quality of the service. I chose to keep PetBhai as an architected prototype and research foundation. It serves as an active testing ground where I apply the principles of information systems, enterprise resource planning, and supply chain management that I study in Germany.

## The Long-Term Vision

PetBhai remains a central part of my long-term plans. The mission has not changed: establishing a self-sustaining social enterprise where pet owners can buy quality products knowing that every purchase helps rescue an injured animal or feed a hungry stray on the street.

My time in the IMIS Master's program is giving me the tools to build this venture properly. When the time comes to launch PetBhai commercially, it will not be an impulsive experiment, but a well-structured operation designed to stand on its own feet and serve voiceless animals for years to come.`,
    },
    {
        id: 3,
        slug: 'community-moderators',
        title: 'Handing Over a 450,000-Member Community to Five Moderators',
        excerpt: 'Founding two large animal welfare groups, handling the burnout of answering every message alone, and building clear rules and automated alerts that let a small team run the platform.',
        category: 'Community Operations',
        date: '2026-04-18',
        content: `## Founding the Communities

Years ago, I founded Dog Lovers of Bangladesh and Cat Lovers of Bangladesh. At the time, there was no centralized online space where pet owners and animal rescuers in Bangladesh could connect, find reliable veterinary advice, or report lost pets.

What began as modest discussion groups grew rapidly. Month after month, thousands of new members joined. Today, across both communities, over 450,000 members share advice, arrange adoptions, and report animals in distress. Seeing that community grow from zero was inspiring, but as the numbers climbed, the operational burden grew alongside them.

## The Bottleneck and Personal Burnout

In the early stages, I made the classic founder mistake of trying to handle everything myself. My notifications never stopped. At 7 AM, someone would message about a lost puppy in Dhanmondi. At noon, someone would report an injured cat in Chittagong. At midnight, someone would post an emotional appeal for urgent veterinary donations.

I felt personally responsible for every animal mentioned in the groups. I spent hours answering direct messages, approving posts, and trying to connect rescuers with clinics.

Inevitably, this approach collapsed into severe burnout. When you try to be the single point of contact for tens of thousands of people, you become the primary bottleneck. Urgent medical appeals sat in the approval queue while I was working or sleeping, while fraudulent fundraising posts occasionally slipped through because I was too tired to review documentation properly. It became painfully clear that passion without organization harms the very animals you want to protect.

## Handing Over to Five Dedicated Moderators

I realized the groups needed a real operational structure. I could not run them alone, nor did we need a massive, bloated bureaucracy. What we needed was a focused, trustworthy team.

I selected about five active, reliable community members who had demonstrated good judgment, deep empathy for animals, and emotional calm during online conflicts. I invited them to step up as our core moderation team.

Instead of dividing the team into complex corporate tiers, we kept the structure practical and direct. Each moderator took ownership of specific time windows during the day and specific focus areas. Some focused on reviewing daily submissions, others focused on adoption vetting, and others verified medical cases with clinics.

## Standard Formats and Automated Keyword Alerts

To make the moderators' work manageable, we created clear rules and standardized posting formats:

First, we banned open, unverified fundraising requests. Anyone requesting financial help for an animal was required to provide a clear photograph, the name and location of the treating veterinary clinic, and an itemized prescription or doctor note. This single policy eliminated fraudulent claims and protected our members' trust.

Second, we introduced strict post templates for adoption and lost-pet notices. Every post had to include the animal age, medical history, location, and clear contact numbers before approval.

Third, we configured several automated keyword alerts inside our moderation tools. Keywords associated with life-threatening emergencies, such as poisonings, vehicular accidents, critical fractures, or urgent blood donor needs, immediately trigger high-priority alerts for our moderation team. When an alert fires, a moderator receives an immediate notification, reviews the post ahead of the general queue, and pins it to the top of the group so nearby rescuers can respond quickly.

## Managing Across Time Zones

The true test of this operational setup came when I moved to Germany to begin my Master's studies in International Management and Information Systems at Fachhochschule Südwestfalen.

Germany is four to five hours behind Bangladesh, depending on daylight saving time. If our communities had still depended on my personal daily approvals, the groups would have stalled every morning. But because our five moderators had clear guidelines, established posting formats, and automated alerts, the groups continued operating smoothly without interruption.

Our team communicates through a shared group chat where moderators discuss tricky cases, flag repeat offenders, and share updates on ongoing rescues. My role shifted from frontline moderator to community steward: I handle technical configuration, policy updates, and major escalations, while the five moderators manage day-to-day operations with confidence.

## What True Operations Looks Like

Founding a project is exciting, but building systems that function without your constant intervention is the real test of leadership.

A community of 450,000 members does not stay orderly because one person works eighteen hours a day. It works because a small team of dedicated people has clear rules, practical tools, and the trust to make decisions independently. Knowing that injured animals are still being rescued and adopted every single day while I study in Germany is the most satisfying proof that good operations matter.`,
    },
    {
        id: 4,
        slug: 'building-nextep-edu',
        title: 'From BPMN Diagrams to My First Live Website: Building NexTep Edu',
        excerpt: 'Mapping a study abroad consultancy with BPMN 2.0, building my first production website, and adding a private application tracker backed by Supabase.',
        category: 'Web & Process',
        date: '2026-03-10',
        content: `## Why I Said Yes

From the very beginning of my studies, I have been drawn to the space where management meets technology. I like understanding how a business actually runs, and then finding the right tools to make that work easier. So when I joined NexTep Edu, a study abroad consultancy helping students from Bangladesh apply to universities in Germany and other countries, as Technical Project Lead in May 2025, I saw a chance to do exactly that.

There was one catch. I had never built a full website before. NexTep Edu was my first real web project, and I learned most of what I know about web building along the way.

## Mapping the Process Before Writing Any Code

Before touching the website, I wanted to understand how the consultancy worked. A student's journey has many steps: the first inquiry, a consultation, university selection, preparing documents and a statement of purpose, the offer letter, proof of funds, and finally the visa. Each step involves different people and different documents, and it is easy for things to fall through the cracks.

Around that time I was learning BPMN 2.0 in my IMIS classes. As soon as I had access to a modelling tool, I used it to draw out the consultancy's workflow: who does what, in which order, and where a file waits for the next action.

I want to be honest about what this did and did not become. The BPMN models are not running inside any software. Nothing is automated by a process engine. What changed is that the team now has a clear visual map of the procedure, and they manage their daily work based on those diagrams and the plan we built from them. For a small team, that shared picture turned out to be more useful than any complicated system would have been.

## Building the Website

With the process clear, I moved on to the website itself. I built it by vibe coding: describing what I needed to AI coding assistants, reading and testing what came back, fixing what did not work, and repeating that loop until each part behaved the way I wanted.

The site runs on Next.js with Tailwind CSS. It supports both English and Bangla, has a dark and light theme, and includes a guide page for each of the 17 destination countries the consultancy works with. I also added structured data so search engines understand that NexTep Edu is an educational organisation with a local office, along with a frequently asked questions section and a simple contact form.

None of this was planned perfectly at the start. Every feature taught me something new about how pages are rendered, how routes work, and how small layout decisions affect the experience on a phone.

## The Private Application Tracker

The part I am proudest of is the application tracker.

Students applying abroad are understandably anxious, and the most common message the team received was some version of "Is there any update on my file?" Answering those one by one took time away from the actual work.

So I built a tracking page. When a student's application is set up, they receive an email with a unique tracking code and a private link. Using that link, they can check the current stage of their application at any time, without calling or messaging anyone. The data is stored in Supabase, and only staff members with admin access can update a student's progress. Students only ever see their own application, which was important to me because these files contain personal information.

It is not a complicated system, but it solves a real problem, and it connects directly back to the BPMN map: each stage a student sees on the tracker matches a step in the process we drew at the beginning.

## What I Would Do Differently

Because this was my first project, I made plenty of decisions that I would approach differently today. I would plan the content structure for both languages before building pages, test how the site looks to search engines earlier instead of only checking it in my own browser, and document the admin workflow for the team from day one rather than explaining it as questions came up.

## What It Gave Me

My time as Technical Project Lead at NexTep Edu ended in March 2026. Looking back, the biggest thing I took from it was not a specific framework or tool. It was confidence. I went in having never shipped a website, and I came out knowing I could take a business process, map it properly, and turn it into something people actually use.

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
