'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, BookOpen, Clock } from 'lucide-react';
import FlipCard from '@/components/ui/FlipCard';
import Link from 'next/link';

interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    publishedAt: string | Date;
    featuredImage?: string | null;
}

const categories = ['All', 'Menstrual Health', 'Women Empowerment', 'Puberty Education', 'Healthcare Insights'];

export default function BlogList({ posts }: { posts: Post[] }) {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredPosts = activeCategory === 'All'
        ? posts
        : posts.filter(p => p.category === activeCategory);

    return (
        <>
            <section style={{
                borderBottom: '1px solid var(--gray-100)',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(12px)',
                position: 'sticky',
                top: '72px',
                zIndex: 50
            }}>
                <div className="container" style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '16px 0',
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    justifyContent: 'center'
                }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '10px 24px',
                                borderRadius: 'var(--radius-full)',
                                border: '1px solid',
                                borderColor: activeCategory === cat ? 'var(--primary)' : 'transparent',
                                background: activeCategory === cat ? 'var(--primary)' : 'var(--gray-50)',
                                color: activeCategory === cat ? 'white' : 'var(--gray-600)',
                                fontSize: '0.875rem',
                                fontWeight: 700,
                                whiteSpace: 'nowrap',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'pointer',
                                boxShadow: activeCategory === cat ? '0 10px 20px rgba(10, 77, 162, 0.15)' : 'none'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            <section className="section" style={{ padding: '100px 0', background: 'white' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                        gap: '40px',
                    }}>
                        {filteredPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <FlipCard
                                    height="450px"
                                    front={
                                        <div className="card h-full" style={{
                                            height: '100%',
                                            borderRadius: 'var(--radius-2xl)',
                                            border: '1px solid var(--gray-100)',
                                            background: 'white',
                                            overflow: 'hidden',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
                                        }}>
                                            <div style={{ height: '240px', background: 'var(--gray-50)', position: 'relative', overflow: 'hidden' }}>
                                                {post.featuredImage ? (
                                                    <img src={post.featuredImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="card-hover-image" />
                                                ) : (
                                                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.1 }}><BookOpen size={48} /></div>
                                                )}
                                                <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 2 }}>
                                                    <span style={{
                                                        fontSize: '0.75rem',
                                                        fontWeight: 800,
                                                        textTransform: 'uppercase',
                                                        color: 'white',
                                                        background: 'var(--primary)',
                                                        padding: '6px 14px',
                                                        borderRadius: 'var(--radius-full)',
                                                        boxShadow: '0 4px 12px rgba(10, 77, 162, 0.2)'
                                                    }}>
                                                        {post.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="card-body" style={{ padding: '32px' }}>
                                                <h3 style={{
                                                    fontSize: '1.375rem',
                                                    fontWeight: 900,
                                                    marginBottom: '16px',
                                                    color: 'var(--primary-dark)',
                                                    lineHeight: 1.3,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}>{post.title}</h3>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8125rem', color: 'var(--gray-400)', fontWeight: 600 }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} style={{ color: 'var(--gold)' }} /> 5 min read</span>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} style={{ color: 'var(--gold)' }} /> {new Date(post.publishedAt).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                </div>

                                                <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '0.8125rem' }}>
                                                    Flip for excerpt <ArrowRight size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    back={
                                        <div style={{
                                            background: 'var(--primary-dark)',
                                            height: '100%',
                                            borderRadius: 'var(--radius-2xl)',
                                            padding: '48px 40px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            color: 'white',
                                            textAlign: 'left',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}>
                                            {/* Decorative Background Icon */}
                                            <BookOpen size={120} style={{ position: 'absolute', bottom: '-20px', right: '-20px', opacity: 0.05, transform: 'rotate(-15deg)' }} />

                                            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '24px', color: 'var(--gold)' }}>Article Insight</h3>
                                            <p style={{ fontSize: '1rem', opacity: 0.9, lineHeight: 1.7, marginBottom: '40px' }}>{post.excerpt}</p>
                                            <Link href={`/blog/${post.slug}`} className="btn btn-lg" style={{
                                                background: 'var(--gold)',
                                                color: 'white',
                                                width: '100%',
                                                borderRadius: 'var(--radius-full)',
                                                fontWeight: 800
                                            }}>
                                                Read Full Article
                                            </Link>
                                        </div>
                                    }
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
