'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    onClose: () => void;
}

const icons = {
    success: <CheckCircle className="text-success" size={20} />,
    error: <XCircle className="text-error" size={20} />,
    warning: <AlertCircle className="text-warning" size={20} />,
    info: <Info className="text-info" size={20} />,
};

const bgColors = {
    success: 'rgba(16, 185, 129, 0.1)',
    error: 'rgba(239, 68, 68, 0.1)',
    warning: 'rgba(245, 158, 11, 0.1)',
    info: 'rgba(59, 130, 246, 0.1)',
};

const borderColors = {
    success: 'var(--success)',
    error: 'var(--error)',
    warning: 'var(--warning)',
    info: 'var(--info)',
};

export default function Toast({ type, message, onClose }: ToastProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            style={{
                pointerEvents: 'auto',
                minWidth: '300px',
                maxWidth: '450px',
                background: 'white',
                borderLeft: `4px solid ${borderColors[type]}`,
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div style={{
                position: 'absolute',
                inset: 0,
                background: bgColors[type],
                zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
                {icons[type]}
            </div>

            <p style={{
                position: 'relative',
                zIndex: 1,
                fontSize: '0.9375rem',
                fontWeight: 600,
                margin: 0,
                color: 'var(--gray-800)',
                flex: 1
            }}>
                {message}
            </p>

            <button
                onClick={onClose}
                style={{
                    position: 'relative',
                    zIndex: 1,
                    background: 'none',
                    border: 'none',
                    color: 'var(--gray-400)',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gray-600)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gray-400)')}
            >
                <X size={16} />
            </button>
        </motion.div>
    );
}
