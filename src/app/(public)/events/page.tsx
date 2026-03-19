import { prisma } from '@/lib/prisma';
import EventsContent from '@/components/events/EventsContent';
import { motion } from 'framer-motion';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
    const eventsData = await prisma.event.findMany({
        where: { status: 'published' },
        include: { images: true },
        orderBy: { eventDate: 'desc' }
    });

    const events = eventsData.map(e => ({
        id: e.id,
        title: e.title,
        description: e.description,
        eventDate: e.eventDate,
        location: e.location || '',
        category: e.category || '',
        imageUrl: e.images[0]?.cloudinaryUrl
    }));

    return (
        <div className="events-wrapper">
            <section style={{
                paddingTop: '160px',
                paddingBottom: '100px',
                background: 'linear-gradient(to bottom, #f8faff 0%, #ffffff 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div>
                        <span className="section-label" style={{ color: 'var(--gold-dark)', fontWeight: 800 }}>Events & Outreach</span>
                        <h1 style={{ color: 'var(--primary-dark)', marginBottom: '24px', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900 }}>
                            Community & <br />
                            <span className="text-gradient-gold">Impact Initiatives</span>
                        </h1>
                        <p style={{ color: 'var(--gray-600)', fontSize: '1.25rem', maxWidth: '600px', lineHeight: 1.7 }}>
                            Discover our CSR initiatives, product launches, and menstrual health campaigns across Nigeria.
                        </p>
                    </div>
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

            <EventsContent events={events} />
        </div>
    );
}
