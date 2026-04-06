'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Image as ImageIcon, X } from 'lucide-react';
import MediaPicker from '@/components/admin/MediaPicker';
import ConfirmModal from '@/components/ui/ConfirmModal';

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
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => { fetchProducts(); }, []);

    function fetchProducts() {
        setLoading(true);
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
        setIsSaving(true);
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
            .catch(() => { /* */ })
            .finally(() => setIsSaving(false));
    }

    function handleDelete() {
        if (!deletingId) return;
        setIsDeleting(true);
        fetch(`/api/products/${deletingId}`, { method: 'DELETE' })
            .then(() => {
                setDeletingId(null);
                fetchProducts();
            })
            .catch(() => { /* */ })
            .finally(() => setIsDeleting(false));
    }

    const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="admin-page-container">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '16px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Products</h1>
                <button className="btn btn-primary" onClick={() => { setEditing(null); setSelectedImages([]); setShowForm(true); }}>
                    <Plus size={16} /> <span className="btn-text">Add Product</span>
                </button>
            </div>

            {/* Search */}
            <div className="search-container" style={{ position: 'relative', marginBottom: '24px', maxWidth: '400px', width: '100%' }}>
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
                                <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)} disabled={isSaving}>Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={isSaving}>
                                    {isSaving ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div className="spinner-small" />
                                            <span>Saving...</span>
                                        </div>
                                    ) : 'Save Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Product Detail Modal (for Mobile/Quick View) */}
            {selectedProduct && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setSelectedProduct(null)}>
                    <div className="card" style={{ width: '100%', maxWidth: '500px', maxHeight: '90vh', overflow: 'auto', padding: '24px' }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Product Details</h2>
                            <button className="btn btn-ghost btn-icon" onClick={() => setSelectedProduct(null)}><X size={20} /></button>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ width: '100%', aspectRatio: '16/10', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--gray-100)' }}>
                                {selectedProduct.images?.[0] ? 
                                    <img src={selectedProduct.images[0].cloudinaryUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : 
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-300)' }}><ImageIcon size={48} /></div>
                                }
                            </div>
                            
                            <div>
                                <label style={{ fontSize: '0.75rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</label>
                                <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{selectedProduct.name}</div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '24px' }}>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</label>
                                    <div><span className="badge badge-primary">{selectedProduct.category}</span></div>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</label>
                                    <div><span className={`badge badge-${selectedProduct.status === 'published' ? 'success' : 'warning'}`}>{selectedProduct.status}</span></div>
                                </div>
                            </div>
                            
                            <div>
                                <label style={{ fontSize: '0.75rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</label>
                                <p style={{ fontSize: '0.9375rem', color: 'var(--gray-600)', lineHeight: 1.6, marginTop: '4px' }}>{selectedProduct.description}</p>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { setEditing(selectedProduct); setSelectedProduct(null); setShowForm(true); }}>
                                    <Edit2 size={16} /> Edit
                                </button>
                                <button className="btn btn-outline" style={{ flex: 1, borderColor: 'var(--error)', color: 'var(--error)' }} onClick={() => { setDeletingId(selectedProduct.id); setSelectedProduct(null); }}>
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Table/Cards */}
            {loading ? (
                <div className="skeleton" style={{ height: '400px', borderRadius: 'var(--radius-lg)' }} />
            ) : (
                <>
                    {/* Desktop View */}
                    <div className="table-view" style={{ display: 'block' }}>
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr><th>Name</th><th className="hide-mobile">Category</th><th className="hide-mobile">Status</th><th>Actions</th></tr>
                                </thead>
                                <tbody>
                                    {filtered.length === 0 ? (
                                        <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--gray-400)', padding: '40px' }}>No products found</td></tr>
                                    ) : filtered.map(p => (
                                        <tr key={p.id} className="table-row">
                                            <td onClick={() => { if (window.innerWidth <= 768) setSelectedProduct(p) }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--gray-100)', flexShrink: 0 }}>
                                                        {p.images?.[0] ? <img src={p.images[0].cloudinaryUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <ImageIcon size={20} style={{ margin: 12, color: 'var(--gray-300)' }} />}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{p.name}</div>
                                                        <div className="show-mobile" style={{ fontSize: '0.75rem', color: 'var(--gray-400)', display: 'none' }}>{p.category}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="hide-mobile"><span className="badge badge-primary">{p.category}</span></td>
                                            <td className="hide-mobile"><span className={`badge badge-${p.status === 'published' ? 'success' : p.status === 'draft' ? 'warning' : 'info'}`}>{p.status}</span></td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '4px' }}>
                                                    <button className="btn btn-ghost btn-sm btn-icon" onClick={(e) => { e.stopPropagation(); setEditing(p); setShowForm(true); }}><Edit2 size={14} /></button>
                                                    <button className="btn btn-ghost btn-sm btn-icon" style={{ color: 'var(--error)' }} onClick={(e) => { e.stopPropagation(); setDeletingId(p.id); }}><Trash2 size={14} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            <ConfirmModal 
                isOpen={!!deletingId}
                title="Delete Product"
                message="Are you sure you want to delete this product? This action cannot be undone."
                onConfirm={handleDelete}
                onClose={() => setDeletingId(null)}
                confirmText="Delete"
                isLoading={isDeleting}
            />

            <style jsx>{`
                @media (max-width: 640px) {
                    .hide-mobile {
                        display: none !important;
                    }
                    .show-mobile {
                        display: block !important;
                    }
                    .btn-text {
                        display: none;
                    }
                    .btn {
                        padding: 10px !important;
                    }
                    .page-header h1 {
                        font-size: 1.25rem !important;
                    }
                }
                
                .table-row {
                    transition: background 0.2s ease;
                    cursor: pointer;
                }
                
                @media (max-width: 768px) {
                    .table-row:hover {
                        background: var(--gray-50);
                    }
                }
            `}</style>

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
