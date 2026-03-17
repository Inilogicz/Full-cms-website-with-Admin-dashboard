'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    {
        name: 'Products',
        href: '/products',
        children: [
            { name: 'LadySept Sanitary Towels', href: '/products/ladysept-sanitary-towels' },
            { name: 'Damson Serviette', href: '/products/damson-serviette' },
            { name: 'Absorbent Cotton Wool', href: '/products/absorbent-cotton-wool' },
            { name: 'Damson Underpad', href: '/products/damson-underpad' },
            { name: 'Work Floor Underpad', href: '/products/work-floor-underpad' },
        ]
    },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Events', href: '/events' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className="navbar"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
                transition: 'all var(--transition-base)',
            }}
        >
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '72px',
            }}>
                {/* Logo */}
                <Link href="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontWeight: 800,
                    fontSize: '1.25rem',
                    color: scrolled ? 'var(--primary)' : 'var(--white)',
                    transition: 'color var(--transition-base)',
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
                        fontSize: '0.875rem',
                    }}>
                        NS
                    </div>
                    <span>Niger Sanitary</span>
                </Link>

                {/* Desktop Nav */}
                <nav style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                }}
                    className="desktop-nav"
                >
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            style={{ position: 'relative' }}
                            onMouseEnter={() => link.children && setActiveDropdown(link.name)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link
                                href={link.href}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '8px 14px',
                                    fontSize: '0.9375rem',
                                    fontWeight: 500,
                                    color: scrolled ? 'var(--gray-700)' : 'rgba(255,255,255,0.9)',
                                    borderRadius: 'var(--radius-md)',
                                    transition: 'all var(--transition-fast)',
                                }}
                            >
                                {link.name}
                                {link.children && <ChevronDown size={14} />}
                            </Link>

                            {/* Dropdown */}
                            {link.children && activeDropdown === link.name && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        background: 'var(--white)',
                                        borderRadius: 'var(--radius-lg)',
                                        boxShadow: 'var(--shadow-xl)',
                                        padding: '8px',
                                        minWidth: '240px',
                                        border: '1px solid var(--gray-100)',
                                    }}
                                >
                                    {link.children.map((child) => (
                                        <Link
                                            key={child.name}
                                            href={child.href}
                                            style={{
                                                display: 'block',
                                                padding: '10px 16px',
                                                fontSize: '0.875rem',
                                                color: 'var(--gray-700)',
                                                borderRadius: 'var(--radius-md)',
                                                transition: 'all var(--transition-fast)',
                                            }}
                                        >
                                            {child.name}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    ))}
                    <Link
                        href="/distributor"
                        className="btn btn-primary btn-sm"
                        style={{ marginLeft: '8px' }}
                    >
                        Become a Distributor
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        color: scrolled ? 'var(--gray-800)' : 'var(--white)',
                        cursor: 'pointer',
                        padding: '8px',
                    }}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            background: 'var(--white)',
                            borderTop: '1px solid var(--gray-100)',
                            overflow: 'hidden',
                        }}
                        className="mobile-menu"
                    >
                        <div style={{ padding: '16px 24px' }}>
                            {navLinks.map((link) => (
                                <div key={link.name}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        style={{
                                            display: 'block',
                                            padding: '12px 0',
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            color: 'var(--gray-800)',
                                            borderBottom: '1px solid var(--gray-100)',
                                        }}
                                    >
                                        {link.name}
                                    </Link>
                                    {link.children && (
                                        <div style={{ paddingLeft: '16px' }}>
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.name}
                                                    href={child.href}
                                                    onClick={() => setIsOpen(false)}
                                                    style={{
                                                        display: 'block',
                                                        padding: '8px 0',
                                                        fontSize: '0.875rem',
                                                        color: 'var(--gray-500)',
                                                    }}
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <Link
                                href="/distributor"
                                className="btn btn-primary"
                                onClick={() => setIsOpen(false)}
                                style={{ marginTop: '16px', width: '100%' }}
                            >
                                Become a Distributor
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (min-width: 1025px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
        </header>
    );
}
