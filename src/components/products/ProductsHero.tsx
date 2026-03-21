'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import FloatingProductBackground from '@/components/shared/FloatingProductBackground';

export default function ProductsHero() {
    return (
        <section style={{
            paddingTop: '180px',
            paddingBottom: '120px',
            background: '#063A7A',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '70vh',
            display: 'flex',
            alignItems: 'center'
        }}>
            {/* Brand Visual Layer */}
            <FloatingProductBackground
                theme="dark"
                intensity={100}
                images={[
                    { url: '/product1.JPG', top: '15%', left: '8%', size: '130px', mobileSize: '70px', delay: 0 },
                    { url: '/product6.JPG', top: '65%', left: '12%', size: '150px', mobileSize: '85px', delay: 0.4 },
                    { url: '/product10.JPG', top: '20%', left: '82%', size: '140px', mobileSize: '75px', delay: 0.8 },
                    { url: '/product4.JPG', top: '70%', left: '80%', size: '160px', mobileSize: '90px', delay: 1.2 },
                ]}
            />

            {/* Background Pattern/Overlay */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, zIndex: 0 }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(circle at 20% 30%, var(--primary) 0%, transparent 50%), radial-gradient(circle at 80% 70%, var(--gold) 0%, transparent 50%)',
                    filter: 'blur(100px)'
                }} />
            </div>

            {/* Large Background Text */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: 'clamp(10rem, 30vw, 30rem)',
                fontWeight: 900,
                color: 'rgba(255, 255, 255, 0.02)',
                whiteSpace: 'nowrap',
                zIndex: 0,
                pointerEvents: 'none',
                letterSpacing: '-0.05em'
            }}>
                COLLECTION
            </div>

            {/* Decorative Elements */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ position: 'absolute', top: '40%', right: '20%' }}
                >
                    <Sparkles size={40} color="var(--gold)" />
                </motion.div>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: 'rgba(255,255,255,0.05)',
                            padding: '8px 24px',
                            borderRadius: '100px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            marginBottom: '40px'
                        }}
                    >
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)' }} />
                        <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                            Premium Hygiene Solutions
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        style={{
                            fontSize: 'clamp(3.5rem, 8vw, 6rem)',
                            fontWeight: 900,
                            marginBottom: '32px',
                            lineHeight: 1,
                            letterSpacing: '-0.02em',
                            background: 'linear-gradient(to bottom, #ffffff 50%, rgba(255,255,255,0.7) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Empowering You <br />
                        <span style={{ color: 'var(--gold)', WebkitTextFillColor: 'initial' }}>With Every Step</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        style={{
                            fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                            opacity: 0.8,
                            lineHeight: 1.8,
                            marginBottom: '56px',
                            maxWidth: '750px',
                            margin: '0 auto 56px'
                        }}
                    >
                        Explore our comprehensive collection of premium sanitary towels, surgical devices,
                        and hygiene essentials designed for your absolute comfort and safety.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}
                    >
                        <a href="#products-grid" style={{
                            background: 'var(--gold)',
                            color: 'white',
                            padding: '18px 48px',
                            borderRadius: '100px',
                            fontWeight: 800,
                            textDecoration: 'none',
                            fontSize: '1rem',
                            boxShadow: '0 20px 40px rgba(212, 175, 55, 0.3)',
                            transition: 'all 0.3s ease'
                        }} className="hover-scale">
                            Browse Collection
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }}
            >
                <div style={{ width: '2px', height: '60px', background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
            </motion.div>

            <style jsx>{`
                .hover-scale:hover {
                    transform: scale(1.05);
                }
            `}</style>
        </section>
    );
}
