'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Clock, MessageSquare, User, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
            setLoading(false);
        }, 1200);
    }

    return (
        <div className="contact-wrapper">
            {/* Hero Section - Lightened */}
            <section style={{
                paddingTop: '160px',
                paddingBottom: '100px',
                background: 'url(/contact.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="section-label" style={{ color: 'var(--gold-dark)', fontWeight: 800 }}>Get In Touch</span>
                        <h1 style={{ color: 'var(--primary-dark)', marginBottom: '24px', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900 }}>
                            We&apos;d Love to <br />
                            <span className="text-gradient-gold">Hear From You</span>
                        </h1>
                        <p style={{ color: 'var(--gray-600)', fontSize: '1.25rem', maxWidth: '600px', lineHeight: 1.7 }}>
                            Have questions about our products or want to discuss a partnership? Our team is here to help.
                        </p>
                    </motion.div>
                </div>

                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    zIndex: 1
                }} />
            </section>

            <section className="section" style={{ padding: '80px 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px' }} className="responsive-grid">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '32px', color: 'var(--primary-dark)' }}>Contact Information</h2>
                            <div style={{ display: 'grid', gap: '32px' }}>
                                {[
                                    { icon: MapPin, label: 'Headquarters', value: 'No 1 Damson street, off Akilo Road, ogba industrial scheme, Lagos, Nigeria.', color: 'var(--gold)' },
                                    { icon: Phone, label: 'Official Phone', value: '+234 906 8704 615', color: 'var(--primary)' },
                                    { icon: Mail, label: 'Support Email', value: 'nigersanitaryindustrylimited@ymail.com', color: 'var(--gold)' },
                                    { icon: Clock, label: 'Business Hours', value: 'Mon - Fri: 8AM - 5PM', color: 'var(--primary)' },
                                ].map(item => (
                                    <div key={item.label} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                        <div style={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: '12px',
                                            background: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                            boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                                            color: item.color
                                        }}>
                                            <item.icon size={20} strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{item.label}</div>
                                            <div style={{ fontWeight: 700, color: 'var(--gray-800)', fontSize: '1.0625rem' }}>{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: '60px', padding: '32px', background: 'var(--gold-50)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--gold-glow)' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '12px', color: 'var(--gold-dark)' }}>Partner with Us</h3>
                                <p style={{ color: 'var(--gray-600)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '20px' }}>Interested in becoming a distributor? Our dedicated partnership team is ready to assist you.</p>
                                <Link href="/distributor" style={{ color: 'var(--gold-dark)', fontWeight: 800, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    Go to Distributor Inquiry <Send size={14} />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="glass-premium" style={{
                                padding: '48px',
                                borderRadius: 'var(--radius-3xl)',
                                background: 'white',
                                boxShadow: '0 40px 100px rgba(0,0,0,0.08)',
                                border: '1px solid var(--gray-100)'
                            }}>
                                {submitted ? (
                                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                        <div style={{ color: 'var(--gold)', marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
                                            <CheckCircle2 size={64} strokeWidth={1.5} />
                                        </div>
                                        <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '12px' }}>Message Sent!</h3>
                                        <p style={{ color: 'var(--gray-500)', fontSize: '1.0625rem' }}>Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="btn"
                                            style={{ marginTop: '32px', background: 'var(--primary)', color: 'white', borderRadius: 'var(--radius-full)', padding: '12px 32px' }}
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                                            <div className="form-group">
                                                <label className="form-label" style={{ fontWeight: 700, color: 'var(--gray-400)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name</label>
                                                <div style={{ position: 'relative' }}>
                                                    <User size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)' }} />
                                                    <input className="form-input" required placeholder="Enter your name" style={{ paddingLeft: '48px', borderRadius: 'var(--radius-lg)', background: 'var(--gray-50)', border: '1.5px solid var(--gray-100)' }} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label" style={{ fontWeight: 700, color: 'var(--gray-400)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address</label>
                                                <div style={{ position: 'relative' }}>
                                                    <Mail size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)' }} />
                                                    <input type="email" className="form-input" required placeholder="email@example.com" style={{ paddingLeft: '48px', borderRadius: 'var(--radius-lg)', background: 'var(--gray-50)', border: '1.5px solid var(--gray-100)' }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group" style={{ marginBottom: '24px' }}>
                                            <label className="form-label" style={{ fontWeight: 700, color: 'var(--gray-400)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Subject</label>
                                            <div style={{ position: 'relative' }}>
                                                <MessageSquare size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)' }} />
                                                <input className="form-input" placeholder="How can we help?" style={{ paddingLeft: '48px', borderRadius: 'var(--radius-lg)', background: 'var(--gray-50)', border: '1.5px solid var(--gray-100)' }} />
                                            </div>
                                        </div>
                                        <div className="form-group" style={{ marginBottom: '32px' }}>
                                            <label className="form-label" style={{ fontWeight: 700, color: 'var(--gray-400)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Message</label>
                                            <textarea className="form-textarea" required placeholder="Type your message here..." rows={5} style={{ padding: '16px', borderRadius: 'var(--radius-lg)', background: 'var(--gray-50)', border: '1.5px solid var(--gray-100)' }} />
                                        </div>
                                        <button type="submit" className="btn btn-lg" disabled={loading} style={{
                                            width: '100%',
                                            background: 'var(--gradient-gold)',
                                            color: 'white',
                                            fontWeight: 800,
                                            borderRadius: 'var(--radius-full)',
                                            boxShadow: '0 10px 30px var(--gold-glow)'
                                        }}>
                                            {loading ? 'Sending Message...' : <><Send size={18} /> Send Message</>}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

        </div>
    );
}
