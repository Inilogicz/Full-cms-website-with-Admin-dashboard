'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    LayoutDashboard,
    Package,
    FileText,
    Calendar,
    ImageIcon,
    Users,
    Mail,
    HelpCircle,
    Upload,
    LogOut,
    Menu,
    X,
    ChevronLeft,
    Bell,
    Settings,
    MapPin,
} from 'lucide-react';

const sidebarLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Blog', href: '/admin/blog', icon: FileText },
    { name: 'Events', href: '/admin/events', icon: Calendar },
    { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
    { name: 'Distributor Leads', href: '/admin/leads', icon: Users },
    { name: 'Subscribers', href: '/admin/subscribers', icon: Mail },
    { name: 'Media Manager', href: '/admin/media', icon: Upload },
    { name: 'Stores', href: '/admin/stores', icon: MapPin },
    { name: 'FAQ', href: '/admin/faq', icon: HelpCircle },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [admin, setAdmin] = useState<{ name: string; email: string } | null>(null);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        fetch('/api/auth/session')
            .then(r => r.json())
            .then(data => {
                if (!data.authenticated) router.push('/admin/login');
                else setAdmin(data.admin);
            })
            .catch(() => router.push('/admin/login'));
    }, [router]);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    function handleLogout() {
        fetch('/api/auth/logout', { method: 'POST' })
            .then(() => router.push('/admin/login'))
            .catch(() => router.push('/admin/login'));
    }

    if (!admin) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-50)' }}>
                <div className="skeleton" style={{ width: 200, height: 24 }} />
            </div>
        );
    }

    const SIDEBAR_WIDTH = collapsed ? '80px' : '280px';

    return (
        <div style={{ minHeight: '100vh', background: 'var(--gray-50)', display: 'flex' }}>
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 140,
                        display: 'block',
                    }}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
                style={{
                    width: SIDEBAR_WIDTH,
                    background: 'var(--white)',
                    borderRight: '1px solid var(--gray-200)',
                    position: 'fixed',
                    height: '100vh',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 150,
                    display: 'flex',
                    flexDirection: 'column',
                    left: 0,
                }}
            >
                {/* Logo Area */}
                <div style={{
                    padding: '0 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    height: '72px',
                    borderBottom: '1px solid var(--gray-100)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                        <Image src="/logo.png" alt="Logo" width={32} height={32} style={{ borderRadius: 'var(--radius-md)', flexShrink: 0 }} />
                        {!collapsed && (
                            <span style={{ fontWeight: 800, fontSize: '1.125rem', whiteSpace: 'nowrap', letterSpacing: '-0.02em' }}>
                                Niger<span style={{ color: 'var(--gold)' }}>Admin</span>
                            </span>
                        )}
                    </div>
                </div>

                {/* Nav Links */}
                <div
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '24px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                    }}
                >
                    {sidebarLinks.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="nav-link"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '14px',
                                    padding: '12px 14px',
                                    borderRadius: 'var(--radius-md)',
                                    color: active ? 'var(--primary)' : 'var(--gray-500)',
                                    background: active ? 'var(--primary-50)' : 'transparent',
                                    transition: 'all 0.2s ease',
                                    textDecoration: 'none',
                                    fontWeight: active ? 600 : 500,
                                    fontSize: '0.9375rem',
                                    position: 'relative',
                                }}
                            >
                                <link.icon size={20} style={{ flexShrink: 0 }} />
                                {!collapsed && <span>{link.name}</span>}
                                {active && !collapsed && (
                                    <div style={{ position: 'absolute', right: '12px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }} />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom Actions */}
                <div style={{ padding: '16px 12px', borderTop: '1px solid var(--gray-100)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="sidebar-toggle-btn"
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: collapsed ? 'center' : 'flex-start',
                            gap: '12px',
                            padding: '10px 14px',
                            background: 'var(--gray-50)',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--gray-500)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <ChevronLeft size={20} style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }} />
                        {!collapsed && <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Collapse Menu</span>}
                    </button>

                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: collapsed ? 'center' : 'flex-start',
                            gap: '12px',
                            padding: '10px 14px',
                            background: 'none',
                            border: 'none',
                            color: 'var(--error)',
                            cursor: 'pointer',
                            borderRadius: 'var(--radius-md)',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                    >
                        <LogOut size={20} />
                        {!collapsed && <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div style={{
                flex: 1,
                marginLeft: SIDEBAR_WIDTH,
                transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0, // Prevent flex items from overflowing
            }} className="main-content-wrapper">
                {/* Dashboard Header */}
                <header style={{
                    height: '72px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(8px)',
                    borderBottom: '1px solid var(--gray-100)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 24px',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="mobile-hamburger"
                            style={{
                                display: 'none', // Shown via CSS
                                background: 'none',
                                border: 'none',
                                color: 'var(--gray-600)',
                                cursor: 'pointer',
                                padding: '8px',
                                borderRadius: 'var(--radius-md)',
                            }}
                        >
                            <Menu size={24} />
                        </button>
                        <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--gray-900)' }}>
                            {sidebarLinks.find(l => l.href === pathname)?.name || 'Dashboard'}
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <button style={{ background: 'none', border: 'none', color: 'var(--gray-400)', cursor: 'pointer', position: 'relative' }}>
                            <Bell size={20} />
                            <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--error)', border: '2px solid var(--white)' }} />
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '20px', borderLeft: '1px solid var(--gray-100)' }}>
                            <div style={{ textAlign: 'right', display: 'none' }} className="admin-profile-info">
                                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--gray-900)' }}>{admin.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>Admin Account</div>
                            </div>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                background: 'var(--primary)',
                                color: 'var(--white)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                boxShadow: '0 4px 12px rgba(10, 77, 162, 0.2)',
                            }}>
                                {admin.name[0]}
                            </div>
                        </div>
                    </div>
                </header>

                <main style={{ flex: 1, padding: '32px' }}>
                    <div className="admin-container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                        {children}
                    </div>
                </main>
            </div>

            <style jsx global>{`
                @media (max-width: 1024px) {
                    .admin-sidebar {
                        transform: translateX(-100%);
                        width: 280px !important;
                    }
                    .admin-sidebar.mobile-open {
                        transform: translateX(0);
                    }
                    .main-content-wrapper {
                        margin-left: 0 !important;
                    }
                    .mobile-hamburger {
                        display: block !important;
                    }
                }
                
                @media (min-width: 1025px) {
                    .admin-profile-info {
                        display: block !important;
                    }
                }

                .nav-link:hover {
                    background: var(--gray-50) !important;
                    transform: translateX(4px);
                }
                
                .nav-link.active {
                    background: var(--primary-50) !important;
                }
                
                .sidebar-toggle-btn:hover {
                    background: var(--gray-100) !important;
                    color: var(--gray-900) !important;
                }
            `}</style>
        </div>
    );
}
