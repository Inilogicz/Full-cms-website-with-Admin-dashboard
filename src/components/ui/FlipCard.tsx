'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FlipCardProps {
    front: React.ReactNode;
    back: React.ReactNode;
    height?: string;
    className?: string;
}

export default function FlipCard({ front, back, height = '320px', className = '' }: FlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className={`perspective-1000 group ${className}`}
            style={{ height }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <motion.div
                className="preserve-3d relative w-full h-full duration-700"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front */}
                <div className="backface-hidden absolute inset-0 w-full h-full">
                    {front}
                </div>

                {/* Back */}
                <div className="backface-hidden rotate-y-180 absolute inset-0 w-full h-full" style={{ transform: 'rotateY(180deg)' }}>
                    {back}
                </div>
            </motion.div>
        </div>
    );
}
