
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { Zap, Crown, Heart, Sparkles2, Coffee, Briefcase, Palette, Users } from 'lucide-react';

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
      icon: <Sparkles2 className="h-4 w-4" />
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
    <Card className="w-full shadow-xl border-0 bg-gradient-to-br from-white via-purple-50/20 to-pink-50/20 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full -translate-y-16 -translate-x-16"></div>
        <CardTitle className="flex items-center gap-3 text-gray-800 relative z-10">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg">
            <span className="text-2xl">🎨</span>
          </div>
          <div>
            <div className="text-xl font-bold">{t('styles.title')}</div>
            <div className="text-sm font-normal text-gray-600 mt-1">✨ Choisissez votre style</div>
          </div>
        </CardTitle>
        <p className="text-sm text-gray-600 mt-2 relative z-10">
          {t('styles.subtitle')} 🚀
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {styles.map((style, index) => (
          <Button
            key={style.id}
            variant={selectedStyle === style.id ? "default" : "outline"}
            className={`w-full p-4 h-auto text-left justify-start relative transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group ${
              selectedStyle === style.id 
                ? `bg-gradient-to-r ${style.gradient} text-white border-transparent shadow-lg scale-[1.02]` 
                : 'bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-white border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onStyleSelect(style.id)}
            style={{
              animationDelay: `${index * 50}ms`
            }}
          >
            <div className="flex items-start gap-4 w-full">
              <div className={`p-2 rounded-lg transition-all duration-200 ${
                selectedStyle === style.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
              }`}>
                {style.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`font-bold text-base ${selectedStyle === style.id ? 'text-white' : 'text-gray-800'}`}>
                    {style.emoji} {style.name}
                  </span>
                  {style.popularity && (
                    <Badge 
                      variant="secondary" 
                      className={`text-xs px-2 py-1 font-semibold animate-pulse ${
                        style.popularity === 'hot' 
                          ? 'bg-red-100 text-red-600 border-red-200' 
                          : 'bg-orange-100 text-orange-600 border-orange-200'
                      }`}
                    >
                      {style.popularity === 'hot' ? (
                        <>🔥 {t('styles.hot')}</>
                      ) : (
                        <>📈 {t('styles.trending')}</>
                      )}
                    </Badge>
                  )}
                </div>
                <p className={`text-sm mb-3 font-medium ${selectedStyle === style.id ? 'text-white/90' : 'text-gray-600'}`}>
                  {style.description}
                </p>
                <div className={`text-xs italic p-2 rounded-lg ${
                  selectedStyle === style.id 
                    ? 'bg-white/10 text-white/80 border border-white/20' 
                    : 'bg-gray-50 text-gray-500 border border-gray-200'
                }`}>
                  💬 "{style.example}"
                </div>
              </div>
            </div>
            {selectedStyle === style.id && (
              <div className="absolute right-4 top-4">
                <div className="w-3 h-3 bg-white rounded-full shadow-sm animate-pulse"></div>
              </div>
            )}
            <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${style.gradient} transition-all duration-300 ${
              selectedStyle === style.id ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></div>
          </Button>
        ))}
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg text-white">
              <Sparkles2 className="h-4 w-4" />
            </div>
            <p className="text-sm font-semibold text-gray-700">
              {t('styles.tip')} ✨
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StyleSelector;
