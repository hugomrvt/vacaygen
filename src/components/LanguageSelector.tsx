
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-gray-500" />
      <div className="flex bg-gray-100 rounded-md p-1">
        <Button
          variant={language === 'fr' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('fr')}
          className={`px-3 py-1 text-xs font-medium ${
            language === 'fr' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          FR
        </Button>
        <Button
          variant={language === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 text-xs font-medium ${
            language === 'en' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          EN
        </Button>
      </div>
    </div>
  );
};

export default LanguageSelector;
