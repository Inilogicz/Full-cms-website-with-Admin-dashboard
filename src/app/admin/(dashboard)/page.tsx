'use client';

import { useState, useEffect } from 'react';
import {
    Package,
    FileText,
    Users,
    Mail,
    TrendingUp,
    Calendar,
    ImageIcon
} from 'lucide-react';
import Skeleton from '@/components/ui/Skeleton';

interface Stats {
    products: number;
    blogPosts: number;
    events: number;
    gallery: number;
    leads: number;
    subscribers: number;
}

interface Lead {
    id: string;
    companyName: string;
    contactPerson: string;
    status: string;
    createdAt: string;
}

interface Subscriber {
    id: string;
    email: string;
    createdAt: string;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
    const [recentSubscribers, setRecentSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/dashboard/stats')
            .then(res => res.json())
            .then(data => {
                setStats(data.stats);
                setRecentLeads(data.recentLeads || []);
                setRecentSubscribers(data.recentSubscribers || []);
            })
            .catch(() => { /* handle error */ })
            .finally(() => setLoading(false));
    }, []);

    const cards = [
        { name: 'Products', value: stats?.products || 0, icon: Package, color: 'var(--primary)', bg: 'var(--primary-50)' },
        { name: 'Blog Posts', value: stats?.blogPosts || 0, icon: FileText, color: '#8b5cf6', bg: '#f5f3ff' },
        { name: 'Events', value: stats?.events || 0, icon: Calendar, color: '#f59e0b', bg: '#fffbeb' },
        { name: 'Gallery Items', value: stats?.gallery || 0, icon: ImageIcon, color: '#ec4899', bg: '#fdf2f8' },
        { name: 'Distributor Leads', value: stats?.leads || 0, icon: Users, color: '#10b981', bg: '#ecfdf5' },
        { name: 'Newsletter Subs', value: stats?.subscribers || 0, icon: Mail, color: '#3b82f6', bg: '#eff6ff' },
    ];

    if (loading) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="card" style={{ padding: '24px', height: '140px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <Skeleton width="48px" height="48px" />
                                <Skeleton width="40px" height="0.75rem" />
                            </div>
                            <Skeleton width="40%" height="0.75rem" className="mb-2" />
                            <Skeleton width="60%" height="2rem" />
                        </div>
                    ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
                    <div className="card" style={{ padding: '24px', height: '300px' }}>
                        <Skeleton width="150px" height="1.25rem" className="mb-6" />
                        {[1, 2, 3].map(i => <Skeleton key={i} height="40px" className="mb-3" />)}
                    </div>
                    <div className="card" style={{ padding: '24px', height: '300px' }}>
                        <Skeleton width="150px" height="1.25rem" className="mb-6" />
                        {[1, 2, 3].map(i => <Skeleton key={i} height="40px" className="mb-3" />)}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                {cards.map((card) => (
                    <div key={card.name} className="card" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: 'var(--radius-md)',
                                background: card.bg,
                                color: card.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <card.icon size={24} />
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-400)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                                Total <TrendingUp size={12} />
                            </span>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-500)', marginBottom: '4px' }}>{card.name}</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--gray-900)' }}>{card.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
                {/* Recent Leads */}
                <div className="card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Recent Distributor Leads</h3>
                        <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
                            <Users size={12} style={{ marginRight: '4px' }} />{stats?.leads || 0} Total
                        </span>
                    </div>
                    {Array.isArray(recentLeads) && recentLeads.length > 0 ? (
                        <table className="table" style={{ marginTop: '12px' }}>
                            <thead>
                                <tr>
                                    <th>Company</th>
                                    <th>Contact</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentLeads.map(lead => (
                                    <tr key={lead.id}>
                                        <td style={{ fontWeight: 500 }}>{lead.companyName}</td>
                                        <td>{lead.contactPerson}</td>
                                        <td><span className={`badge badge-${lead.status === 'new' ? 'info' : lead.status === 'contacted' ? 'warning' : 'success'}`}>{lead.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--gray-400)', fontSize: '0.875rem' }}>
                            No leads yet. They will appear here when distributors inquire.
                        </div>
                    )}
                </div>

                {/* Recent Subscribers */}
                <div className="card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Latest Subscribers</h3>
                        <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
                            <Mail size={12} style={{ marginRight: '4px' }} />{stats?.subscribers || 0} Total
                        </span>
                    </div>
                    {Array.isArray(recentSubscribers) && recentSubscribers.length > 0 ? (
                        <table className="table" style={{ marginTop: '12px' }}>
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Subscribed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentSubscribers.map(sub => (
                                    <tr key={sub.id}>
                                        <td>{sub.email}</td>
                                        <td style={{ fontSize: '0.8125rem', color: 'var(--gray-400)' }}>
                                            {new Date(sub.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--gray-400)', fontSize: '0.875rem' }}>
                            No subscribers yet. They will appear here when users subscribe.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
