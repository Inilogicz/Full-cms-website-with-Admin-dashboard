'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface FloatingImage {
    url: string;
    top: string;
    left: string;
    size: string;
    mobileSize?: string;
    delay?: number;
    opacity?: number;
    rotate?: number;
    hideOnMobile?: boolean;
}

interface FloatingProductBackgroundProps {
    images?: FloatingImage[];
    theme?: 'light' | 'dark';
    intensity?: number; // Adjusts how much images move
}

const defaultImages: FloatingImage[] = [
    { url: '/product1.JPG', top: '15%', left: '10%', size: '120px', mobileSize: '60px', delay: 0 },
    { url: '/product6.JPG', top: '60%', left: '5%', size: '150px', mobileSize: '80px', delay: 0.5 },
    { url: '/product10.JPG', top: '20%', left: '80%', size: '140px', mobileSize: '70px', delay: 1 },
    { url: '/product1.JPG', top: '65%', left: '85%', size: '130px', mobileSize: '65px', delay: 1.5 },
];

export default function FloatingProductBackground({
    images = defaultImages,
    theme = 'dark',
    intensity = 150
}: FloatingProductBackgroundProps) {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkCheckMobile);
        function checkCheckMobile() { checkMobile(); }
        return () => window.removeEventListener('resize', checkCheckMobile);
    }, []);

    // Parallax effects
    const y1 = useTransform(scrollY, [0, 1000], [0, intensity]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -intensity]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 0, // Lowered Z-index to ensure it stays behind everything
                overflow: 'hidden'
            }}
        >
            {images.map((img, i) => {
                if (isMobile && img.hideOnMobile) return null;

                const currentSize = isMobile ? (img.mobileSize || `calc(${img.size} * 0.6)`) : img.size;

                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: img.opacity || (theme === 'dark' ? 0.3 : 0.15),
                            scale: 1,
                            rotate: img.rotate || (i % 2 === 0 ? 5 : -5)
                        }}
                        transition={{
                            duration: 1.5,
                            delay: img.delay || 0,
                            ease: "easeOut"
                        }}
                        style={{
                            position: 'absolute',
                            top: img.top,
                            left: img.left,
                            width: currentSize,
                            height: currentSize,
                            borderRadius: '24px',
                            overflow: 'hidden',
                            border: theme === 'dark'
                                ? '1px solid rgba(255,255,255,0.1)'
                                : '1px solid rgba(10, 77, 162, 0.05)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                            y: i % 2 === 0 ? y1 : y2
                        }}
                    >
                        <img
                            src={img.url}
                            alt=""
                            loading="lazy"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: theme === 'dark'
                                    ? 'grayscale(0.4) brightness(0.7)'
                                    : 'grayscale(0.2) brightness(1.05)'
                            }}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}
