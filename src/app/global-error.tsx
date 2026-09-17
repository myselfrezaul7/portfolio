'use client';

import { useEffect } from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Global root layout error:', error);
    }, [error]);

    return (
        <html lang="en">
            <body
                style={{
                    margin: 0,
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    background: '#0a0a0a',
                    color: '#ffffff',
                    textAlign: 'center',
                }}
            >
                <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Application Error</h1>
                <p style={{ color: '#a3a3a3', maxWidth: '400px', marginBottom: '24px', lineHeight: 1.5 }}>
                    A critical error occurred while loading the application.
                </p>
                <button
                    type="button"
                    onClick={() => reset()}
                    style={{
                        padding: '12px 24px',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#ffffff',
                        background: '#4a9b9b',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}
                >
                    Try Again
                </button>
            </body>
        </html>
    );
}
