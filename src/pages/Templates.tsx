import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useTemplates } from '@/hooks/useLocalStorage';
import { TemplateManager } from '@/components/templates/TemplateManager';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, LayoutTemplate } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const TemplatesPage: React.FC = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const { templates } = useTemplates();

  const handleUseTemplate = (template: any) => {
    // Load template into form and navigate back
    navigate('/', { 
      state: { 
        template: template.content,
        styleId: template.styleId 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${t('templates.title')} - Away`}
        description={t('templates.subtitle')}
      />
      
      <div className="container-brutal py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            size="sm"
          >
            {t('button.back')}
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-none flex items-center justify-center border-2 border-black">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{t('templates.title')}</h1>
              <p className="text-muted-foreground">{t('templates.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Template Manager */}
        <TemplateManager onUseTemplate={handleUseTemplate} />

        {/* Stats */}
        {templates.length > 0 && (
          <div className="mt-8 pt-4 border-t-2 border-border">
            <p className="text-sm text-muted-foreground">
              {templates.length} {templates.length === 1 ? t('templates.templateSingular') : t('templates.templatePlural')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatesPage;
