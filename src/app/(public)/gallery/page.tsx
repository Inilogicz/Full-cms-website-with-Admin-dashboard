import { motion } from 'framer-motion';
import { prisma } from '@/lib/prisma';
import GalleryContent from '@/components/gallery/GalleryContent';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
    const items = await prisma.galleryItem.findMany({
        orderBy: { order: 'asc' }
    });

    return (
        <div className="gallery-wrapper">
            {/* Hero Section - Lightened */}
            <section style={{
                paddingTop: '160px',
                paddingBottom: '100px',
                background: 'linear-gradient(to bottom, #f8faff 0%, #ffffff 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div>
                        <span className="section-label" style={{ color: 'var(--gold-dark)', fontWeight: 800 }}>Visual Journey</span>
                        <h1 style={{ color: 'var(--primary-dark)', marginBottom: '24px', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900 }}>
                            Manufacturing <br />
                            <span className="text-gradient-gold">Excellence in Action</span>
                        </h1>
                        <p style={{ color: 'var(--gray-600)', fontSize: '1.25rem', maxWidth: '600px', lineHeight: 1.7 }}>
                            A visual showcase of our state-of-the-art facilities, dedicated team, and community impact.
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

            <GalleryContent items={items.map(item => ({
                id: item.id,
                caption: item.caption,
                category: item.category,
                imageUrl: item.imageUrl
            }))} />

        </div>
    );
}
