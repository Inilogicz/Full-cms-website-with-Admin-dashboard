import Skeleton from '@/components/ui/Skeleton';

export default function EventsLoading() {
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
                    <Skeleton width="140px" height="0.75rem" className="mb-4" />
                    <Skeleton width="350px" height="3rem" className="mb-4" />
                    <Skeleton width="550px" height="1.2rem" />
                </div>
            </section>

            <section className="section" style={{ padding: '80px 0' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px' }}>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="card" style={{ display: 'flex', flexDirection: 'row', overflow: 'hidden', padding: 0, height: '300px' }}>
                                <Skeleton width="320px" height="100%" borderRadius="0" />
                                <div style={{ padding: '40px', flex: 1 }}>
                                    <div className="flex gap-4 mb-4">
                                        <Skeleton width="80px" height="1.5rem" borderRadius="var(--radius-full)" />
                                        <Skeleton width="120px" height="1rem" />
                                    </div>
                                    <Skeleton width="80%" height="2rem" className="mb-4" />
                                    <Skeleton width="40%" height="1rem" className="mb-auto" />
                                    <div className="mt-8">
                                        <Skeleton width="120px" height="1rem" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
