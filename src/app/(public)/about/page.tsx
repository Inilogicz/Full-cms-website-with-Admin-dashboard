'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Eye, Shield, Award, Heart, CheckCircle2, Users2, Sparkles, Building2 } from 'lucide-react';
import FloatingProductBackground from '@/components/shared/FloatingProductBackground';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

const features = [
    "Absorbs heaviest wettings",
    "Comforts feeling",
    "Well-designed shape",
    "Flexibility and freedom",
    "Part of Hospital delivery list"
];

const heritageImages = [
    "/hero-bg-2.png",
    "/product6.JPG"
];

export default function AboutPage() {
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setImageIndex((prev) => (prev + 1) % heritageImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="about-wrapper">
            {/* Premium Refined Hero Section */}
            <section style={{
                position: 'relative',
                minHeight: '85vh',
                display: 'flex',
                alignItems: 'center',
                paddingTop: '160px',
                paddingBottom: '100px',
                background: '#063A7A',
                overflow: 'hidden'
            }}>
                {/* Brand Visual Layer */}
                <FloatingProductBackground
                    theme="dark"
                    intensity={80}
                    images={[
                        { url: '/product1.JPG', top: '10%', left: '2%', size: '140px', mobileSize: '60px', delay: 0 },
                        { url: '/product6.JPG', top: '65%', left: '5%', size: '160px', mobileSize: '80px', delay: 0.4 },
                        { url: '/product10.JPG', top: '12%', left: '85%', size: '130px', mobileSize: '70px', delay: 0.8 },
                        { url: '/product4.JPG', top: '70%', left: '88%', size: '150px', mobileSize: '75px', delay: 1.2 },
                    ]}
                />

                {/* Decorative Elements */}
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                    <div style={{
                        position: 'absolute',
                        top: '15%',
                        right: '5%',
                        fontSize: 'clamp(5rem, 15vw, 15rem)',
                        fontWeight: 900,
                        color: 'transparent',
                        WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.03)',
                        zIndex: 0,
                        letterSpacing: '0.05em'
                    }}>LADYSEPT</div>
                </div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.05)', padding: '10px 24px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '32px' }}
                        >
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)' }} />
                            <span style={{ color: 'white', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Established Since 1999</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{
                                color: 'white',
                                fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
                                fontWeight: 900,
                                lineHeight: 1,
                                marginBottom: '40px',
                                letterSpacing: '-0.04em'
                            }}
                        >
                            We Care About <br />
                            <span className="text-gradient-gold">All Women</span> and Girls
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '32px'
                            }}
                        >
                            <p style={{
                                color: 'rgba(255,255,255,0.8)',
                                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                                maxWidth: '850px',
                                fontWeight: 500,
                                lineHeight: 1.4
                            }}>
                                Our mission is to empower girls and women by unlocking their confidence with our quality products.
                            </p>

                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ background: 'white', color: 'var(--primary-dark)', padding: '15px 40px', borderRadius: '100px', fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s ease' }}>
                                    Our Story
                                </div>
                                <div style={{ border: '2px solid rgba(255,255,255,0.2)', color: 'white', padding: '15px 40px', borderRadius: '100px', fontWeight: 800, cursor: 'pointer' }}>
                                    View Products
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* About Us - Heritage & Story with Dynamic Image Swapping */}
            <section className="section" style={{ background: '#fff', padding: '140px 0' }}>
                <div className="container">
                    <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '100px', alignItems: 'center' }}>
                        <motion.div {...fadeInUp}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '24px', fontSize: '0.875rem' }}>
                                <Building2 size={20} />
                                <span>NIGER SANITARY INDUSTRY LIMITED</span>
                            </div>
                            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--primary-dark)', marginBottom: '32px', fontWeight: 900, lineHeight: 1.1 }}>
                                Nigeria's Registered <br />
                                <span style={{ color: 'var(--primary)' }}>Premier Manufacturer</span>
                            </h2>
                            <div style={{ color: 'var(--gray-600)', fontSize: '1.2rem', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '28px' }}>
                                <p>
                                    Niger Sanitary Industry Limited is a Nigerian registered premier Manufacturer of Sanitary Pads and Several other Medical Devices.
                                </p>
                                <p>
                                    Since its debut prior to the Country’ independence, the company pride itself with highly Hygienic, Natural and Human-Friendly products generally accepted and accessible in the Nigerian markets and the West Coast.
                                </p>
                                <p>
                                    With over <span style={{ color: 'var(--primary)', fontWeight: 800 }}>5,000 personnel</span>, our operational departments have been manned by Nigerians and expatriate staff, ensuring a blend of local commitment and global standards.
                                </p>
                            </div>

                            <div style={{ marginTop: '56px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }} className="responsive-grid-2">
                                <motion.div whileHover={{ y: -5 }} style={{ padding: '32px', background: 'var(--gray-50)', borderRadius: '32px', border: '1px solid var(--gray-100)' }}>
                                    <Users2 size={40} color="var(--primary)" style={{ marginBottom: '20px' }} />
                                    <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary-dark)' }}>5000+</div>
                                    <div style={{ fontSize: '0.9375rem', color: 'var(--gray-500)', fontWeight: 700 }}>Personnel</div>
                                </motion.div>
                                <motion.div whileHover={{ y: -5 }} style={{ padding: '32px', background: 'var(--gray-50)', borderRadius: '32px', border: '1px solid var(--gray-100)' }}>
                                    <Award size={40} color="var(--gold)" style={{ marginBottom: '20px' }} />
                                    <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary-dark)' }}>ISO Certified</div>
                                    <div style={{ fontSize: '0.9375rem', color: 'var(--gray-500)', fontWeight: 700 }}>Global Standards</div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Updated Dynamic Image Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            style={{ position: 'relative' }}
                        >
                            <div style={{
                                position: 'relative',
                                borderRadius: '48px',
                                overflow: 'hidden',
                                boxShadow: '0 60px 120px -20px rgba(10, 77, 162, 0.25)',
                                aspectRatio: '4/5',
                                border: '16px solid #fff',
                                background: 'white'
                            }}>
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={imageIndex}
                                        src={heritageImages[imageIndex]}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                                        alt="Heritage Section Display"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </AnimatePresence>
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--primary-dark), transparent)', opacity: 0.3 }} />
                            </div>

                            {/* Floating Badge maintained */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                style={{
                                    position: 'absolute',
                                    bottom: '30px',
                                    right: '-40px',
                                    background: 'var(--gold)',
                                    color: 'white',
                                    padding: '32px',
                                    borderRadius: '32px',
                                    boxShadow: '0 30px 60px rgba(212, 175, 55, 0.4)',
                                    zIndex: 10,
                                    border: '4px solid white'
                                }}
                            >
                                <div style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1 }}>25+</div>
                                <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '4px' }}>Years of Excellence</div>
                            </motion.div>
                        </motion.div>
                    </div>

                    <motion.div {...fadeInUp} style={{ marginTop: '100px', padding: '60px', background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', borderRadius: '48px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '-20%', right: '-10%', fontSize: '15rem', fontWeight: 900, color: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }}>FUTURE</div>
                        <p style={{ fontSize: '1.4rem', lineHeight: 1.8, opacity: 0.95, fontWeight: 500, position: 'relative', zIndex: 1 }}>
                            Having the production capacity, personnel, quality and channels per degree over the years, the management recently resolved for a comprehensive expansion of product and brand lines. With approximate reinvestments and engagement of well-motivated staffs to attain set goals the company and her workers look into the future with great optimism.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="section" style={{ background: 'var(--gray-50)', padding: '140px 0' }}>
                <div className="container">
                    <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
                        <motion.div
                            whileHover={{ y: -10 }}
                            style={{
                                padding: '80px 60px',
                                background: 'white',
                                borderRadius: '48px',
                                border: '1px solid var(--gray-200)',
                                boxShadow: 'var(--shadow-lg)'
                            }}
                        >
                            <div style={{ width: 80, height: 80, background: 'var(--primary-50)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px' }}>
                                <Eye size={40} color="var(--primary)" />
                            </div>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '24px', color: 'var(--primary-dark)' }}>Our Vision</h3>
                            <p style={{ fontSize: '1.25rem', lineHeight: 1.8, color: 'var(--gray-600)', fontWeight: 500 }}>
                                To be the Market Leader in the production and Distribution of Quality and Affordable Sanitary pads and proximate Medical Devices in Nigeria and the West Coast.
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -10 }}
                            style={{
                                padding: '80px 60px',
                                background: 'white',
                                borderRadius: '48px',
                                border: '1px solid var(--gray-200)',
                                boxShadow: 'var(--shadow-lg)'
                            }}
                        >
                            <div style={{ width: 80, height: 80, background: 'var(--gold-50)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px' }}>
                                <Target size={40} color="var(--gold)" />
                            </div>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '24px', color: 'var(--primary-dark)' }}>Our Mission</h3>
                            <p style={{ fontSize: '1.25rem', lineHeight: 1.8, color: 'var(--gray-600)', fontWeight: 500 }}>
                                To be the Market Leader in the production and Distribution of Quality and Affordable Sanitary pads and proximate Medical Devices in Nigeria and the West Coast.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Product Highlight - LadySept Section */}
            <section className="section" style={{ padding: '140px 0', background: '#fff' }}>
                <div className="container">
                    <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '120px', alignItems: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                        >
                            <div style={{ position: 'relative' }}>
                                <div style={{
                                    borderRadius: '60px',
                                    border: '20px solid var(--gray-50)',
                                    overflow: 'hidden',
                                    boxShadow: '0 50px 100px rgba(0,0,0,0.1)'
                                }}>
                                    <img
                                        src="/product6.JPG"
                                        alt="LadySept Most Common Product"
                                        style={{ width: '100%', height: 'auto', display: 'block' }}
                                    />
                                </div>
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    style={{
                                        position: 'absolute',
                                        top: '-10px',
                                        right: '-10px',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        padding: '24px 40px',
                                        borderRadius: '24px',
                                        fontWeight: 900,
                                        boxShadow: '0 20px 40px rgba(10, 77, 162, 0.3)',
                                        fontSize: '1.2rem'
                                    }}
                                >
                                    Best Seller
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div {...fadeInUp}>
                            <span className="section-label">Most Trusted Choice</span>
                            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--primary-dark)', marginBottom: '40px', fontWeight: 900 }}>
                                Designed for Your <br />
                                <span style={{ color: 'var(--primary)' }}>Ultimate Comfort</span>
                            </h2>
                            <div style={{ display: 'grid', gap: '28px' }}>
                                {features.map((feature, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                        <div style={{ background: 'var(--primary-50)', color: 'var(--primary)', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <p style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--gray-800)' }}>{feature}</p>
                                    </div>
                                ))}
                            </div>
                            <p style={{ marginTop: '56px', fontStyle: 'italic', color: 'var(--gray-600)', fontSize: '1.25rem', borderLeft: '4px solid var(--gold)', paddingLeft: '32px', lineHeight: 1.6 }}>
                                "Often being recommended as part of the Hospital child delivery list."
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Support & Puberty Section */}
            <section className="section" style={{ background: 'var(--primary-dark)', color: 'white', overflow: 'hidden', position: 'relative', padding: '160px 0' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.15, pointerEvents: 'none' }}>
                    <Heart size={600} />
                </div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                        <motion.div {...fadeInUp}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
                                <Heart size={80} color="var(--gold)" />
                            </div>
                            <h2 style={{ color: 'white', fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 900, marginBottom: '48px', lineHeight: 1.1 }}>
                                We ensure that no one loses <br />
                                <span style={{ color: 'var(--gold)' }}>confidence</span> because of their gender.
                            </h2>
                            <p style={{ fontSize: '1.5rem', lineHeight: 1.8, opacity: 0.9, fontWeight: 500 }}>
                                We work hard to support young people going through puberty, where a combination of insecurities about their changing body, their first period and societal expectations can all contribute to a drop in self-confidence.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
