import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

// Brutalist Select Component
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: 'default' | 'bordered' | 'ghost';
  leftIcon?: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant = 'default', leftIcon, children, ...props }, ref) => {
    const variants = {
      default: 'bg-transparent border-2 border-input',
      bordered: 'bg-transparent border-4 border-input',
      ghost: 'bg-transparent border-0 border-b-2 border-input',
    };

    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {leftIcon}
          </div>
        )}
        <select
          ref={ref}
          className={cn(
            'w-full px-4 py-3 text-sm appearance-none',
            'bg-transparent',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            variants[variant],
            leftIcon && 'pl-10',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';

export interface SelectOptionProps {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectGroupProps {
  label?: string;
  options: SelectOptionProps[];
}

// Select with options
const SelectWithOptions = React.forwardRef<HTMLSelectElement, {
  options: SelectOptionProps[];
  variant?: 'default' | 'bordered' | 'ghost';
  leftIcon?: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ options, variant = 'default', leftIcon, className, ...props }, ref) => {
    return (
      <Select ref={ref} variant={variant} leftIcon={leftIcon} className={className} {...props}>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className="bg-card text-card-foreground"
          >
            {option.label}
          </option>
        ))}
      </Select>
    );
  }
);

SelectWithOptions.displayName = 'SelectWithOptions';

export { Select, SelectWithOptions };
