'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Send, Building2, User, Mail, Phone, Globe, Package, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function DistributorPage() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/distributor-leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) setSubmitted(true);
        } catch {
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    if (submitted) {
        return (
            <div className="distributor-wrapper">
                <section style={{
                    paddingTop: '160px',
                    paddingBottom: '100px',
                    minHeight: '80vh',
                    display: 'flex',
                    alignItems: 'center',
                    background: 'linear-gradient(to bottom, #f8faff 0%, #ffffff 100%)'
                }}>
                    <div className="container" style={{ textAlign: 'center', maxWidth: '560px' }}>
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                            <div style={{ color: 'var(--gold)', marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
                                <CheckCircle2 size={80} strokeWidth={1} />
                            </div>
                            <h2 style={{ marginBottom: '16px', fontSize: '2.5rem', fontWeight: 900 }}>Application Received!</h2>
                            <p style={{ color: 'var(--gray-500)', fontSize: '1.125rem', lineHeight: 1.7 }}>
                                Thank you for your interest in partnering with Niger Sanitary Industry Limited. Our strategic team will review your application and contact you within 48 hours.
                            </p>
                            <Link href="/" className="btn btn-lg" style={{ marginTop: '32px', background: 'var(--primary)', color: 'white', borderRadius: 'var(--radius-full)' }}>Return Home</Link>
                        </motion.div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="distributor-wrapper">
            {/* Hero Section - Lightened */}
            <section style={{
                paddingTop: '160px',
                paddingBottom: '100px',
                background: 'linear-gradient(to bottom, #f8faff 0%, #ffffff 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="section-label" style={{ color: 'var(--gold-dark)', fontWeight: 800 }}>Partnership</span>
                        <h1 style={{ color: 'var(--primary-dark)', marginBottom: '24px', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900 }}>
                            Scale Your Business <br />
                            <span className="text-gradient-gold">With Niger Sanitary Industry Limited</span>
                        </h1>
                        <p style={{ color: 'var(--gray-600)', fontSize: '1.25rem', maxWidth: '600px', lineHeight: 1.7 }}>
                            Join our growing network of distributors across Africa and partner with a brand trusted by millions for quality.
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
                <div className="container" style={{ maxWidth: '840px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-premium"
                        style={{
                            padding: '60px 48px',
                            borderRadius: 'var(--radius-3xl)',
                            background: 'white',
                            boxShadow: '0 40px 100px rgba(0,0,0,0.06)',
                            border: '1px solid var(--gray-100)'
                        }}
                    >
                        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '12px' }}>Distributor Inquiry</h2>
                            <p style={{ color: 'var(--gray-500)' }}>Provide your details below to start the partnership conversation.</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div className="form-group">
                                    <label className="form-label" style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company Name</label>
                                    <div style={{ position: 'relative' }}>
                                        <Building2 size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)' }} />
                                        <input name="companyName" className="form-input" required placeholder="Enter company name" style={{ paddingLeft: '48px', borderRadius: 'var(--radius-lg)', background: 'var(--gray-50)', border: '1.5px solid var(--gray-100)' }} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Person</label>
                                    <div style={{ position: 'relative' }}>
                                        <User size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)' }} />
                                        <input name="contactPerson" className="form-input" required placeholder="Enter full name" style={{ paddingLeft: '48px', borderRadius: 'var(--radius-lg)', background: 'var(--gray-50)', border: '1.5px solid var(--gray-100)' }} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Corporate Email</label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)' }} />
                                        <input name="email" type="email" className="form-input" required placeholder="email@company.com" style={{ paddingLeft: '48px', borderRadius: 'var(--radius-lg)', background: 'var(--gray-50)', border: '1.5px solid var(--gray-100)' }} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Number</label>
                                    <div style={{ position: 'relative' }}>
                                        <Phone size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)' }} />
                                        <input name="phone" className="form-input" required placeholder="+234..." style={{ paddingLeft: '48px', borderRadius: 'var(--radius-lg)', background: 'var(--gray-50)', border: '1.5px solid var(--gray-100)' }} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Country / Region</label>
                                    <div style={{ position: 'relative' }}>
                                        <Globe size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)' }} />
                                        <input name="country" className="form-input" placeholder="e.g. Nigeria" style={{ paddingLeft: '48px', borderRadius: 'var(--radius-lg)', background: 'var(--gray-50)', border: '1.5px solid var(--gray-100)' }} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product Interest</label>
                                    <div style={{ position: 'relative' }}>
                                        <Package size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)', zIndex: 10 }} />
                                        <select name="distributionInterest" className="form-select" style={{ paddingLeft: '48px', borderRadius: 'var(--radius-lg)', background: 'var(--gray-50)', border: '1.5px solid var(--gray-100)' }}>
                                            <option value="">Select product line</option>
                                            <option value="LadySept Sanitary Towels">LadySept Sanitary Towels</option>
                                            <option value="Damson Serviette">Damson Serviette</option>
                                            <option value="Absorbent Cotton Wool">Absorbent Cotton Wool</option>
                                            <option value="All Products">All Products</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group" style={{ marginTop: '12px' }}>
                                <label className="form-label" style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Distribution Capability</label>
                                <textarea name="message" className="form-textarea" placeholder="Briefly describe your distribution network..." rows={4} style={{ borderRadius: 'var(--radius-lg)', background: 'var(--gray-50)', border: '1.5px solid var(--gray-100)', padding: '16px' }} />
                            </div>
                            <button type="submit" className="btn btn-lg" disabled={loading} style={{
                                width: '100%',
                                background: 'var(--gradient-gold)',
                                color: 'white',
                                fontWeight: 800,
                                borderRadius: 'var(--radius-full)',
                                marginTop: '20px',
                                boxShadow: '0 10px 30px var(--gold-glow)'
                            }}>
                                {loading ? 'Processing Application...' : <><Send size={18} /> Submit Application</>}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
