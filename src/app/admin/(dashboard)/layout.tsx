'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const [admin, setAdmin] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/auth/session')
            .then(res => res.json())
            .then(data => {
                if (!data.authenticated) {
                    router.push('/admin/login');
                } else {
                    setAdmin(data.admin);
                }
            })
            .catch(() => router.push('/admin/login'));
    }, [router]);

    if (!admin) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading session...</div>;

    return (
        <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <header style={{ height: '64px', background: 'white', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', padding: '0 24px', justifyContent: 'space-between' }}>
                    <div style={{ fontWeight: 600 }}>Admin Dashboard</div>
                    <div style={{ fontSize: '0.875rem' }}>{admin.name} ({admin.email})</div>
                </header>
                <main style={{ flex: 1, padding: '32px' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
