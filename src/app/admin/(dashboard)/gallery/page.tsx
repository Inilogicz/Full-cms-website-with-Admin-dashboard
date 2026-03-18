'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Search, Image as ImageIcon, X } from 'lucide-react';

interface GalleryItem {
    id: string;
    caption?: string;
    category?: string;
    imageUrl: string;
    publicId?: string;
}

export default function AdminGalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState('');
    const [uploading, setUploading] = useState(false);

    function fetchItems() {
        fetch('/api/gallery')
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(() => { /* */ })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchItems();
    }, []);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setUploading(true);

        const form = e.currentTarget;
        const fd = new FormData(form);
        const file = fd.get('file') as File;

        if (!file || file.size === 0) {
            setUploading(false);
            return;
        }

        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('folder', 'gallery');

        fetch('/api/upload', {
            method: 'POST',
            body: uploadData
        })
            .then(res => {
                if (!res.ok) throw new Error('Upload failed');
                return res.json();
            })
            .then(uploadResult => {
                const data = {
                    caption: fd.get('caption'),
                    category: fd.get('category'),
                    imageUrl: uploadResult.cloudinaryUrl,
                    publicId: uploadResult.publicId
                };

                return fetch('/api/gallery', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            })
            .then(res => {
                if (!res.ok) throw new Error('Gallery creation failed');
                setShowForm(false);
                fetchItems();
            })
            .catch(err => {
                console.error('Error:', err);
                alert('An error occurred during upload or submission.');
            })
            .finally(() => {
                setUploading(false);
            });
    }

    function handleDelete(id: string) {
        if (!confirm('Delete this gallery item?')) return;
        fetch(`/api/gallery/${id}`, { method: 'DELETE' })
            .then(() => fetchItems())
            .catch(() => { /* */ });
    }

    const filtered = items.filter(i => (i.caption || '').toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.5rem' }}>Gallery Management</h1>
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                    <Plus size={16} /> Add Image
                </button>
            </div>

            <div style={{ position: 'relative', marginBottom: '20px', maxWidth: '320px' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input className="form-input" style={{ paddingLeft: '40px' }} placeholder="Search caption..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            {showForm && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => !uploading && setShowForm(false)}>
                    <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '32px' }} onClick={e => e.stopPropagation()}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Add to Gallery</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Image File *</label>
                                <input name="file" type="file" accept="image/*" className="form-input" required disabled={uploading} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Caption</label>
                                <input name="caption" className="form-input" disabled={uploading} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Category</label>
                                <select name="category" className="form-select" disabled={uploading}>
                                    <option value="Factory">Factory</option>
                                    <option value="Products">Products</option>
                                    <option value="Team">Team</option>
                                    <option value="Events">Events</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '32px' }}>
                                <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)} disabled={uploading}>Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={uploading}>
                                    {uploading ? 'Processing...' : 'Upload & Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                    {Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton" style={{ aspectRatio: '1', borderRadius: 'var(--radius-lg)' }} />)}
                </div>
            ) : filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--gray-400)' }}>
                    <ImageIcon size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
                    <p>No gallery items found.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                    {filtered.map(item => (
                        <div key={item.id} className="card group" style={{ overflow: 'hidden', padding: 0 }}>
                            <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
                                <img src={item.imageUrl} alt={item.caption || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <button
                                    className="btn btn-ghost btn-sm"
                                    onClick={() => handleDelete(item.id)}
                                    style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(255,255,255,0.9)', color: 'var(--error)' }}
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                            <div style={{ padding: '16px' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>{item.category || 'General'}</div>
                                <div style={{ fontSize: '0.9375rem', fontWeight: 500 }}>{item.caption || 'Untitled'}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
