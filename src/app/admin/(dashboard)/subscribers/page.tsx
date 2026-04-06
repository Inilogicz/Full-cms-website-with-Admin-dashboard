'use client';

import { useState, useEffect } from 'react';
import { Search, Mail } from 'lucide-react';

interface Subscriber {
    id: string;
    email: string;
    active: boolean;
    createdAt: string;
}

export default function AdminSubscribersPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchSubs();
    }, []);

    function fetchSubs() {
        fetch('/api/newsletter')
            .then(res => res.json())
            .then(data => setSubscribers(data))
            .catch(() => { /* */ })
            .finally(() => setLoading(false));
    }

    const filtered = subscribers.filter(s =>
        s.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Newsletter Subscribers</h1>
                <span className="badge badge-primary" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center' }}>
                    <Mail size={14} style={{ marginRight: '6px' }} />
                    <span style={{ fontWeight: 600 }}>{subscribers.length} Subscribers</span>
                </span>
            </div>

            <div className="search-container" style={{ position: 'relative', marginBottom: '24px', maxWidth: '400px', width: '100%' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input
                    className="form-input"
                    style={{ paddingLeft: '40px' }}
                    placeholder="Search by email..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="skeleton" style={{ height: '300px', borderRadius: 'var(--radius-lg)' }} />
            ) : (
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th className="hide-mobile">Status</th>
                                <th className="hide-mobile">Subscribed Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={3} style={{ textAlign: 'center', color: 'var(--gray-400)', padding: '40px' }}>
                                        No subscribers yet
                                    </td>
                                </tr>
                            ) : (
                                filtered.map(sub => (
                                    <tr key={sub.id}>
                                        <td>
                                            <div style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{sub.email}</div>
                                            <div className="show-mobile" style={{ display: 'none', fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: '4px' }}>
                                                {new Date(sub.createdAt).toLocaleDateString()} • {sub.active !== false ? 'Active' : 'Inactive'}
                                            </div>
                                        </td>
                                        <td className="hide-mobile">
                                            <span className={`badge badge-${sub.active !== false ? 'success' : 'warning'}`}>
                                                {sub.active !== false ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="hide-mobile" style={{ fontSize: '0.8125rem', color: 'var(--gray-400)' }}>
                                            {new Date(sub.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <style jsx>{`
                @media (max-width: 640px) {
                    .hide-mobile { display: none !important; }
                    .show-mobile { display: block !important; }
                    .page-header h1 { font-size: 1.25rem !important; }
                }
            `}</style>
        </div>
    );
}
