
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Style {
  id: string;
  name: string;
  description: string;
  example: string;
  category: string;
  emoji: string;
  popularity?: 'hot' | 'trending';
}

const styles: Style[] = [
  {
    id: 'professional',
    name: 'Professionnel Classique',
    description: 'Ton formel et respectueux',
    example: 'Je serai absent(e) du... pour mes congés annuels.',
    category: 'Formel',
    emoji: '💼'
  },
  {
    id: 'millennial-pro',
    name: 'Millennial Pro',
    description: 'Professionnel mais chaleureux',
    example: 'Salut l\'équipe ! Je pars me ressourcer...',
    category: 'Moderne',
    emoji: '🚀',
    popularity: 'hot'
  },
  {
    id: 'personal',
    name: 'Personnel Amical',
    description: 'Décontracté et bienveillant',
    example: 'Hey ! Je m\'absente quelques jours pour...',
    category: 'Décontracté',
    emoji: '😊'
  },
  {
    id: 'creative',
    name: 'Créatif Original',
    description: 'Unique et mémorable',
    example: 'BREAKING NEWS : Votre humble collègue s\'évapore...',
    category: 'Original',
    emoji: '🌟'
  },
  {
    id: 'minimalist',
    name: 'Minimaliste',
    description: 'Direct et concis',
    example: 'Absent(e) : 15-25 Déc. Contact urgent : [nom]',
    category: 'Concis',
    emoji: '⚡',
    popularity: 'trending'
  },
  {
    id: 'gen-z',
    name: 'Gen Z Authentique',
    description: 'Langage moderne et décontracté',
    example: 'no cap je pars en vacances bestie 🏖️',
    category: 'Tendance',
    emoji: '✨',
    popularity: 'hot'
  },
  {
    id: 'formal',
    name: 'Très Formel',
    description: 'Protocole strict et élégant',
    example: 'J\'ai l\'honneur de vous informer que...',
    category: 'Protocole',
    emoji: '🎩'
  },
  {
    id: 'friendly',
    name: 'Amical Chaleureux',
    description: 'Convivial et positif',
    example: 'Coucou ! Je pars en vacances du... 🌞',
    category: 'Convivial',
    emoji: '💙'
  }
];

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleSelect: (styleId: string) => void;
}

const StyleSelector = ({ selectedStyle, onStyleSelect }: StyleSelectorProps) => {
  return (
    <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <span className="text-2xl">🎨</span>
          Style d'Écriture
        </CardTitle>
        <p className="text-sm text-gray-600">
          Choisissez le ton qui correspond à votre personnalité
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
                      {style.popularity === 'hot' ? '🔥 Popular' : '📈 Trending'}
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
            💡 <strong>Astuce :</strong> Les styles "Hot" sont les plus populaires auprès des utilisateurs !
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StyleSelector;
