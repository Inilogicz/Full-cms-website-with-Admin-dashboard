'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    borderRadius?: string;
    className?: string;
}

export default function Skeleton({ width, height, borderRadius = 'var(--radius-md)', className = '' }: SkeletonProps) {
    return (
        <motion.div
            initial={{ opacity: 0.6 }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className={`skeleton ${className}`}
            style={{
                width: width || '100%',
                height: height || '1rem',
                borderRadius,
            }}
        />
    );
}

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        {Array.from({ length: cols }).map((_, i) => (
                            <th key={i}><Skeleton width="60%" height="1.2rem" /></th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, i) => (
                        <tr key={i}>
                            {Array.from({ length: cols }).map((_, j) => (
                                <td key={j}><Skeleton width={j === 0 ? '80%' : '50%'} height="1rem" /></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <Skeleton height="200px" borderRadius="0" />
            <div style={{ padding: '20px' }}>
                <Skeleton width="40%" height="0.8rem" className="mb-2" />
                <Skeleton width="90%" height="1.2rem" className="mb-4" />
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Skeleton width="32px" height="32px" borderRadius="50%" />
                    <Skeleton width="60%" height="1rem" />
                </div>
            </div>
        </div>
    );
}
