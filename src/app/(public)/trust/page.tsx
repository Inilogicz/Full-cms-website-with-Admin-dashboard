'use client';

import { Shield, Award, FileCheck, CheckCircle2, BadgeCheck } from 'lucide-react';

const certifications = [
    { name: 'NAFDAC Registration', issuer: 'National Agency for Food and Drug Administration and Control', description: 'All products are registered and approved by NAFDAC, ensuring they meet Nigerian safety and quality standards.', icon: Shield },
    { name: 'ISO 9001:2015', issuer: 'International Organization for Standardization', description: 'Our quality management system is ISO 9001:2015 certified, demonstrating our commitment to consistent quality.', icon: Award },
    { name: 'GMP Compliance', issuer: 'Good Manufacturing Practice', description: 'Our facility follows Good Manufacturing Practice guidelines ensuring products are consistently produced and controlled.', icon: FileCheck },
    { name: 'SON Certification', issuer: 'Standards Organisation of Nigeria', description: 'Products meet Nigerian Industrial Standards (NIS) set by the Standards Organisation of Nigeria.', icon: BadgeCheck },
];

export default function TrustPage() {
    return (
        <div className="trust-wrapper">
            {/* Hero Section - Lightened */}
            <section style={{
                paddingTop: '160px',
                paddingBottom: '100px',
                background: 'linear-gradient(to bottom, #f8faff 0%, #ffffff 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                        <span className="section-label" style={{ color: 'var(--gold-dark)', fontWeight: 800 }}>Global Standards</span>
                        <h1 style={{ color: 'var(--primary-dark)', marginBottom: '24px', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900 }}>
                            Unwavering Commitment <br />
                            <span className="text-gradient-gold">to Quality</span>
                        </h1>
                        <p style={{ color: 'var(--gray-600)', fontSize: '1.25rem', maxWidth: '600px', lineHeight: 1.7, margin: '0 auto' }}>
                            Your safety is our priority. We maintain the highest regulatory standards and certifications in healthcare manufacturing.
                        </p>
                    </div>
                </div>

                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-10%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    zIndex: 1
                }} />
            </section>

            <section className="section" style={{ padding: '80px 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
                        {certifications.map((cert) => (
                            <div key={cert.name} className="card" style={{
                                borderRadius: 'var(--radius-2xl)',
                                border: '1px solid var(--gray-100)',
                                background: 'white',
                                transition: 'all 0.4s ease',
                                height: '100%'
                            }}>
                                <div className="card-body" style={{ padding: '40px' }}>
                                    <div style={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: 'var(--radius-xl)',
                                        background: 'var(--gold-50)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '24px',
                                        color: 'var(--gold)',
                                        border: '1px solid var(--gold-glow)'
                                    }}>
                                        <cert.icon size={32} />
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '8px', color: 'var(--primary-dark)' }}>{cert.name}</h3>
                                    <p style={{ fontSize: '0.8125rem', color: 'var(--gold-dark)', fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase' }}>{cert.issuer}</p>
                                    <p style={{ fontSize: '0.9375rem', color: 'var(--gray-500)', lineHeight: 1.8 }}>{cert.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quality Promise - Premium */}
            <section className="section" style={{ background: 'var(--primary-dark)', color: 'white', position: 'relative', overflow: 'hidden', padding: '120px 0' }}>
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.1), transparent)',
                    zIndex: 0
                }} />

                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Quality Assurance</span>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', marginTop: '16px', marginBottom: '24px' }}>Our Quality Promise</h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '640px', margin: '0 auto', fontSize: '1.125rem', lineHeight: 1.7 }}>
                        Every single product undergoes multi-stage rigorous testing to ensure absolute safety, comfort, and reliability for our consumers.
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginTop: '60px' }}>
                        {['NAFDAC Certified', 'ISO 9001:2015', 'GMP Compliant', 'SON Approved'].map(badge => (
                            <div key={badge} style={{
                                padding: '16px 28px',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: 'var(--radius-full)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                fontWeight: 700,
                                color: 'white',
                                fontSize: '0.875rem',
                                transition: 'all 0.3s ease'
                            }}>
                                <CheckCircle2 size={18} style={{ color: 'var(--gold)' }} />
                                {badge}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
