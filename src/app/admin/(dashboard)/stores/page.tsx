"use client";

import { useState, useEffect, useCallback } from 'react';
import { Plus, Edit2, Trash2, Search, Phone, Mail, MapPin } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Modal from '@/components/ui/Modal';
import { TableSkeleton } from '@/components/ui/Skeleton';

interface Store {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    phone?: string;
    email?: string;
    status: string;
    createdAt: string;
}

const NIGERIAN_STATES = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

export default function AdminStoresPage() {
    const { showToast } = useToast();
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Store | null>(null);
    const [search, setSearch] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);

    const fetchStores = useCallback(() => {
        fetch('/api/stores', {
            headers: { 'x-admin-request': 'true' }
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setStores(data);
                } else {
                    console.error('Expected array of stores, got:', data);
                    setStores([]);
                }
            })
            .catch(() => setStores([]))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => { fetchStores(); }, [fetchStores]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSaving(true);
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            status: formData.get('status'),
        };

        const url = editing ? `/api/stores/${editing.id}` : '/api/stores';
        const method = editing ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (!res.ok) throw new Error();
                showToast(`Store ${editing ? 'updated' : 'created'} successfully!`, 'success');
                setShowForm(false);
                setEditing(null);
                setIsDirty(false);
                fetchStores();
            })
            .catch(() => showToast(`Failed to ${editing ? 'update' : 'create'} store`, 'error'))
            .finally(() => setIsSaving(false));
    }

    function handleDelete() {
        if (!confirmDelete) return;
        setIsDeleting(true);
        fetch(`/api/stores/${confirmDelete}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) throw new Error();
                showToast('Store deleted successfully', 'success');
                setConfirmDelete(null);
                fetchStores();
            })
            .catch(() => showToast('Failed to delete store', 'error'))
            .finally(() => setIsDeleting(false));
    }

    const [showUnsavedModal, setShowUnsavedModal] = useState(false);

    function handleClose() {
        if (isDirty) {
            setShowUnsavedModal(true);
        } else {
            setShowForm(false);
            setEditing(null);
        }
    }

    function confirmDiscard() {
        setShowUnsavedModal(false);
        setShowForm(false);
        setEditing(null);
        setIsDirty(false);
    }

    const filtered = stores.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.state.toLowerCase().includes(search.toLowerCase()) ||
        s.city.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <ConfirmModal
                isOpen={!!confirmDelete}
                onClose={() => setConfirmDelete(null)}
                onConfirm={handleDelete}
                title="Delete Store Location"
                message="Are you sure you want to delete this store location? This action cannot be undone."
                confirmText="Delete Store"
                isLoading={isDeleting}
            />

            <ConfirmModal
                isOpen={showUnsavedModal}
                onClose={() => setShowUnsavedModal(false)}
                onConfirm={confirmDiscard}
                title="Unsaved Changes"
                message="You have unsaved changes. Are you sure you want to close without saving?"
                confirmText="Discard Changes"
                variant="warning"
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Store Locations</h1>
                <button className="btn btn-primary" onClick={() => { setEditing(null); setIsDirty(false); setShowForm(true); }}>
                    <Plus size={16} /> Add Store
                </button>
            </div>

            {/* Search */}
            <div style={{ position: 'relative', marginBottom: '20px', maxWidth: '320px', width: '100%' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input className="form-input" style={{ paddingLeft: '40px' }} placeholder="Search stores..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            {/* Form Modal */}
            <Modal
                isOpen={showForm}
                onClose={handleClose}
                title={`${editing ? 'Edit' : 'Add'} Store Location`}
                maxWidth="650px"
                closeOnOverlayClick={false}
            >
                <form onSubmit={handleSubmit} onChange={() => setIsDirty(true)}>
                    <div className="form-group">
                        <label className="form-label">Store Name *</label>
                        <div style={{ position: 'relative' }}>
                            <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                            <input name="name" className="form-input" style={{ paddingLeft: '36px' }} required defaultValue={editing?.name} placeholder="e.g. Niger Sanitary Industry Limited Lagos Outlet" />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div className="form-group">
                            <label className="form-label">State *</label>
                            <select name="state" className="form-select" required defaultValue={editing?.state}>
                                <option value="">Select State</option>
                                {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">City *</label>
                            <input name="city" className="form-input" required defaultValue={editing?.city} placeholder="e.g. Ikeja" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Full Address *</label>
                        <textarea name="address" className="form-textarea" required defaultValue={editing?.address} rows={2} placeholder="e.g. 12 Plot Road, Industrial Estate" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div className="form-group">
                            <label className="form-label">Phone Number</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                                <input name="phone" className="form-input" style={{ paddingLeft: '36px' }} defaultValue={editing?.phone} placeholder="+234..." />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                                <input name="email" type="email" className="form-input" style={{ paddingLeft: '36px' }} defaultValue={editing?.email} placeholder="store@nigersanitary.com" />
                            </div>
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

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '32px', paddingTop: '20px', borderTop: '1px solid var(--gray-100)' }}>
                        <button type="button" className="btn btn-ghost" onClick={handleClose} disabled={isSaving}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={isSaving}>
                            {isSaving ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div className="spinner-small" />
                                    <span>Saving...</span>
                                </div>
                            ) : editing ? 'Update Store' : 'Create Store'}
                        </button>
                    </div>
                </form>
            </Modal>

            <style jsx global>{`
                .spinner-small {
                    width: 16px;
                    height: 16px;
                    border: 2px solid rgba(0,0,0,0.1);
                    border-top-color: var(--primary);
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>

            {/* Table */}
            {loading ? (
                <TableSkeleton cols={5} rows={6} />
            ) : (
                <div className="table-container">
                    <table className="table" style={{ minWidth: '800px' }}>
                        <thead>
                            <tr>
                                <th>Store Details</th>
                                <th>Location</th>
                                <th>Contact</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--gray-400)', padding: '40px' }}>No stores found</td></tr>
                            ) : filtered.map(s => (
                                <tr key={s.id}>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            <span style={{ fontWeight: 700, color: 'var(--primary-dark)' }}>{s.name}</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.address}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                            <span style={{ fontWeight: 600 }}>{s.city}</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{s.state} State</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            {s.phone && <span style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={12} color="var(--gray-400)" /> {s.phone}</span>}
                                            {s.email && <span style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={12} color="var(--gray-400)" /> {s.email}</span>}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge badge-${s.status === 'published' ? 'success' : s.status === 'draft' ? 'warning' : 'info'}`} style={{ textTransform: 'capitalize' }}>
                                            {s.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button className="btn btn-ghost btn-sm" onClick={() => { setEditing(s); setIsDirty(false); setShowForm(true); }}><Edit2 size={14} /></button>
                                            <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }} onClick={() => setConfirmDelete(s.id)}><Trash2 size={14} /></button>
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
