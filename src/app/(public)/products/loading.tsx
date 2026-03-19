import Skeleton from '@/components/ui/Skeleton';

export default function ProductsLoading() {
    return (
        <div className="products-wrapper">
            <section style={{
                paddingTop: '160px',
                paddingBottom: '100px',
                background: 'linear-gradient(to bottom, #f8faff 0%, #ffffff 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <Skeleton width="120px" height="0.75rem" className="mb-4" />
                    <Skeleton width="450px" height="3rem" className="mb-4" />
                    <Skeleton width="500px" height="1.2rem" />
                </div>
            </section>

            <section className="section" style={{ padding: '100px 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                                <div style={{ padding: '12px' }}>
                                    <Skeleton height="280px" borderRadius="var(--radius-lg)" />
                                </div>
                                <div style={{ padding: '24px' }}>
                                    <Skeleton width="30%" height="0.75rem" className="mb-2" />
                                    <Skeleton width="80%" height="1.5rem" className="mb-4" />
                                    <Skeleton width="100%" height="3rem" className="mb-4" />
                                    <Skeleton width="100px" height="1rem" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
