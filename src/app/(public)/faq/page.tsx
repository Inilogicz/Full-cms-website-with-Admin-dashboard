'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, ShieldCheck, Box, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
    {
        category: 'Products & Quality',
        icon: ShieldCheck,
        questions: [
            { q: 'Are LadySept sanitary pads NAFDAC approved?', a: 'Yes, all our products, including LadySept sanitary towels, are fully NAFDAC registered and approved. We comply with all Nigerian regulatory standards for sanitary and medical products.' },
            { q: 'What sizes are available for LadySept?', a: 'LadySept sanitary towels come in Regular, Long, and Overnight sizes with varying absorbency levels to suit different needs and flow levels.' },
            { q: 'Are your products hypoallergenic?', a: 'Yes, our products are made with skin-friendly materials and undergo dermatological testing to ensure they are safe for sensitive skin.' },
        ]
    },
    {
        category: 'Partnership & Distribution',
        icon: Building,
        questions: [
            { q: 'How can I become a distributor?', a: 'Visit our Distributor Inquiry page and fill out the application form. Our team will review your application and contact you within 48 hours to discuss partnership opportunities.' },
            { q: 'What regions do you distribute to?', a: 'We distribute across all 36 states in Nigeria and are expanding into other West African countries including Ghana, Cameroon, and Niger Republic.' },
            { q: 'What are the minimum order quantities?', a: 'Minimum order quantities vary by product line. Please contact our sales team or fill out the distributor inquiry form for specific details.' },
        ]
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    return (
        <div className="faq-wrapper">
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
                        style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
                    >
                        <span className="section-label" style={{ color: 'var(--gold-dark)', fontWeight: 800 }}>Support Center</span>
                        <h1 style={{ color: 'var(--primary-dark)', marginBottom: '24px', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900 }}>
                            How Can We <br />
                            <span className="text-gradient-gold">Help You Today?</span>
                        </h1>
                        <p style={{ color: 'var(--gray-600)', fontSize: '1.25rem', maxWidth: '600px', lineHeight: 1.7, margin: '0 auto' }}>
                            Find detailed answers to common questions about our products, distribution, and company standards.
                        </p>
                    </motion.div>
                </div>

                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-10%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    zIndex: 1
                }} />
            </section>

            <section className="section" style={{ padding: '80px 0' }}>
                <div className="container" style={{ maxWidth: '840px' }}>
                    {faqData.map((section) => (
                        <div key={section.category} style={{ marginBottom: '60px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--gold-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
                                    <section.icon size={20} />
                                </div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary-dark)' }}>{section.category}</h2>
                            </div>

                            <div style={{ display: 'grid', gap: '16px' }}>
                                {section.questions.map((faq, i) => {
                                    const key = `${section.category}-${i}`;
                                    const isOpen = openIndex === key;
                                    return (
                                        <div
                                            key={key}
                                            className={`glass-premium ${isOpen ? 'active' : ''}`}
                                            style={{
                                                borderRadius: 'var(--radius-xl)',
                                                border: '1px solid',
                                                borderColor: isOpen ? 'var(--gold-light)' : 'var(--gray-100)',
                                                background: 'white',
                                                transition: 'all 0.3s ease',
                                                overflow: 'hidden',
                                                cursor: 'pointer',
                                                boxShadow: isOpen ? '0 20px 40px rgba(0,0,0,0.05)' : 'none'
                                            }}
                                            onClick={() => setOpenIndex(isOpen ? null : key)}
                                        >
                                            <div style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
                                                <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, flex: 1, color: isOpen ? 'var(--primary)' : 'var(--gray-800)' }}>{faq.q}</h3>
                                                <div style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '50%',
                                                    background: isOpen ? 'var(--gold)' : 'var(--gray-50)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: isOpen ? 'white' : 'var(--gray-400)',
                                                    transition: 'all 0.3s ease'
                                                }}>
                                                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                </div>
                                            </div>
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    >
                                                        <div style={{ padding: '0 32px 32px', fontSize: '1rem', color: 'var(--gray-500)', lineHeight: 1.8 }}>
                                                            <div style={{ width: '100%', height: '1px', background: 'var(--gray-50)', marginBottom: '20px' }} />
                                                            {faq.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
