'use client';

import Modal from './Modal';
import { AlertTriangle, Info, AlertOctagon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
    isLoading?: boolean;
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger',
    isLoading = false
}: ConfirmModalProps) {
    const colors = {
        danger: { main: 'var(--error)', bg: 'rgba(239, 68, 68, 0.1)', icon: AlertOctagon },
        warning: { main: 'var(--warning)', bg: 'rgba(245, 158, 11, 0.1)', icon: AlertTriangle },
        info: { main: 'var(--primary)', bg: 'rgba(59, 130, 246, 0.1)', icon: Info },
    };

    const config = colors[variant];
    const Icon = config.icon;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="420px">
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                    style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '24px',
                        background: config.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        color: config.main,
                        boxShadow: `0 8px 16px -4px ${config.bg}`
                    }}
                >
                    <Icon size={36} strokeWidth={2.5} />
                </motion.div>

                <h4 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 800, 
                    marginBottom: '12px', 
                    color: 'var(--gray-900)',
                    letterSpacing: '-0.01em'
                }}>
                    {title}
                </h4>
                
                <p style={{ 
                    fontSize: '0.9375rem', 
                    color: 'var(--gray-500)', 
                    lineHeight: 1.6, 
                    marginBottom: '32px',
                    padding: '0 10px'
                }}>
                    {message}
                </p>

                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                    <button
                        className="btn btn-ghost"
                        style={{ 
                            flex: 1, 
                            fontWeight: 700, 
                            fontSize: '0.9375rem',
                            height: '48px'
                        }}
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </button>
                    <button
                        className="btn"
                        style={{
                            flex: 1,
                            background: config.main,
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '0.9375rem',
                            height: '48px',
                            boxShadow: `0 4px 12px -2px ${config.bg}`
                        }}
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                <div className="spinner-small" />
                                <span>Processing...</span>
                            </div>
                        ) : confirmText}
                    </button>
                </div>
            </div>

            <style jsx global>{`
                .spinner-small {
                    width: 16px;
                    height: 16px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </Modal>
    );
}
