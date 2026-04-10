'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    {
        name: 'Products',
        href: '/products',
        isProducts: true
    },
    { name: 'Where to Buy', href: '/where-to-buy' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Events', href: '/events' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [products, setProducts] = useState<{ name: string; slug: string }[]>([]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        // Fetch products for navigation
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProducts(data.map(p => ({
                        name: p.name,
                        slug: p.slug
                    })));
                }
            })
            .catch(err => console.error('Error fetching dynamic products:', err));

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
                background: 'rgba(255,255,255,0.95)',
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
                    gap: '12px',
                    fontWeight: 900,
                    transition: 'all var(--transition-base)',
                }}>
                    <div style={{
                        position: 'relative',
                        width: '42px',
                        height: '42px',
                        background: scrolled ? 'var(--primary-50)' : 'rgba(255, 255, 255, 0.15)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: scrolled ? '0 4px 10px rgba(0,0,0,0.05)' : 'none',
                        border: scrolled ? '1px solid var(--primary-100)' : '1px solid rgba(255, 255, 255, 0.3)',
                        padding: '4px',
                        backdropFilter: scrolled ? 'none' : 'blur(10px)'
                    }}>
                        <Image
                            src="/logo.png"
                            alt="Niger Sanitary Industry Limited"
                            width={32}
                            height={32}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                        <span style={{
                            letterSpacing: '-0.01em',
                            fontSize: '1.1rem',
                            color: 'var(--primary-dark)',
                            textShadow: scrolled ? 'none' : '0 2px 4px rgba(0,0,0,0.2)'
                        }}>
                            Niger <span style={{ color: 'var(--gold)' }}>Sanitary</span>
                        </span>
                        <span style={{
                            fontSize: '0.625rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: 'var(--gray-500)',
                            fontWeight: 700
                        }}>
                            Industry Limited
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                }}
                    className="desktop-nav"
                >
                    {navLinks.map((link: any) => (
                        <div
                            key={link.name}
                            style={{ position: 'relative' }}
                            onMouseEnter={() => (link.isProducts || link.children) && setActiveDropdown(link.name)}
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
                                    fontWeight: 600,
                                    // color: scrolled ? 'var(--gray-700)' : 'var(--white)',
                                    borderRadius: 'var(--radius-md)',
                                    transition: 'all var(--transition-fast)',
                                    textShadow: scrolled ? 'none' : '0 1px 2px rgba(0,0,0,0.1)',
                                }}
                            >
                                {link.name}
                                {(link.isProducts || link.children) && <ChevronDown size={14} />}
                            </Link>

                            {/* Dropdown */}
                            {((link.isProducts && products.length > 0) || link.children) && activeDropdown === link.name && (
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
                                    {link.isProducts ? (
                                        products.map((product) => (
                                            <Link
                                                key={product.slug}
                                                href={`/products/${product.slug}`}
                                                style={{
                                                    display: 'block',
                                                    padding: '10px 16px',
                                                    fontSize: '0.875rem',
                                                    color: 'var(--gray-700)',
                                                    borderRadius: 'var(--radius-md)',
                                                    transition: 'all var(--transition-fast)',
                                                }}
                                                onClick={() => setActiveDropdown(null)}
                                            >
                                                {product.name}
                                            </Link>
                                        ))
                                    ) : (
                                        link.children?.map((child: any) => (
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
                                                onClick={() => setActiveDropdown(null)}
                                            >
                                                {child.name}
                                            </Link>
                                        ))
                                    )}
                                </motion.div>
                            )}
                        </div>
                    ))}
                    <Link
                        href="/distributor"
                        className="btn btn-sm"
                        style={{
                            marginLeft: '12px',
                            background: 'var(--gradient-gold)',
                            color: 'white',
                            boxShadow: '0 4px 12px var(--gold-glow)',
                            borderRadius: 'var(--radius-full)',
                            padding: '10px 24px',
                            border: 'none',
                        }}
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
                        color: 'var(--gray-800)',
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
                            {navLinks.map((link: any) => (
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
                                    {link.isProducts ? (
                                        <div style={{ paddingLeft: '16px' }}>
                                            {products.map((product) => (
                                                <Link
                                                    key={product.slug}
                                                    href={`/products/${product.slug}`}
                                                    onClick={() => setIsOpen(false)}
                                                    style={{
                                                        display: 'block',
                                                        padding: '8px 0',
                                                        fontSize: '0.875rem',
                                                        color: 'var(--gray-500)',
                                                    }}
                                                >
                                                    {product.name}
                                                </Link>
                                            ))}
                                        </div>
                                    ) : link.children && (
                                        <div style={{ paddingLeft: '16px' }}>
                                            {link.children.map((child: any) => (
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

        </header>
    );
}
