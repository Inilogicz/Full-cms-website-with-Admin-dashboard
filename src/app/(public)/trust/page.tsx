import { Metadata } from 'next';
import { Shield, Award, FileCheck, Download } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Trust & Compliance',
    description: 'Our certifications, regulatory approvals, and quality standards that ensure product safety and reliability.',
};

const certifications = [
    { name: 'NAFDAC Registration', issuer: 'National Agency for Food and Drug Administration and Control', description: 'All products are registered and approved by NAFDAC, ensuring they meet Nigerian safety and quality standards for sanitary and medical products.', icon: Shield },
    { name: 'ISO 9001:2015', issuer: 'International Organization for Standardization', description: 'Our quality management system is ISO 9001:2015 certified, demonstrating our commitment to consistent quality and continuous improvement.', icon: Award },
    { name: 'GMP Compliance', issuer: 'Good Manufacturing Practice', description: 'Our facility follows Good Manufacturing Practice guidelines ensuring products are consistently produced and controlled to quality standards.', icon: FileCheck },
    { name: 'SON Certification', issuer: 'Standards Organisation of Nigeria', description: 'Products meet Nigerian Industrial Standards (NIS) set by the Standards Organisation of Nigeria.', icon: Shield },
];

export default function TrustPage() {
    return (
        <>
            <section style={{ paddingTop: '160px', paddingBottom: '80px', background: 'var(--gradient-hero)' }}>
                <div className="container">
                    <span className="section-label" style={{ color: 'var(--accent-light)' }}>Compliance</span>
                    <h1 style={{ color: 'var(--white)', maxWidth: '640px', marginBottom: '20px' }}>Trust & Compliance</h1>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.125rem', maxWidth: '560px', lineHeight: 1.7 }}>
                        Your safety is our priority. Explore our certifications and quality commitments.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '28px' }}>
                        {certifications.map((cert) => (
                            <div key={cert.name} className="card">
                                <div className="card-body" style={{ padding: '32px' }}>
                                    <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-lg)', background: 'var(--primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                                        <cert.icon size={28} style={{ color: 'var(--primary)' }} />
                                    </div>
                                    <h3 style={{ fontSize: '1.125rem', marginBottom: '4px' }}>{cert.name}</h3>
                                    <p style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: 500, marginBottom: '12px' }}>{cert.issuer}</p>
                                    <p style={{ fontSize: '0.9375rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>{cert.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="section" style={{ background: 'var(--gray-50)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <span className="section-label">Quality Assurance</span>
                    <h2 className="section-title">Our Quality Promise</h2>
                    <p className="section-subtitle">
                        Every product undergoes rigorous testing at multiple stages of production to ensure safety, comfort, and reliability.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', marginTop: '40px' }}>
                        {['NAFDAC Certified', 'ISO 9001:2015', 'GMP Compliant', 'SON Approved'].map(badge => (
                            <div key={badge} style={{
                                padding: '16px 32px',
                                background: 'var(--white)',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: 'var(--shadow-card)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                fontWeight: 600,
                                color: 'var(--primary)',
                                fontSize: '0.9375rem',
                            }}>
                                <Shield size={20} />
                                {badge}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
