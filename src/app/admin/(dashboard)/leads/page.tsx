'use client';

import { useState, useEffect } from 'react';
import { Search, Mail, Phone, Building2, Globe } from 'lucide-react';

interface Lead {
    id: string; companyName: string; contactPerson: string; email: string;
    phone: string; country: string; distributionInterest: string; message: string;
    status: string; createdAt: string;
}

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<Lead | null>(null);

    useEffect(() => { fetchLeads(); }, []);

    function fetchLeads() {
        fetch('/api/distributor-leads')
            .then(res => res.json())
            .then(data => setLeads(data))
            .catch(() => { /* */ })
            .finally(() => setLoading(false));
    }

    const filtered = leads.filter(l =>
        l.companyName.toLowerCase().includes(search.toLowerCase()) ||
        l.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Distributor Leads</h1>
                <span className="badge badge-primary" style={{ padding: '8px 16px', fontWeight: 600 }}>{leads.length} Total Leads</span>
            </div>
            <div className="search-container" style={{ position: 'relative', marginBottom: '24px', maxWidth: '400px', width: '100%' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input className="form-input" style={{ paddingLeft: '40px' }} placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            {/* Detail Modal */}
            {selected && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setSelected(null)}>
                    <div className="card" style={{ width: '100%', maxWidth: '520px', padding: '32px' }} onClick={e => e.stopPropagation()}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Lead Details</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { icon: Building2, label: 'Company', value: selected.companyName },
                                { icon: Mail, label: 'Contact', value: `${selected.contactPerson} — ${selected.email}` },
                                { icon: Phone, label: 'Phone', value: selected.phone },
                                { icon: Globe, label: 'Country', value: selected.country || 'N/A' },
                            ].map(item => (
                                <div key={item.label} style={{ display: 'flex', gap: '12px' }}>
                                    <item.icon size={18} style={{ color: 'var(--primary)', marginTop: '2px', flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{item.label}</div>
                                        <div style={{ fontSize: '0.9375rem' }}>{item.value}</div>
                                    </div>
                                </div>
                            ))}
                            {selected.distributionInterest && <div><div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginBottom: '4px' }}>Interest</div><span className="badge badge-primary">{selected.distributionInterest}</span></div>}
                            {selected.message && <div><div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginBottom: '4px' }}>Message</div><p style={{ fontSize: '0.9375rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>{selected.message}</p></div>}
                        </div>
                        <button className="btn btn-ghost" onClick={() => setSelected(null)} style={{ marginTop: '24px', width: '100%' }}>Close</button>
                    </div>
                </div>
            )}

            {loading ? <div className="skeleton" style={{ height: '300px', borderRadius: 'var(--radius-lg)' }} /> : (
                <div className="table-container">
                    <table className="table">
                        <thead><tr><th>Company</th><th className="hide-mobile">Contact</th><th className="hide-mobile">Email</th><th className="hide-mobile">Interest</th><th className="hide-mobile">Date</th><th>Status</th></tr></thead>
                        <tbody>
                            {filtered.length === 0 ? <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--gray-400)', padding: '40px' }}>No leads found</td></tr> : filtered.map(lead => (
                                <tr key={lead.id} className="table-row" style={{ cursor: 'pointer' }} onClick={() => setSelected(lead)}>
                                    <td>
                                        <div style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{lead.companyName}</div>
                                        <div className="show-mobile" style={{ display: 'none', fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: '4px' }}>
                                            {lead.contactPerson} • {lead.distributionInterest || 'General'}
                                        </div>
                                    </td>
                                    <td className="hide-mobile">{lead.contactPerson}</td>
                                    <td className="hide-mobile" style={{ fontSize: '0.8125rem' }}>{lead.email}</td>
                                    <td className="hide-mobile"><span className="badge badge-primary">{lead.distributionInterest || 'General'}</span></td>
                                    <td className="hide-mobile" style={{ fontSize: '0.8125rem', color: 'var(--gray-400)' }}>{new Date(lead.createdAt).toLocaleDateString()}</td>
                                    <td><span className={`badge badge-${lead.status === 'new' ? 'info' : lead.status === 'contacted' ? 'warning' : 'success'}`}>{lead.status}</span></td>
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
                    .page-header h1 { font-size: 1.25rem !important; }
                }
                .table-row { transition: background 0.2s ease; }
                .table-row:hover { background: var(--gray-50); }
            `}</style>
        </div>
    );
}
