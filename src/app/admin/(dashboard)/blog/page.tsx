'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Eye, Image as ImageIcon, X } from 'lucide-react';
import MediaPicker from '@/components/admin/MediaPicker';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    category: string;
    status: string;
    featured: boolean;
    featuredImage?: string;
    content: string;
    excerpt?: string;
    publishedAt: string;
    createdAt: string;
}

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<BlogPost | null>(null);
    const [search, setSearch] = useState('');
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [featuredImage, setFeaturedImage] = useState<string | null>(null);

    useEffect(() => { fetchPosts(); }, []);

    function fetchPosts() {
        fetch('/api/blog')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(() => { /* */ })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        if (editing) {
            setFeaturedImage(editing.featuredImage || null);
        } else {
            setFeaturedImage(null);
        }
    }, [editing, showForm]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const data = {
            title: fd.get('title'),
            content: fd.get('content'),
            excerpt: fd.get('excerpt'),
            category: fd.get('category'),
            status: fd.get('status'),
            featured: fd.get('featured') === 'on',
            featuredImage: featuredImage,
        };
        const url = editing ? `/api/blog/${editing.id}` : '/api/blog';
        fetch(url, {
            method: editing ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(() => {
                setShowForm(false);
                setEditing(null);
                fetchPosts();
            })
            .catch(() => { /* */ });
    }

    function handleDelete(id: string) {
        if (!confirm('Delete this post?')) return;
        fetch(`/api/blog/${id}`, { method: 'DELETE' })
            .then(() => fetchPosts())
            .catch(() => { /* */ });
    }

    const filtered = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.5rem' }}>Blog Posts</h1>
                <button className="btn btn-primary" onClick={() => { setEditing(null); setFeaturedImage(null); setShowForm(true); }}><Plus size={16} /> New Post</button>
            </div>

            <div style={{ position: 'relative', marginBottom: '20px', maxWidth: '320px' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input className="form-input" style={{ paddingLeft: '40px' }} placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            {showForm && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowForm(false)}>
                    <div className="card" style={{ width: '100%', maxWidth: '700px', maxHeight: '85vh', overflow: 'auto', padding: '32px' }} onClick={e => e.stopPropagation()}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>{editing ? 'Edit' : 'New'} Blog Post</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group"><label className="form-label">Title *</label><input name="title" className="form-input" required defaultValue={editing?.title} /></div>

                            <div className="form-group">
                                <label className="form-label">Featured Image</label>
                                {featuredImage ? (
                                    <div style={{ position: 'relative', width: '200px', aspectRatio: '16/9', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '12px' }}>
                                        <img src={featuredImage} alt="Featured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <button
                                            type="button"
                                            onClick={() => setFeaturedImage(null)}
                                            style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setShowMediaPicker(true)}
                                        style={{ width: '200px', aspectRatio: '16/9', border: '2px dashed var(--gray-200)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--gray-400)', background: 'none', cursor: 'pointer', marginBottom: '12px' }}
                                    >
                                        <ImageIcon size={24} />
                                        <span style={{ fontSize: '0.8125rem' }}>Select Image</span>
                                    </button>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Category *</label>
                                <select name="category" className="form-select" required defaultValue={editing?.category}>
                                    <option value="">Select</option>
                                    <option value="Menstrual Health">Menstrual Health</option>
                                    <option value="Women Empowerment">Women Empowerment</option>
                                    <option value="Puberty Education">Puberty Education</option>
                                    <option value="Healthcare Insights">Healthcare Insights</option>
                                </select>
                            </div>
                            <div className="form-group"><label className="form-label">Excerpt</label><textarea name="excerpt" className="form-textarea" rows={2} defaultValue={editing?.excerpt} /></div>
                            <div className="form-group"><label className="form-label">Content *</label><textarea name="content" className="form-textarea" required rows={10} placeholder="Write blog content (HTML supported)..." defaultValue={editing?.content} /></div>
                            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label className="form-label">Status</label>
                                    <select name="status" className="form-select" defaultValue={editing?.status || 'draft'}>
                                        <option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option>
                                    </select>
                                </div>
                                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '24px' }}>
                                    <input type="checkbox" name="featured" id="featured" defaultChecked={editing?.featured} />
                                    <label htmlFor="featured" style={{ fontSize: '0.875rem' }}>Featured Post</label>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="skeleton" style={{ height: '300px', borderRadius: 'var(--radius-lg)' }} />
            ) : (
                <div className="table-container">
                    <table className="table">
                        <thead><tr><th>Post</th><th>Category</th><th>Status</th><th>Featured</th><th>Actions</th></tr></thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--gray-400)', padding: '40px' }}>No blog posts found</td></tr>
                            ) : filtered.map(p => (
                                <tr key={p.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: 48, height: 32, borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'var(--gray-100)', flexShrink: 0 }}>
                                                {p.featuredImage ? <img src={p.featuredImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <ImageIcon size={16} style={{ margin: 8, color: 'var(--gray-300)' }} />}
                                            </div>
                                            <span style={{ fontWeight: 500 }}>{p.title}</span>
                                        </div>
                                    </td>
                                    <td><span className="badge badge-primary">{p.category}</span></td>
                                    <td><span className={`badge badge-${p.status === 'published' ? 'success' : p.status === 'draft' ? 'warning' : 'info'}`}>{p.status}</span></td>
                                    <td>{p.featured ? '⭐' : '—'}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button className="btn btn-ghost btn-sm" onClick={() => { setEditing(p); setShowForm(true); }}><Edit2 size={14} /></button>
                                            <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }} onClick={() => handleDelete(p.id)}><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showMediaPicker && (
                <MediaPicker
                    onSelect={(item) => setFeaturedImage(item.cloudinaryUrl)}
                    onClose={() => setShowMediaPicker(false)}
                    currentId={"" /* We match by URL for blog */}
                />
            )}
        </div>
    );
}
