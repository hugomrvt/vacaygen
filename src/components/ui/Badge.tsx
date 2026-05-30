import React from 'react';
import { cn } from '@/lib/utils';

// Brutalist Badge Component
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'success' | 'warning' | 'muted';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', size = 'md', dot = false, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-primary-foreground border-1 border-black',
      secondary: 'bg-secondary text-secondary-foreground border-1 border-black',
      destructive: 'bg-destructive text-destructive-foreground border-1 border-black',
      success: 'bg-success text-success-foreground border-1 border-black',
      warning: 'bg-warning text-warning-foreground border-1 border-black',
      muted: 'bg-muted text-muted-foreground border-1 border-border',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-xs',
      lg: 'px-4 py-1.5 text-sm',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-bold uppercase tracking-wider',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span className="w-1.5 h-1.5 bg-black rounded-full mr-1.5" />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
