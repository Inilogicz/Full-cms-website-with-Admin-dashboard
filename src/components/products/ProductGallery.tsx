'use client';

import { useState } from 'react';

interface ProductImage {
    id: string;
    cloudinaryUrl: string;
}

interface ProductGalleryProps {
    images: ProductImage[];
    productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const mainImageUrl = images.length > 0 ? images[activeIndex].cloudinaryUrl : '/image.png';

    return (
        <div className="product-gallery-container">
            <div style={{
                aspectRatio: '1',
                overflow: 'hidden',
                border: '1px solid #E2E8F0',
                boxShadow: '0 20px 50px -12px rgba(0,0,0,0.05)',
                padding: '40px',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <img
                    src={mainImageUrl}
                    alt={`${productName} - View ${activeIndex + 1}`}
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'contain',
                        transition: 'opacity 0.3s ease'
                    }}
                />
            </div>

            {images.length > 1 && (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', 
                    gap: '16px', 
                    marginTop: '24px' 
                }}>
                    {images.map((img, i) => (
                        <button
                            key={img.id}
                            onClick={() => setActiveIndex(i)}
                            style={{
                                aspectRatio: '1',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                border: i === activeIndex ? '2px solid var(--primary)' : '1px solid var(--gray-100)',
                                cursor: 'pointer',
                                padding: '8px',
                                background: 'white',
                                transition: 'all 0.2s ease',
                                transform: i === activeIndex ? 'scale(1.05)' : 'scale(1)',
                                boxShadow: i === activeIndex ? 'var(--shadow-md)' : 'none'
                            }}
                            aria-label={`View image ${i + 1}`}
                        >
                            <img 
                                src={img.cloudinaryUrl} 
                                alt={`${productName} thumbnail ${i + 1}`}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
