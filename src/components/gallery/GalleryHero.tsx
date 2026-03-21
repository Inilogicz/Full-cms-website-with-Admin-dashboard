'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Camera, Play, ArrowDown, Users, Factory, Globe } from 'lucide-react';
import { useRef } from 'react';

import FloatingProductBackground from '@/components/shared/FloatingProductBackground';

export default function GalleryHero() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section
            ref={containerRef}
            style={{
                height: '100vh',
                minHeight: '800px',
                background: '#063A7A', // Deep primary base
                position: 'relative',
                overflow: 'hidden',
                color: 'white',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            {/* Multi-layered Gradients for Fullness */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 20% 30%, rgba(10, 77, 162, 0.8) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
                zIndex: 1
            }} />

            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-10%',
                    width: '1000px',
                    height: '1000px',
                    background: 'radial-gradient(circle, rgba(10, 77, 162, 0.4) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(120px)',
                    zIndex: 1
                }}
            />

            {/* Brand Visual Layer */}
            <FloatingProductBackground theme="dark" intensity={200} />

            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: 'rgba(212, 175, 55, 0.1)',
                            border: '1px solid rgba(212, 175, 55, 0.2)',
                            padding: '8px 24px',
                            borderRadius: '100px',
                            fontSize: '0.8125rem',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.3em',
                            marginBottom: '40px',
                            color: 'var(--gold-light)'
                        }}>
                            <Camera size={16} /> The Visual Archive
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ position: 'relative' }}
                    >
                        {/* Outlined Background Text */}
                        <h2 style={{
                            position: 'absolute',
                            top: '-50%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: '15vw',
                            fontWeight: 900,
                            color: 'transparent',
                            WebkitTextStroke: '1px rgba(255,255,255,0.05)',
                            zIndex: -1,
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none'
                        }}>
                            EXCELLENCE
                        </h2>

                        <h1 style={{
                            fontSize: 'clamp(3rem, 10vw, 6.5rem)',
                            lineHeight: 0.95,
                            fontWeight: 900,
                            marginBottom: '32px',
                            letterSpacing: '-0.04em',
                            textShadow: '0 10px 30px rgba(0,0,0,0.2)'
                        }}>
                            Capturing <br />
                            <span style={{
                                background: 'linear-gradient(to right, #D4AF37, #F9E2AF, #D4AF37)',
                                backgroundSize: '200% auto',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                display: 'inline-block'
                            }}>Our Legacy</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        style={{
                            fontSize: 'clamp(1.125rem, 2.5vw, 1.625rem)',
                            lineHeight: 1.5,
                            color: 'rgba(255,255,255,0.7)',
                            marginBottom: '56px',
                            fontWeight: 500,
                            maxWidth: '700px',
                            margin: '0 auto 56px'
                        }}
                    >
                        A curated journey through 25 years of manufacturing excellence, community impact, and the people who make it all possible.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{
                            display: 'flex',
                            gap: '24px',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}
                    >
                        <button style={{
                            background: 'var(--gradient-gold)',
                            color: 'var(--primary-dark)',
                            padding: '20px 48px',
                            borderRadius: '100px',
                            fontWeight: 900,
                            fontSize: '1.125rem',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            boxShadow: '0 20px 40px rgba(212, 175, 55, 0.2)',
                            transition: 'transform 0.3s ease'
                        }} className="hover:scale-105">
                            Start Journey
                        </button>
                        <button style={{
                            background: 'rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(10px)',
                            color: 'white',
                            padding: '20px 48px',
                            borderRadius: '100px',
                            fontWeight: 800,
                            fontSize: '1.125rem',
                            border: '1px solid rgba(255,255,255,0.2)',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <Play size={20} fill="currentColor" /> Watch Brand Film
                        </button>
                    </motion.div>

                    {/* Quick Stats in Hero */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        style={{
                            marginTop: '80px',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '40px',
                            borderTop: '1px solid rgba(255,255,255,0.1)',
                            paddingTop: '40px',
                            maxWidth: '700px',
                            margin: '80px auto 0'
                        }}
                    >
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: 'var(--gold-light)', fontWeight: 900, fontSize: '1.5rem', marginBottom: '4px' }}>25+</div>
                            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Years</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: 'var(--gold-light)', fontWeight: 900, fontSize: '1.5rem', marginBottom: '4px' }}>500+</div>
                            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Employees</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: 'var(--gold-light)', fontWeight: 900, fontSize: '1.5rem', marginBottom: '4px' }}>10M+</div>
                            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Lives Impacted</div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Fade */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '200px',
                background: 'linear-gradient(to top, #fcfcfd 0%, transparent 100%)',
                zIndex: 5
            }} />

            {/* Floating Icons Background */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute', top: '10%', right: '15%', opacity: 0.05 }}><Globe size={300} /></motion.div>
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute', bottom: '10%', left: '5%', opacity: 0.05 }}><Factory size={250} /></motion.div>
            </div>
        </section>
    );
}
