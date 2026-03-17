'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Building2, User, Mail, Phone, Globe, Package, MessageSquare } from 'lucide-react';

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
            <section style={{ paddingTop: '160px', paddingBottom: '80px', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '560px' }}>
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                        <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎉</div>
                        <h2 style={{ marginBottom: '16px' }}>Application Received!</h2>
                        <p style={{ color: 'var(--gray-500)', fontSize: '1.0625rem', lineHeight: 1.7 }}>
                            Thank you for your interest in partnering with Niger Sanitary Industry Limited. Our team will review your application and contact you within 48 hours.
                        </p>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <>
            <section style={{ paddingTop: '160px', paddingBottom: '80px', background: 'var(--gradient-hero)' }}>
                <div className="container">
                    <span className="section-label" style={{ color: 'var(--accent-light)' }}>Partnership</span>
                    <h1 style={{ color: 'var(--white)', maxWidth: '600px', marginBottom: '20px' }}>Become a Distribution Partner</h1>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.125rem', maxWidth: '560px', lineHeight: 1.7 }}>
                        Join our growing network of distributors across Nigeria and West Africa. Partner with a brand trusted by millions.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ maxWidth: '720px' }}>
                    <div className="card" style={{ padding: '40px' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Distributor Inquiry Form</h2>
                        <p style={{ color: 'var(--gray-500)', marginBottom: '32px' }}>Fill out the form below and our team will get back to you.</p>

                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div className="form-group">
                                    <label className="form-label"><Building2 size={14} style={{ display: 'inline', marginRight: '6px' }} />Company Name *</label>
                                    <input name="companyName" className="form-input" required placeholder="Your company name" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label"><User size={14} style={{ display: 'inline', marginRight: '6px' }} />Contact Person *</label>
                                    <input name="contactPerson" className="form-input" required placeholder="Full name" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label"><Mail size={14} style={{ display: 'inline', marginRight: '6px' }} />Email *</label>
                                    <input name="email" type="email" className="form-input" required placeholder="email@company.com" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label"><Phone size={14} style={{ display: 'inline', marginRight: '6px' }} />Phone *</label>
                                    <input name="phone" className="form-input" required placeholder="+234..." />
                                </div>
                                <div className="form-group">
                                    <label className="form-label"><Globe size={14} style={{ display: 'inline', marginRight: '6px' }} />Country</label>
                                    <input name="country" className="form-input" placeholder="Nigeria" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label"><Package size={14} style={{ display: 'inline', marginRight: '6px' }} />Distribution Interest</label>
                                    <select name="distributionInterest" className="form-select">
                                        <option value="">Select product line</option>
                                        <option value="LadySept Sanitary Towels">LadySept Sanitary Towels</option>
                                        <option value="Damson Serviette">Damson Serviette</option>
                                        <option value="Absorbent Cotton Wool">Absorbent Cotton Wool</option>
                                        <option value="Damson Underpad">Damson Underpad</option>
                                        <option value="All Products">All Products</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label"><MessageSquare size={14} style={{ display: 'inline', marginRight: '6px' }} />Message</label>
                                <textarea name="message" className="form-textarea" placeholder="Tell us about your distribution capability..." rows={4} />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%' }}>
                                {loading ? 'Submitting...' : <><Send size={18} /> Submit Application</>}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
