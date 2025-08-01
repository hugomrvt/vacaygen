
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface StyleCardProps {
  style: {
    id: string;
    name: string;
    description: string;
    example: string;
    emoji: string;
    color: string;
    popularity?: 'hot' | 'trending';
  };
  isSelected: boolean;
  onSelect: () => void;
  onPreview: (example: string) => void;
}

const StyleCard = ({ style, isSelected, onSelect, onPreview }: StyleCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer
        transform hover:scale-105 active:scale-95
        ${isSelected 
          ? `border-blue-500 bg-gradient-to-br ${style.color} text-white shadow-xl` 
          : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg'
        }
      `}
      onClick={onSelect}
      onMouseEnter={() => {
        setIsHovered(true);
        onPreview(style.example);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popularity Badge */}
      {style.popularity && (
        <div className="absolute -top-2 -right-2 z-10">
          <Badge 
            variant="secondary" 
            className={`text-xs px-2 py-1 font-bold animate-pulse ${
              style.popularity === 'hot' 
                ? 'bg-red-500 text-white' 
                : 'bg-orange-500 text-white'
            }`}
          >
            {style.popularity === 'hot' ? '🔥 HOT' : '📈 TREND'}
          </Badge>
        </div>
      )}

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-1 -left-1 w-6 h-6 bg-green-400 rounded-full border-4 border-white animate-bounce flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
      )}

      {/* Content */}
      <div className="text-center">
        <div className={`text-4xl mb-2 transition-transform duration-200 ${
          isHovered ? 'scale-110 animate-bounce' : ''
        }`}>
          {style.emoji}
        </div>
        
        <h3 className={`font-bold text-lg mb-2 ${
          isSelected ? 'text-white' : 'text-gray-800'
        }`}>
          {style.name}
        </h3>
        
        <p className={`text-sm mb-3 ${
          isSelected ? 'text-blue-100' : 'text-gray-600'
        }`}>
          {style.description}
        </p>

        {/* Preview on Hover */}
        {isHovered && !isSelected && (
          <div className="absolute inset-0 bg-black/80 rounded-xl flex items-center justify-center p-4 animate-fade-in">
            <p className="text-white text-xs italic text-center">
              "{style.example.slice(0, 60)}..."
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StyleCard;
