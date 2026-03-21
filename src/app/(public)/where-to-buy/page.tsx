'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Phone, Mail, Navigation, Store, ChevronDown, Building2, ExternalLink } from 'lucide-react';
import FloatingProductBackground from '@/components/shared/FloatingProductBackground';

interface StoreLocation {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    phone?: string;
    email?: string;
}

const NIGERIAN_STATES = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function WhereToBuyPage() {
    const [stores, setStores] = useState<StoreLocation[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedState, setSelectedState] = useState('');

    useEffect(() => {
        fetch('/api/stores')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setStores(data);
                } else {
                    console.error('Expected array of stores, got:', data);
                    setStores([]);
                }
            })
            .catch(() => setStores([]))
            .finally(() => setLoading(false));
    }, []);

    const filteredStores = useMemo(() => {
        return stores.filter(store => {
            const matchesSearch =
                store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                store.address.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesState = selectedState === '' || store.state === selectedState;

            return matchesSearch && matchesState;
        });
    }, [stores, searchQuery, selectedState]);

    return (
        <main style={{ minHeight: '100vh', background: 'var(--white)' }}>
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                height: '50vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
            }}>
                <FloatingProductBackground
                    theme="light"
                    images={[
                        { url: "/products/sanitary-pad-1.png", left: "10%", top: "15%", size: "280px", rotate: -15, opacity: 0.8 },
                        { url: "/products/diaper-1.png", left: "80%", top: "20%", size: "320px", rotate: 10, opacity: 0.8 },
                        { url: "/products/wipes-1.png", left: "15%", top: "65%", size: "240px", rotate: 12, opacity: 0.7 },
                        { url: "/products/sanitary-pad-2.png", left: "75%", top: "70%", size: "260px", rotate: -8, opacity: 0.7 }
                    ]}
                />

                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.4) 100%)', zIndex: 1 }} />

                <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                    <motion.div {...fadeInUp}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            color: 'var(--primary)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            marginBottom: '24px',
                            fontSize: '0.875rem'
                        }}>
                            <Store size={20} />
                            <span>Store Locator</span>
                        </div>
                        <h1 style={{
                            fontSize: 'clamp(3rem, 8vw, 5rem)',
                            fontWeight: 900,
                            color: 'var(--primary-dark)',
                            lineHeight: 1,
                            marginBottom: '32px'
                        }}>
                            WHERE TO <span style={{ color: 'var(--gold)' }}>BUY</span>
                        </h1>
                        <p style={{
                            fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
                            color: 'var(--gray-600)',
                            maxWidth: '700px',
                            margin: '0 auto 48px',
                            lineHeight: 1.6,
                            fontWeight: 500
                        }}>
                            Find Niger Sanitary products at authorized retailers and distributors near you across all 36 states in Nigeria.
                        </p>
                    </motion.div>
                </div>

                {/* Decorative Text */}
                <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '12rem',
                    fontWeight: 900,
                    color: 'var(--primary)',
                    opacity: 0.03,
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    letterSpacing: '-0.05em'
                }}>
                    STORES LOCATIONS
                </div>
            </section>

            {/* Locator Section */}
            <section style={{ padding: '80px 0', marginTop: '-80px', position: 'relative', zIndex: 20 }}>
                <div className="container">
                    {/* Search & Filter Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{
                            background: 'white',
                            borderRadius: '32px',
                            padding: '12px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            maxWidth: '1000px',
                            margin: '0 auto 64px'
                        }}
                    >
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
                                <Search size={20} style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                                <input
                                    type="text"
                                    placeholder="Search by store name, address, or city..."
                                    style={{
                                        width: '100%',
                                        padding: '18px 24px 18px 60px',
                                        borderRadius: '24px',
                                        border: '1px solid var(--gray-100)',
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        outline: 'none',
                                        background: 'var(--gray-50)',
                                        transition: 'all 0.3s'
                                    }}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={(e) => e.target.style.background = 'white'}
                                    onBlur={(e) => e.target.style.background = 'var(--gray-50)'}
                                />
                            </div>

                            <div style={{ position: 'relative', width: '220px' }}>
                                <select
                                    style={{
                                        width: '100%',
                                        padding: '18px 24px',
                                        borderRadius: '24px',
                                        border: '1px solid var(--gray-100)',
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        outline: 'none',
                                        background: 'var(--gray-50)',
                                        appearance: 'none',
                                        cursor: 'pointer'
                                    }}
                                    value={selectedState}
                                    onChange={(e) => setSelectedState(e.target.value)}
                                >
                                    <option value="">All States</option>
                                    {NIGERIAN_STATES.map(state => <option key={state} value={state}>{state}</option>)}
                                </select>
                                <ChevronDown size={18} style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', pointerEvents: 'none' }} />
                            </div>

                            <button style={{
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                padding: '18px 32px',
                                borderRadius: '24px',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                transition: 'all 0.3s'
                            }}>
                                SEARCH
                            </button>
                        </div>
                    </motion.div>

                    {/* Stores Grid */}
                    {loading ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="skeleton" style={{ height: '240px', borderRadius: '24px' }} />
                            ))}
                        </div>
                    ) : (
                        <div>
                            {filteredStores.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '100px 0', background: 'var(--gray-50)', borderRadius: '32px' }}>
                                    <div style={{ display: 'inline-flex', padding: '24px', borderRadius: '50%', background: 'white', marginBottom: '24px' }}>
                                        <MapPin size={48} style={{ color: 'var(--gray-300)' }} />
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '12px' }}>No Stores Found</h3>
                                    <p style={{ color: 'var(--gray-500)', fontWeight: 500 }}>
                                        We couldn&apos;t find any stores matching your search in {selectedState || 'Nigeria'}.
                                        <br />Try adjusting your filters or search terms.
                                    </p>
                                    <button
                                        onClick={() => { setSearchQuery(''); setSelectedState(''); }}
                                        style={{ marginTop: '32px', color: 'var(--primary)', fontWeight: 800, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            ) : (
                                <motion.div
                                    variants={staggerContainer}
                                    initial="initial"
                                    animate="animate"
                                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}
                                >
                                    {filteredStores.map((store) => (
                                        <motion.div
                                            key={store.id}
                                            variants={fadeInUp}
                                            whileHover={{ y: -8 }}
                                            style={{
                                                background: 'white',
                                                borderRadius: '24px',
                                                padding: '32px',
                                                border: '1px solid var(--gray-100)',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                width: '100px',
                                                height: '100px',
                                                background: 'var(--primary)',
                                                opacity: 0.03,
                                                borderRadius: '0 0 0 100%',
                                                zIndex: 0
                                            }} />

                                            <div style={{ position: 'relative', zIndex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                                                    <div style={{ padding: '12px', background: 'var(--primary-50)', color: 'var(--primary)', borderRadius: '16px' }}>
                                                        <Building2 size={24} />
                                                    </div>
                                                    <span style={{
                                                        fontSize: '0.6875rem',
                                                        fontWeight: 800,
                                                        textTransform: 'uppercase',
                                                        color: 'var(--gold)',
                                                        background: 'rgba(212, 175, 55, 0.08)',
                                                        padding: '6px 14px',
                                                        borderRadius: 'var(--radius-full)'
                                                    }}>
                                                        {store.state} STATE
                                                    </span>
                                                </div>

                                                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--primary-dark)', marginBottom: '16px', lineHeight: 1.3 }}>
                                                    {store.name}
                                                </h3>

                                                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                                                    <MapPin size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                                                    <p style={{ fontSize: '0.9375rem', color: 'var(--gray-600)', lineHeight: 1.5, fontWeight: 500 }}>
                                                        {store.address}<br />
                                                        <span style={{ fontWeight: 800, color: 'var(--primary-dark)' }}>{store.city}</span>
                                                    </p>
                                                </div>

                                                <div style={{
                                                    marginTop: 'auto',
                                                    paddingTop: '24px',
                                                    borderTop: '1px solid var(--gray-50)',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '12px'
                                                }}>
                                                    {store.phone && (
                                                        <a href={`tel:${store.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gray-600)', fontSize: '0.875rem', textDecoration: 'none', fontWeight: 600 }}>
                                                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gray-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                                                <Phone size={14} />
                                                            </div>
                                                            {store.phone}
                                                        </a>
                                                    )}
                                                    {store.email && (
                                                        <a href={`mailto:${store.email}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gray-600)', fontSize: '0.875rem', textDecoration: 'none', fontWeight: 600 }}>
                                                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gray-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                                                <Mail size={14} />
                                                            </div>
                                                            {store.email}
                                                        </a>
                                                    )}
                                                </div>

                                                <div style={{
                                                    marginTop: '32px',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}>
                                                    <a
                                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + ' ' + store.address)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            fontSize: '0.8125rem',
                                                            fontWeight: 800,
                                                            color: 'var(--primary)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '6px',
                                                            textDecoration: 'none'
                                                        }}
                                                    >
                                                        GET DIRECTIONS <ExternalLink size={14} />
                                                    </a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: '100px 0', background: 'var(--primary-dark)', color: 'white', textAlign: 'center', overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '300px', height: '300px', border: '40px solid white', borderRadius: '50%' }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '24px', color: 'var(--gold)' }}>WANT TO BECOME A <span style={{ color: 'var(--gold)' }}>DISTRIBUTOR</span>?</h2>
                    <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.6 }}>
                        Join our growing network of partners and bring world-class sanitary products to your region.
                    </p>
                    <a href="/contact" className="btn btn-lg" style={{ background: 'var(--gold)', color: 'white', fontWeight: 800, padding: '16px 48px', borderRadius: 'var(--radius-full)' }}>
                        PARTNER WITH US
                    </a>
                </div>
            </section>
        </main>
    );
}
