import React from 'react';
import { cn } from '@/lib/utils';

// Brutalist Textarea Component
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'bordered' | 'ghost';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-transparent border-2 border-input',
      bordered: 'bg-transparent border-4 border-input',
      ghost: 'bg-transparent border-0 border-b-2 border-input',
    };

    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full px-4 py-3 text-sm placeholder:text-muted-foreground',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'resize-none', // Brutalist: no resize handle
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
