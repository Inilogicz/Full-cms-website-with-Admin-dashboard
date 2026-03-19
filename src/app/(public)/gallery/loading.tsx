import Skeleton from '@/components/ui/Skeleton';

export default function GalleryLoading() {
    return (
        <div className="gallery-wrapper">
            <section style={{
                paddingTop: '160px',
                paddingBottom: '100px',
                background: 'linear-gradient(to bottom, #f8faff 0%, #ffffff 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div>
                        <Skeleton width="120px" height="0.75rem" className="mb-4" />
                        <Skeleton width="300px" height="3rem" className="mb-4" />
                        <Skeleton width="500px" height="1.2rem" />
                    </div>
                </div>
            </section>

            <section className="section" style={{ padding: '80px 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                                <Skeleton height="240px" borderRadius="0" />
                                <div style={{ padding: '16px' }}>
                                    <Skeleton width="30%" height="0.75rem" className="mb-2" />
                                    <Skeleton width="70%" height="1rem" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
