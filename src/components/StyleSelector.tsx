
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { Zap, Crown, Heart, Sparkles, Coffee, Briefcase, Palette, Users } from 'lucide-react';

interface Style {
  id: string;
  name: string;
  description: string;
  example: string;
  category: string;
  emoji: string;
  popularity?: 'hot' | 'trending';
  gradient: string;
  icon: React.ReactNode;
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
      emoji: '💼',
      gradient: 'from-slate-500 to-gray-600',
      icon: <Briefcase className="h-4 w-4" />
    },
    {
      id: 'millennial-pro',
      name: t('style.millennial-pro.name'),
      description: t('style.millennial-pro.desc'),
      example: t('style.millennial-pro.example'),
      category: 'Moderne',
      emoji: '🚀',
      popularity: 'hot',
      gradient: 'from-blue-500 to-cyan-600',
      icon: <Zap className="h-4 w-4" />
    },
    {
      id: 'personal',
      name: t('style.personal.name'),
      description: t('style.personal.desc'),
      example: t('style.personal.example'),
      category: 'Décontracté',
      emoji: '😊',
      gradient: 'from-green-500 to-emerald-600',
      icon: <Heart className="h-4 w-4" />
    },
    {
      id: 'creative',
      name: t('style.creative.name'),
      description: t('style.creative.desc'),
      example: t('style.creative.example'),
      category: 'Original',
      emoji: '🌟',
      gradient: 'from-purple-500 to-violet-600',
      icon: <Palette className="h-4 w-4" />
    },
    {
      id: 'minimalist',
      name: t('style.minimalist.name'),
      description: t('style.minimalist.desc'),
      example: t('style.minimalist.example'),
      category: 'Concis',
      emoji: '⚡',
      popularity: 'trending',
      gradient: 'from-orange-500 to-red-500',
      icon: <Coffee className="h-4 w-4" />
    },
    {
      id: 'gen-z',
      name: t('style.gen-z.name'),
      description: t('style.gen-z.desc'),
      example: t('style.gen-z.example'),
      category: 'Tendance',
      emoji: '✨',
      popularity: 'hot',
      gradient: 'from-pink-500 to-rose-600',
      icon: <Sparkles className="h-4 w-4" />
    },
    {
      id: 'formal',
      name: t('style.formal.name'),
      description: t('style.formal.desc'),
      example: t('style.formal.example'),
      category: 'Protocole',
      emoji: '🎩',
      gradient: 'from-indigo-600 to-purple-700',
      icon: <Crown className="h-4 w-4" />
    },
    {
      id: 'friendly',
      name: t('style.friendly.name'),
      description: t('style.friendly.desc'),
      example: t('style.friendly.example'),
      category: 'Convivial',
      emoji: '💙',
      gradient: 'from-cyan-500 to-blue-600',
      icon: <Users className="h-4 w-4" />
    }
  ];

  return (
    <Card className="w-full shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-gray-800">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-md">
            <span className="text-xl">🎨</span>
          </div>
          <div>
            <div className="text-lg font-bold">{t('styles.title')}</div>
            <div className="text-sm font-normal text-gray-600 mt-1">{t('styles.subtitle')}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {styles.map((style) => (
          <Button
            key={style.id}
            variant={selectedStyle === style.id ? "default" : "outline"}
            className={`w-full p-3 h-auto text-left justify-start relative transition-all duration-200 ${
              selectedStyle === style.id 
                ? `bg-gradient-to-r ${style.gradient} text-white border-transparent shadow-md` 
                : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onStyleSelect(style.id)}
          >
            <div className="flex items-center gap-3 w-full">
              <div className={`p-1.5 rounded-md transition-all duration-200 ${
                selectedStyle === style.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {style.icon}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-semibold text-sm ${selectedStyle === style.id ? 'text-white' : 'text-gray-800'}`}>
                    {style.emoji} {style.name}
                  </span>
                  {style.popularity && (
                    <Badge 
                      variant="secondary" 
                      className={`text-xs px-1.5 py-0.5 font-medium ${
                        style.popularity === 'hot' 
                          ? 'bg-red-100 text-red-600 border-red-200' 
                          : 'bg-orange-100 text-orange-600 border-orange-200'
                      }`}
                    >
                      {style.popularity === 'hot' ? (
                        <>🔥</>
                      ) : (
                        <>📈</>
                      )}
                    </Badge>
                  )}
                </div>
                <p className={`text-xs ${selectedStyle === style.id ? 'text-white/80' : 'text-gray-500'}`}>
                  {style.description}
                </p>
              </div>
            </div>
            {selectedStyle === style.id && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default StyleSelector;
