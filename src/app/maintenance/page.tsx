import { Settings, Phone, Mail, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function MaintenancePage() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#F8FAFC',
            padding: '24px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Decorations */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-10%',
                width: '40%',
                height: '40%',
                background: 'var(--primary)',
                opacity: 0.03,
                borderRadius: '50%',
                filter: 'blur(80px)'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                left: '-10%',
                width: '40%',
                height: '40%',
                background: 'var(--gold)',
                opacity: 0.03,
                borderRadius: '50%',
                filter: 'blur(80px)'
            }} />

            <div style={{ maxWidth: '700px', position: 'relative', zIndex: 1 }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    background: 'white',
                    borderRadius: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 40px',
                    color: 'var(--primary)',
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)',
                    border: '1px solid var(--gray-100)'
                }}>
                    <Settings
                        size={48}
                        className="animate-spin-slow"
                        style={{ animation: 'spin 8s linear infinite' }}
                    />
                </div>

                <h1 style={{
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    fontWeight: 950,
                    color: 'var(--primary-dark)',
                    marginBottom: '24px',
                    lineHeight: 1.1
                }}>
                    Under Maintenance
                </h1>

                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--gray-600)',
                    marginBottom: '56px',
                    lineHeight: 1.8,
                    maxWidth: '600px',
                    margin: '0 auto 56px'
                }}>
                    Niger Sanitary Industry Limited is currently updating our systems to serve you better. We apologize for the inconvenience and will be back online shortly.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '24px',
                    marginBottom: '64px'
                }}>
                    <div style={{ padding: '24px', background: 'white', borderRadius: '24px', border: '1px solid var(--gray-100)' }}>
                        <Phone size={24} style={{ color: 'var(--primary)', marginBottom: '12px' }} />
                        <div style={{ fontWeight: 800, color: 'var(--primary-dark)' }}>Call Us</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>+234 (0)906 8704 615</div>
                    </div>
                    <div style={{ padding: '24px', background: 'white', borderRadius: '24px', border: '1px solid var(--gray-100)' }}>
                        <Mail size={24} style={{ color: 'var(--gold)', marginBottom: '12px' }} />
                        <div style={{ fontWeight: 800, color: 'var(--primary-dark)' }}>Email Support</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>info@nigersanitary.com</div>
                    </div>
                    {/* <div style={{ padding: '24px', background: 'white', borderRadius: '24px', border: '1px solid var(--gray-100)' }}>
                        <Clock size={24} style={{ color: 'var(--accent)', marginBottom: '12px' }} />
                        <div style={{ fontWeight: 800, color: 'var(--primary-dark)' }}>Back Shortly</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Estimated: 2 Hours</div>
                    </div> */}
                </div>

                <div style={{ color: 'var(--gray-400)', fontSize: '0.875rem', fontWeight: 600 }}>
                    &copy; {new Date().getFullYear()} Niger Sanitary Industry Limited. All rights reserved.
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}} />
        </div>
    );
}
