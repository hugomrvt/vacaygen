
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Rocket, Sparkles, Briefcase, Star, Smile, Zap } from 'lucide-react';

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

  const getIconComponent = (emojiKey: string) => {
    const iconMap = {
      '🚀': Rocket,
      '✨': Sparkles,
      '💼': Briefcase,
      '🌟': Star,
      '😊': Smile,
      '⚡': Zap
    };
    return iconMap[emojiKey as keyof typeof iconMap] || Star;
  };

  const IconComponent = getIconComponent(style.emoji);

  return (
    <div
      className={`
        relative glass-card p-4 transition-all duration-300 cursor-pointer
        transform hover:scale-105 active:scale-95 hover:shadow-2xl
        ${isSelected 
          ? 'ring-2 ring-primary bg-primary/5 border-primary/30' 
          : 'hover:border-primary/20'
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
            className={`text-xs px-2 py-1 font-bold animate-pulse border ${
              style.popularity === 'hot' 
                ? 'bg-destructive/10 text-destructive border-destructive/20' 
                : 'bg-warning/10 text-warning border-warning/20'
            }`}
          >
            {style.popularity === 'hot' ? '🔥 HOT' : '📈 TREND'}
          </Badge>
        </div>
      )}

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-1 -left-1 w-5 h-5 bg-success rounded-full border-2 border-background animate-pulse flex items-center justify-center">
          <div className="w-2 h-2 bg-background rounded-full" />
        </div>
      )}

      {/* Content */}
      <div className="text-center">
        <div className={`mb-3 transition-transform duration-200 flex justify-center ${
          isHovered ? 'scale-110' : ''
        }`}>
          <IconComponent className={`w-8 h-8 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
        </div>
        
        <h3 className={`font-bold text-base mb-2 ${
          isSelected ? 'text-primary' : 'text-foreground'
        }`}>
          {style.name}
        </h3>
        
        <p className="text-xs mb-3 text-muted-foreground leading-relaxed">
          {style.description}
        </p>

        {/* Preview on Hover */}
        {isHovered && !isSelected && (
          <div className="absolute inset-0 bg-background/95 backdrop-blur-sm rounded-lg flex items-center justify-center p-4 animate-fade-in border border-primary/20">
            <div className="text-center">
              <div className="text-primary text-xs font-medium mb-2">Aperçu</div>
              <p className="text-foreground text-xs italic">
                "{style.example.slice(0, 80)}..."
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StyleCard;
