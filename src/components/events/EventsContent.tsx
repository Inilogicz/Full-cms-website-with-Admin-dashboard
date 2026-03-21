'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Image as ImageIcon, ArrowRight, Share2, Info } from 'lucide-react';
import FlipCard from '@/components/ui/FlipCard';
import Link from 'next/link';

interface Event {
    id: string;
    title: string;
    description: string;
    eventDate: string | Date;
    location: string;
    category: string;
    imageUrl?: string;
}

export default function EventsContent({ events }: { events: Event[] }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className="section" style={{ padding: isMobile ? '60px 0' : '100px 0', background: 'white' }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                {events.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--gray-400)' }}>
                        <p style={{ fontSize: '1.25rem' }}>No upcoming events scheduled. Stay tuned!</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: isMobile ? '40px' : '64px' }}>
                        {events.map((event, i) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                <FlipCard
                                    height={isMobile ? "550px" : "340px"}
                                    front={
                                        <div className="card h-full" style={{
                                            display: 'flex',
                                            flexDirection: isMobile ? 'column' : 'row',
                                            overflow: 'hidden',
                                            borderRadius: 'var(--radius-2xl)',
                                            border: '1px solid var(--gray-100)',
                                            background: 'white',
                                            boxShadow: '0 4px 30px rgba(0,0,0,0.02)'
                                        }}>
                                            <div style={{
                                                width: isMobile ? '100%' : '380px',
                                                height: isMobile ? '200px' : 'auto',
                                                background: 'var(--gray-50)',
                                                flexShrink: 0,
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}>
                                                {event.imageUrl ? (
                                                    <img src={event.imageUrl} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="card-hover-image" />
                                                ) : (
                                                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.1 }}><ImageIcon size={64} /></div>
                                                )}
                                                <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 2 }}>
                                                    <span style={{
                                                        fontSize: '0.75rem',
                                                        fontWeight: 800,
                                                        textTransform: 'uppercase',
                                                        color: 'white',
                                                        background: 'var(--primary)',
                                                        padding: '6px 16px',
                                                        borderRadius: 'var(--radius-full)',
                                                        boxShadow: '0 4px 12px rgba(10, 77, 162, 0.2)'
                                                    }}>
                                                        {event.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="card-body" style={{
                                                padding: isMobile ? '24px' : '48px',
                                                flex: 1,
                                                position: 'relative',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: isMobile ? '12px' : '24px' }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--gray-400)', fontWeight: 700 }}>
                                                        <Calendar size={18} style={{ color: 'var(--gold)' }} />
                                                        {new Date(event.eventDate).toLocaleDateString('en-NG', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                    </span>
                                                </div>
                                                <h3 style={{
                                                    fontSize: isMobile ? '1.25rem' : '1.75rem',
                                                    fontWeight: 900,
                                                    marginBottom: isMobile ? '12px' : '20px',
                                                    color: 'var(--primary-dark)',
                                                    lineHeight: 1.2
                                                }}>{event.title}</h3>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gray-500)', fontSize: isMobile ? '0.8125rem' : '0.9375rem', fontWeight: 500 }}>
                                                    <MapPin size={18} style={{ color: 'var(--gold)' }} />
                                                    {event.location}
                                                </div>
                                                <div style={{ marginTop: isMobile ? '20px' : '32px', color: 'var(--primary)', fontWeight: 800, fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                                    View Details <ArrowRight size={16} />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    back={
                                        <div style={{
                                            background: 'var(--primary-dark)',
                                            height: '100%',
                                            borderRadius: 'var(--radius-2xl)',
                                            padding: isMobile ? '32px 24px' : '48px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            color: 'white',
                                            textAlign: 'left',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}>
                                            {/* Decorative Background Icon */}
                                            <Info size={180} style={{ position: 'absolute', bottom: '-40px', right: '-40px', opacity: 0.03, transform: 'rotate(-10deg)' }} />

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                                                <h3 style={{ fontSize: isMobile ? '1.5rem' : '1.75rem', fontWeight: 900, color: 'var(--gold)' }}>Event Mission</h3>
                                                <div style={{ display: 'flex', gap: '12px' }}>
                                                    <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}><Share2 size={18} /></button>
                                                </div>
                                            </div>
                                            <p style={{
                                                fontSize: isMobile ? '0.9375rem' : '1.0625rem',
                                                opacity: 0.9,
                                                lineHeight: 1.8,
                                                marginBottom: isMobile ? '32px' : '40px',
                                                display: '-webkit-box',
                                                WebkitLineClamp: isMobile ? 5 : 3,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            }}>{event.description}</p>
                                            <div style={{
                                                display: 'flex',
                                                gap: '16px',
                                                flexDirection: isMobile ? 'column' : 'row',
                                                alignItems: isMobile ? 'flex-start' : 'center'
                                            }}>
                                                <Link href={`/contact`} className="btn btn-lg" style={{
                                                    background: 'var(--gold)',
                                                    color: 'white',
                                                    fontWeight: 800,
                                                    borderRadius: 'var(--radius-full)',
                                                    padding: '12px 32px',
                                                    width: isMobile ? '100%' : 'auto',
                                                    textAlign: 'center'
                                                }}>
                                                    Get Involved
                                                </Link>
                                                <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Join our community outreach</span>
                                            </div>
                                        </div>
                                    }
                                />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
