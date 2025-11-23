import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'small' | 'medium' | 'large' | 'full';
  closeOnBackdrop?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  icon,
  children,
  footer,
  size = 'medium',
  closeOnBackdrop = true,
}: ModalProps) => {
  const sizeStyles = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl',
    full: 'max-w-7xl',
  };
  
  // Prevent body scroll when modal is open
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
  
  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOnBackdrop ? onClose : undefined}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`relative bg-card rounded-2xl shadow-2xl w-full ${sizeStyles[size]} max-h-[90vh] flex flex-col`}
          >
            {/* Header */}
            {(title || icon) && (
              <div className="flex items-center justify-between p-6 border-b border-border-gray">
                <div className="flex items-center gap-3">
                  {icon && <div className="text-primary">{icon}</div>}
                  {title && <h2 className="text-xl font-semibold text-navy">{title}</h2>}
                </div>
                <button
                  onClick={onClose}
                  className="text-gray hover:text-navy transition-colors tap-scale"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            )}
            
            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>
            
            {/* Footer */}
            {footer && (
              <div className="flex items-center justify-end gap-3 p-6 border-t border-border-gray">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
