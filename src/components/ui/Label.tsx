import React from 'react';
import { cn } from '@/lib/utils';

// Brutalist Label Component
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  variant?: 'default' | 'bold' | 'muted';
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'text-foreground',
      bold: 'text-foreground font-bold',
      muted: 'text-muted-foreground',
    };

    return (
      <label
        ref={ref}
        className={cn(
          'text-sm font-medium leading-none',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Label.displayName = 'Label';

export { Label };
