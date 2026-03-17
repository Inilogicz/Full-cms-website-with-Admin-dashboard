'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    FileText,
    Calendar,
    Image,
    Users,
    Mail,
    HelpCircle,
    Upload,
    LogOut,
    Menu,
    X,
    ChevronLeft,
    Bell,
} from 'lucide-react';

const sidebarLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
    { name: 'Events', href: '/admin/events', icon: Calendar },
    { name: 'Gallery', href: '/admin/gallery', icon: Image },
    { name: 'FAQ', href: '/admin/faq', icon: HelpCircle },
    { name: 'Leads', href: '/admin/leads', icon: Users },
    { name: 'Subscribers', href: '/admin/subscribers', icon: Mail },
    { name: 'Media Manager', href: '/admin/media', icon: Upload },
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

    async function handleLogout() {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
    }

    if (!admin) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-50)' }}>
                <div className="skeleton" style={{ width: 200, height: 24 }} />
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--gray-50)' }}>
            {/* Sidebar */}
            <aside style={{
                width: collapsed ? '72px' : '260px',
                background: 'var(--white)',
                borderRight: '1px solid var(--gray-100)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'width var(--transition-base)',
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                zIndex: 100,
                overflow: 'hidden',
            }} className="admin-sidebar">
                {/* Logo */}
                <div style={{
                    padding: collapsed ? '20px 16px' : '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderBottom: '1px solid var(--gray-100)',
                    minHeight: '72px',
                }}>
                    <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 900,
                        fontSize: '0.8125rem',
                        flexShrink: 0,
                    }}>
                        NS
                    </div>
                    {!collapsed && (
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--gray-900)' }}>Niger Sanitary</div>
                            <div style={{ fontSize: '0.6875rem', color: 'var(--gray-400)' }}>Admin Panel</div>
                        </div>
                    )}
                </div>

                {/* Nav Links */}
                <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: collapsed ? '12px 16px' : '10px 16px',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.875rem',
                                    fontWeight: isActive ? 600 : 400,
                                    color: isActive ? 'var(--primary)' : 'var(--gray-600)',
                                    background: isActive ? 'var(--primary-50)' : 'transparent',
                                    marginBottom: '2px',
                                    transition: 'all var(--transition-fast)',
                                    textDecoration: 'none',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <link.icon size={20} style={{ flexShrink: 0 }} />
                                {!collapsed && <span>{link.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom */}
                <div style={{ padding: '12px 8px', borderTop: '1px solid var(--gray-100)' }}>
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            width: '100%',
                            padding: '10px 16px',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.875rem',
                            color: 'var(--gray-500)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all var(--transition-fast)',
                        }}
                        className="collapse-btn"
                    >
                        <ChevronLeft size={20} style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform var(--transition-base)' }} />
                        {!collapsed && <span>Collapse</span>}
                    </button>
                    <button
                        onClick={handleLogout}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            width: '100%',
                            padding: '10px 16px',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.875rem',
                            color: 'var(--error)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <LogOut size={20} />
                        {!collapsed && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div style={{
                flex: 1,
                marginLeft: collapsed ? '72px' : '260px',
                transition: 'margin-left var(--transition-base)',
                display: 'flex',
                flexDirection: 'column',
            }}>
                {/* Top Bar */}
                <header style={{
                    height: '72px',
                    background: 'var(--white)',
                    borderBottom: '1px solid var(--gray-100)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 32px',
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                }}>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="mobile-menu-btn"
                        style={{
                            display: 'none',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--gray-600)',
                        }}
                    >
                        <Menu size={24} />
                    </button>

                    <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--gray-800)' }}>
                        {sidebarLinks.find(l => l.href === pathname)?.name || 'Dashboard'}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button style={{
                            width: 40,
                            height: 40,
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--gray-50)',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--gray-500)',
                        }}>
                            <Bell size={18} />
                        </button>
                        <div style={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            background: 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '0.8125rem',
                        }}>
                            {admin.name.charAt(0)}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div style={{ padding: '32px', flex: 1 }}>
                    {children}
                </div>
            </div>

            <style jsx global>{`
        @media (max-width: 1024px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .mobile-menu-btn {
            display: block !important;
          }
          div[style*="marginLeft"] {
            margin-left: 0 !important;
          }
        }
      `}</style>
        </div>
    );
}
