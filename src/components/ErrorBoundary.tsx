'use client';

import React from 'react';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    retryCount: number;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, retryCount: 0 };
    }

    static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        if (process.env.NODE_ENV !== 'production') {
            console.error('ErrorBoundary caught:', error, errorInfo);
        }
    }

    handleRetry = () => {
        if (this.state.retryCount >= 2) {
            if (typeof window !== 'undefined') {
                window.location.reload();
            }
            return;
        }
        this.setState((prev) => ({
            hasError: false,
            retryCount: prev.retryCount + 1,
        }));
    };

    render() {
        if (this.state.hasError) {
            const isPersistent = this.state.retryCount >= 2;
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '200px',
                    padding: '40px 24px',
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                }}>
                    <p style={{ fontSize: '16px', marginBottom: '16px' }}>
                        Something went wrong loading this section.
                    </p>
                    <button
                        type="button"
                        onClick={this.handleRetry}
                        style={{
                            padding: '10px 24px',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                        }}
                    >
                        {isPersistent ? 'Refresh Page' : 'Try Again'}
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
