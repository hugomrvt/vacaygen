import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useHistory, useMessageGenerator } from '@/hooks/useLocalStorage';
import { HistoryManager } from '@/components/history/HistoryManager';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Clock } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { MessageHistoryItem } from '@/types';

const HistoryPage: React.FC = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const { history } = useHistory();
  const { regenerateMessage } = useMessageGenerator();

  const handleRegenerate = async (item: MessageHistoryItem) => {
    if (item.vacationData) {
      const newMessage = await regenerateMessage(item.vacationData, item.styleId || 'millennial-pro');
      // Could navigate back with the new message
      navigate('/', { 
        state: { 
          message: newMessage,
          styleId: item.styleId 
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${t('history.title')} - Away`}
        description={t('history.subtitle')}
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
            <div className="w-10 h-10 bg-secondary text-secondary-foreground rounded-none flex items-center justify-center border-2 border-black">
              <Clock className="w-5 h-5" />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{t('history.title')}</h1>
              <p className="text-muted-foreground">{t('history.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* History Manager */}
        <HistoryManager onRegenerate={handleRegenerate} />

        {/* Stats */}
        {history.length > 0 && (
          <div className="mt-8 pt-4 border-t-2 border-border">
            <p className="text-sm text-muted-foreground">
              {history.length} {history.length === 1 ? t('history.messageSingular') : t('history.messagePlural')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
