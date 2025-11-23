import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  icon?: ReactNode;
  action?: ReactNode;
  footer?: ReactNode;
  variant?: 'default' | 'highlighted' | 'warning' | 'danger' | 'hoverable';
  className?: string;
  onClick?: () => void;
}

export const Card = ({
  children,
  title,
  icon,
  action,
  footer,
  variant = 'default',
  className = '',
  onClick,
}: CardProps) => {
  const baseStyles = 'bg-card rounded-xl shadow-card p-6';
  
  const variantStyles = {
    default: '',
    highlighted: 'border-l-4 border-primary',
    warning: 'border-l-4 border-accent-amber',
    danger: 'border-l-4 border-accent-red',
    hoverable: 'cursor-pointer hover-lift',
  };
  
  const Component = variant === 'hoverable' || onClick ? motion.div : 'div';
  const motionProps = variant === 'hoverable' || onClick
    ? {
        whileHover: { scale: 1.01, y: -4 },
        transition: { duration: 0.2 },
      }
    : {};
  
  return (
    <Component
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      {...motionProps}
    >
      {(title || icon || action) && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && <div className="text-primary">{icon}</div>}
            {title && <h3 className="text-lg font-semibold text-navy">{title}</h3>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      
      <div>{children}</div>
      
      {footer && (
        <div className="mt-4 pt-4 border-t border-border-gray">
          {footer}
        </div>
      )}
    </Component>
  );
};
