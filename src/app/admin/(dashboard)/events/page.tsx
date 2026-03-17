'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

interface Event { id: string; title: string; description: string; eventDate: string; location: string; category: string; status: string; }

export default function AdminEventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Event | null>(null);
    const [search, setSearch] = useState('');

    useEffect(() => { fetchEvents(); }, []);

    async function fetchEvents() {
        try { const res = await fetch('/api/events'); setEvents(await res.json()); } catch { }
        setLoading(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const data = { title: fd.get('title'), description: fd.get('description'), eventDate: fd.get('eventDate'), location: fd.get('location'), category: fd.get('category'), status: fd.get('status') };
        const url = editing ? `/api/events/${editing.id}` : '/api/events';
        await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        setShowForm(false); setEditing(null); fetchEvents();
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete?')) return;
        await fetch(`/api/events/${id}`, { method: 'DELETE' }); fetchEvents();
    }

    const filtered = events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.5rem' }}>Events</h1>
                <button className="btn btn-primary" onClick={() => { setEditing(null); setShowForm(true); }}><Plus size={16} /> Add Event</button>
            </div>
            <div style={{ position: 'relative', marginBottom: '20px', maxWidth: '320px' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input className="form-input" style={{ paddingLeft: '40px' }} placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            {showForm && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowForm(false)}>
                    <div className="card" style={{ width: '100%', maxWidth: '600px', maxHeight: '80vh', overflow: 'auto', padding: '32px' }} onClick={e => e.stopPropagation()}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>{editing ? 'Edit' : 'Add'} Event</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group"><label className="form-label">Title *</label><input name="title" className="form-input" required defaultValue={editing?.title} /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className="form-group"><label className="form-label">Date *</label><input name="eventDate" type="date" className="form-input" required defaultValue={editing?.eventDate?.split('T')[0]} /></div>
                                <div className="form-group"><label className="form-label">Location</label><input name="location" className="form-input" defaultValue={editing?.location} /></div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Category</label>
                                <select name="category" className="form-select" defaultValue={editing?.category}>
                                    <option value="CSR">CSR</option><option value="Product Launch">Product Launch</option><option value="Health Campaign">Health Campaign</option><option value="Milestone">Milestone</option>
                                </select>
                            </div>
                            <div className="form-group"><label className="form-label">Description *</label><textarea name="description" className="form-textarea" required rows={4} defaultValue={editing?.description} /></div>
                            <div className="form-group"><label className="form-label">Status</label>
                                <select name="status" className="form-select" defaultValue={editing?.status || 'published'}><option value="published">Published</option><option value="archived">Archived</option></select>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Event</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {loading ? <div className="skeleton" style={{ height: '300px', borderRadius: 'var(--radius-lg)' }} /> : (
                <div className="table-container">
                    <table className="table">
                        <thead><tr><th>Title</th><th>Date</th><th>Location</th><th>Category</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {filtered.length === 0 ? <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--gray-400)', padding: '40px' }}>No events</td></tr> : filtered.map(ev => (
                                <tr key={ev.id}>
                                    <td style={{ fontWeight: 500 }}>{ev.title}</td>
                                    <td style={{ fontSize: '0.8125rem' }}>{new Date(ev.eventDate).toLocaleDateString()}</td>
                                    <td>{ev.location || '—'}</td>
                                    <td><span className="badge badge-primary">{ev.category}</span></td>
                                    <td><span className={`badge badge-${ev.status === 'published' ? 'success' : 'info'}`}>{ev.status}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button className="btn btn-ghost btn-sm" onClick={() => { setEditing(ev); setShowForm(true); }}><Edit2 size={14} /></button>
                                            <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }} onClick={() => handleDelete(ev.id)}><Trash2 size={14} /></button>
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
