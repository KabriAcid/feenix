import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'small' | 'medium' | 'large';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  uppercase?: boolean;
  className?: string;
}

export const Badge = ({
  children,
  variant = 'neutral',
  size = 'medium',
  icon,
  iconPosition = 'left',
  uppercase = false,
  className = '',
}: BadgeProps) => {
  const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full px-3 py-1';
  
  const variantStyles = {
    success: 'bg-primary-light text-primary',
    warning: 'bg-amber-100 text-accent-amber',
    danger: 'bg-red-100 text-accent-red',
    info: 'bg-blue-100 text-accent-blue',
    neutral: 'bg-light-gray text-gray',
  };
  
  const sizeStyles = {
    small: 'text-xs px-2 py-0.5',
    medium: 'text-sm px-3 py-1',
    large: 'text-base px-4 py-1.5',
  };
  
  const textTransform = uppercase ? 'uppercase' : '';
  
  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${textTransform} ${className}`}>
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </span>
  );
};
