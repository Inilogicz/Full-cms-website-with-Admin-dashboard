import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Corporate Gallery',
    description: 'Explore our factory operations, production lines, quality testing, packaging, and community outreach activities.',
};

const defaultGallery = [
    { id: '1', caption: 'Production Line in Action', category: 'Factory', emoji: '🏭' },
    { id: '2', caption: 'Quality Testing Laboratory', category: 'Quality', emoji: '🔬' },
    { id: '3', caption: 'Packaging Department', category: 'Packaging', emoji: '📦' },
    { id: '4', caption: 'Raw Material Warehouse', category: 'Factory', emoji: '🏗️' },
    { id: '5', caption: 'Community Health Outreach', category: 'Community', emoji: '❤️' },
    { id: '6', caption: 'Product Display Showroom', category: 'Products', emoji: '🛍️' },
    { id: '7', caption: 'Staff Training Session', category: 'Team', emoji: '👥' },
    { id: '8', caption: 'Final Product Inspection', category: 'Quality', emoji: '✅' },
    { id: '9', caption: 'Factory Aerial View', category: 'Factory', emoji: '🏢' },
];

const categories = ['All', 'Factory', 'Quality', 'Packaging', 'Community', 'Products', 'Team'];

export default function GalleryPage() {
    return (
        <>
            <section style={{ paddingTop: '160px', paddingBottom: '80px', background: 'var(--gradient-hero)' }}>
                <div className="container">
                    <span className="section-label" style={{ color: 'var(--accent-light)' }}>Gallery</span>
                    <h1 style={{ color: 'var(--white)', maxWidth: '640px', marginBottom: '20px' }}>Corporate Gallery</h1>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.125rem', maxWidth: '560px', lineHeight: 1.7 }}>
                        A visual journey through our manufacturing excellence, community impact, and company culture.
                    </p>
                </div>
            </section>

            <section style={{ borderBottom: '1px solid var(--gray-100)', background: 'var(--white)' }}>
                <div className="container" style={{ display: 'flex', gap: '8px', padding: '16px 24px', overflowX: 'auto' }}>
                    {categories.map(cat => (
                        <span key={cat} className="badge badge-primary" style={{ cursor: 'pointer', whiteSpace: 'nowrap', padding: '8px 16px' }}>
                            {cat}
                        </span>
                    ))}
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '20px',
                    }}>
                        {defaultGallery.map((item) => (
                            <div key={item.id} className="card" style={{ cursor: 'pointer' }}>
                                <div style={{
                                    aspectRatio: '4/3',
                                    background: 'var(--gradient-card)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '64px',
                                }}>
                                    {item.emoji}
                                </div>
                                <div className="card-body" style={{ padding: '16px 20px' }}>
                                    <span className="badge badge-primary" style={{ marginBottom: '8px', fontSize: '0.6875rem' }}>{item.category}</span>
                                    <p style={{ fontSize: '0.9375rem', color: 'var(--gray-700)', fontWeight: 500 }}>{item.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
