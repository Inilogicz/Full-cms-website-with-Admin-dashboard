'use client';

import { useState, useEffect } from 'react';
import { Upload, Trash2, Image as ImageIcon, Search, Copy, Check } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import ConfirmModal from '@/components/ui/ConfirmModal';

interface MediaItem {
    id: string; cloudinaryUrl: string; publicId: string; altText: string;
    width: number; height: number; format: string; bytes: number; uploadedAt: string;
}

export default function AdminMediaPage() {
    const { showToast } = useToast();
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
    const [search, setSearch] = useState('');
    const [copied, setCopied] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => { fetchMedia(); }, []);

    function fetchMedia() {
        setLoading(true);
        fetch('/api/media')
            .then(res => res.json())
            .then(data => setMedia(data))
            .catch(() => showToast('Failed to fetch media', 'error'))
            .finally(() => setLoading(false));
    }

    function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files?.length) return;
        
        setUploading(true);
        setUploadProgress({ current: 1, total: files.length });

        const fileList = Array.from(files);
        const uploadNext = (index: number) => {
            if (index >= fileList.length) {
                setUploading(false);
                setUploadProgress({ current: 0, total: 0 });
                showToast(`Successfully uploaded ${fileList.length} image(s)`, 'success');
                fetchMedia();
                e.target.value = '';
                return;
            }

            setUploadProgress({ current: index + 1, total: fileList.length });

            const formData = new FormData();
            formData.append('file', fileList[index]);
            formData.append('altText', fileList[index].name);

            fetch('/api/upload', { method: 'POST', body: formData })
                .then(() => uploadNext(index + 1))
                .catch(() => {
                    showToast(`Failed to upload ${fileList[index].name}`, 'error');
                    uploadNext(index + 1);
                });
        };

        uploadNext(0);
    }

    function handleDelete() {
        if (!deletingId) return;
        setIsDeleting(true);
        fetch(`/api/media/${deletingId}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) throw new Error();
                showToast('Image deleted successfully', 'success');
                setDeletingId(null);
                fetchMedia();
            })
            .catch(() => showToast('Failed to delete image', 'error'))
            .finally(() => setIsDeleting(false));
    }

    function copyUrl(url: string, id: string) {
        navigator.clipboard.writeText(url);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    }

    function formatBytes(bytes: number) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    const filtered = media.filter(m => (m.altText || '').toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.5rem' }}>Media Manager</h1>
                <label className="btn btn-primary" style={{ cursor: 'pointer' }}>
                    <Upload size={16} /> {uploading ? `Uploading ${uploadProgress.current}/${uploadProgress.total}...` : 'Upload Images'}
                    <input type="file" accept="image/*" multiple onChange={handleUpload} style={{ display: 'none' }} disabled={uploading} />
                </label>
            </div>

            <div style={{ position: 'relative', marginBottom: '20px', maxWidth: '320px' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input className="form-input" style={{ paddingLeft: '40px' }} placeholder="Search media..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                    {Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton" style={{ aspectRatio: '1', borderRadius: 'var(--radius-lg)' }} />)}
                </div>
            ) : filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--gray-400)' }}>
                    <ImageIcon size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
                    <p>No media files. Upload images to get started.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                    {filtered.map(item => (
                        <div key={item.id} className="card" style={{ overflow: 'hidden' }}>
                            <div style={{ aspectRatio: '1', position: 'relative', background: 'var(--gray-100)' }}>
                                <img src={item.cloudinaryUrl} alt={item.altText || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '12px 16px' }}>
                                <p style={{ fontSize: '0.8125rem', fontWeight: 500, marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.altText || item.publicId}</p>
                                <p style={{ fontSize: '0.6875rem', color: 'var(--gray-400)' }}>
                                    {item.width}×{item.height} · {item.format?.toUpperCase()} · {formatBytes(item.bytes || 0)}
                                </p>
                                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                    <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => copyUrl(item.cloudinaryUrl, item.id)}>
                                        {copied === item.id ? <><Check size={12} /> Copied</> : <><Copy size={12} /> URL</>}
                                    </button>
                                    <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }} onClick={() => setDeletingId(item.id)}>
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ConfirmModal 
                isOpen={!!deletingId}
                title="Delete Media"
                message="Are you sure you want to delete this image? This action cannot be undone and will remove it from Cloudinary and the database."
                onConfirm={handleDelete}
                onClose={() => setDeletingId(null)}
                confirmText="Delete"
                isLoading={isDeleting}
            />
        </div>
    );
}
