import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FDFDFF',
            padding: '24px',
            textAlign: 'center'
        }}>
            <div style={{ maxWidth: '600px' }}>
                <div style={{
                    fontSize: '12rem',
                    fontWeight: 950,
                    lineHeight: 1,
                    color: 'var(--primary)',
                    opacity: 0.05,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 0,
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap'
                }}>
                    404
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'var(--primary-50)',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 32px',
                        color: 'var(--primary)'
                    }}>
                        <Home size={32} />
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 900,
                        color: 'var(--primary-dark)',
                        marginBottom: '20px',
                        lineHeight: 1.1
                    }}>
                        Oops! Page not found.
                    </h1>

                    <p style={{
                        fontSize: '1.125rem',
                        color: 'var(--gray-600)',
                        marginBottom: '48px',
                        lineHeight: 1.6
                    }}>
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>

                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/" style={{
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '16px 32px',
                            borderRadius: '100px',
                            fontWeight: 800,
                            fontSize: '0.9375rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 20px -5px rgba(10, 77, 162, 0.3)'
                        }}>
                            <Home size={18} /> Back to Homepage
                        </Link>
                        
                        <Link href="/products" style={{
                            border: '2px solid #E2E8F0',
                            color: 'var(--primary-dark)',
                            padding: '16px 32px',
                            borderRadius: '100px',
                            fontWeight: 800,
                            fontSize: '0.9375rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'all 0.3s ease'
                        }}>
                            View Our Products
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
