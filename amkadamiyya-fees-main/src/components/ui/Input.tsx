import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  error?: string;
  success?: boolean;
  currencyPrefix?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, error, success, currencyPrefix, className = '', ...props }, ref) => {
    const baseStyles = 'w-full h-11 px-4 rounded-lg border-2 transition-all duration-200 outline-none font-medium';
    const iconPadding = icon ? 'pl-11' : '';
    const currencyPadding = currencyPrefix ? 'pl-8' : '';
    
    const stateStyles = error
      ? 'border-accent-red focus:border-accent-red'
      : success
      ? 'border-primary focus:border-primary'
      : 'border-border-gray focus:border-primary focus:ring-2 focus:ring-primary/20';
    
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray pointer-events-none">
            {icon}
          </div>
        )}
        {currencyPrefix && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray font-semibold pointer-events-none">
            ₦
          </div>
        )}
        <input
          ref={ref}
          className={`${baseStyles} ${iconPadding} ${currencyPadding} ${stateStyles} ${className}`}
          {...props}
        />
        {success && !error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        {error && (
          <p className="mt-1 text-sm text-accent-red flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
