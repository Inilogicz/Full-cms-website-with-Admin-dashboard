'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Metadata } from 'next';
import { ImageIcon, Factory, ShieldCheck, Package, Users, Eye, Target } from 'lucide-react';

const defaultGallery = [
    { id: '1', caption: 'Production Line in Action', category: 'Factory', icon: Factory },
    { id: '2', caption: 'Quality Testing Laboratory', category: 'Quality', icon: ShieldCheck },
    { id: '3', caption: 'Packaging Department', category: 'Packaging', icon: Package },
    { id: '4', caption: 'Raw Material Warehouse', category: 'Factory', icon: Factory },
    { id: '5', caption: 'Community Health Outreach', category: 'Community', icon: Users },
    { id: '6', caption: 'Product Display Showroom', category: 'Products', icon: Eye },
    { id: '7', caption: 'Staff Training Session', category: 'Team', icon: Users },
    { id: '8', caption: 'Final Product Inspection', category: 'Quality', icon: ShieldCheck },
    { id: '9', caption: 'Factory Aerial View', category: 'Factory', icon: Factory },
];

const categories = ['All', 'Factory', 'Quality', 'Packaging', 'Community', 'Products', 'Team'];

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredGallery = activeCategory === 'All'
        ? defaultGallery
        : defaultGallery.filter(item => item.category === activeCategory);

    return (
        <div className="gallery-wrapper">
            {/* Hero Section - Lightened */}
            <section style={{
                paddingTop: '160px',
                paddingBottom: '100px',
                background: 'linear-gradient(to bottom, #f8faff 0%, #ffffff 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="section-label" style={{ color: 'var(--gold-dark)', fontWeight: 800 }}>Visual Journey</span>
                        <h1 style={{ color: 'var(--primary-dark)', marginBottom: '24px', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900 }}>
                            Manufacturing <br />
                            <span className="text-gradient-gold">Excellence in Action</span>
                        </h1>
                        <p style={{ color: 'var(--gray-600)', fontSize: '1.25rem', maxWidth: '600px', lineHeight: 1.7 }}>
                            A visual showcase of our state-of-the-art facilities, dedicated team, and community impact.
                        </p>
                    </motion.div>
                </div>

                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    zIndex: 1
                }} />
            </section>

            {/* Filter Bar */}
            <section style={{ borderBottom: '1px solid var(--gray-100)', background: 'white', position: 'sticky', top: '72px', zIndex: 50 }}>
                <div className="container" style={{ display: 'flex', gap: '12px', padding: '20px 0', overflowX: 'auto', scrollbarWidth: 'none' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '8px 20px',
                                borderRadius: 'var(--radius-full)',
                                border: '1px solid',
                                borderColor: activeCategory === cat ? 'var(--gold)' : 'var(--gray-200)',
                                background: activeCategory === cat ? 'var(--gold-50)' : 'transparent',
                                color: activeCategory === cat ? 'var(--gold-dark)' : 'var(--gray-500)',
                                fontSize: '0.8125rem',
                                fontWeight: 700,
                                whiteSpace: 'nowrap',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            <section className="section" style={{ padding: '80px 0' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '24px',
                    }}>
                        {filteredGallery.map((item) => (
                            <motion.div
                                layout
                                key={item.id}
                                className="group"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                style={{ cursor: 'pointer', position: 'relative' }}
                            >
                                <div className="card overflow-hidden" style={{
                                    borderRadius: 'var(--radius-xl)',
                                    border: '1px solid var(--gray-100)',
                                    background: 'white',
                                    transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)'
                                }}>
                                    <div style={{
                                        aspectRatio: '1',
                                        background: 'var(--gray-50)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{ color: 'var(--gold)', opacity: 0.1, transform: 'scale(2)' }}>
                                            <item.icon size={80} />
                                        </div>
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)', opacity: 0, transition: 'opacity 0.3s ease' }} className="group-hover:opacity-100" />
                                        <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ fontSize: '1rem', color: 'var(--gray-400)', fontWeight: 500 }}>Placeholder Media</span>
                                        </div>
                                    </div>
                                    <div className="card-body" style={{ padding: '24px' }}>
                                        <span style={{
                                            fontSize: '0.6875rem',
                                            fontWeight: 800,
                                            textTransform: 'uppercase',
                                            color: 'var(--gold-dark)',
                                            background: 'var(--gold-50)',
                                            padding: '4px 10px',
                                            borderRadius: '4px',
                                            marginBottom: '12px',
                                            display: 'inline-block'
                                        }}>{item.category}</span>
                                        <p style={{ fontSize: '1rem', color: 'var(--gray-800)', fontWeight: 700, marginBottom: '0' }}>{item.caption}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
