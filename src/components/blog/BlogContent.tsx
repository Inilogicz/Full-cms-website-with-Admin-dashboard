'use client';

import { Calendar, Tag, Clock } from 'lucide-react';

interface Post {
    title: string;
    content: string;
    category: string;
    publishedAt: string | Date;
    featuredImage?: string | null;
}

export default function BlogContent({ post }: { post: Post }) {
    return (
        <article className="container" style={{ maxWidth: '840px' }}>
            <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        color: 'var(--gold-dark)',
                        background: 'var(--gold-50)',
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)'
                    }}>
                        <Tag size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        {post.category}
                    </span>
                </div>

                <h1 style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 900,
                    lineHeight: 1.2,
                    marginBottom: '24px',
                    color: 'var(--gray-900)'
                }}>
                    {post.title}
                </h1>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    color: 'var(--gray-400)',
                    fontSize: '0.875rem',
                    paddingBottom: '32px',
                    borderBottom: '1px solid var(--gray-100)'
                }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={16} />
                        {new Date(post.publishedAt).toLocaleDateString('en-NG', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={16} />
                        5 min read
                    </span>
                </div>
            </div>

            {post.featuredImage && (
                <div style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    borderRadius: 'var(--radius-2xl)',
                    overflow: 'hidden',
                    marginBottom: '48px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                }}>
                    <img
                        src={post.featuredImage}
                        alt={post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            )}

            <div
                className="blog-content"
                style={{
                    fontSize: '1.125rem',
                    lineHeight: 1.8,
                    color: 'var(--gray-700)'
                }}
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
    );
}
