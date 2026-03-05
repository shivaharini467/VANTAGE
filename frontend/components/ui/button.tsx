import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'md', className = '', children, ...props }, ref) => {
    const baseClass = 'rounded-lg font-medium transition-colors flex items-center justify-center';
    const sizeClass = size === 'sm' ? 'px-3 py-1 text-sm' : size === 'lg' ? 'px-6 py-3 text-lg' : 'px-4 py-2';
    const variantClass = variant === 'outline' 
      ? 'border border-border bg-transparent text-foreground hover:bg-secondary'
      : 'bg-primary text-primary-foreground hover:bg-primary/90';
    
    return (
      <button
        ref={ref}
        className={`${baseClass} ${sizeClass} ${variantClass} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
