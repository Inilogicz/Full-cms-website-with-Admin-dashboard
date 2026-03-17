import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import { Calendar, MapPin } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Events & Outreach',
    description: 'Discover our CSR initiatives, product launches, menstrual health campaigns, and community outreach activities.',
};

const defaultEvents = [
    { id: '1', title: 'World Menstrual Hygiene Day Campaign', description: 'Annual campaign to raise awareness about menstrual hygiene and distribute free sanitary products to girls in rural communities.', eventDate: new Date('2024-05-28'), location: 'Niger State, Nigeria', category: 'CSR' },
    { id: '2', title: 'LadySept Product Launch Event', description: 'Launch of the new LadySept Ultra range with improved absorbency and comfort features.', eventDate: new Date('2024-03-15'), location: 'Lagos, Nigeria', category: 'Product Launch' },
    { id: '3', title: 'School Menstrual Health Education Program', description: 'Educational sessions at secondary schools covering menstrual health, hygiene practices, and breaking stigma.', eventDate: new Date('2024-06-10'), location: 'Abuja, Nigeria', category: 'Health Campaign' },
    { id: '4', title: 'ISO Certification Milestone', description: 'Achieved ISO 9001:2015 certification for quality management systems, marking a significant milestone in our manufacturing excellence journey.', eventDate: new Date('2024-01-20'), location: 'Niger State, Nigeria', category: 'Milestone' },
    { id: '5', title: 'Community Health Fair', description: 'Participated in the annual community health fair providing free health screenings and sanitary product samples.', eventDate: new Date('2024-07-05'), location: 'Kaduna, Nigeria', category: 'CSR' },
];

export default async function EventsPage() {
    let events = defaultEvents;
    try {
        const dbEvents = await prisma.event.findMany({ where: { status: 'published' }, orderBy: { eventDate: 'desc' } });
        if (dbEvents.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            events = dbEvents.map((e: any) => ({ id: e.id, title: e.title, description: e.description, eventDate: e.eventDate, location: e.location || '', category: e.category || '' }));

        }
    } catch { /* defaults */ }

    return (
        <>
            <section style={{ paddingTop: '160px', paddingBottom: '80px', background: 'var(--gradient-hero)' }}>
                <div className="container">
                    <span className="section-label" style={{ color: 'var(--accent-light)' }}>Events</span>
                    <h1 style={{ color: 'var(--white)', maxWidth: '640px', marginBottom: '20px' }}>Events & Outreach</h1>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.125rem', maxWidth: '560px', lineHeight: 1.7 }}>
                        Our activities, CSR initiatives, product launches, and community engagement programs.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ maxWidth: '880px' }}>
                    {events.map((event, i) => (
                        <div key={event.id} className="card" style={{ marginBottom: '24px', display: 'flex', overflow: 'visible' }}>
                            <div style={{
                                width: '4px',
                                background: 'var(--primary)',
                                borderRadius: '4px 0 0 4px',
                                flexShrink: 0,
                            }} />
                            <div className="card-body" style={{ padding: '28px 32px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                                    <span className="badge badge-primary">{event.category}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--gray-400)' }}>
                                        <Calendar size={14} />
                                        {new Date(event.eventDate).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                    {event.location && (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--gray-400)' }}>
                                            <MapPin size={14} />
                                            {event.location}
                                        </span>
                                    )}
                                </div>
                                <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>{event.title}</h3>
                                <p style={{ fontSize: '0.9375rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>{event.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
