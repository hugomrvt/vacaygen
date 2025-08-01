
import React from 'react';
import { Users, Handshake, Briefcase, Globe } from 'lucide-react';

interface TogglePillsProps {
  options: { id: string; label: string; icon: string; color: string }[];
  selectedOptions: string[];
  onToggle: (optionId: string) => void;
  multiSelect?: boolean;
}

const TogglePills = ({ options, selectedOptions, onToggle, multiSelect = true }: TogglePillsProps) => {
  const getIconComponent = (iconKey: string) => {
    const iconMap = {
      '👥': Users,
      '🤝': Handshake,
      '👔': Briefcase,
      '🌐': Globe
    };
    return iconMap[iconKey as keyof typeof iconMap] || Users;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selectedOptions.includes(option.id);
        const IconComponent = getIconComponent(option.icon);
        
        return (
          <button
            key={option.id}
            onClick={() => onToggle(option.id)}
            className={`
              relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
              transition-all duration-200 transform hover:scale-105 active:scale-95
              ${isSelected 
                ? `bg-gradient-to-r ${option.color} text-white shadow-lg` 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }
            `}
          >
            <IconComponent className="w-4 h-4" />
            <span>{option.label}</span>
            
            {isSelected && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-bounce" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TogglePills;
