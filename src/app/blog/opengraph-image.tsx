import { ImageResponse } from 'next/og';
import { blogPosts } from '@/data/blogPosts';

export const alt = 'Insights & Writing - Md Rezaul Karim';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const DOMAIN_PILLS = ['SAP BW/4HANA', 'BPMN 2.0', 'Agile PMO', 'Full-Stack'];
const VERTICAL_LINES = [80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960, 1040, 1120];
const HORIZONTAL_LINES = [80, 160, 240, 320, 400, 480, 560];
const GRID_NODES = [
    { x: 240, y: 160 },
    { x: 640, y: 80 },
    { x: 960, y: 160 },
    { x: 1040, y: 400 },
    { x: 160, y: 480 },
    { x: 720, y: 480 },
];

export default function Image() {
    const articleCount = blogPosts.length;

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
                    background: 'linear-gradient(135deg, #07090b 0%, #0d1216 55%, #091315 100%)',
                    padding: '56px 68px 52px',
                    color: '#f8fafc',
                    fontFamily: 'sans-serif',
                    overflow: 'hidden',
                }}
            >
                {/* Subtle Architectural Grid Backdrop */}
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
                            fill="rgba(95, 179, 179, 0.35)"
                        />
                    ))}
                </svg>

                {/* Ambient Radial Accent Glows */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-130px',
                        right: '-90px',
                        width: '520px',
                        height: '520px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(74, 155, 155, 0.2) 0%, rgba(74, 155, 155, 0) 70%)',
                        display: 'flex',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-170px',
                        left: '-110px',
                        width: '440px',
                        height: '440px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(74, 155, 155, 0.1) 0%, rgba(74, 155, 155, 0) 70%)',
                        display: 'flex',
                    }}
                />

                {/* Top Header Bar: Monogram Emblem & Location Badge */}
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
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2px',
                            }}
                        >
                            <span
                                style={{
                                    fontSize: '13px',
                                    fontWeight: 700,
                                    letterSpacing: '0.16em',
                                    textTransform: 'uppercase',
                                    color: '#5fb3b3',
                                }}
                            >
                                EDITORIAL ARCHIVE
                            </span>
                            <span
                                style={{
                                    fontSize: '15px',
                                    color: '#cbd5e1',
                                    fontWeight: 600,
                                }}
                            >
                                Md Rezaul Karim
                            </span>
                        </div>
                    </div>

                    {/* Location Badge */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 18px',
                            borderRadius: '999px',
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            fontSize: '16px',
                            fontWeight: 500,
                            color: '#e2e8f0',
                        }}
                    >
                        <div
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: '#5fb3b3',
                                display: 'flex',
                            }}
                        />
                        <span>Soest, Germany</span>
                    </div>
                </div>

                {/* Main Editorial Hero */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        position: 'relative',
                        marginTop: '12px',
                        marginBottom: '12px',
                    }}
                >
                    <div
                        style={{
                            fontSize: '64px',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.08,
                            color: '#ffffff',
                            marginBottom: '18px',
                            display: 'flex',
                        }}
                    >
                        Insights &amp; Writing
                    </div>
                    <div
                        style={{
                            fontSize: '23px',
                            color: '#94a3b8',
                            lineHeight: 1.5,
                            maxWidth: '880px',
                            marginBottom: '32px',
                            display: 'flex',
                        }}
                    >
                        Field notes on operations analytics, supply chain execution, BPMN process modeling, and building real-world digital products.
                    </div>

                    {/* Role / Domain Pills */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: '12px',
                        }}
                    >
                        {DOMAIN_PILLS.map((pill) => (
                            <div
                                key={pill}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px 18px',
                                    borderRadius: '10px',
                                    background: 'rgba(74, 155, 155, 0.1)',
                                    border: '1px solid rgba(74, 155, 155, 0.3)',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    color: '#d7f3f3',
                                    letterSpacing: '0.01em',
                                }}
                            >
                                {pill}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Bar */}
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
                    <span
                        style={{
                            fontSize: '16px',
                            color: '#94a3b8',
                        }}
                    >
                        {`${articleCount} Published Essays · RSS Feed Available`}
                    </span>
                    <span
                        style={{
                            fontSize: '18px',
                            fontWeight: 700,
                            color: '#5fb3b3',
                            letterSpacing: '0.02em',
                        }}
                    >
                        mdkarim.vercel.app/blog
                    </span>
                </div>

                {/* Bottom Accent Rule */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '5px',
                        background: 'linear-gradient(90deg, #4a9b9b 0%, #5fb3b3 55%, rgba(74, 155, 155, 0.15) 100%)',
                        display: 'flex',
                    }}
                />
            </div>
        ),
        { ...size }
    );
}
