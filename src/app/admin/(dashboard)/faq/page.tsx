'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

interface FAQ { id: string; question: string; answer: string; category: string; order: number; }

export default function AdminFAQPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<FAQ | null>(null);
    const [search, setSearch] = useState('');

    useEffect(() => { fetchFAQs(); }, []);

    function fetchFAQs() {
        fetch('/api/faq')
            .then(res => res.json())
            .then(data => setFaqs(data))
            .catch(() => { /* */ })
            .finally(() => setLoading(false));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const data = {
            question: fd.get('question'),
            answer: fd.get('answer'),
            category: fd.get('category'),
            order: parseInt(fd.get('order') as string || '0'),
        };
        const url = editing ? `/api/faq/${editing.id}` : '/api/faq';
        fetch(url, {
            method: editing ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(() => {
                setShowForm(false);
                setEditing(null);
                fetchFAQs();
            })
            .catch(() => { /* */ });
    }

    function handleDelete(id: string) {
        if (!confirm('Delete this FAQ?')) return;
        fetch(`/api/faq/${id}`, { method: 'DELETE' })
            .then(() => fetchFAQs())
            .catch(() => { /* */ });
    }

    const filtered = faqs.filter(f => f.question.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.5rem' }}>FAQ Management</h1>
                <button className="btn btn-primary" onClick={() => { setEditing(null); setShowForm(true); }}><Plus size={16} /> Add FAQ</button>
            </div>
            <div style={{ position: 'relative', marginBottom: '20px', maxWidth: '320px' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input className="form-input" style={{ paddingLeft: '40px' }} placeholder="Search FAQs..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            {showForm && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowForm(false)}>
                    <div className="card" style={{ width: '100%', maxWidth: '600px', padding: '32px' }} onClick={e => e.stopPropagation()}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>{editing ? 'Edit' : 'Add'} FAQ</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group"><label className="form-label">Question *</label><input name="question" className="form-input" required defaultValue={editing?.question} /></div>
                            <div className="form-group"><label className="form-label">Answer *</label><textarea name="answer" className="form-textarea" required rows={4} defaultValue={editing?.answer} /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className="form-group"><label className="form-label">Category *</label>
                                    <select name="category" className="form-select" required defaultValue={editing?.category}>
                                        <option value="">Select</option><option value="Products">Products</option><option value="Distribution">Distribution</option><option value="Quality & Safety">Quality & Safety</option><option value="Company">Company</option>
                                    </select>
                                </div>
                                <div className="form-group"><label className="form-label">Order</label><input name="order" type="number" className="form-input" defaultValue={editing?.order || 0} /></div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save FAQ</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {loading ? <div className="skeleton" style={{ height: '300px', borderRadius: 'var(--radius-lg)' }} /> : (
                <div className="table-container">
                    <table className="table">
                        <thead><tr><th>Question</th><th>Category</th><th>Order</th><th>Actions</th></tr></thead>
                        <tbody>
                            {filtered.length === 0 ? <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--gray-400)', padding: '40px' }}>No FAQs</td></tr> : filtered.map(faq => (
                                <tr key={faq.id}>
                                    <td style={{ fontWeight: 500, maxWidth: '400px' }}>{faq.question}</td>
                                    <td><span className="badge badge-primary">{faq.category}</span></td>
                                    <td>{faq.order}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button className="btn btn-ghost btn-sm" onClick={() => { setEditing(faq); setShowForm(true); }}><Edit2 size={14} /></button>
                                            <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }} onClick={() => handleDelete(faq.id)}><Trash2 size={14} /></button>
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
