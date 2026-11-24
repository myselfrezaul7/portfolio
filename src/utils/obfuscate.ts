// Client-only anti-scraping email assembly.
// Never call getEmailAddress() or getMailtoUrl() during SSR/JSX attribute rendering;
// invoke them strictly inside client event handlers or useEffect hooks.

const CHAR_OFFSET = 5;

// Encoded char codes (+5 offset) for local-part, domain, and TLD
const USER_CODES = [114, 126, 120, 106, 113, 107, 119, 106, 127, 102, 122, 113];
const DOMAIN_CODES = [108, 114, 102, 110, 113];
const TLD_CODES = [104, 116, 114];

function decode(codes: readonly number[]): string {
    return String.fromCharCode(...codes.map((code) => code - CHAR_OFFSET));
}

/**
 * Reconstructs the contact email address at call time from numeric char codes.
 * Call only inside event handlers or useEffect to prevent plaintext leakage in SSG HTML.
 */
export function getEmailAddress(): string {
    const user = decode(USER_CODES);
    const domain = decode(DOMAIN_CODES);
    const tld = decode(TLD_CODES);
    return `${user}${String.fromCharCode(64)}${domain}${String.fromCharCode(46)}${tld}`;
}

/**
 * Backward-compatible alias for getEmailAddress().
 */
export function getContactEmail(): string {
    return getEmailAddress();
}

/**
 * Human-readable obfuscated display label safe for SSR/initial render before hydration/reveal.
 */
export function getObfuscatedEmailLabel(): string {
    const user = decode(USER_CODES);
    const domain = decode(DOMAIN_CODES);
    const tld = decode(TLD_CODES);
    return `${user} [at] ${domain} [dot] ${tld}`;
}

/**
 * Builds a mailto: URL with optional encoded subject and body parameters.
 * Kept for compatibility: invoke ONLY inside click handlers or useEffect, never in SSR JSX.
 */
export function getMailtoUrl(subject?: string, body?: string): string {
    const base = `mailto:${getEmailAddress()}`;
    const params: string[] = [];

    if (subject && subject.trim().length > 0) {
        params.push(`subject=${encodeURIComponent(subject.trim())}`);
    }
    if (body && body.trim().length > 0) {
        params.push(`body=${encodeURIComponent(body.trim())}`);
    }

    return params.length > 0 ? `${base}?${params.join('&')}` : base;
}

/**
 * Opens the visitor's default mail client strictly from a browser interaction.
 */
export function openMailClient(subject?: string, body?: string): void {
    if (typeof window === 'undefined') return;
    window.location.href = getMailtoUrl(subject, body);
}
