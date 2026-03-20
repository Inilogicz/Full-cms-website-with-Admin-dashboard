'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Eye, CheckCircle, Users, Award, Shield, Heart } from 'lucide-react';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

export default function AboutPage() {
    return (
        <div className="about-wrapper">
            {/* Hero Section - Redesigned for Premium Impact */}
            <section style={{
                position: 'relative',
                minHeight: '70vh',
                display: 'flex',
                alignItems: 'center',
                paddingTop: '160px',
                paddingBottom: '100px',
                background: 'var(--gray-50)',
                overflow: 'hidden'
            }}>
                {/* Dynamic Background Elements - Consistent with Homepage */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(10, 77, 162, 0.05) 1px, transparent 0)`,
                        backgroundSize: '40px 40px',
                        opacity: 0.5,
                    }} />

                    {/* Large Background Decorative Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        style={{
                            position: 'absolute',
                            top: '20%',
                            right: '-5%',
                            fontSize: 'clamp(5rem, 15vw, 15rem)',
                            fontWeight: 900,
                            color: 'transparent',
                            WebkitTextStroke: '1.5px rgba(10, 77, 162, 0.04)',
                            whiteSpace: 'nowrap',
                            zIndex: 0,
                            pointerEvents: 'none',
                            letterSpacing: '0.1em'
                        }}
                    >
                        HERITAGE
                    </motion.div>

                    {/* Morphing Blobs */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            x: [0, 50, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute',
                            top: '-10%',
                            left: '-10%',
                            width: '500px',
                            height: '500px',
                            background: 'radial-gradient(circle, rgba(10, 77, 162, 0.06) 0%, transparent 70%)',
                            filter: 'blur(80px)',
                            borderRadius: '50%',
                        }}
                    />
                </div>

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
                    >
                        <span className="section-label" style={{ marginBottom: '24px' }}>Our Story</span>
                        <h1 style={{
                            color: 'var(--primary-dark)',
                            marginBottom: '24px',
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            fontWeight: 900,
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em'
                        }}>
                            Redefining the <br />
                            <span className="text-gradient-gold" style={{ filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.1))' }}>Standard of Care</span>
                        </h1>
                        <p style={{
                            color: 'var(--gray-600)',
                            fontSize: 'clamp(1.125rem, 2vw, 1.35rem)',
                            lineHeight: 1.6,
                            maxWidth: '640px',
                            margin: '0 auto',
                            fontWeight: 500
                        }}>
                            A heritage of manufacturing excellence that empowers millions across West Africa since 1999.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Legacy & Expertise Section */}
            <section className="section" style={{ padding: '120px 0', background: 'white' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
                        gap: '80px',
                        alignItems: 'center'
                    }} className="responsive-grid-2">
                        <motion.div {...fadeInUp}>
                            <span className="section-label">Legacy & Expertise</span>
                            <h2 style={{ marginBottom: '24px', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, lineHeight: 1.1 }}>
                                Nigeria&apos;s Premier <br />
                                <span className="text-primary">Healthcare Manufacturer</span>
                            </h2>
                            <div style={{ color: 'var(--gray-600)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '1.125rem' }}>
                                <p>
                                    Niger Sanitary Industry Limited stands as a beacon of Nigerian manufacturing. Since its inception, we have prided ourselves on delivering hygienic, human-friendly products across the West African sub-region.
                                </p>
                                <p>
                                    With over <span style={{ color: 'var(--primary)', fontWeight: 800 }}>5,000 dedicated personnel</span>, we combine international expertise with deep local commitment to ensure quality healthcare is accessible to everyone.
                                </p>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '20px',
                                    marginTop: '12px',
                                    paddingTop: '32px',
                                    borderTop: '1px solid var(--gray-100)'
                                }} className="responsive-grid-2">
                                    <div style={{
                                        display: 'flex',
                                        gap: '16px',
                                        alignItems: 'center',
                                        padding: '16px',
                                        background: 'var(--gray-50)',
                                        borderRadius: '16px',
                                        border: '1px solid var(--gray-100)'
                                    }}>
                                        <div style={{ color: 'var(--gold)', background: 'white', padding: '8px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}><Shield size={24} /></div>
                                        <span style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--primary-dark)' }}>NAFDAC Certified</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        gap: '16px',
                                        alignItems: 'center',
                                        padding: '16px',
                                        background: 'var(--gray-50)',
                                        borderRadius: '16px',
                                        border: '1px solid var(--gray-100)'
                                    }}>
                                        <div style={{ color: 'var(--gold)', background: 'white', padding: '8px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}><Award size={24} /></div>
                                        <span style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--primary-dark)' }}>ISO 9001:2015</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            style={{ position: 'relative' }}
                        >
                            <div style={{
                                position: 'relative',
                                borderRadius: '40px',
                                overflow: 'hidden',
                                boxShadow: '0 50px 100px -20px rgba(10, 77, 162, 0.15)',
                                aspectRatio: '1',
                                border: '12px solid white',
                                background: 'white'
                            }}>
                                <img
                                    src="/hero-bg.jpg"
                                    alt="Niger Sanitary Manufacturing Facility"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10, 77, 162, 0.2), transparent)' }} />
                            </div>

                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                style={{
                                    position: 'absolute',
                                    bottom: '-20px',
                                    right: '-20px',
                                    padding: '24px',
                                    background: 'var(--primary-dark)',
                                    color: 'white',
                                    borderRadius: '24px',
                                    boxShadow: '0 20px 40px rgba(10, 77, 162, 0.3)',
                                    zIndex: 10
                                }}
                            >
                                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--gold)' }}>25+ Years</div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Of Industry Leadership</div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission Section */}
            <section className="section" style={{ background: 'var(--gray-50)', padding: '120px 0', borderTop: '1px solid var(--gray-100)', borderBottom: '1px solid var(--gray-100)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="responsive-grid-2">
                        <motion.div {...fadeInUp} style={{ order: 2 }}>
                            <div className="glass-premium" style={{ marginBottom: '32px', padding: '40px', borderRadius: '32px', background: 'white', border: '1px solid var(--gray-200)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                                    <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                                        <Eye size={28} />
                                    </div>
                                    <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--primary-dark)' }}>Our Vision</h2>
                                </div>
                                <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, fontSize: '1.125rem', fontWeight: 500 }}>
                                    To be the undisputed market leader in the production and distribution of quality, affordable hygiene solutions across Africa, setting benchmarks for clinical trust.
                                </p>
                            </div>

                            <div className="glass-premium" style={{ padding: '40px', borderRadius: '32px', background: 'white', border: '1px solid var(--gray-200)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                                    <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'rgba(10, 77, 162, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', border: '1px solid rgba(10, 77, 162, 0.2)' }}>
                                        <Target size={28} />
                                    </div>
                                    <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--primary-dark)' }}>Our Mission</h2>
                                </div>
                                <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, fontSize: '1.125rem', fontWeight: 500 }}>
                                    We strive to empower individuals by delivering scientifically advanced healthcare products through sustainable manufacturing, excellence in engineering, and a focus on human dignity.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            style={{ order: 1 }}
                        >
                            <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.1)', aspectRatio: '4/5' }}>
                                <img
                                    src="/product4.JPG"
                                    alt="Niger Sanitary Leadership and Vision"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Commitment Section */}
            <section className="section" style={{ background: 'var(--primary-dark)', color: 'white', overflow: 'hidden', position: 'relative', padding: '140px 0' }}>
                {/* Decorative background text */}
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '-5%',
                    fontSize: 'clamp(5rem, 15vw, 12rem)',
                    fontWeight: 900,
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(255, 255, 255, 0.05)',
                    whiteSpace: 'nowrap',
                    zIndex: 0,
                    pointerEvents: 'none',
                    letterSpacing: '0.1em'
                }}>
                    COMMITMENT
                </div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '80px', alignItems: 'center' }} className="responsive-grid-2">
                        <motion.div
                            initial={{ opacity: 0, rotate: -2 }}
                            whileInView={{ opacity: 1, rotate: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div style={{
                                position: 'relative',
                                borderRadius: '40px',
                                overflow: 'hidden',
                                aspectRatio: '4/3',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 40px 100px rgba(0,0,0,0.4)'
                            }}>
                                <img
                                    src="/product7.JPG"
                                    alt="Niger Sanitary Community Care"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10, 77, 162, 0.4), transparent)' }} />
                            </div>
                        </motion.div>
                        <motion.div {...fadeInUp}>
                            <span className="section-label" style={{ color: 'var(--gold)', marginBottom: '24px' }}>Our Commitment</span>
                            <h2 style={{ color: 'white', marginBottom: '32px', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.1 }}>
                                Resilience, Hygiene & <br />
                                <span className="text-gradient-gold">Unshakable Confidence</span>
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                                <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, fontSize: '1.25rem', fontWeight: 500 }}>
                                    We believe that personal hygiene is a fundamental right. Our products are designed to support girls and women through all stages of life, ensuring confidence remains as strong as their potential.
                                </p>
                                <div style={{ borderLeft: '4px solid var(--gold)', paddingLeft: '32px', background: 'rgba(255,255,255,0.03)', padding: '32px', borderRadius: '0 24px 24px 0' }}>
                                    <p style={{ fontStyle: 'italic', fontSize: '1.35rem', color: 'white', fontWeight: 600, lineHeight: 1.4 }}>
                                        &ldquo;Quality care that respects dignity and empowers the future of West Africa.&rdquo;
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
