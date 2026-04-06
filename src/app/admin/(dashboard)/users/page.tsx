'use client';

import { useState, useEffect } from 'react';
import { Search, UserPlus, Mail, Shield, Trash2, Edit2, Plus, X } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import ConfirmModal from '@/components/ui/ConfirmModal';

interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
}

export default function AdminUsersPage() {
    const { showToast } = useToast();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });

    function fetchUsers() {
        setLoading(true);
        fetch('/api/admin/users')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setUsers(data);
                else setUsers([]);
            })
            .catch(() => showToast('Failed to fetch users', 'error'))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const filtered = users.filter(u => 
        u.name.toLowerCase().includes(search.toLowerCase()) || 
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to create user');
            }

            showToast('User created successfully', 'success');
            setShowForm(false);
            setFormData({ email: '', password: '', name: '' });
            fetchUsers();
        } catch (error: any) {
            showToast(error.message, 'error');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '4px' }}>Admin Users</h1>
                    <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>Manage administrative access to the dashboard.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                    <UserPlus size={18} />
                    <span>Create Account</span>
                </button>
            </div>

            <div className="search-container" style={{ position: 'relative', marginBottom: '24px', maxWidth: '400px', width: '100%' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input 
                    className="form-input" 
                    style={{ paddingLeft: '40px' }} 
                    placeholder="Search users by name or email..." 
                    value={search} 
                    onChange={e => setSearch(e.target.value)} 
                />
            </div>

            {loading ? (
                <div className="skeleton" style={{ height: '300px', borderRadius: '20px' }} />
            ) : (
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th className="hide-mobile">Email</th>
                                <th className="hide-mobile">Created Date</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center', padding: '60px', color: 'var(--gray-400)' }}>
                                        No users found matches your search.
                                    </td>
                                </tr>
                            ) : filtered.map(user => (
                                <tr key={user.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ 
                                                width: '36px', 
                                                height: '36px', 
                                                borderRadius: '10px', 
                                                background: 'var(--primary-50)', 
                                                color: 'var(--primary)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 700,
                                                fontSize: '0.875rem'
                                            }}>
                                                {user.name[0]}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{user.name}</div>
                                                <div className="show-mobile" style={{ display: 'none', fontSize: '0.75rem', color: 'var(--gray-500)' }}>{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="hide-mobile" style={{ color: 'var(--gray-600)' }}>{user.email}</td>
                                    <td className="hide-mobile" style={{ color: 'var(--gray-500)', fontSize: '0.8125rem' }}>
                                        {new Date(user.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            <button className="btn btn-ghost btn-sm btn-icon" title="Edit" disabled><Edit2 size={14} /></button>
                                            <button className="btn btn-ghost btn-sm btn-icon" style={{ color: 'var(--error)' }} title="Delete" disabled><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Create User Modal */}
            {showForm && (
                <div style={{ 
                    position: 'fixed', 
                    inset: 0, 
                    background: 'rgba(10, 77, 162, 0.2)', 
                    backdropFilter: 'blur(8px)',
                    zIndex: 1000, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    padding: '24px' 
                }} onClick={() => !isSubmitting && setShowForm(false)}>
                    <div 
                        className="card" 
                        style={{ 
                            width: '100%', 
                            maxWidth: '440px', 
                            padding: '32px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            animation: 'modalOpen 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }} 
                        onClick={e => e.stopPropagation()}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Add New Admin</h2>
                            <button className="btn btn-ghost btn-sm btn-icon" onClick={() => setShowForm(false)} disabled={isSubmitting}>
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input 
                                    className="form-input" 
                                    required 
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter full name"
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input 
                                    type="email" 
                                    className="form-input" 
                                    required 
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="email@example.com"
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <input 
                                    type="password" 
                                    className="form-input" 
                                    required 
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Create a strong password"
                                    disabled={isSubmitting}
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-primary" 
                                style={{ width: '100%', marginTop: '32px', height: '48px', fontSize: '1rem' }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes modalOpen {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                @media (max-width: 640px) {
                    .hide-mobile { display: none !important; }
                    .show-mobile { display: block !important; }
                    .page-header h1 { font-size: 1.25rem !important; }
                }
            `}</style>
        </div>
    );
}
