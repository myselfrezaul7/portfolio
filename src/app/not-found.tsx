import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
    return (
        <>
            <Navbar />
            <main
                style={{
                    minHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '120px 24px 60px',
                    textAlign: 'center',
                    background: 'var(--bg-primary)',
                }}
            >
                <span
                    style={{
                        fontSize: 'clamp(72px, 12vw, 120px)',
                        fontWeight: 800,
                        lineHeight: 1,
                        color: 'var(--accent)',
                        letterSpacing: '-0.04em',
                        marginBottom: '16px',
                    }}
                >
                    404
                </span>
                <h1
                    style={{
                        fontSize: 'clamp(24px, 4vw, 36px)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: '12px',
                    }}
                >
                    Page Not Found
                </h1>
                <p
                    style={{
                        fontSize: '16px',
                        color: 'var(--text-secondary)',
                        maxWidth: '460px',
                        lineHeight: 1.6,
                        marginBottom: '32px',
                    }}
                >
                    The page you are looking for might have been moved, renamed, or is temporarily unavailable.
                </p>
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
                        transition: 'border-color 200ms ease, color 200ms ease',
                    }}
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>
            </main>
            <Footer />
        </>
    );
}
