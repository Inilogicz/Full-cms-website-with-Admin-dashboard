'use client';

import { useState, useEffect } from 'react';
import { Upload, X, Check, Search, Image as ImageIcon } from 'lucide-react';

interface MediaItem {
    id: string;
    cloudinaryUrl: string;
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
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('altText', file.name);

        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const newItem = await res.json();
            setMedia([newItem, ...media]);
            if (!allowMultiple) {
                onSelect(newItem);
                onClose();
            }
        } catch { }
        setUploading(false);
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
                        <Upload size={16} /> {uploading ? 'Uploading...' : 'Upload New'}
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} disabled={uploading} />
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
                            <p>No images found in library</p>
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
                                        <img src={item.cloudinaryUrl} alt={item.altText} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
