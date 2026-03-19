import Skeleton from '@/components/ui/Skeleton';

export default function BlogLoading() {
    return (
        <div className="blog-wrapper">
            <section style={{
                paddingTop: '160px',
                paddingBottom: '100px',
                background: 'linear-gradient(to bottom, #f8faff 0%, #ffffff 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <Skeleton width="130px" height="0.75rem" className="mb-4" />
                    <Skeleton width="400px" height="3rem" className="mb-4" />
                    <Skeleton width="550px" height="1.2rem" />
                </div>
            </section>

            <section style={{ borderBottom: '1px solid var(--gray-100)', background: 'white', position: 'sticky', top: '72px', zIndex: 50 }}>
                <div className="container" style={{ display: 'flex', gap: '12px', padding: '20px 0' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} width="100px" height="2.5rem" borderRadius="var(--radius-full)" />
                    ))}
                </div>
            </section>

            <section className="section" style={{ padding: '80px 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                                <Skeleton height="200px" borderRadius="0" />
                                <div style={{ padding: '24px' }}>
                                    <Skeleton width="30%" height="0.75rem" className="mb-4" />
                                    <Skeleton width="90%" height="1.5rem" className="mb-4" />
                                    <div className="flex gap-4">
                                        <Skeleton width="80px" height="1rem" />
                                        <Skeleton width="80px" height="1rem" />
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
