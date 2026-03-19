'use client';

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
    return (
        <section className="section" style={{ padding: '80px 0' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                {events.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--gray-400)' }}>
                        <p style={{ fontSize: '1.25rem' }}>No upcoming events scheduled. Stay tuned!</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px' }}>
                        {events.map((event) => (
                            <FlipCard
                                key={event.id}
                                height="300px"
                                front={
                                    <div className="card h-full" style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        overflow: 'hidden',
                                        borderRadius: 'var(--radius-2xl)',
                                        border: '1px solid var(--gray-100)',
                                        background: 'white',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                                    }}>
                                        <div style={{ width: '320px', background: 'var(--gray-50)', flexShrink: 0 }}>
                                            {event.imageUrl ? (
                                                <img src={event.imageUrl} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.1 }}><ImageIcon size={64} /></div>
                                            )}
                                        </div>
                                        <div className="card-body" style={{ padding: '40px', flex: 1, position: 'relative' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                                                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--gold-dark)', background: 'var(--gold-50)', padding: '4px 12px', borderRadius: 'var(--radius-full)' }}>{event.category}</span>
                                                <div style={{ width: '1px', height: '16px', background: 'var(--gray-200)' }} />
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--gray-400)', fontWeight: 600 }}>
                                                    <Calendar size={14} />
                                                    {new Date(event.eventDate).toLocaleDateString('en-NG', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '16px', color: 'var(--primary-dark)' }}>{event.title}</h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gray-500)', fontSize: '0.875rem' }}>
                                                <MapPin size={16} style={{ color: 'var(--gold)' }} />
                                                {event.location}
                                            </div>
                                            <div style={{ position: 'absolute', bottom: '40px', right: '40px', color: 'var(--gold)', fontWeight: 800, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                Quick View <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                }
                                back={
                                    <div style={{
                                        background: 'var(--primary-dark)',
                                        height: '100%',
                                        borderRadius: 'var(--radius-2xl)',
                                        padding: '40px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        color: 'white',
                                        textAlign: 'left'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                                            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--gold)' }}>Event Details</h3>
                                            <div style={{ display: 'flex', gap: '12px' }}>
                                                <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}><Share2 size={16} /></button>
                                                <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}><Info size={16} /></button>
                                            </div>
                                        </div>
                                        <p style={{ fontSize: '1rem', opacity: 0.8, lineHeight: 1.7, marginBottom: '32px', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{event.description}</p>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <Link href={`/contact`} className="btn btn-sm" style={{ background: 'var(--gold)', color: 'white', fontWeight: 800 }}>Inquire More</Link>
                                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center' }}>Limited spots available</div>
                                        </div>
                                    </div>
                                }
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
