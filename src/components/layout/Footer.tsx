'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Footer() {
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data && !data.error) setSettings(data);
            });
    }, []);

    const socialIcons = [
        { key: 'facebook', icon: Facebook },
        { key: 'twitter', icon: Twitter },
        { key: 'linkedin', icon: Linkedin },
        { key: 'instagram', icon: Instagram },
    ];

    return (
        <footer style={{
            background: 'var(--gray-900)',
            color: 'var(--gray-400)',
            paddingTop: '80px',
            borderTop: '4px solid var(--gold)',
            position: 'relative',
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(to right, transparent, var(--gold), transparent)',
                opacity: 0.3
            }} />
            <div className="container">
                {/* Main Footer */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '48px',
                    paddingBottom: '48px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}>
                    {/* Brand */}
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '16px',
                        }}>
                           <Image src="/logo.png" alt="Logo" width={42} height={42} style={{ filter: 'brightness(0) invert(1)' }}/>
                            <span style={{ fontWeight: 800, color: 'var(--white)', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
                                Niger<span style={{ color: 'var(--gold)' }}>Sanitary</span>
                            </span>
                        </div>
                        <p style={{ fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '20px' }}>
                            Leading manufacturer of quality sanitary pads and medical consumables in Nigeria and West Africa.
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {socialIcons.map(({ key, icon: Icon }) => (
                                <a 
                                    key={key} 
                                    href={settings?.socialLinks?.[key] || "#"} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 'var(--radius-md)',
                                        background: 'rgba(255,255,255,0.08)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--gray-400)',
                                        transition: 'all var(--transition-fast)',
                                    }}
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ color: 'var(--white)', fontSize: '1rem', marginBottom: '20px' }}>Quick Links</h4>
                        {['About Us', 'Products', 'Gallery', 'Events', 'Blog', 'FAQ'].map((item) => (
                            <Link key={item} href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                padding: '6px 0',
                                transition: 'color var(--transition-fast)',
                            }}>
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* Products */}
                    <div>
                        <h4 style={{ color: 'var(--white)', fontSize: '1rem', marginBottom: '20px' }}>Our Products</h4>
                        {[
                            'LadySept Sanitary Towels',
                            'Damson Serviette',
                            'Absorbent Cotton Wool',
                            'Damson Underpad',
                            'Work Floor Underpad',
                        ].map((item) => (
                            <Link key={item} href="/products" style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                padding: '6px 0',
                                transition: 'color var(--transition-fast)',
                            }}>
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ color: 'var(--white)', fontSize: '1rem', marginBottom: '20px' }}>Contact Us</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                                <MapPin size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                                <span>{settings?.contactInfo?.address || "No 1 Damson street, off Akilo Road, ogba industrial scheme, Lagos, Nigeria."}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                                <Phone size={18} style={{ flexShrink: 0 }} />
                                <span>{settings?.contactInfo?.phone || "+234 906 8704 615"}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                                <Mail size={18} style={{ flexShrink: 0 }} />
                                <span>{settings?.contactInfo?.email || "nigersanitaryindustrylimited@ymail.com"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '24px 0',
                    fontSize: '0.8125rem',
                    flexWrap: 'wrap',
                    gap: '12px',
                }}>
                    <p style={{ color: 'var(--gray-500)' }}>© {new Date().getFullYear()} Niger Sanitary Industry Limited. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '32px' }}>
                        <Link href="/trust" className="hover-gold">Trust & Compliance</Link>
                        <Link href="/faq" className="hover-gold">FAQ</Link>
                    </div>
                </div>
            </div>

        </footer>
    );
}
