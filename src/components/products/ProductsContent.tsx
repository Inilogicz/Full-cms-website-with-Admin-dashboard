'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShoppingBag, ShieldCheck, Star } from 'lucide-react';
import Link from 'next/link';

interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    imageUrl?: string;
    color?: string;
    featured?: boolean;
}

export default function ProductsContent({ products }: { products: Product[] }) {
    return (
        <section className="section" style={{ padding: '80px 0', background: 'white' }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '40px',
                }}>
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                                <div className="product-card" style={{
                                    height: '100%',
                                    background: 'white',
                                    borderRadius: '40px',
                                    border: '1px solid var(--gray-100)',
                                    overflow: 'hidden',
                                    transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative'
                                }}>
                                    {/* Image Container */}
                                    <div style={{
                                        position: 'relative',
                                        aspectRatio: '1/1',
                                        background: product.color || 'var(--gray-50)',
                                        padding: '16px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '28px',
                                            overflow: 'hidden',
                                            position: 'relative'
                                        }}>
                                            {product.imageUrl ? (
                                                <motion.img
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ duration: 0.6 }}
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-100)' }}>
                                                    <ShoppingBag size={48} color="var(--gray-300)" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Featured Tag */}
                                        {product.featured && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '32px',
                                                left: '32px',
                                                background: 'var(--gold)',
                                                color: 'white',
                                                padding: '8px 16px',
                                                borderRadius: '100px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                fontSize: '0.75rem',
                                                fontWeight: 800,
                                                boxShadow: '0 10px 20px rgba(212, 175, 55, 0.3)',
                                                zIndex: 2
                                            }}>
                                                <Star size={14} fill="white" />
                                                BEST SELLER
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Container */}
                                    <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                            <span style={{
                                                color: 'var(--primary)',
                                                fontSize: '0.75rem',
                                                fontWeight: 800,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em'
                                            }}>{product.category}</span>
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                <ShieldCheck size={16} color="var(--success)" />
                                                <span style={{ fontSize: '0.6875rem', color: 'var(--success)', fontWeight: 700 }}>ISO CERTIFIED</span>
                                            </div>
                                        </div>

                                        <h3 style={{
                                            fontSize: '1.5rem',
                                            fontWeight: 900,
                                            marginBottom: '16px',
                                            color: 'var(--primary-dark)',
                                            lineHeight: 1.2
                                        }}>{product.name}</h3>

                                        <p style={{
                                            fontSize: '0.9375rem',
                                            color: 'var(--gray-500)',
                                            lineHeight: 1.6,
                                            marginBottom: '24px',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            fontWeight: 500
                                        }}>
                                            {product.description}
                                        </p>

                                        {/* Features List (Short) */}
                                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px', marginTop: 'auto' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--gray-50)', padding: '6px 12px', borderRadius: '100px' }}>
                                                <CheckCircle2 size={12} color="var(--primary)" />
                                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-600)' }}>Quality</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--gray-50)', padding: '6px 12px', borderRadius: '100px' }}>
                                                <CheckCircle2 size={12} color="var(--primary)" />
                                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-600)' }}>Trusted</span>
                                            </div>
                                        </div>

                                        <div style={{
                                            paddingTop: '24px',
                                            borderTop: '1px solid var(--gray-50)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                View Specifications <ArrowRight size={16} />
                                            </span>
                                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--gray-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', transition: 'all 0.3s ease' }}>
                                                <ShoppingBag size={18} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <style jsx>{`
                                .product-card:hover {
                                    transform: translateY(-10px);
                                    box-shadow: 0 30px 60px -15px rgba(10, 77, 162, 0.15);
                                    border-color: var(--primary-100) !important;
                                }
                                .product-card:hover div div span {
                                    color: var(--primary) !important;
                                }
                            `}</style>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
