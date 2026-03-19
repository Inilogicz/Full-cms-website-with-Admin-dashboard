'use client';

import Modal from './Modal';
import { AlertTriangle } from 'lucide-react';

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
    const confirmColor = variant === 'danger' ? 'var(--error)' : variant === 'warning' ? 'var(--warning)' : 'var(--primary)';

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="400px">
            <div style={{ textAlign: 'center' }}>
                <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: variant === 'danger' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    color: confirmColor
                }}>
                    <AlertTriangle size={32} />
                </div>

                <h4 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '12px', color: 'var(--gray-900)' }}>{title}</h4>
                <p style={{ fontSize: '0.9375rem', color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: '32px' }}>
                    {message}
                </p>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        className="btn btn-ghost"
                        style={{ flex: 1 }}
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </button>
                    <button
                        className="btn"
                        style={{
                            flex: 1,
                            background: confirmColor,
                            color: 'white'
                        }}
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : confirmText}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
