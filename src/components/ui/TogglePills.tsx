import React from 'react';
import { cn } from '@/lib/utils';

// Brutalist Toggle Pills Component
export interface TogglePillsOption {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface TogglePillsProps {
  options: TogglePillsOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  multiSelect?: boolean;
}

const TogglePills: React.FC<TogglePillsProps> = ({
  options,
  selectedValues,
  onToggle,
  multiSelect = true,
}) => {
  const handleToggle = (option: TogglePillsOption) => {
    if (option.disabled) return;
    
    if (multiSelect) {
      onToggle(option.id);
    } else {
      // Single select: if already selected, do nothing; otherwise select this one
      if (selectedValues.includes(option.id)) {
        onToggle('');
      } else {
        onToggle(option.id);
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.id);
        
        return (
          <button
            key={option.id}
            onClick={() => handleToggle(option)}
            disabled={option.disabled}
            className={cn(
              'px-4 py-2 text-sm font-medium border-2 border-black transition-colors',
              isSelected 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-transparent text-foreground hover:bg-muted',
              option.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export { TogglePills };
