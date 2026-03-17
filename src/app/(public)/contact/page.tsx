'use client';

import { useState } from 'react';
import { Send, Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        // Contact form can be extended with API
        setTimeout(() => {
            setSubmitted(true);
            setLoading(false);
        }, 1000);
    }

    return (
        <>
            <section style={{ paddingTop: '160px', paddingBottom: '80px', background: 'var(--gradient-hero)' }}>
                <div className="container">
                    <span className="section-label" style={{ color: 'var(--accent-light)' }}>Contact</span>
                    <h1 style={{ color: 'var(--white)', maxWidth: '640px', marginBottom: '20px' }}>Get In Touch</h1>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.125rem', maxWidth: '560px', lineHeight: 1.7 }}>
                        Have questions? We&apos;d love to hear from you. Reach out to our team.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '48px' }}>
                        {/* Contact Info */}
                        <div>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Contact Information</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
                                {[
                                    { icon: MapPin, label: 'Address', value: 'Niger State, Nigeria' },
                                    { icon: Phone, label: 'Phone', value: '+234 800 000 0000' },
                                    { icon: Mail, label: 'Email', value: 'info@nigersanitary.com' },
                                    { icon: Clock, label: 'Hours', value: 'Mon - Fri: 8AM - 5PM' },
                                ].map(item => (
                                    <div key={item.label} style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <item.icon size={20} style={{ color: 'var(--primary)' }} />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.8125rem', color: 'var(--gray-400)', marginBottom: '2px' }}>{item.label}</div>
                                            <div style={{ fontWeight: 500, color: 'var(--gray-800)' }}>{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form */}
                        <div className="card" style={{ padding: '32px' }}>
                            {submitted ? (
                                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>✉️</div>
                                    <h3 style={{ marginBottom: '8px' }}>Message Sent!</h3>
                                    <p style={{ color: 'var(--gray-500)' }}>We&apos;ll respond within 24 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <div className="form-group">
                                            <label className="form-label">Name *</label>
                                            <input className="form-input" required placeholder="Your name" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Email *</label>
                                            <input type="email" className="form-input" required placeholder="email@example.com" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Subject</label>
                                        <input className="form-input" placeholder="What is this about?" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Message *</label>
                                        <textarea className="form-textarea" required placeholder="Your message..." rows={5} />
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
                                        {loading ? 'Sending...' : <><Send size={16} /> Send Message</>}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
                <style jsx>{`
          @media (max-width: 768px) {
            section > .container > div { grid-template-columns: 1fr !important; }
          }
        `}</style>
            </section>
        </>
    );
}
