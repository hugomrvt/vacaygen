import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import StyleCard from '../StyleCard';

export interface Style {
  id: string;
  name: string;
  description: string;
  example: string;
  emoji: string;
  color: string;
  popularity?: 'hot' | 'trending';
}

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleSelect: (styleId: string) => void;
}

export function StyleSelector({ selectedStyle, onStyleSelect }: StyleSelectorProps) {
  const { t } = useTranslation();

  const styles: Style[] = [
    {
      id: 'millennial-pro',
      name: t('style.millennial-pro.name'),
      description: t('style.millennial-pro.desc'),
      example: t('style.millennial-pro.example'),
      emoji: '🚀',
      color: 'from-blue-500 to-cyan-500',
      popularity: 'hot' as const
    },
    {
      id: 'gen-z',
      name: t('style.gen-z.name'),
      description: t('style.gen-z.desc'),
      example: t('style.gen-z.example'),
      emoji: '✨',
      color: 'from-pink-500 to-purple-500',
      popularity: 'trending' as const
    },
    {
      id: 'professional',
      name: t('style.professional.name'),
      description: t('style.professional.desc'),
      example: t('style.professional.example'),
      emoji: '💼',
      color: 'from-gray-600 to-gray-700'
    },
    {
      id: 'creative',
      name: t('style.creative.name'),
      description: t('style.creative.desc'),
      example: t('style.creative.example'),
      emoji: '🌟',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'friendly',
      name: t('style.friendly.name'),
      description: t('style.friendly.desc'),
      example: t('style.friendly.example'),
      emoji: '😊',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'minimalist',
      name: t('style.minimalist.name'),
      description: t('style.minimalist.desc'),
      example: t('style.minimalist.example'),
      emoji: '⚡',
      color: 'from-slate-500 to-zinc-600'
    }
  ];

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          {t('styles.title')}
        </CardTitle>
        <CardDescription>
          {t('styles.subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {styles.map(style => (
            <StyleCard 
              key={style.id} 
              style={style} 
              isSelected={selectedStyle === style.id} 
              onSelect={() => onStyleSelect(style.id)} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}