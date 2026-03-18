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
        <div className="about-wrapper">
            {/* Hero Section - Lightened */}
            <section style={{
                paddingTop: '160px',
                paddingBottom: '100px',
                background: 'url(/contact.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
                    >
                        <span className="section-label" style={{ color: 'var(--gold-dark)', fontWeight: 800 }}>Our Story</span>
                        <h1 style={{ color: 'var(--primary-dark)', marginBottom: '24px', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900 }}>
                            Redefining the <br />
                            <span className="text-gradient-gold">Standard of Care</span>
                        </h1>
                        <p style={{ color: 'var(--white)', fontSize: '1.25rem', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto' }}>
                            A heritage of excellence in manufacturing that empowers millions across West Africa.
                        </p>
                    </motion.div>
                </div>

                {/* Subtle abstract background */}
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(80px)',
                    zIndex: 1
                }} />
            </section>

            {/* Main Content Section */}
            <section className="section" style={{ padding: '120px 0' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
                        gap: '80px',
                        alignItems: 'center'
                    }} className="responsive-grid-2">
                        <motion.div {...fadeInUp}>
                            <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '16px' }}>Legacy & Expertise</span>
                            <h2 style={{ marginBottom: '24px', fontSize: '2.5rem', fontWeight: 900 }}>Nigeria's Premier <br />Healthcare Manufacturer</h2>
                            <div style={{ color: 'var(--gray-600)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '1.0625rem' }}>
                                <p>
                                    Niger Sanitary Industry Limited stands as a beacon of Nigerian manufacturing. Since its inception, the company has prided itself on delivering hygienic, human-friendly products across the West African sub-region.
                                </p>
                                <p>
                                    With over <span style={{ color: 'var(--primary)', fontWeight: 800 }}>5,000 dedicated personnel</span>, we combine international expertise with deep local commitment to ensure quality healthcare is accessible to everyone.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '10px' }}>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        <div style={{ color: 'var(--gold)' }}><Shield size={24} /></div>
                                        <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>NAFDAC Certified</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        <div style={{ color: 'var(--gold)' }}><Award size={24} /></div>
                                        <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>ISO 9001:2015</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div {...fadeInUp} style={{ position: 'relative' }}>
                            <div className="glass-premium" style={{
                                position: 'relative',
                                borderRadius: 'var(--radius-2xl)',
                                overflow: 'hidden',
                                boxShadow: '0 40px 100px -20px rgba(0,0,0,0.15)',
                                aspectRatio: '1',
                                border: '1px solid var(--gray-100)'
                            }}>
                                <img
                                    src="/logo.png"
                                    alt="Niger Sanitary Manufacturing"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission - Refined */}
            <section className="section" style={{ background: 'var(--gray-50)', padding: '120px 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="responsive-grid-2">
                        <motion.div {...fadeInUp} style={{ order: 2 }}>
                            <div style={{ marginBottom: '48px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: 'var(--gold-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', border: '1px solid var(--gold-glow)' }}>
                                        <Eye size={22} />
                                    </div>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>Our Vision</h2>
                                </div>
                                <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, fontSize: '1.125rem' }}>
                                    To be the undisputed market leader in the production and distribution of quality, affordable hygiene solutions across Africa.
                                </p>
                            </div>

                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: 'var(--primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', border: '1px solid rgba(10, 77, 162, 0.1)' }}>
                                        <Target size={22} />
                                    </div>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>Our Mission</h2>
                                </div>
                                <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, fontSize: '1.125rem' }}>
                                    We strive to empower individuals by delivering scientifically advanced healthcare products through sustainable manufacturing.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div {...fadeInUp} style={{ order: 1 }}>
                            <div style={{ position: 'relative', borderRadius: 'var(--radius-2xl)', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.1)', aspectRatio: '4/5' }}>
                                <img
                                    src="/product4.JPG"
                                    alt="Leadership and Vision"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Support & Puberty Section - Sleeker */}
            <section className="section" style={{ background: 'var(--primary-dark)', color: 'white', overflow: 'hidden', position: 'relative', padding: '140px 0' }}>
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '-5%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, var(--gold), transparent)',
                    opacity: 0.05,
                    zIndex: 0
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '80px', alignItems: 'center' }} className="responsive-grid-2">
                        <motion.div {...fadeInUp}>
                            <div style={{
                                position: 'relative',
                                borderRadius: 'var(--radius-2xl)',
                                overflow: 'hidden',
                                aspectRatio: '4/3',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 30px 60px rgba(0,0,0,0.3)'
                            }}>
                                <img
                                    src="/product7.JPG"
                                    alt="Community Care"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        </motion.div>
                        <motion.div {...fadeInUp}>
                            <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '20px' }}>Our Commitment</span>
                            <h2 style={{ color: 'white', marginBottom: '24px', fontSize: '2.5rem', fontWeight: 900 }}>Resilience & Confidence</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '1.125rem' }}>
                                    We believe that personal hygiene is a fundamental right. Our products are designed to support girls and women through all stages of life, ensuring confidence remains unshakable.
                                </p>
                                <div style={{ borderLeft: '4px solid var(--gold)', paddingLeft: '24px' }}>
                                    <p style={{ fontStyle: 'italic', fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                                        "Quality care that respects dignity and empowers potential."
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
