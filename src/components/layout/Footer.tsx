import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer style={{
            background: 'var(--gray-900)',
            color: 'var(--gray-300)',
            paddingTop: '64px',
        }}>
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
                            <span style={{ fontWeight: 700, color: 'var(--white)', fontSize: '1.125rem' }}>
                                Niger Sanitary
                            </span>
                        </div>
                        <p style={{ fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '20px' }}>
                            Leading manufacturer of quality sanitary pads and medical consumables in Nigeria and West Africa.
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                                <a key={i} href="#" style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 'var(--radius-md)',
                                    background: 'rgba(255,255,255,0.08)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--gray-400)',
                                    transition: 'all var(--transition-fast)',
                                }}>
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
                                <span>Niger State, Nigeria</span>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                                <Phone size={18} style={{ flexShrink: 0 }} />
                                <span>+234 800 000 0000</span>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                                <Mail size={18} style={{ flexShrink: 0 }} />
                                <span>info@nigersanitary.com</span>
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
                    <p>© {new Date().getFullYear()} Niger Sanitary Industry Limited. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <Link href="/trust">Trust & Compliance</Link>
                        <Link href="/faq">FAQ</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
