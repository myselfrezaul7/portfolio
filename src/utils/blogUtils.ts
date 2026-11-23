export type CategoryTone = 'data' | 'venture' | 'community' | 'web' | 'default';

export interface CategoryMeta {
    label: string;
    tone: CategoryTone;
    slug: string;
    accentHex: string;
    description: string;
}

export interface ArticleHeading {
    id: string;
    text: string;
    level: 2 | 3;
}

const CATEGORY_META_MAP: Record<string, CategoryMeta> = {
    'data & reporting': {
        label: 'Data & Reporting',
        tone: 'data',
        slug: 'data-reporting',
        accentHex: '#06b6d4',
        description: 'Clinical spreadsheets, reporting pipelines, and actionable decision support.',
    },
    'social venture': {
        label: 'Social Venture',
        tone: 'venture',
        slug: 'social-venture',
        accentHex: '#f59e0b',
        description: 'Mission-driven commerce, supply chain state machines, and bilingual platforms.',
    },
    'community operations': {
        label: 'Community Operations',
        tone: 'community',
        slug: 'community-operations',
        accentHex: '#10b981',
        description: 'Moderation playbooks, cross-timezone stewardship, and high-trust workflows.',
    },
    'web & process': {
        label: 'Web & Process',
        tone: 'web',
        slug: 'web-process',
        accentHex: '#8b5cf6',
        description: 'BPMN 2.0 process mapping translated into live full-stack web applications.',
    },
};

/**
 * Formats an ISO YYYY-MM-DD date string deterministically in UTC to avoid SSR/client timezone drift.
 */
export function formatDate(dateStr: string, style: 'short' | 'long' = 'short'): string {
    const parts = dateStr.split('-').map(Number);
    if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) {
        return dateStr;
    }
    const [year, month, day] = parts;
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toLocaleDateString('en-US', {
        timeZone: 'UTC',
        month: style === 'long' ? 'long' : 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

/**
 * Returns canonical category metadata & color tone token for a blog category string.
 */
export function getCategoryMeta(category: string): CategoryMeta {
    const normalized = category.trim().toLowerCase();
    return (
        CATEGORY_META_MAP[normalized] ?? {
            label: category,
            tone: 'default',
            slug: slugifyHeading(category),
            accentHex: '#4a9b9b',
            description: 'Notes on process architecture, data systems, and execution.',
        }
    );
}

/**
 * Maps a category string to the corresponding CSS Module badge class name.
 */
export function getCategoryClassName(
    category: string,
    styles: Partial<Record<'categoryData' | 'categoryVenture' | 'categoryCommunity' | 'categoryWeb', string>>
): string {
    const { tone } = getCategoryMeta(category);
    switch (tone) {
        case 'data':
            return styles.categoryData ?? '';
        case 'venture':
            return styles.categoryVenture ?? '';
        case 'community':
            return styles.categoryCommunity ?? '';
        case 'web':
            return styles.categoryWeb ?? '';
        default:
            return '';
    }
}

/**
 * Strips simple inline Markdown syntax so headings and word counts stay clean.
 */
export function stripInlineMarkdown(text: string): string {
    return text
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .trim();
}

/**
 * Produces a deterministic URL-safe heading anchor ID.
 */
export function slugifyHeading(text: string): string {
    const clean = stripInlineMarkdown(text)
        .toLowerCase()
        .replace(/['’]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    return clean || 'section';
}

/**
 * Extracts all level-2 (##) and level-3 (###) headings from article Markdown content
 * with guaranteed unique, stable anchor IDs.
 */
export function extractHeadings(content: string): ArticleHeading[] {
    const lines = content.split(/\r?\n/);
    const headings: ArticleHeading[] = [];
    const seenIds = new Map<string, number>();

    for (const rawLine of lines) {
        const line = rawLine.trim();
        let level: 2 | 3 | null = null;
        let rawText = '';

        if (line.startsWith('### ')) {
            level = 3;
            rawText = line.slice(4).trim();
        } else if (line.startsWith('## ')) {
            level = 2;
            rawText = line.slice(3).trim();
        }

        if (!level || !rawText) continue;

        const text = stripInlineMarkdown(rawText);
        const baseId = slugifyHeading(text);
        const count = seenIds.get(baseId) ?? 0;
        seenIds.set(baseId, count + 1);
        const id = count === 0 ? baseId : `${baseId}-${count + 1}`;

        headings.push({ id, text, level });
    }

    return headings;
}

/**
 * Computes estimated read duration in whole minutes (minimum 1 minute).
 */
export function getReadMinutes(content: string): number {
    const plainText = stripInlineMarkdown(content)
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/^>\s+/gm, '')
        .replace(/^[-*]\s+/gm, '')
        .replace(/^\d+\.\s+/gm, '');
    const words = plainText.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
}

/**
 * Copies text to clipboard with an invisible textarea fallback for restricted contexts.
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    try {
        if (navigator?.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        }
        throw new Error('Clipboard API unavailable');
    } catch {
        try {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'fixed';
            textarea.style.top = '-9999px';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            const ok = document.execCommand('copy');
            document.body.removeChild(textarea);
            return ok;
        } catch {
            return false;
        }
    }
}
