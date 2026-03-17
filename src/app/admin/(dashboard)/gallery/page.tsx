'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Search, Image as ImageIcon } from 'lucide-react';

interface GalleryItem {
    id: string; caption: string; category: string; imageUrl: string; createdAt: string;
}

export default function AdminGalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => { fetchItems(); }, []);

    async function fetchItems() {
        try { const res = await fetch('/api/gallery'); setItems(await res.json()); } catch { }
        setLoading(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);

        // Upload image first
        const file = fd.get('file') as File;
        let imageUrl = '';
        if (file && file.size > 0) {
            const uploadData = new FormData();
            uploadData.append('file', file);
            uploadData.append('folder', 'niger-sanitary/gallery');
            try {
                const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadData });
                const uploadResult = await uploadRes.json();
                imageUrl = uploadResult.cloudinaryUrl;
            } catch { return; }
        }

        const data = { caption: fd.get('caption'), category: fd.get('category'), imageUrl };
        await fetch('/api/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        setShowForm(false); fetchItems();
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete?')) return;
        await fetch(`/api/gallery/${id}`, { method: 'DELETE' }); fetchItems();
    }

    const filtered = items.filter(i => (i.caption || '').toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.5rem' }}>Gallery Management</h1>
                <button className="btn btn-primary" onClick={() => setShowForm(true)}><Plus size={16} /> Add Image</button>
            </div>
            <div style={{ position: 'relative', marginBottom: '20px', maxWidth: '320px' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input className="form-input" style={{ paddingLeft: '40px' }} placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            {showForm && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowForm(false)}>
                    <div className="card" style={{ width: '100%', maxWidth: '480px', padding: '32px' }} onClick={e => e.stopPropagation()}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Add Gallery Image</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group"><label className="form-label">Image *</label><input name="file" type="file" accept="image/*" className="form-input" required /></div>
                            <div className="form-group"><label className="form-label">Caption</label><input name="caption" className="form-input" placeholder="Image caption" /></div>
                            <div className="form-group">
                                <label className="form-label">Category</label>
                                <select name="category" className="form-select">
                                    <option value="Factory">Factory</option><option value="Quality">Quality</option><option value="Packaging">Packaging</option>
                                    <option value="Community">Community</option><option value="Products">Products</option><option value="Team">Team</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Upload & Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                    {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton" style={{ aspectRatio: '4/3', borderRadius: 'var(--radius-lg)' }} />)}
                </div>
            ) : filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--gray-400)' }}>
                    <ImageIcon size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
                    <p>No gallery images yet. Add some!</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                    {filtered.map(item => (
                        <div key={item.id} className="card">
                            <div style={{ aspectRatio: '4/3', background: 'var(--gray-100)' }}>
                                {item.imageUrl ? <img src={item.imageUrl} alt={item.caption || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> :
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ImageIcon size={32} style={{ color: 'var(--gray-300)' }} /></div>}
                            </div>
                            <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{item.caption || 'Untitled'}</p>
                                    {item.category && <span className="badge badge-primary" style={{ fontSize: '0.625rem', marginTop: '4px' }}>{item.category}</span>}
                                </div>
                                <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }} onClick={() => handleDelete(item.id)}><Trash2 size={14} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
