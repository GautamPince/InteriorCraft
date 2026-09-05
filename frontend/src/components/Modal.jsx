import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Reusable accessible modal component with animated overlay.
 * @param {boolean} isOpen
 * @param {() => void} onClose
 * @param {string} [title]
 * @param {'sm'|'md'|'lg'|'xl'|'2xl'|'4xl'} [maxWidth='lg']
 * @param {React.ReactNode} children
 */
export default function Modal({ isOpen, onClose, title, maxWidth = 'lg', children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthMap = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full ${maxWidthMap[maxWidth]} bg-[#FAF8F5] rounded-xl shadow-2xl border border-[#E8E1D7] overflow-hidden z-10 my-8`}
        style={{ animation: 'modalIn 0.2s ease-out' }}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E1D7] bg-[#F4EFEA]">
            <h3 className="text-xl font-serif text-[#242220] font-normal">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#7A7268] hover:text-[#242220] rounded-lg hover:bg-[#E8E1D7] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
