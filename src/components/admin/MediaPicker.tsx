'use client';

import { useState, useEffect } from 'react';
import { Upload, X, Check, Search, Image as ImageIcon, Video } from 'lucide-react';

interface MediaItem {
    id: string;
    cloudinaryUrl: string;
    resourceType: string;
    altText: string;
}

interface MediaPickerProps {
    onSelect: (item: MediaItem) => void;
    onClose: () => void;
    currentId?: string;
    allowMultiple?: boolean;
    selectedIds?: string[];
    onSelectMultiple?: (items: MediaItem[]) => void;
}

export default function MediaPicker({ onSelect, onClose, currentId, allowMultiple, selectedIds = [], onSelectMultiple }: MediaPickerProps) {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
    const [localSelected, setLocalSelected] = useState<MediaItem[]>([]);

    useEffect(() => {
        fetchMedia();
    }, []);

    async function fetchMedia() {
        try {
            const res = await fetch('/api/media');
            const data = await res.json();
            setMedia(data);
        } catch { }
        setLoading(false);
    }

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files?.length) return;

        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
        if (!cloudName || !uploadPreset) {
            console.error('Cloudinary is not configured');
            return;
        }

        const MAX_IMAGE_SIZE_MB = 10;
        const MAX_VIDEO_SIZE_MB = 100;
        
        const oversized = Array.from(files).filter(f => {
            const isVideo = f.type.startsWith('video/');
            const limit = isVideo ? MAX_VIDEO_SIZE_MB : MAX_IMAGE_SIZE_MB;
            return f.size > limit * 1024 * 1024;
        });

        if (oversized.length > 0) {
            alert(`Some files are too large: ${oversized.map(f => `${f.name} (${(f.size / 1024 / 1024).toFixed(1)}MB)`).join(', ')}. Maximum size is ${MAX_IMAGE_SIZE_MB}MB for images and ${MAX_VIDEO_SIZE_MB}MB for videos.`);
            e.target.value = '';
            return;
        }

        setUploading(true);
        const fileList = Array.from(files);
        setUploadProgress({ current: 1, total: fileList.length });

        const newItems: MediaItem[] = [];

        for (let i = 0; i < fileList.length; i++) {
            setUploadProgress({ current: i + 1, total: fileList.length });
            const file = fileList[i];

            try {
                // Step 1: Upload directly from browser to Cloudinary
                const cloudinaryForm = new FormData();
                cloudinaryForm.append('file', file);
                cloudinaryForm.append('upload_preset', uploadPreset);

                const isVideo = file.type.startsWith('video/');
                const endpoint = isVideo ? 'video' : 'image';

                const cloudRes = await fetch(
                    `https://api.cloudinary.com/v1_1/${cloudName}/${endpoint}/upload`,
                    { method: 'POST', body: cloudinaryForm }
                );
                if (!cloudRes.ok) {
                    const err = await cloudRes.json();
                    throw new Error(err.error?.message || 'Cloudinary upload failed');
                }
                const result = await cloudRes.json();

                // Step 2: Save metadata to DB via lightweight JSON
                const saveRes = await fetch('/api/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        cloudinaryUrl: result.secure_url,
                        publicId: result.public_id,
                        resourceType: result.resource_type || (isVideo ? 'video' : 'image'),
                        altText: file.name,
                        width: result.width,
                        height: result.height,
                        format: result.format,
                        bytes: result.bytes,
                    }),
                });
                const newItem = await saveRes.json();
                newItems.push(newItem);
            } catch (err) {
                console.error(`Upload failed for "${file.name}":`, err);
            }
        }

        setMedia(prev => [...newItems, ...prev]);

        // Auto-select in multi-mode, or select first and close in single-mode
        if (allowMultiple) {
            setLocalSelected(prev => [...prev, ...newItems]);
        } else if (newItems.length > 0) {
            onSelect(newItems[0]);
            onClose();
        }

        setUploading(false);
        setUploadProgress({ current: 0, total: 0 });
        e.target.value = '';
    }


    const filtered = media.filter(m => (m.altText || '').toLowerCase().includes(search.toLowerCase()));

    const handleItemClick = (item: MediaItem) => {
        if (!allowMultiple) {
            onSelect(item);
            onClose();
            return;
        }

        const isSelected = localSelected.find(i => i.id === item.id);
        if (isSelected) {
            setLocalSelected(localSelected.filter(i => i.id !== item.id));
        } else {
            setLocalSelected([...localSelected, item]);
        }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={onClose}>
            <div className="card" style={{ width: '100%', maxWidth: '900px', height: '80vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Select Media</h3>
                    <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={20} /></button>
                </div>

                {/* Toolbar */}
                <div style={{ padding: '16px 24px', background: 'var(--gray-50)', display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                        <input
                            className="form-input"
                            style={{ paddingLeft: '36px', height: '40px' }}
                            placeholder="Search library..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <label className="btn btn-primary" style={{ height: '40px', padding: '0 16px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <Upload size={16} /> {uploading ? `Uploading ${uploadProgress.current}/${uploadProgress.total}...` : 'Upload New'}
                        <input type="file" accept="image/*,video/*" multiple={allowMultiple} style={{ display: 'none' }} onChange={handleUpload} disabled={uploading} />
                    </label>
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                    {loading ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className="skeleton" style={{ aspectRatio: '1', borderRadius: 'var(--radius-md)' }} />
                            ))}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--gray-400)' }}>
                            <ImageIcon size={48} style={{ marginBottom: '16px', opacity: 0.2 }} />
                             <p>No media found in library</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
                            {filtered.map(item => {
                                const isSelected = allowMultiple
                                    ? localSelected.find(i => i.id === item.id)
                                    : currentId === item.id;

                                return (
                                    <div
                                        key={item.id}
                                        className="media-item"
                                        onClick={() => handleItemClick(item)}
                                        style={{
                                            aspectRatio: '1',
                                            borderRadius: 'var(--radius-lg)',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            cursor: 'pointer',
                                            border: isSelected ? '3px solid var(--primary)' : '1px solid var(--gray-200)',
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        {item.resourceType === 'video' ? (
                                            <div style={{ width: '100%', height: '100%', background: 'var(--gray-900)', position: 'relative' }}>
                                                <video
                                                    src={item.cloudinaryUrl}
                                                    muted
                                                    playsInline
                                                    loop
                                                    autoPlay
                                                    onMouseOver={e => e.currentTarget.play()}
                                                    onMouseOut={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                                <div style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    pointerEvents: 'none'
                                                }}>
                                                    <Video size={24} color="white" opacity={0.6} />
                                                </div>
                                                <div style={{ position: 'absolute', bottom: 6, left: 6, background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: '9px', padding: '1px 4px', borderRadius: '3px', fontWeight: 700 }}>
                                                    VIDEO
                                                </div>
                                            </div>
                                        ) : (
                                            <img src={item.cloudinaryUrl} alt={item.altText} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        )}
                                        {isSelected && (
                                            <div style={{ position: 'absolute', top: 8, right: 8, background: 'var(--primary)', color: 'white', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Check size={12} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer for multi-select */}
                {allowMultiple && (
                    <div style={{ padding: '16px 24px', borderTop: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                        <span style={{ marginRight: 'auto', alignSelf: 'center', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                            {localSelected.length} items selected
                        </span>
                        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                        <button
                            className="btn btn-primary"
                            disabled={localSelected.length === 0}
                            onClick={() => {
                                onSelectMultiple?.(localSelected);
                                onClose();
                            }}
                        >
                            Select {localSelected.length} Images
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
