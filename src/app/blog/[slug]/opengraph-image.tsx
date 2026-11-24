import { ImageResponse } from 'next/og';
import { blogPosts, getPostBySlug } from '@/data/blogPosts';

export const alt = 'Article - Md Rezaul Karim';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const VERTICAL_LINES = [80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960, 1040, 1120];
const HORIZONTAL_LINES = [80, 160, 240, 320, 400, 480, 560];
const GRID_NODES = [
    { x: 160, y: 160 },
    { x: 560, y: 80 },
    { x: 960, y: 160 },
    { x: 1040, y: 400 },
    { x: 240, y: 480 },
    { x: 800, y: 480 },
];

interface CategoryStyle {
    accent: string;
    bg: string;
    border: string;
    glow: string;
    barEnd: string;
}

function getCategoryStyle(category: string): CategoryStyle {
    switch (category.toLowerCase()) {
        case 'data & reporting':
            return {
                accent: '#22d3ee',
                bg: 'rgba(6, 182, 212, 0.14)',
                border: 'rgba(34, 211, 238, 0.42)',
                glow: 'rgba(6, 182, 212, 0.18)',
                barEnd: 'rgba(6, 182, 212, 0.15)',
            };
        case 'social venture':
            return {
                accent: '#fbbf24',
                bg: 'rgba(245, 158, 11, 0.14)',
                border: 'rgba(251, 191, 36, 0.42)',
                glow: 'rgba(245, 158, 11, 0.16)',
                barEnd: 'rgba(245, 158, 11, 0.15)',
            };
        case 'community operations':
            return {
                accent: '#34d399',
                bg: 'rgba(16, 185, 129, 0.14)',
                border: 'rgba(52, 211, 153, 0.42)',
                glow: 'rgba(16, 185, 129, 0.17)',
                barEnd: 'rgba(16, 185, 129, 0.15)',
            };
        case 'web & process':
            return {
                accent: '#a78bfa',
                bg: 'rgba(139, 92, 246, 0.14)',
                border: 'rgba(167, 139, 250, 0.42)',
                glow: 'rgba(139, 92, 246, 0.18)',
                barEnd: 'rgba(139, 92, 246, 0.15)',
            };
        default:
            return {
                accent: '#5fb3b3',
                bg: 'rgba(74, 155, 155, 0.15)',
                border: 'rgba(95, 179, 179, 0.42)',
                glow: 'rgba(74, 155, 155, 0.18)',
                barEnd: 'rgba(74, 155, 155, 0.15)',
            };
    }
}

function formatUtcDate(dateStr: string): string {
    const parts = dateStr.split('-').map(Number);
    if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) {
        return dateStr;
    }
    const [year, month, day] = parts;
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toLocaleDateString('en-US', {
        timeZone: 'UTC',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function truncateExcerpt(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    const sliced = text.slice(0, maxLength - 1);
    const lastSpace = sliced.lastIndexOf(' ');
    const wordSafe = lastSpace > maxLength * 0.6 ? sliced.slice(0, lastSpace) : sliced;
    return `${wordSafe.replace(/[\s,;:\-]+$/, '')}…`;
}

export function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function Image({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    const title = post ? post.title : 'Insights & Writing';
    const excerpt = post
        ? truncateExcerpt(post.excerpt, 155)
        : 'Field notes on operations analytics, supply chain execution, and digital systems.';
    const category = post ? post.category : 'Insights';
    const publishedDate = post
        ? post.updatedAt
            ? `Updated ${formatUtcDate(post.updatedAt)}`
            : formatUtcDate(post.date)
        : 'mdkarim.vercel.app';
    const readTime = post ? post.readTime : 'Essay';
    const palette = getCategoryStyle(category);

    const headlineFontSize = title.length > 68 ? 44 : title.length > 48 ? 50 : 56;

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    background: 'linear-gradient(135deg, #07090b 0%, #0d1216 55%, #091215 100%)',
                    padding: '54px 68px 50px',
                    color: '#f8fafc',
                    fontFamily: 'sans-serif',
                    overflow: 'hidden',
                }}
            >
                {/* Architectural Grid Backdrop */}
                <svg
                    width="1200"
                    height="630"
                    viewBox="0 0 1200 630"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                >
                    {VERTICAL_LINES.map((x) => (
                        <line
                            key={`v-${x}`}
                            x1={x}
                            y1={0}
                            x2={x}
                            y2={630}
                            stroke="rgba(255, 255, 255, 0.035)"
                            strokeWidth="1"
                        />
                    ))}
                    {HORIZONTAL_LINES.map((y) => (
                        <line
                            key={`h-${y}`}
                            x1={0}
                            y1={y}
                            x2={1200}
                            y2={y}
                            stroke="rgba(255, 255, 255, 0.035)"
                            strokeWidth="1"
                        />
                    ))}
                    {GRID_NODES.map((node, index) => (
                        <circle
                            key={`n-${index}`}
                            cx={node.x}
                            cy={node.y}
                            r="2.5"
                            fill={palette.border}
                        />
                    ))}
                </svg>

                {/* Category-Tinted Ambient Radial Glow */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-140px',
                        right: '-100px',
                        width: '540px',
                        height: '540px',
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${palette.glow} 0%, rgba(7, 9, 11, 0) 70%)`,
                        display: 'flex',
                    }}
                />

                {/* Top Header Bar: Brand Emblem + Color-Coded Category Pill */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                        }}
                    >
                        {/* M•K Monogram Emblem */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '10px 18px',
                                borderRadius: '12px',
                                background: 'rgba(17, 23, 28, 0.92)',
                                border: '1px solid rgba(74, 155, 155, 0.42)',
                                fontSize: '22px',
                                fontWeight: 800,
                                letterSpacing: '0.08em',
                                color: '#ffffff',
                            }}
                        >
                            <span>M</span>
                            <span style={{ color: '#5fb3b3', margin: '0 4px' }}>•</span>
                            <span>K</span>
                        </div>
                        <span
                            style={{
                                fontSize: '14px',
                                fontWeight: 700,
                                letterSpacing: '0.16em',
                                textTransform: 'uppercase',
                                color: '#94a3b8',
                            }}
                        >
                            INSIGHTS &amp; WRITING
                        </span>
                    </div>

                    {/* Color-Coded Category Pill */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 20px',
                            borderRadius: '999px',
                            background: palette.bg,
                            border: `1px solid ${palette.border}`,
                            fontSize: '15px',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: palette.accent,
                        }}
                    >
                        <div
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: palette.accent,
                                display: 'flex',
                            }}
                        />
                        <span>{category}</span>
                    </div>
                </div>

                {/* Main Article Headline & Excerpt */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        position: 'relative',
                        marginTop: '14px',
                        marginBottom: '14px',
                    }}
                >
                    <div
                        style={{
                            fontSize: `${headlineFontSize}px`,
                            fontWeight: 800,
                            letterSpacing: '-0.025em',
                            lineHeight: 1.16,
                            color: '#ffffff',
                            marginBottom: '22px',
                            maxWidth: '1040px',
                            display: 'flex',
                        }}
                    >
                        {title}
                    </div>
                    <div
                        style={{
                            fontSize: '21px',
                            color: '#94a3b8',
                            lineHeight: 1.5,
                            maxWidth: '940px',
                            display: 'flex',
                        }}
                    >
                        {excerpt}
                    </div>
                </div>

                {/* Bottom Attribution & Meta Bar */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        paddingTop: '22px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.09)',
                        position: 'relative',
                    }}
                >
                    {/* Author Attribution */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2px',
                            }}
                        >
                            <span
                                style={{
                                    fontSize: '19px',
                                    fontWeight: 700,
                                    color: '#f8fafc',
                                }}
                            >
                                Md Rezaul Karim
                            </span>
                            <span
                                style={{
                                    fontSize: '15px',
                                    color: '#94a3b8',
                                }}
                            >
                                Soest, Germany · mdkarim.vercel.app
                            </span>
                        </div>
                    </div>

                    {/* Publish Date & Read Time */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            padding: '10px 18px',
                            borderRadius: '10px',
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            fontSize: '16px',
                            fontWeight: 600,
                            color: '#e2e8f0',
                        }}
                    >
                        <span>{publishedDate}</span>
                        <span style={{ color: palette.accent }}>•</span>
                        <span style={{ color: palette.accent }}>{readTime}</span>
                    </div>
                </div>

                {/* Category-Tinted Bottom Accent Rule */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '5px',
                        background: `linear-gradient(90deg, ${palette.accent} 0%, #4a9b9b 58%, ${palette.barEnd} 100%)`,
                        display: 'flex',
                    }}
                />
            </div>
        ),
        { ...size }
    );
}
