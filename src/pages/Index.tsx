
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Zap, RefreshCw, Plane } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import ConversationalFlow from '@/components/ConversationalFlow';
import LanguageSelector from '@/components/LanguageSelector';

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Plane className="text-2xl text-primary" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">
                  {t('app.title')}
                </h1>
                <p className="text-muted-foreground">
                  Assistant conversationnel pour créer vos messages de vacances
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                <Zap className="w-3 h-3 mr-1" />
                Gratuit
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <RefreshCw className="w-3 h-3 mr-1" />
                Instantané
              </Badge>
            </div>
          </div>
          
          <LanguageSelector />
        </div>

        {/* Main Content - Conversational Flow */}
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Créons ensemble votre message parfait ! 💬
            </h2>
            <p className="text-muted-foreground">
              Je vais vous poser quelques questions pour personnaliser votre message
            </p>
          </div>

          <ConversationalFlow />
        </div>

        {/* Footer */}
        <div className="text-center mt-12 py-6 border-t border-border">
          <p className="text-muted-foreground">
            Créé avec ❤️ pour des messages de vacances mémorables
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
