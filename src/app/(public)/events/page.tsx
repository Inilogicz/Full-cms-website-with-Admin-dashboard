import { prisma } from '@/lib/prisma';
import EventsContent from '@/components/events/EventsContent';
import dynamicImport from 'next/dynamic';
const FloatingProductBackground = dynamicImport(() => import('@/components/shared/FloatingProductBackground'), {
    ssr: false,
});



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
        <div className="events-wrapper" style={{ background: 'white' }}>
            <section style={{
                paddingTop: '180px',
                paddingBottom: '120px',
                background: 'var(--gray-50)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '60vh',
                display: 'flex',
                alignItems: 'center'
            }}>
                {/* Brand Visual Layer */}
                <FloatingProductBackground
                    theme="light"
                    intensity={60}
                    images={[
                        { url: '/product2.JPG', top: '15%', left: '5%', size: '120px', mobileSize: '60px', delay: 0, opacity: 0.2 },
                        { url: '/product7.JPG', top: '60%', left: '8%', size: '140px', mobileSize: '75px', delay: 0.4, opacity: 0.25 },
                        { url: '/product11.JPG', top: '20%', left: '85%', size: '130px', mobileSize: '70px', delay: 0.8, opacity: 0.2 },
                        { url: '/product5.JPG', top: '70%', left: '82%', size: '150px', mobileSize: '80px', delay: 1.2, opacity: 0.25 },
                    ]}
                />

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ maxWidth: '800px' }}>
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
                            <span style={{ width: '40px', height: '1px', background: 'var(--primary)', opacity: 0.3 }} />
                            Community & IMPACT
                        </div>
                        <h1 style={{
                            color: 'var(--primary-dark)',
                            marginBottom: '32px',
                            fontSize: 'clamp(3rem, 7vw, 5rem)',
                            fontWeight: 900,
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em'
                        }}>
                            CSR & Outreach <br />
                            <span className="text-gradient-gold">Impact Initiatives</span>
                        </h1>
                        <p style={{
                            color: 'var(--gray-600)',
                            fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                            maxWidth: '650px',
                            lineHeight: 1.8,
                            opacity: 0.9
                        }}>
                            Discover our menstrual health campaigns, product launches,
                            and community support programs reaching every corner of Nigeria.
                        </p>
                    </div>
                </div>

                {/* Decorative Background Text */}
                <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: 'clamp(8rem, 20vw, 20rem)',
                    fontWeight: 900,
                    color: 'rgba(10, 77, 162, 0.02)',
                    whiteSpace: 'nowrap',
                    zIndex: 1,
                    pointerEvents: 'none',
                    letterSpacing: '-0.05em'
                }}>
                    EVENTS
                </div>
            </section>

            <EventsContent events={events} />
        </div>
    );
}
