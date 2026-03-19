'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Factory, ShieldCheck, Package, Users, Eye, Image as ImageIcon } from 'lucide-react';

interface GalleryItem {
    id: string;
    caption: string | null;
    category: string | null;
    imageUrl: string;
}

interface GalleryContentProps {
    items: GalleryItem[];
}

const categoryIcons: Record<string, any> = {
    'Factory': Factory,
    'Quality': ShieldCheck,
    'Packaging': Package,
    'Community': Users,
    'Products': Eye,
    'Team': Users,
};

const categories = ['All', 'Factory', 'Quality', 'Packaging', 'Community', 'Products', 'Team'];

export default function GalleryContent({ items }: GalleryContentProps) {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredGallery = activeCategory === 'All'
        ? items
        : items.filter(item => item.category === activeCategory);

    return (
        <>
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
                    {filteredGallery.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--gray-400)' }}>
                            <ImageIcon size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                            <p style={{ fontSize: '1.125rem' }}>No items found in this category.</p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '24px',
                        }}>
                            {filteredGallery.map((item) => {
                                const Icon = (item.category && categoryIcons[item.category]) || ImageIcon;
                                return (
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
                                            transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                                            height: '100%'
                                        }}>
                                            <div style={{
                                                aspectRatio: '1',
                                                background: 'var(--gray-50)',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}>
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.caption || 'Gallery Image'}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        transition: 'transform 0.5s ease'
                                                    }}
                                                    className="group-hover:scale-110"
                                                />
                                                <div style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
                                                    opacity: 0,
                                                    transition: 'opacity 0.3s ease'
                                                }} className="group-hover:opacity-100" />

                                                <div style={{
                                                    position: 'absolute',
                                                    top: '12px',
                                                    right: '12px',
                                                    background: 'rgba(255,255,255,0.9)',
                                                    backdropFilter: 'blur(4px)',
                                                    padding: '8px',
                                                    borderRadius: '50%',
                                                    color: 'var(--gold-dark)',
                                                    opacity: 0,
                                                    transform: 'translateY(-10px)',
                                                    transition: 'all 0.3s ease'
                                                }} className="group-hover:opacity-100 group-hover:translate-y-0">
                                                    <Icon size={18} />
                                                </div>
                                            </div>
                                            <div className="card-body" style={{ padding: '24px' }}>
                                                {item.category && (
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
                                                )}
                                                <p style={{ fontSize: '1rem', color: 'var(--gray-800)', fontWeight: 700, marginBottom: '0', lineHeight: 1.5 }}>
                                                    {item.caption || 'No caption'}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
