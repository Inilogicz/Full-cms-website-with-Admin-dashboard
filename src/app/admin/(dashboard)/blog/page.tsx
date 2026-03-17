'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Eye } from 'lucide-react';

interface BlogPost {
    id: string; title: string; slug: string; category: string; status: string; featured: boolean; publishedAt: string; createdAt: string;
}

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<BlogPost | null>(null);
    const [search, setSearch] = useState('');

    useEffect(() => { fetchPosts(); }, []);

    async function fetchPosts() {
        try { const res = await fetch('/api/blog'); setPosts(await res.json()); } catch { }
        setLoading(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const data = {
            title: fd.get('title'), content: fd.get('content'), excerpt: fd.get('excerpt'),
            category: fd.get('category'), status: fd.get('status'), featured: fd.get('featured') === 'on',
        };
        const url = editing ? `/api/blog/${editing.id}` : '/api/blog';
        await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        setShowForm(false); setEditing(null); fetchPosts();
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete this post?')) return;
        await fetch(`/api/blog/${id}`, { method: 'DELETE' }); fetchPosts();
    }

    const filtered = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.5rem' }}>Blog Posts</h1>
                <button className="btn btn-primary" onClick={() => { setEditing(null); setShowForm(true); }}><Plus size={16} /> New Post</button>
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
                                <label className="form-label">Category *</label>
                                <select name="category" className="form-select" required defaultValue={editing?.category}>
                                    <option value="">Select</option>
                                    <option value="Menstrual Health">Menstrual Health</option>
                                    <option value="Women Empowerment">Women Empowerment</option>
                                    <option value="Puberty Education">Puberty Education</option>
                                    <option value="Healthcare Insights">Healthcare Insights</option>
                                </select>
                            </div>
                            <div className="form-group"><label className="form-label">Excerpt</label><textarea name="excerpt" className="form-textarea" rows={2} /></div>
                            <div className="form-group"><label className="form-label">Content *</label><textarea name="content" className="form-textarea" required rows={10} placeholder="Write blog content (HTML supported)..." /></div>
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
                        <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Featured</th><th>Actions</th></tr></thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--gray-400)', padding: '40px' }}>No blog posts found</td></tr>
                            ) : filtered.map(p => (
                                <tr key={p.id}>
                                    <td style={{ fontWeight: 500 }}>{p.title}</td>
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
        </div>
    );
}
