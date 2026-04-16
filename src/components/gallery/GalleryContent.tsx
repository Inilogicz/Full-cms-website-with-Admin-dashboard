'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Factory, ShieldCheck, Package, Users, Eye, Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2, XCircle, Play } from 'lucide-react';

interface GalleryItem {
    id: string;
    caption: string | null;
    category: string | null;
    imageUrl: string;
    resourceType?: string;
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
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const filteredGallery = activeCategory === 'All'
        ? items
        : items.filter(item => item.category === activeCategory);

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImage !== null) {
            setSelectedImage((selectedImage + 1) % filteredGallery.length);
        }
    };

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImage !== null) {
            setSelectedImage((selectedImage - 1 + filteredGallery.length) % filteredGallery.length);
        }
    };

    // Close on escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedImage(null);
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage]);

    return (
        <div style={{ background: '#fcfcfd', minHeight: '100vh' }}>
            {/* Filter Bar */}
            <section style={{
                background: 'white',
                position: 'sticky',
                top: '72px',
                zIndex: 40,
                borderBottom: '1px solid #f1f5f9',
                boxShadow: '0 4px 20px -10px rgba(0,0,0,0.03)'
            }}>
                <div className="container" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '12px',
                    padding: '24px 0',
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '10px 24px',
                                borderRadius: '100px',
                                border: '1px solid',
                                borderColor: activeCategory === cat ? 'var(--primary)' : '#e2e8f0',
                                background: activeCategory === cat ? 'var(--primary)' : 'white',
                                color: activeCategory === cat ? 'white' : 'var(--gray-600)',
                                fontSize: '0.875rem',
                                fontWeight: 700,
                                whiteSpace: 'nowrap',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'pointer',
                                boxShadow: activeCategory === cat ? '0 10px 20px -5px rgba(10, 77, 162, 0.3)' : 'none'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            <section className="section" style={{ paddingTop: '60px', paddingBottom: '120px' }}>
                <div className="container">
                    {filteredGallery.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '120px 0', color: 'var(--gray-400)' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: '#f8fafc',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px'
                            }}>
                                <ImageIcon size={32} />
                            </div>
                            <h3 style={{ color: 'var(--gray-800)', marginBottom: '8px' }}>No visuals found</h3>
                            <p style={{ fontSize: '1rem' }}>We haven't added any items to this category yet.</p>
                        </div>
                    ) : (
                        <div className="gallery-masonry">
                            <AnimatePresence mode="popLayout">
                                {filteredGallery.map((item, index) => {
                                    const Icon = (item.category && categoryIcons[item.category]) || ImageIcon;
                                    return (
                                        <motion.div
                                            layout
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.5, delay: index * 0.05 }}
                                            onClick={() => setSelectedImage(index)}
                                            style={{
                                                marginBottom: '24px',
                                                breakInside: 'avoid',
                                                cursor: 'pointer',
                                                borderRadius: '24px',
                                                overflow: 'hidden',
                                                position: 'relative'
                                            }}
                                            className="gallery-item-group"
                                        >
                                            <div style={{
                                                position: 'relative',
                                                background: '#f8fafc',
                                                overflow: 'hidden',
                                                borderRadius: '24px',
                                                border: '1px solid #f1f5f9',
                                                transition: 'all 0.5s ease'
                                            }}>
                                                {item.resourceType === 'video' ? (
                                                    <div style={{ position: 'relative', aspectRatio: '4/3', background: '#000' }}>
                                                        <video
                                                            src={item.imageUrl}
                                                            muted
                                                            playsInline
                                                            loop
                                                            autoPlay
                                                            onMouseOver={e => e.currentTarget.play()}
                                                            onMouseOut={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                                display: 'block'
                                                            }}
                                                        />
                                                        <div style={{
                                                            position: 'absolute',
                                                            inset: 0,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            background: 'rgba(0,0,0,0.2)',
                                                            pointerEvents: 'none'
                                                        }}>
                                                            <Play size={40} color="white" fill="white" opacity={0.8} />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.caption || 'Gallery Image'}
                                                        style={{
                                                            width: '100%',
                                                            display: 'block',
                                                            transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
                                                        }}
                                                        className="gallery-image"
                                                    />
                                                )}

                                                {/* Overlay */}
                                                <div style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    background: 'linear-gradient(to top, rgba(6, 58, 122, 0.8) 0%, transparent 60%)',
                                                    opacity: 0,
                                                    transition: 'opacity 0.4s ease',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'flex-end',
                                                    padding: '24px'
                                                }} className="gallery-overlay">
                                                    <div style={{ transform: 'translateY(20px)', transition: 'transform 0.4s ease' }} className="gallery-content">
                                                        {item.category && (
                                                            <span style={{
                                                                fontSize: '0.625rem',
                                                                fontWeight: 800,
                                                                color: 'var(--gold-light)',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.15em',
                                                                marginBottom: '8px',
                                                                display: 'block'
                                                            }}>{item.category}</span>
                                                        )}
                                                        <p style={{ color: 'white', fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0', lineHeight: 1.4 }}>
                                                            {item.caption || 'Niger Sanitary Industry Limited Excellence'}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Zoom Icon */}
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '20px',
                                                    right: '20px',
                                                    background: 'rgba(255,255,255,0.2)',
                                                    backdropFilter: 'blur(10px)',
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    opacity: 0,
                                                    transition: 'all 0.3s ease'
                                                }} className="gallery-zoom">
                                                    <Maximize2 size={18} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(6, 58, 122, 0.95)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '40px'
                        }}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            style={{ position: 'absolute', top: '30px', right: '30px', color: 'white', background: 'transparent', border: 'none', cursor: 'pointer' }}
                        >
                            <X size={32} />
                        </button>

                        <button
                            onClick={handlePrev}
                            style={{ position: 'absolute', left: '30px', color: 'white', background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', padding: '20px', borderRadius: '50%' }}
                        >
                            <ChevronLeft size={32} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{ maxWidth: '90%', maxHeight: '80vh', position: 'relative' }}
                        >
                            {filteredGallery[selectedImage].resourceType === 'video' ? (
                                <video
                                    src={filteredGallery[selectedImage].imageUrl}
                                    controls
                                    autoPlay
                                    style={{ width: '100%', maxHeight: '70vh', borderRadius: '12px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}
                                />
                            ) : (
                                <img
                                    src={filteredGallery[selectedImage].imageUrl}
                                    alt="Selected"
                                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}
                                />
                            )}
                            <div style={{ marginTop: '20px', color: 'white', textAlign: 'center' }}>
                                <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>{filteredGallery[selectedImage].category}</span>
                                <p style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '8px' }}>{filteredGallery[selectedImage].caption}</p>
                            </div>
                        </motion.div>

                        <button
                            onClick={handleNext}
                            style={{ position: 'absolute', right: '30px', color: 'white', background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', padding: '20px', borderRadius: '50%' }}
                        >
                            <ChevronRight size={32} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
