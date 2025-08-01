
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
        className="h-8 px-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group"
      >
        <Globe className="h-3 w-3 mr-1 opacity-60 group-hover:opacity-100 transition-opacity" />
        {language.toUpperCase()}
      </Button>
    </div>
  );
};

export default LanguageSelector;
