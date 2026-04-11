'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application Error:', error);
    }, [error]);

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FFF5F5',
            padding: '24px',
            textAlign: 'center'
        }}>
            <div style={{ maxWidth: '600px', position: 'relative' }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: '#FEE2E2',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 32px',
                    color: '#EF4444'
                }}>
                    <AlertCircle size={40} />
                </div>

                <h1 style={{
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    fontWeight: 950,
                    color: '#1F2937',
                    marginBottom: '20px',
                    lineHeight: 1.1
                }}>
                    Something went wrong
                </h1>

                <p style={{
                    fontSize: '1.125rem',
                    color: '#4B5563',
                    marginBottom: '48px',
                    lineHeight: 1.7
                }}>
                    We encountered an unexpected error. This might be due to a temporary connection issue with our database. Please try refreshing the page.
                </p>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => reset()}
                        style={{
                            background: '#EF4444',
                            color: 'white',
                            padding: '16px 32px',
                            borderRadius: '100px',
                            fontWeight: 800,
                            fontSize: '0.9375rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'all 0.3s ease',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 10px 20px -5px rgba(239, 68, 68, 0.3)'
                        }}
                    >
                        <RefreshCw size={18} /> Try Again Now
                    </button>
                    
                    <Link href="/" style={{
                        border: '2px solid #E5E7EB',
                        color: '#374151',
                        padding: '16px 32px',
                        borderRadius: '100px',
                        fontWeight: 800,
                        fontSize: '0.9375rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'all 0.3s ease',
                        background: 'white'
                    }}>
                        <Home size={18} /> Return Home
                    </Link>
                </div>
                
                {error.digest && (
                    <div style={{ marginTop: '40px', fontSize: '0.75rem', color: '#9CA3AF' }}>
                        Error ID: {error.digest}
                    </div>
                )}
            </div>
        </div>
    );
}
