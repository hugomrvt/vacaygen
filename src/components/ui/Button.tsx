import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

// Brutalist Button Component
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Brutalist button styles
    const baseStyles = `
      inline-flex items-center justify-center font-bold uppercase tracking-wider
      border-2 border-black transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const variants = {
      primary: `
        bg-primary text-primary-foreground
        hover:bg-primary-light hover:border-primary-dark
        active:bg-primary-dark active:border-black
      `,
      secondary: `
        bg-secondary text-secondary-foreground
        hover:bg-secondary-light hover:border-secondary-dark
        active:bg-secondary-dark active:border-black
      `,
      outline: `
        bg-transparent text-foreground
        hover:bg-black hover:text-white
        active:bg-gray-800 active:text-white
      `,
      ghost: `
        bg-transparent text-foreground
        hover:bg-muted hover:text-foreground
        active:bg-muted/80 active:text-foreground
        border-0
      `,
      destructive: `
        bg-destructive text-destructive-foreground
        hover:bg-red-700 hover:border-red-900
        active:bg-red-900 active:border-black
      `,
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-none animate-spin" />
            <span>Loading...</span>
          </div>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
