
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

interface Style {
  id: string;
  name: string;
  description: string;
  example: string;
  category: string;
  emoji: string;
  popularity?: 'hot' | 'trending';
}

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleSelect: (styleId: string) => void;
}

const StyleSelector = ({ selectedStyle, onStyleSelect }: StyleSelectorProps) => {
  const { t } = useTranslation();
  
  const styles: Style[] = [
    {
      id: 'professional',
      name: t('style.professional.name'),
      description: t('style.professional.desc'),
      example: t('style.professional.example'),
      category: 'Formel',
      emoji: '💼'
    },
    {
      id: 'millennial-pro',
      name: t('style.millennial-pro.name'),
      description: t('style.millennial-pro.desc'),
      example: t('style.millennial-pro.example'),
      category: 'Moderne',
      emoji: '🚀',
      popularity: 'hot'
    },
    {
      id: 'personal',
      name: t('style.personal.name'),
      description: t('style.personal.desc'),
      example: t('style.personal.example'),
      category: 'Décontracté',
      emoji: '😊'
    },
    {
      id: 'creative',
      name: t('style.creative.name'),
      description: t('style.creative.desc'),
      example: t('style.creative.example'),
      category: 'Original',
      emoji: '🌟'
    },
    {
      id: 'minimalist',
      name: t('style.minimalist.name'),
      description: t('style.minimalist.desc'),
      example: t('style.minimalist.example'),
      category: 'Concis',
      emoji: '⚡',
      popularity: 'trending'
    },
    {
      id: 'gen-z',
      name: t('style.gen-z.name'),
      description: t('style.gen-z.desc'),
      example: t('style.gen-z.example'),
      category: 'Tendance',
      emoji: '✨',
      popularity: 'hot'
    },
    {
      id: 'formal',
      name: t('style.formal.name'),
      description: t('style.formal.desc'),
      example: t('style.formal.example'),
      category: 'Protocole',
      emoji: '🎩'
    },
    {
      id: 'friendly',
      name: t('style.friendly.name'),
      description: t('style.friendly.desc'),
      example: t('style.friendly.example'),
      category: 'Convivial',
      emoji: '💙'
    }
  ];

  return (
    <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <span className="text-2xl">🎨</span>
          {t('styles.title')}
        </CardTitle>
        <p className="text-sm text-gray-600">
          {t('styles.subtitle')}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {styles.map((style) => (
          <Button
            key={style.id}
            variant={selectedStyle === style.id ? "default" : "outline"}
            className={`w-full p-4 h-auto text-left justify-start relative transition-all duration-200 ${
              selectedStyle === style.id 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600 shadow-lg' 
                : 'bg-white hover:bg-blue-50 border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => onStyleSelect(style.id)}
          >
            <div className="flex items-start gap-3 w-full">
              <span className="text-xl">{style.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-semibold ${selectedStyle === style.id ? 'text-white' : 'text-gray-800'}`}>
                    {style.name}
                  </span>
                  {style.popularity && (
                    <Badge 
                      variant="secondary" 
                      className={`text-xs px-2 py-0 ${
                        style.popularity === 'hot' 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-orange-100 text-orange-600'
                      }`}
                    >
                      {style.popularity === 'hot' ? t('styles.hot') : t('styles.trending')}
                    </Badge>
                  )}
                </div>
                <p className={`text-xs mb-2 ${selectedStyle === style.id ? 'text-blue-100' : 'text-gray-600'}`}>
                  {style.description}
                </p>
                <div className={`text-xs italic ${selectedStyle === style.id ? 'text-blue-200' : 'text-gray-500'}`}>
                  "{style.example}"
                </div>
              </div>
            </div>
            {selectedStyle === style.id && (
              <div className="absolute right-3 top-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </Button>
        ))}
        
        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg border border-blue-100">
          <p className="text-xs text-gray-600 text-center">
            {t('styles.tip')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StyleSelector;
