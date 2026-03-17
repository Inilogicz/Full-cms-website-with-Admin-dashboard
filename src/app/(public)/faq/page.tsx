'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Metadata } from 'next';

const faqData = [
    {
        category: 'Products',
        questions: [
            { q: 'Are LadySept sanitary pads NAFDAC approved?', a: 'Yes, all our products, including LadySept sanitary towels, are fully NAFDAC registered and approved. We comply with all Nigerian regulatory standards for sanitary and medical products.' },
            { q: 'What sizes are available for LadySept?', a: 'LadySept sanitary towels come in Regular, Long, and Overnight sizes with varying absorbency levels to suit different needs and flow levels.' },
            { q: 'Are your products hypoallergenic?', a: 'Yes, our products are made with skin-friendly materials and undergo dermatological testing to ensure they are safe for sensitive skin.' },
        ]
    },
    {
        category: 'Distribution',
        questions: [
            { q: 'How can I become a distributor?', a: 'Visit our Distributor Inquiry page and fill out the application form. Our team will review your application and contact you within 48 hours to discuss partnership opportunities.' },
            { q: 'What regions do you distribute to?', a: 'We distribute across all 36 states in Nigeria and are expanding into other West African countries including Ghana, Cameroon, and Niger Republic.' },
            { q: 'What are the minimum order quantities?', a: 'Minimum order quantities vary by product line. Please contact our sales team or fill out the distributor inquiry form for specific details.' },
        ]
    },
    {
        category: 'Quality & Safety',
        questions: [
            { q: 'What quality certifications do you hold?', a: 'We hold NAFDAC registration for all products, ISO 9001:2015 certification for quality management, and comply with international healthcare manufacturing standards.' },
            { q: 'How do you ensure product safety?', a: 'Every product batch undergoes rigorous quality testing including absorbency tests, pH testing, sterility checks, and packaging integrity verification before leaving our facility.' },
            { q: 'What raw materials do you use?', a: 'We use premium-grade raw materials sourced from certified suppliers. Our sanitary pads use super-absorbent polymer cores, and our cotton wool is 100% pure medical-grade cotton.' },
        ]
    },
    {
        category: 'Company',
        questions: [
            { q: 'Where is your factory located?', a: 'Our state-of-the-art manufacturing facility is located in Niger State, Nigeria, strategically positioned to serve the entire country and West African region.' },
            { q: 'Do you offer factory tours?', a: 'Yes, we welcome potential partners and stakeholders for guided factory tours. Please contact us to schedule a visit.' },
            { q: 'How can I contact customer support?', a: 'You can reach us via email at info@nigersanitary.com, call us at +234 800 000 0000, or visit our Contact page to send a message.' },
        ]
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    return (
        <>
            <section style={{ paddingTop: '160px', paddingBottom: '80px', background: 'var(--gradient-hero)' }}>
                <div className="container">
                    <span className="section-label" style={{ color: 'var(--accent-light)' }}>Support</span>
                    <h1 style={{ color: 'var(--white)', maxWidth: '640px', marginBottom: '20px' }}>Frequently Asked Questions</h1>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.125rem', maxWidth: '560px', lineHeight: 1.7 }}>
                        Find answers to common questions about our products, distribution, and company.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ maxWidth: '780px' }}>
                    {faqData.map((section) => (
                        <div key={section.category} style={{ marginBottom: '40px' }}>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--primary)' }}>{section.category}</h2>
                            {section.questions.map((faq, i) => {
                                const key = `${section.category}-${i}`;
                                const isOpen = openIndex === key;
                                return (
                                    <div key={key} className="card" style={{ marginBottom: '8px', cursor: 'pointer' }} onClick={() => setOpenIndex(isOpen ? null : key)}>
                                        <div style={{ padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                                            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, flex: 1 }}>{faq.q}</h3>
                                            {isOpen ? <ChevronUp size={18} style={{ color: 'var(--gray-400)', flexShrink: 0 }} /> : <ChevronDown size={18} style={{ color: 'var(--gray-400)', flexShrink: 0 }} />}
                                        </div>
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                                                    <div style={{ padding: '0 24px 18px', fontSize: '0.9375rem', color: 'var(--gray-500)', lineHeight: 1.7 }}>
                                                        {faq.a}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
