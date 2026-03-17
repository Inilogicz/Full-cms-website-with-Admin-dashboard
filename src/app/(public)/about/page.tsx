'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Target, Eye, CheckCircle, Users, Award, Shield, Heart } from 'lucide-react';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

export default function AboutPage() {
    return (
        <>
            {/* Hero Section */}
            <section style={{
                paddingTop: '160px',
                paddingBottom: '80px',
                background: 'var(--gradient-hero)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
                    >
                        <span className="section-label" style={{ color: 'var(--accent-light)' }}>About Us</span>
                        <h1 style={{ color: 'var(--white)', marginBottom: '24px' }}>
                            We Care About All Women and Girls
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.25rem', lineHeight: 1.6 }}>
                            Our mission is to empower girls and women by unlocking their confidence with our quality products.
                        </p>
                    </motion.div>
                </div>
                {/* Abstract background shape */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    right: '-10%',
                    width: '500px',
                    height: '500px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '50%',
                    filter: 'blur(100px)'
                }} />
            </section>

            {/* Main Content Section */}
            <section className="section">
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
                        gap: '64px',
                        alignItems: 'center'
                    }} className="responsive-grid-2">
                        <motion.div {...fadeInUp}>
                            <h2 style={{ marginBottom: '24px' }}>Niger Sanitary Industry Limited</h2>
                            <p style={{ fontSize: '1.125rem', color: 'var(--gray-700)', marginBottom: '24px', fontWeight: 500 }}>
                                A Nigerian registered premier Manufacturer of Sanitary Pads and Several other Medical Devices.
                            </p>
                            <div style={{ color: 'var(--gray-600)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <p>
                                    Since its debut prior to the Country’s independence, the company prides itself with highly Hygienic, Natural and Human-Friendly products generally accepted and accessible in the Nigerian markets and the West Coast.
                                </p>
                                <p>
                                    The Direct and Indirect employees of the company are well over 5000 personnel. Over the years, the Company’s operational departments have been manned by Nigerians and expatriate staff.
                                </p>
                                <p>
                                    Having the production capacity, personnel, quality and channels per degree over the years, the management recently resolved for a comprehensive expansion of product and brand lines.
                                </p>
                                <p>
                                    With approximate reinvestments and engagement of well-motivated staff to attain set goals, the company and her workers look into the future with great optimism.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div {...fadeInUp} style={{ position: 'relative' }}>
                            <div style={{
                                position: 'relative',
                                borderRadius: 'var(--radius-xl)',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-xl)',
                                aspectRatio: '1'
                            }}>
                                <Image
                                    src="/about-office.png"
                                    alt="Niger Sanitary Office"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            {/* Floating experience card */}
                            <div className="glass" style={{
                                position: 'absolute',
                                bottom: '-30px',
                                left: '-30px',
                                padding: '24px',
                                borderRadius: 'var(--radius-lg)',
                                maxWidth: '240px',
                                boxShadow: 'var(--shadow-lg)'
                            }}>
                                <div style={{ fontWeight: 800, fontSize: '2rem', color: 'var(--primary)', lineHeight: 1 }}>5000+</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginTop: '8px', fontWeight: 600 }}>
                                    Dedicated Professionals
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Product Benefits Section */}
            <section className="section" style={{ background: 'var(--gray-50)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <h2 style={{ marginBottom: '16px' }}>Why Choose Our Products?</h2>
                        <p style={{ color: 'var(--gray-500)', maxWidth: '600px', margin: '0 auto' }}>
                            Engineered for excellence, designed for comfort.
                        </p>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '24px'
                    }}>
                        {[
                            { title: 'Absorbs heaviest wettings', desc: 'Superior core technology for ultimate protection.' },
                            { title: 'Comfortable feeling', desc: 'Soft-touch materials for all-day ease.' },
                            { title: 'Well-designed shape', desc: 'Ergonomic contours that move with you.' },
                            { title: 'Flexibility and freedom', desc: 'Unrestricted movement for your busy lifestyle.' },
                            { title: 'Medical Endorsement', desc: 'Often recommended as part of the Hospital child delivery list.' }
                        ].map((benefit, i) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="card"
                                style={{ padding: '32px', textAlign: 'center' }}
                            >
                                <div style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '50%',
                                    background: 'var(--primary-50)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 16px',
                                    color: 'var(--primary)'
                                }}>
                                    <CheckCircle size={24} />
                                </div>
                                <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>{benefit.title}</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="responsive-grid-2">
                        <motion.div {...fadeInUp} style={{ order: 2 }}>
                            <div style={{ marginBottom: '40px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                        <Eye size={20} />
                                    </div>
                                    <h2 style={{ fontSize: '1.75rem' }}>Our Vision</h2>
                                </div>
                                <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, fontSize: '1.125rem' }}>
                                    To be the Market Leader in the production and Distribution of Quality and Affordable Sanitary pads and proximate Medical Devices in Nigeria and the West Coast.
                                </p>
                            </div>

                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                        <Target size={20} />
                                    </div>
                                    <h2 style={{ fontSize: '1.75rem' }}>Our Mission</h2>
                                </div>
                                <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, fontSize: '1.125rem' }}>
                                    To be the Market Leader in the production and Distribution of Quality and Affordable Sanitary pads and proximate Medical Devices in Nigeria and the West Coast.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div {...fadeInUp} style={{ order: 1 }}>
                            <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', aspectRatio: '4/5' }}>
                                <Image
                                    src="/about-vision.png"
                                    alt="Our Vision"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Support & Puberty Section */}
            <section className="section" style={{ background: 'var(--gray-900)', color: 'white' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '64px', alignItems: 'center' }} className="responsive-grid-2">
                        <motion.div {...fadeInUp}>
                            <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', aspectRatio: '4/3' }}>
                                <Image
                                    src="/about-care.png"
                                    alt="We Care"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </motion.div>
                        <motion.div {...fadeInUp}>
                            <h2 style={{ color: 'white', marginBottom: '24px' }}>Building Resilience & Confidence</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <blockquote style={{
                                    borderLeft: '4px solid var(--primary)',
                                    paddingLeft: '24px',
                                    fontSize: '1.25rem',
                                    fontStyle: 'italic',
                                    color: 'rgba(255,255,255,0.9)'
                                }}>
                                    "We ensure that no one loses confidence because of their gender or their period."
                                </blockquote>
                                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '1.0625rem' }}>
                                    We work hard to support young people going through puberty, where a combination of insecurities about their changing body, their first period and societal expectations can all contribute to a drop in self-confidence.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                @media (max-width: 768px) {
                    .responsive-grid-2 { grid-template-columns: 1fr !important; gap: 40px !important; }
                    .card { padding: 24px !important; }
                }
            `}</style>
        </>
    );
}
