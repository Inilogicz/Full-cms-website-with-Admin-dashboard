'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Calendar, Image as ImageIcon, X, MapPin } from 'lucide-react';
import MediaPicker from '@/components/admin/MediaPicker';
import { useToast } from '@/context/ToastContext';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { TableSkeleton } from '@/components/ui/Skeleton';

interface Media {
    id: string;
    cloudinaryUrl: string;
    altText?: string;
}

interface Event {
    id: string;
    title: string;
    description: string;
    eventDate: string;
    location?: string;
    category?: string;
    status: string;
    images?: Media[];
}

export default function AdminEventsPage() {
    const { showToast } = useToast();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Event | null>(null);
    const [search, setSearch] = useState('');
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [selectedImages, setSelectedImages] = useState<Media[]>([]);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    function fetchEvents() {
        setLoading(true);
        fetch('/api/events')
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(() => showToast('Failed to fetch events', 'error'))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (editing) {
            setSelectedImages(editing.images || []);
        } else {
            setSelectedImages([]);
        }
    }, [editing, showForm]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const data = {
            title: fd.get('title'),
            description: fd.get('description'),
            eventDate: fd.get('eventDate'),
            location: fd.get('location'),
            category: fd.get('category'),
            status: fd.get('status'),
            imageIds: selectedImages.map(img => img.id),
        };

        const url = editing ? `/api/events/${editing.id}` : '/api/events';
        const method = editing ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (!res.ok) throw new Error();
                showToast(`Event ${editing ? 'updated' : 'created'} successfully!`, 'success');
                setShowForm(false);
                setEditing(null);
                fetchEvents();
            })
            .catch(() => showToast(`Failed to ${editing ? 'update' : 'create'} event`, 'error'));
    }

    function handleDelete() {
        if (!confirmDelete) return;
        setIsDeleting(true);
        fetch(`/api/events/${confirmDelete}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) throw new Error();
                showToast('Event deleted successfully', 'success');
                setConfirmDelete(null);
                fetchEvents();
            })
            .catch(() => showToast('Failed to delete event', 'error'))
            .finally(() => setIsDeleting(false));
    }

    const filtered = events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <ConfirmModal
                isOpen={!!confirmDelete}
                onClose={() => setConfirmDelete(null)}
                onConfirm={handleDelete}
                title="Delete Event"
                message="Are you sure you want to delete this event? This action cannot be undone."
                confirmText="Delete Event"
                isLoading={isDeleting}
            />
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Events</h1>
                <button className="btn btn-primary" onClick={() => { setEditing(null); setSelectedImages([]); setShowForm(true); }}>
                    <Plus size={16} /> <span className="btn-text">New Event</span>
                </button>
            </div>

            <div className="search-container" style={{ position: 'relative', marginBottom: '24px', maxWidth: '400px', width: '100%' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input className="form-input" style={{ paddingLeft: '40px' }} placeholder="Search events..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            {showForm && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowForm(false)}>
                    <div className="card" style={{ width: '100%', maxWidth: '600px', maxHeight: '85vh', overflow: 'auto', padding: '32px' }} onClick={e => e.stopPropagation()}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>{editing ? 'Edit' : 'New'} Event</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Event Title *</label>
                                <input name="title" className="form-input" required defaultValue={editing?.title} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className="form-group">
                                    <label className="form-label">Date *</label>
                                    <input name="eventDate" type="date" className="form-input" required defaultValue={editing?.eventDate?.split('T')[0]} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Location</label>
                                    <input name="location" className="form-input" defaultValue={editing?.location} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Category</label>
                                <select name="category" className="form-select" defaultValue={editing?.category}>
                                    <option value="Standard">Standard</option>
                                    <option value="CSR">CSR</option>
                                    <option value="Product Launch">Product Launch</option>
                                    <option value="Community">Community</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Description *</label>
                                <textarea name="description" className="form-textarea" required rows={4} defaultValue={editing?.description} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Event Images</label>
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

                            <div className="form-group">
                                <label className="form-label">Status</label>
                                <select name="status" className="form-select" defaultValue={editing?.status || 'published'}>
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '32px' }}>
                                <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Event</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Event Detail Modal */}
            {selectedEvent && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setSelectedEvent(null)}>
                    <div className="card" style={{ width: '100%', maxWidth: '500px', maxHeight: '90vh', overflow: 'auto', padding: '24px' }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Event Details</h2>
                            <button className="btn btn-ghost btn-icon" onClick={() => setSelectedEvent(null)}><X size={20} /></button>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ width: '100%', aspectRatio: '16/10', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--gray-100)' }}>
                                {selectedEvent.images?.[0] ? 
                                    <img src={selectedEvent.images[0].cloudinaryUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : 
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-300)' }}><ImageIcon size={48} /></div>
                                }
                            </div>
                            
                            <div>
                                <label style={{ fontSize: '0.75rem', color: 'var(--gray-400)', textTransform: 'uppercase' }}>Title</label>
                                <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{selectedEvent.title}</div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: 'var(--gray-400)', textTransform: 'uppercase' }}>Date</label>
                                    <div style={{ fontSize: '0.9375rem' }}>{new Date(selectedEvent.eventDate).toLocaleDateString()}</div>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: 'var(--gray-400)', textTransform: 'uppercase' }}>Status</label>
                                    <div><span className={`badge badge-${selectedEvent.status === 'published' ? 'success' : 'warning'}`}>{selectedEvent.status}</span></div>
                                </div>
                            </div>

                            <div>
                                <label style={{ fontSize: '0.75rem', color: 'var(--gray-400)', textTransform: 'uppercase' }}>Location</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9375rem' }}>
                                    <MapPin size={16} className="text-primary" /> {selectedEvent.location || 'N/A'}
                                </div>
                            </div>
                            
                            <div>
                                <label style={{ fontSize: '0.75rem', color: 'var(--gray-400)', textTransform: 'uppercase' }}>Description</label>
                                <p style={{ fontSize: '0.9375rem', color: 'var(--gray-600)', lineHeight: 1.6, marginTop: '4px' }}>{selectedEvent.description}</p>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { setEditing(selectedEvent); setSelectedEvent(null); setShowForm(true); }}>
                                    <Edit2 size={16} /> Edit
                                </button>
                                <button className="btn btn-outline" style={{ flex: 1, borderColor: 'var(--error)', color: 'var(--error)' }} onClick={() => { setConfirmDelete(selectedEvent.id); setSelectedEvent(null); }}>
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {loading ? (
                <TableSkeleton cols={5} rows={6} />
            ) : (
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr><th>Event</th><th className="hide-mobile">Date</th><th className="hide-mobile">Location</th><th className="hide-mobile">Status</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--gray-400)', padding: '40px' }}>No events found</td></tr>
                            ) : filtered.map(evt => (
                                <tr key={evt.id} className="table-row" onClick={() => { if (window.innerWidth <= 768) setSelectedEvent(evt) }}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--gray-100)', flexShrink: 0 }}>
                                                {evt.images?.[0] ? <img src={evt.images[0].cloudinaryUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Calendar size={20} style={{ margin: 12, color: 'var(--gray-300)' }} />}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{evt.title}</div>
                                                <div className="show-mobile" style={{ fontSize: '0.75rem', color: 'var(--gray-400)', display: 'none' }}>{new Date(evt.eventDate).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="hide-mobile">{new Date(evt.eventDate).toLocaleDateString()}</td>
                                    <td className="hide-mobile"><div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8125rem' }}><MapPin size={12} /> {evt.location || 'N/A'}</div></td>
                                    <td className="hide-mobile"><span className={`badge badge-${evt.status === 'published' ? 'success' : evt.status === 'draft' ? 'warning' : 'info'}`}>{evt.status}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <button className="btn btn-ghost btn-sm btn-icon" onClick={(e) => { e.stopPropagation(); setEditing(evt); setShowForm(true); }}><Edit2 size={14} /></button>
                                            <button className="btn btn-ghost btn-sm btn-icon" style={{ color: 'var(--error)' }} onClick={(e) => { e.stopPropagation(); setConfirmDelete(evt.id); }}><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <style jsx>{`
                @media (max-width: 640px) {
                    .hide-mobile { display: none !important; }
                    .show-mobile { display: block !important; }
                    .btn-text { display: none; }
                    .btn { padding: 10px !important; }
                    .page-header h1 { font-size: 1.25rem !important; }
                }
                .table-row { transition: background 0.2s ease; cursor: pointer; }
                @media (max-width: 768px) {
                    .table-row:hover { background: var(--gray-50); }
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
