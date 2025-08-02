import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';

export interface StyleCardProps {
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
}

function StyleCard({ style, isSelected, onSelect }: StyleCardProps) {
  const { t } = useTranslation();

  return (
    <Card 
      className={`
        cursor-pointer transition-all duration-200 hover:scale-105 relative overflow-hidden
        ${isSelected 
          ? 'ring-2 ring-primary bg-primary/5 border-primary' 
          : 'hover:bg-accent border-border'
        }
      `}
      onClick={onSelect}
    >
      {/* Popularity Badge */}
      {style.popularity && (
        <div className="absolute top-2 right-2 z-10">
          <Badge 
            variant={style.popularity === 'hot' ? 'default' : 'secondary'}
            className="text-xs px-2 py-1 text-white"
          >
            {style.popularity === 'hot' ? t('styles.hot') : t('styles.trending')}
          </Badge>
        </div>
      )}

      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${style.color} opacity-10`} />

      <CardContent className="p-4 relative">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">{style.emoji}</span>
            <h3 className="font-semibold text-sm">{style.name}</h3>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed">
            {style.description}
          </p>

          {/* Example */}
          <div className="mt-3 p-2 bg-muted/50 rounded text-xs text-muted-foreground italic">
            "{style.example.length > 50 ? style.example.substring(0, 50) + '...' : style.example}"
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StyleCard;