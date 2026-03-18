'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, BookOpen, Clock, User } from 'lucide-react';
import FlipCard from '@/components/ui/FlipCard';

const categories = ['All', 'Menstrual Health', 'Women Empowerment', 'Puberty Education', 'Healthcare Insights'];

export default function BlogPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/blog?status=published');
                const data = await res.json();
                if (data) {
                    setPosts(data.map((p: any) => ({
                        id: p.id,
                        title: p.title,
                        slug: p.slug,
                        excerpt: p.excerpt || '',
                        category: p.category,
                        publishedAt: p.publishedAt || new Date(),
                        featuredImage: p.featuredImage
                    })));
                }
            } catch (err) {
                console.error("Failed to fetch posts:", err);
            }
        };
        fetchPosts();
    }, []);

    const filteredPosts = activeCategory === 'All'
        ? posts
        : posts.filter(p => p.category === activeCategory);

    return (
        <div className="blog-wrapper">
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
                        <span className="section-label" style={{ color: 'var(--gold-dark)', fontWeight: 800 }}>Education Hub</span>
                        <h1 style={{ color: 'var(--primary-dark)', marginBottom: '24px', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900 }}>
                            Empowering Through <br />
                            <span className="text-gradient-gold">Health Knowledge</span>
                        </h1>
                        <p style={{ color: 'var(--gray-600)', fontSize: '1.25rem', maxWidth: '600px', lineHeight: 1.7 }}>
                            Educational resources on menstrual health awareness, women empowerment, and healthcare insights.
                        </p>
                    </motion.div>
                </div>

                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '-5%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    zIndex: 1
                }} />
            </section>

            {/* Categories - Sleeker */}
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

            {/* Posts Grid - With Flip */}
            <section className="section" style={{ padding: '80px 0' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '32px',
                    }}>
                        {filteredPosts.map((post) => (
                            <FlipCard
                                key={post.id}
                                height="400px"
                                front={
                                    <div className="card h-full" style={{
                                        height: '100%',
                                        borderRadius: 'var(--radius-xl)',
                                        border: '1px solid var(--gray-100)',
                                        background: 'white',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{ height: '200px', background: 'var(--gray-50)', position: 'relative' }}>
                                            {post.featuredImage ? (
                                                <img src={post.featuredImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.1 }}><BookOpen size={48} /></div>
                                            )}
                                        </div>
                                        <div className="card-body" style={{ padding: '24px' }}>
                                            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                                <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--gold-dark)', background: 'var(--gold-50)', padding: '4px 8px', borderRadius: '4px' }}>{post.category}</span>
                                            </div>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px', color: 'var(--gray-900)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.title}</h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', color: 'var(--gray-400)' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> 5 min read</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {new Date(post.publishedAt).toLocaleDateString()}</span>
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
                                        textAlign: 'center'
                                    }}>
                                        <h3 style={{ fontSize: '1.375rem', fontWeight: 800, marginBottom: '20px', color: 'var(--gold)' }}>Quick Preview</h3>
                                        <p style={{ fontSize: '0.9375rem', opacity: 0.8, lineHeight: 1.6, marginBottom: '32px' }}>{post.excerpt}</p>
                                        <Link href={`/blog/${post.slug}`} className="btn btn-lg" style={{ background: 'var(--gold)', color: 'white', alignSelf: 'center' }}>
                                            Read Full Article
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
