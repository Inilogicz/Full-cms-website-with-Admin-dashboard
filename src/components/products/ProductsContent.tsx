'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Package, ShieldCheck, Zap, Globe } from 'lucide-react';
import FlipCard from '@/components/ui/FlipCard';
import Link from 'next/link';

interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    imageUrl?: string;
    color?: string;
}

export default function ProductsContent({ products }: { products: Product[] }) {
    return (
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
    );
}
