import React from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

// Brutalist Alert Component
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, children, ...props }, ref) => {
    const variants = {
      info: {
        container: 'bg-secondary text-secondary-foreground border-2 border-black',
        icon: <Info className="w-4 h-4" />,
      },
      success: {
        container: 'bg-success text-success-foreground border-2 border-black',
        icon: <CheckCircle className="w-4 h-4" />,
      },
      warning: {
        container: 'bg-warning text-warning-foreground border-2 border-black',
        icon: <AlertTriangle className="w-4 h-4" />,
      },
      error: {
        container: 'bg-destructive text-destructive-foreground border-2 border-black',
        icon: <XCircle className="w-4 h-4" />,
      },
    };

    const { container, icon } = variants[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn('flex items-start gap-3 p-4', container, className)}
        {...props}
      >
        <div className="flex-shrink-0">{icon}</div>
        <div className="flex-1">
          {title && <h5 className="font-bold mb-1">{title}</h5>}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

// Alert Description
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm', className)} {...props} />
));

AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription };
