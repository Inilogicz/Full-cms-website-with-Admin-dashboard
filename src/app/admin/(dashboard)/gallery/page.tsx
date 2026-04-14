'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Search, Image as ImageIcon, X } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Skeleton from '@/components/ui/Skeleton';

interface GalleryItem {
    id: string;
    caption?: string;
    category?: string;
    imageUrl: string;
    publicId?: string;
}

export default function AdminGalleryPage() {
    const { showToast } = useToast();
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState('');
    const [uploading, setUploading] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    function fetchItems() {
        setLoading(true);
        fetch('/api/gallery')
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(() => showToast('Failed to fetch gallery items', 'error'))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        if (!showForm && previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
    }, [showForm, previewUrl]);

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
            showToast('Please select an image file', 'warning');
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
                showToast('Image added to gallery successfully!', 'success');
                setShowForm(false);
                fetchItems();
            })
            .catch(err => {
                console.error('Error:', err);
                showToast(err.message || 'An error occurred during upload', 'error');
            })
            .finally(() => {
                setUploading(false);
            });
    }

    function handleDelete() {
        if (!confirmDelete) return;
        setIsDeleting(true);
        fetch(`/api/gallery/${confirmDelete}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) throw new Error();
                showToast('Gallery item removed', 'success');
                setConfirmDelete(null);
                fetchItems();
            })
            .catch(() => showToast('Failed to remove item', 'error'))
            .finally(() => setIsDeleting(false));
    }

    const filtered = items.filter(i => (i.caption || '').toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <ConfirmModal
                isOpen={!!confirmDelete}
                onClose={() => setConfirmDelete(null)}
                onConfirm={handleDelete}
                title="Remove Gallery Item"
                message="Are you sure you want to remove this image from the gallery? This action cannot be undone."
                confirmText="Remove Item"
                isLoading={isDeleting}
            />
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Gallery Management</h1>
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                    <Plus size={16} /> <span className="btn-text">Add Image</span>
                </button>
            </div>

            <div className="search-container" style={{ position: 'relative', marginBottom: '24px', maxWidth: '400px', width: '100%' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input className="form-input" style={{ paddingLeft: '40px' }} placeholder="Search caption..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <style jsx>{`
                @media (max-width: 640px) {
                    .btn-text { display: none; }
                    .btn { padding: 10px !important; }
                    .page-header h1 { font-size: 1.25rem !important; }
                }
            `}</style>

            {showForm && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => !uploading && setShowForm(false)}>
                    <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '32px', position: 'relative', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
                        {uploading && (
                            <div style={{ 
                                position: 'absolute', 
                                inset: 0, 
                                background: 'rgba(255,255,255,0.9)', 
                                zIndex: 10, 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                backdropFilter: 'blur(4px)'
                            }}>
                                <div className="spinner-large" style={{ marginBottom: '20px' }} />
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', margin: 0 }}>Uploading Image...</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginTop: '8px' }}>Please wait while we process your request</p>
                            </div>
                        )}
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Add to Gallery</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Image File *</label>
                                <div 
                                    onClick={() => !uploading && document.getElementById('file-input')?.click()}
                                    style={{ 
                                        width: '100%', 
                                        aspectRatio: '16/9', 
                                        border: '2px dashed var(--gray-200)', 
                                        borderRadius: 'var(--radius-lg)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: uploading ? 'not-allowed' : 'pointer',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        background: 'var(--gray-50)',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {previewUrl ? (
                                        <>
                                            <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            {uploading && (
                                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <div className="spinner-medium" style={{ borderTopColor: 'white' }} />
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div style={{ textAlign: 'center', padding: '20px' }}>
                                            <ImageIcon size={32} style={{ color: 'var(--gray-300)', marginBottom: '8px' }} />
                                            <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Click to select image</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: '4px' }}>PNG, JPG or WebP (Max 5MB)</div>
                                        </div>
                                    )}
                                </div>
                                <input 
                                    id="file-input"
                                    name="file"
                                    type="file" 
                                    accept="image/*" 
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            if (previewUrl) URL.revokeObjectURL(previewUrl);
                                            setPreviewUrl(URL.createObjectURL(file));
                                        }
                                    }}
                                    style={{ display: 'none' }}
                                    disabled={uploading} 
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Caption</label>
                                <input name="caption" className="form-input" disabled={uploading} placeholder="Enter a brief description..." />
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
                                <button type="submit" className="btn btn-primary" disabled={uploading || !previewUrl} style={{ minWidth: '120px' }}>
                                    {uploading ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div className="spinner-small" />
                                            <span>Uploading...</span>
                                        </div>
                                    ) : 'Upload & Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                            <Skeleton height="200px" borderRadius="0" />
                            <div style={{ padding: '16px' }}>
                                <Skeleton width="40%" height="0.75rem" className="mb-2" />
                                <Skeleton width="80%" height="1rem" />
                            </div>
                        </div>
                    ))}
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
                                    onClick={() => setConfirmDelete(item.id)}
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
