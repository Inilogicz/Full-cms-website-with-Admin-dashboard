'use client';

import { Tag, Calendar } from 'lucide-react';

interface BlogContentProps {
    post: {
        title: string;
        content: string;
        category: string;
        publishedAt: Date | string;
        featuredImage?: string | null;
    };
}

export default function BlogContent({ post }: BlogContentProps) {
    return (
        <div className="container" style={{ maxWidth: '840px' }}>
            <div style={{ marginBottom: '40px' }}>
                <span className="badge badge-primary" style={{ marginBottom: '16px' }}>
                    <Tag size={12} style={{ marginRight: '6px' }} />{post.category}
                </span>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '20px', fontWeight: 800, lineHeight: 1.2 }}>{post.title}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gray-400)', fontSize: '0.9375rem' }}>
                    <Calendar size={16} />
                    {new Date(post.publishedAt).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {post.featuredImage && (
                <div style={{ width: '100%', aspectRatio: '21/9', borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--gray-100)' }}>
                    <img src={post.featuredImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            )}

            <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{ color: 'var(--gray-700)', lineHeight: 1.9, fontSize: '1.125rem' }}
                className="blog-content"
            />

        </div>
    );
}
