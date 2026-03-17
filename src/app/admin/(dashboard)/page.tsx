'use client';

import { useState, useEffect } from 'react';
import {
    Package,
    FileText,
    Calendar,
    Image,
    Users,
    Mail,
    TrendingUp,
    ArrowUpRight,
} from 'lucide-react';

interface DashboardStats {
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
    email: string;
    createdAt: string;
    status: string;
}

interface Subscriber {
    id: string;
    email: string;
    createdAt: string;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
    const [recentSubscribers, setRecentSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/dashboard/stats')
            .then(r => r.json())
            .then(data => {
                setStats(data.stats);
                setRecentLeads(data.recentLeads || []);
                setRecentSubscribers(data.recentSubscribers || []);
            })
            .finally(() => setLoading(false));
    }, []);

    const statCards = [
        { label: 'Products', value: stats?.products || 0, icon: Package, color: '#0A4DA2', bg: '#E3F2FD' },
        { label: 'Blog Posts', value: stats?.blogPosts || 0, icon: FileText, color: '#1565C0', bg: '#BBDEFB' },
        { label: 'Events', value: stats?.events || 0, icon: Calendar, color: '#00B4D8', bg: '#E0F7FA' },
        { label: 'Gallery Items', value: stats?.gallery || 0, icon: Image, color: '#7C3AED', bg: '#EDE9FE' },
        { label: 'Distributor Leads', value: stats?.leads || 0, icon: Users, color: '#059669', bg: '#D1FAE5' },
        { label: 'Subscribers', value: stats?.subscribers || 0, icon: Mail, color: '#D97706', bg: '#FEF3C7' },
    ];

    if (loading) {
        return (
            <div>
                <h1 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Dashboard</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="skeleton" style={{ height: '120px', borderRadius: 'var(--radius-lg)' }} />
                    ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div className="skeleton" style={{ height: '300px', borderRadius: 'var(--radius-lg)' }} />
                    <div className="skeleton" style={{ height: '300px', borderRadius: 'var(--radius-lg)' }} />
                </div>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Dashboard</h1>
                    <p style={{ color: 'var(--gray-500)', fontSize: '0.9375rem' }}>Welcome back! Here&apos;s your platform overview.</p>
                </div>
            </div>

            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                {statCards.map((stat) => (
                    <div key={stat.label} className="card" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div style={{
                                width: 44,
                                height: 44,
                                borderRadius: 'var(--radius-md)',
                                background: stat.bg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <stat.icon size={22} style={{ color: stat.color }} />
                            </div>
                            <ArrowUpRight size={16} style={{ color: 'var(--success)' }} />
                        </div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '4px' }}>
                            {stat.value}
                        </div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)' }}>{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Activity Tables */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                {/* Recent Leads */}
                <div className="table-container">
                    <div style={{ padding: '20px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '1rem' }}>Recent Distributor Leads</h3>
                        <span className="badge badge-primary">
                            <Users size={12} style={{ marginRight: '4px' }} />{stats?.leads || 0} Total
                        </span>
                    </div>
                    {recentLeads.length > 0 ? (
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
                <div className="table-container">
                    <div style={{ padding: '20px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '1rem' }}>Recent Newsletter Subscribers</h3>
                        <span className="badge badge-primary">
                            <Mail size={12} style={{ marginRight: '4px' }} />{stats?.subscribers || 0} Total
                        </span>
                    </div>
                    {recentSubscribers.length > 0 ? (
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
