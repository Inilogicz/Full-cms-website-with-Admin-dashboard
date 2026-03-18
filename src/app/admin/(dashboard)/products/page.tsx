'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Image as ImageIcon, X } from 'lucide-react';
import MediaPicker from '@/components/admin/MediaPicker';

interface Media {
    id: string;
    cloudinaryUrl: string;
    altText?: string;
}

interface Product {
    id: string; name: string; slug: string; description: string; category: string; status: string; createdAt: string;
    images?: Media[];
    applications?: string;
    packaging?: string;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Product | null>(null);
    const [search, setSearch] = useState('');
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [selectedImages, setSelectedImages] = useState<Media[]>([]);

    useEffect(() => { fetchProducts(); }, []);

    function fetchProducts() {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(() => { /* */ })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        if (editing) {
            setSelectedImages(editing.images || []);
        } else {
            setSelectedImages([]);
        }
    }, [editing, showForm]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            description: formData.get('description'),
            category: formData.get('category'),
            applications: formData.get('applications'),
            packaging: formData.get('packaging'),
            status: formData.get('status'),
            imageIds: selectedImages.map(img => img.id),
        };

        const url = editing ? `/api/products/${editing.id}` : '/api/products';
        const method = editing ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(() => {
                setShowForm(false);
                setEditing(null);
                fetchProducts();
            })
            .catch(() => { /* */ });
    }

    function handleDelete(id: string) {
        if (!confirm('Delete this product?')) return;
        fetch(`/api/products/${id}`, { method: 'DELETE' })
            .then(() => fetchProducts())
            .catch(() => { /* */ });
    }

    const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.5rem' }}>Products</h1>
                <button className="btn btn-primary" onClick={() => { setEditing(null); setSelectedImages([]); setShowForm(true); }}>
                    <Plus size={16} /> Add Product
                </button>
            </div>

            {/* Search */}
            <div style={{ position: 'relative', marginBottom: '20px', maxWidth: '320px' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input className="form-input" style={{ paddingLeft: '40px' }} placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            {/* Form Modal */}
            {showForm && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowForm(false)}>
                    <div className="card" style={{ width: '100%', maxWidth: '600px', maxHeight: '80vh', overflow: 'auto', padding: '32px' }} onClick={e => e.stopPropagation()}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>{editing ? 'Edit' : 'Add'} Product</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Product Name *</label>
                                <input name="name" className="form-input" required defaultValue={editing?.name} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Category *</label>
                                <select name="category" className="form-select" required defaultValue={editing?.category}>
                                    <option value="">Select</option>
                                    <option value="Feminine Care">Feminine Care</option>
                                    <option value="Hygiene">Hygiene</option>
                                    <option value="Medical">Medical</option>
                                    <option value="Industrial">Industrial</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Description *</label>
                                <textarea name="description" className="form-textarea" required defaultValue={editing?.description} rows={4} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Applications</label>
                                <textarea name="applications" className="form-textarea" rows={2} defaultValue={editing?.applications} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Packaging</label>
                                <textarea name="packaging" className="form-textarea" rows={2} defaultValue={editing?.packaging} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Status</label>
                                <select name="status" className="form-select" defaultValue={editing?.status || 'published'}>
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Product Images</label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                                    {selectedImages.map(img => (
                                        <div key={img.id} style={{ position: 'relative', aspectRatio: '1', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--gray-200)' }}>
                                            <img src={img.cloudinaryUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <button
                                                type="button"
                                                onClick={() => setSelectedImages(selectedImages.filter(i => i.id !== img.id))}
                                                style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => setShowMediaPicker(true)}
                                        style={{ aspectRatio: '1', border: '2px dashed var(--gray-200)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', color: 'var(--gray-400)', background: 'none', cursor: 'pointer' }}
                                    >
                                        <Plus size={20} />
                                        <span style={{ fontSize: '0.75rem' }}>Add</span>
                                    </button>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Table */}
            {loading ? (
                <div className="skeleton" style={{ height: '300px', borderRadius: 'var(--radius-lg)' }} />
            ) : (
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr><th>Name</th><th>Category</th><th>Status</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--gray-400)', padding: '40px' }}>No products found</td></tr>
                            ) : filtered.map(p => (
                                <tr key={p.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--gray-100)', flexShrink: 0 }}>
                                                {p.images?.[0] ? <img src={p.images[0].cloudinaryUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <ImageIcon size={20} style={{ margin: 10, color: 'var(--gray-300)' }} />}
                                            </div>
                                            <span style={{ fontWeight: 500 }}>{p.name}</span>
                                        </div>
                                    </td>
                                    <td><span className="badge badge-primary">{p.category}</span></td>
                                    <td><span className={`badge badge-${p.status === 'published' ? 'success' : p.status === 'draft' ? 'warning' : 'info'}`}>{p.status}</span></td>
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
                    allowMultiple
                    selectedIds={selectedImages.map(img => img.id)}
                    onSelectMultiple={(items) => setSelectedImages([...selectedImages, ...items.filter(item => !selectedImages.find(si => si.id === item.id))])}
                    onSelect={() => { }}
                    onClose={() => setShowMediaPicker(false)}
                />
            )}
        </div>
    );
}
