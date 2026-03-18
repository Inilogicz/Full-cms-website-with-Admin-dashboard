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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.5rem' }}>Newsletter Subscribers</h1>
                <span className="badge badge-primary" style={{ padding: '8px 16px' }}>
                    <Mail size={14} style={{ marginRight: '4px' }} />
                    {subscribers.length} Subscribers
                </span>
            </div>

            <div style={{ position: 'relative', marginBottom: '20px', maxWidth: '320px' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input
                    className="form-input"
                    style={{ paddingLeft: '40px' }}
                    placeholder="Search..."
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
                                <th>Status</th>
                                <th>Subscribed Date</th>
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
                                        <td style={{ fontWeight: 500 }}>{sub.email}</td>
                                        <td>
                                            <span className={`badge badge-${sub.active !== false ? 'success' : 'warning'}`}>
                                                {sub.active !== false ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td style={{ fontSize: '0.8125rem', color: 'var(--gray-400)' }}>
                                            {new Date(sub.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
