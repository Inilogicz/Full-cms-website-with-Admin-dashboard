'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Eye, Shield, Award, Heart, CheckCircle2, Users2, Building2 } from 'lucide-react';
import FloatingProductBackground from '@/components/shared/FloatingProductBackground';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

const defaultFeatures = [
    "Absorbs heaviest wettings",
    "Comforts feeling",
    "Well-designed shape",
    "Flexibility and freedom",
    "Part of Hospital delivery list"
];

const defaultHeritageImages = [
    "/hero-bg-2.png",
    "/product6.JPG"
];

interface AboutClientProps {
    settings: any;
}

export default function AboutClient({ settings }: AboutClientProps) {
    const [imageIndex, setImageIndex] = useState(0);

    const heritageImages = settings?.aboutHeritageImages?.length > 0
        ? settings.aboutHeritageImages
        : defaultHeritageImages;

    useEffect(() => {
        const timer = setInterval(() => {
            setImageIndex((prev) => (prev + 1) % heritageImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heritageImages.length]);

    const ladySeptFeatures = settings?.aboutLadySeptFeatures?.length > 0 
        ? settings.aboutLadySeptFeatures 
        : defaultFeatures;

    const floatingImages = settings?.aboutFloatingImages?.length > 0
        ? settings.aboutFloatingImages.map((img: any) => ({
            ...img,
            url: img.url || '/product1.JPG' // Fallback for specific slot if url is empty
        }))
        : [
            { url: '/product1.JPG', top: '10%', left: '2%', size: '140px', mobileSize: '60px', delay: 0 },
            { url: '/product6.JPG', top: '65%', left: '5%', size: '160px', mobileSize: '80px', delay: 0.4 },
            { url: '/product10.JPG', top: '12%', left: '85%', size: '130px', mobileSize: '70px', delay: 0.8 },
            { url: '/product4.JPG', top: '70%', left: '88%', size: '150px', mobileSize: '75px', delay: 1.2 },
        ];

    const featureImage = settings?.aboutFeatureImage || "/product6.JPG";

    const heritageStats = settings?.aboutHeritageStats?.length > 0
        ? settings.aboutHeritageStats
        : [
            { value: '5000+', label: 'Personnel', icon: 'Users' },
            { value: 'ISO Certified', label: 'Global Standards', icon: 'Award' }
        ];

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
                <FloatingProductBackground
                    theme="dark"
                    intensity={80}
                    images={floatingImages}
                />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.05)', padding: '10px 24px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '32px' }}
                        >
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)' }} />
                            <span style={{ color: 'white', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                {settings?.aboutEstablishedText || "Established Since 1999"}
                            </span>
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
                            {settings?.aboutSubtitle || (
                                <>
                                    We Care About <br />
                                    <span className="text-gradient-gold">All Women</span> and Girls
                                </>
                            )}
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
                                {settings?.aboutDescription || "Our mission is to empower girls and women by unlocking their confidence with our quality products."}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* About Us - Heritage & Story */}
            <section className="section" style={{ background: '#fff', padding: '140px 0' }}>
                <div className="container">
                    <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '100px', alignItems: 'center' }}>
                        <motion.div {...fadeInUp}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '24px', fontSize: '0.875rem' }}>
                                <Building2 size={20} />
                                <span>{settings?.aboutTitle || "NIGER SANITARY INDUSTRY LIMITED"}</span>
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
                            </div>

                            <div style={{ marginTop: '56px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }} className="responsive-grid-2">
                                {heritageStats.map((stat: any, i: number) => (
                                    <motion.div key={i} whileHover={{ y: -5 }} style={{ padding: '32px', background: 'var(--gray-50)', borderRadius: '32px', border: '1px solid var(--gray-100)' }}>
                                        {stat.icon === 'Award' ? <Award size={40} color="var(--gold)" style={{ marginBottom: '20px' }} /> : <Shield size={40} color="var(--primary)" style={{ marginBottom: '20px' }} />}
                                        <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary-dark)' }}>{stat.value}</div>
                                        <div style={{ fontSize: '0.9375rem', color: 'var(--gray-500)', fontWeight: 700 }}>{stat.label}</div>
                                    </motion.div>
                                ))}
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
                            </div>

                            {/* Floating Badge */}
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
                                <div style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1 }}>
                                    {settings?.aboutStatBadgeValue || "25+"}
                                </div>
                                <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '4px' }}>
                                    {settings?.aboutStatBadgeLabel || "Years of Excellence"}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {settings?.aboutFutureText && (
                        <motion.div {...fadeInUp} style={{ marginTop: '100px', padding: '60px', background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', borderRadius: '48px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: '-20%', right: '-10%', fontSize: '15rem', fontWeight: 900, color: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }}>FUTURE</div>
                            <p style={{ fontSize: '1.4rem', lineHeight: 1.8, opacity: 0.95, fontWeight: 500, position: 'relative', zIndex: 1 }}>
                                {settings.aboutFutureText}
                            </p>
                        </motion.div>
                    )}
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
                                {settings?.aboutVision || "To be the Market Leader in the production and Distribution of Quality and Affordable Sanitary pads and proximate Medical Devices in Nigeria and the West Coast."}
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
                                {settings?.aboutMission || "To be the Market Leader in the production and Distribution of Quality and Affordable Sanitary pads and proximate Medical Devices in Nigeria and the West Coast."}
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
                                        src={featureImage}
                                        alt="LadySept Most Common Product"
                                        style={{ width: '100%', height: 'auto', display: 'block' }}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div {...fadeInUp}>
                            <span className="section-label">Most Trusted Choice</span>
                            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--primary-dark)', marginBottom: '40px', fontWeight: 900 }}>
                                Designed for Your <br />
                                <span style={{ color: 'var(--primary)' }}>Ultimate Comfort</span>
                            </h2>
                            <div style={{ display: 'grid', gap: '28px' }}>
                                {ladySeptFeatures.map((feature: string, i: number) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                        <div style={{ background: 'var(--primary-50)', color: 'var(--primary)', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <p style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--gray-800)' }}>{feature}</p>
                                    </div>
                                ))}
                            </div>
                            {settings?.aboutQuote && (
                                <p style={{ marginTop: '56px', fontStyle: 'italic', color: 'var(--gray-600)', fontSize: '1.25rem', borderLeft: '4px solid var(--gold)', paddingLeft: '32px', lineHeight: 1.6 }}>
                                    "{settings.aboutQuote}"
                                </p>
                            )}
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
                                {settings?.aboutSupportTitle || "We ensure that no one loses confidence because of their gender."}
                            </h2>
                            {settings?.aboutSupportDescription && (
                                <p style={{ fontSize: '1.5rem', lineHeight: 1.8, opacity: 0.9, fontWeight: 500 }}>
                                    {settings.aboutSupportDescription}
                                </p>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
