'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, ArrowLeft } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        if (process.env.NODE_ENV !== 'production') {
            console.error('Unhandled route error caught by error.tsx:', error);
        }
    }, [error]);

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 24px',
                textAlign: 'center',
                background: 'var(--bg-primary)',
            }}
        >
            <span
                style={{
                    fontSize: 'clamp(48px, 8vw, 72px)',
                    fontWeight: 800,
                    color: 'var(--accent)',
                    marginBottom: '16px',
                }}
            >
                500
            </span>
            <h1
                style={{
                    fontSize: 'clamp(20px, 3.5vw, 28px)',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '12px',
                }}
            >
                Something went wrong
            </h1>
            <p
                style={{
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    maxWidth: '440px',
                    lineHeight: 1.6,
                    marginBottom: '32px',
                }}
            >
                An unexpected error occurred while processing this page. You can try refreshing or returning to the home page.
            </p>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    justifyContent: 'center',
                }}
            >
                <button
                    type="button"
                    onClick={() => reset()}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 24px',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#ffffff',
                        background: 'var(--accent)',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'background 200ms ease',
                    }}
                >
                    <RefreshCw size={16} />
                    Try Again
                </button>
                <Link
                    href="/"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 24px',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        textDecoration: 'none',
                    }}
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
