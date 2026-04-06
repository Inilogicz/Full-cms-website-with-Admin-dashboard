'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    onClose: () => void;
    duration?: number;
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
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
};

export default function Toast({ type, message, onClose, duration = 5000 }: ToastProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.02 }}
            style={{
                pointerEvents: 'auto',
                minWidth: '320px',
                maxWidth: '480px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(12px)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                margin: '8px 0'
            }}
        >
            {/* Background Accent */}
            <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '6px',
                background: borderColors[type],
                zIndex: 2
            }} />

            <div style={{
                position: 'absolute',
                inset: 0,
                background: bgColors[type],
                zIndex: 0,
                opacity: 0.5
            }} />

            <div style={{ 
                position: 'relative', 
                zIndex: 1, 
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
                {icons[type]}
            </div>

            <p style={{
                position: 'relative',
                zIndex: 1,
                fontSize: '0.9375rem',
                fontWeight: 700,
                margin: 0,
                color: 'var(--gray-900)',
                flex: 1,
                lineHeight: 1.4
            }}>
                {message}
            </p>

            <button
                onClick={onClose}
                style={{
                    position: 'relative',
                    zIndex: 1,
                    background: 'rgba(0,0,0,0.05)',
                    border: 'none',
                    color: 'var(--gray-500)',
                    cursor: 'pointer',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    flexShrink: 0
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.05)')}
            >
                <X size={14} />
            </button>

            {/* Progress Bar */}
            <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: duration / 1000, ease: 'linear' }}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '3px',
                    background: borderColors[type],
                    opacity: 0.6,
                    zIndex: 3
                }}
            />
        </motion.div>
    );
}
