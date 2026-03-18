'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Package, ShieldCheck, Zap, Globe } from 'lucide-react';
import FlipCard from '@/components/ui/FlipCard';

const defaultProducts = [
    {
        id: 'default-1',
        name: 'LadySept Sanitary Towels',
        slug: 'ladysept-sanitary-towels',
        description: 'Premium quality sanitary pads designed for maximum comfort, protection, and confidence. Available in different sizes and absorbency levels.',
        category: 'Feminine Care',
        imageUrl: '/products/ladysept.jpg',
        color: '#FDF2F8',
    },
    {
        id: 'default-2',
        name: 'Damson Serviette',
        slug: 'damson-serviette',
        description: 'Soft, multi-purpose napkins/serviettes ideal for restaurants, hotels, and household use. Made with premium tissue materials.',
        category: 'Hygiene',
        imageUrl: '/products/damson.jpg',
        color: '#F0F9FF',
    },
    {
        id: 'default-3',
        name: 'Absorbent Cotton Wool',
        slug: 'absorbent-cotton-wool',
        description: 'Medical-grade absorbent cotton wool for wound care, personal hygiene, and laboratory use. 100% pure and sterilized.',
        category: 'Medical',
        imageUrl: '/products/cotton.jpg',
        color: '#F0FDF4',
    },
];

export default function ProductsPage() {
    const [products, setProducts] = useState(defaultProducts);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products?status=published');
                const data = await res.json();
                if (data && data.length > 0) {
                    setProducts(data.map((p: any) => ({
                        id: p.id,
                        name: p.name,
                        slug: p.slug,
                        description: p.description,
                        category: p.category,
                        imageUrl: p.images?.[0]?.cloudinaryUrl,
                        color: '#F9FAFB',
                    })));
                }
            } catch (err) {
                console.error("Failed to fetch products:", err);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="products-wrapper">
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
                        <span className="section-label" style={{ color: 'var(--gold-dark)', fontWeight: 800 }}>Our Collection</span>
                        <h1 style={{ color: 'var(--primary-dark)', marginBottom: '24px', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900 }}>
                            Quality Healthcare & <br />
                            <span className="text-gradient-gold">Hygiene Solutions</span>
                        </h1>
                        <p style={{ color: 'var(--gray-600)', fontSize: '1.25rem', maxWidth: '600px', lineHeight: 1.7 }}>
                            Manufactured to international standards in our state-of-the-art facility.
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

            <section className="section" style={{ padding: '100px 0' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '32px',
                    }}>
                        {products.map((product) => (
                            <FlipCard
                                key={product.id}
                                height="420px"
                                front={
                                    <div className="card h-full" style={{
                                        height: '100%',
                                        overflow: 'hidden',
                                        borderRadius: 'var(--radius-xl)',
                                        border: '1px solid var(--gray-100)',
                                        background: 'white',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <div style={{
                                            position: 'relative',
                                            aspectRatio: '1',
                                            padding: '12px',
                                        }}>
                                            <div style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: 'var(--radius-lg)',
                                                overflow: 'hidden',
                                                background: product.color || 'var(--gray-50)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                {product.imageUrl ? (
                                                    <img
                                                        src={product.imageUrl}
                                                        alt={product.name}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <Package size={64} style={{ opacity: 0.1 }} />
                                                )}
                                            </div>
                                        </div>
                                        <div className="card-body" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <span style={{
                                                color: 'var(--gold-dark)',
                                                fontSize: '0.75rem',
                                                fontWeight: 800,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                                marginBottom: '8px',
                                                display: 'block'
                                            }}>{product.category}</span>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px', color: 'var(--gray-900)' }}>{product.name}</h3>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                {product.description}
                                            </p>
                                            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold)', fontWeight: 700, fontSize: '0.8125rem' }}>
                                                Spec Details <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                }
                                back={
                                    <div style={{
                                        background: 'var(--primary-dark)',
                                        height: '100%',
                                        borderRadius: 'var(--radius-xl)',
                                        padding: '40px 32px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        color: 'white',
                                        textAlign: 'center',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                                    }}>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '24px', color: 'var(--gold)' }}>Product Spec</h3>
                                        <div style={{ textAlign: 'left', marginBottom: '32px' }}>
                                            {[
                                                { icon: ShieldCheck, text: 'NAFDAC Registered' },
                                                { icon: Zap, text: 'High Absorbency' },
                                                { icon: Globe, text: 'West African Standard' }
                                            ].map((spec, i) => (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                                    <spec.icon size={20} style={{ color: 'var(--gold)' }} />
                                                    <span style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{spec.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <Link href={`/products/${product.slug}`} className="btn btn-lg" style={{
                                            background: 'var(--gold)',
                                            color: 'white',
                                            borderRadius: 'var(--radius-full)',
                                            padding: '12px 32px',
                                            fontSize: '1rem'
                                        }}>
                                            View Product Page
                                        </Link>
                                    </div>
                                }
                            />
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
