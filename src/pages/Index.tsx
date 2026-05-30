import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bot, Sparkles, Zap, RefreshCw, MessageSquare, LayoutTemplate, Clock, Settings } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useVacationForm } from '@/hooks/useVacationForm';
import { useMessageGenerator } from '@/hooks/useMessageGenerator';
import { useTemplates, useHistory } from '@/hooks/useLocalStorage';
import { ChatContainer } from '@/components/conversation/ChatContainer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import SEOHead from '@/components/SEOHead';
import { VacationForm } from '@/components/vacation/VacationForm';
import { StyleSelector } from '@/components/vacation/StyleSelector';
import { MessageDisplay } from '@/components/vacation/MessageDisplay';
import { StepIndicator } from '@/components/vacation/StepIndicator';
import LoadingScreen from '@/components/LoadingScreen';
import { CustomTemplate } from '@/types';

const Index = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState('millennial-pro');
  const [activeTab, setActiveTab] = useState<'chat' | 'form'>('chat');

  // Use custom hooks
  const vacationForm = useVacationForm();
  const messageGenerator = useMessageGenerator();
  const { saveTemplate } = useTemplates();
  const { saveToHistory } = useHistory();

  // Check for location state (from templates/history)
  useEffect(() => {
    if (location.state) {
      if (location.state.template) {
        // Load template content
        vacationForm.loadFromData({ 
          ...vacationForm.formData,
          // Could extract data from template
        });
      }
      if (location.state.styleId) {
        setSelectedStyle(location.state.styleId);
      }
      if (location.state.message) {
        messageGenerator.setGeneratedMessage(location.state.message);
      }
    }
  }, [location.state]);

  // Initialize
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    { title: t('step.basic.title'), icon: 'calendar' },
    { title: t('step.recipients.title'), icon: 'users' },
    { title: t('step.style.title'), icon: 'sparkles' }
  ];

  const handleGenerate = async () => {
    const message = await messageGenerator.generateVacationMessage(
      vacationForm.formData,
      selectedStyle
    );
    setCurrentStep(3);
    return message;
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  // Handle saving as template
  const handleSaveAsTemplate = (content: string, styleId?: string) => {
    saveTemplate({
      name: `Template - ${styleId || selectedStyle} - ${new Date().toLocaleDateString(language)}`,
      content,
      styleId: styleId || selectedStyle,
      language,
    });
  };

  // Handle template selection from chat
  const handleUseTemplate = (template: CustomTemplate) => {
    // Load template data into form
    vacationForm.loadFromData({
      // Could extract data from template content
    });
    setSelectedStyle(template.styleId);
    setActiveTab('form');
  };

  // Handle regenerating from history
  const handleRegenerateFromHistory = async (data: any, styleId: string) => {
    const message = await messageGenerator.generateVacationMessage(data, styleId);
    messageGenerator.setGeneratedMessage(message);
    setCurrentStep(3);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      
      <div className="container-brutal py-6">
        {/* Header */}
        <div className="text-center mb-8 relative">
          {/* Navigation Links - Top Right */}
          <div className="absolute top-0 right-0 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/templates')}
              leftIcon={<LayoutTemplate className="w-4 h-4" />}
              className="text-sm"
            >
              {t('templates.title')}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/history')}
              leftIcon={<Clock className="w-4 h-4" />}
              className="text-sm"
            >
              {t('history.title')}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<Settings className="w-4 h-4" />}
              className="text-sm"
            >
              {language === 'fr' ? 'FR' : 'EN'}
            </Button>
          </div>
          
          {/* Main Header Content */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-none bg-primary text-primary-foreground flex items-center justify-center border-2 border-black">
              <Bot className="h-8 w-8" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text">
                Away
              </h1>
              <div className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                <p>{t('app.subtitle')}</p>
              </div>
            </div>
          </div>
          
          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="primary" className="bg-primary text-primary-foreground border-1 border-black text-sm px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              {t('app.badge.instant')}
            </Badge>
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground border-1 border-black text-sm px-4 py-2">
              <RefreshCw className="w-4 h-4 mr-2" />
              {t('app.badge.free')}
            </Badge>
            <Badge variant="muted" className="bg-muted text-muted-foreground border-1 border-black text-sm px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              {t('app.badge.styles')}
            </Badge>
          </div>
        </div>

        {/* Tabs: Chat vs Form */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Button
            variant={activeTab === 'chat' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('chat')}
            leftIcon={<MessageSquare className="w-4 h-4" />}
            className={`border-2 border-black ${activeTab === 'chat' ? 'bg-primary text-primary-foreground' : 'bg-transparent text-foreground'}`}
          >
            {t('conversation.title')}
          </Button>
          <Button
            variant={activeTab === 'form' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('form')}
            leftIcon={<Bot className="w-4 h-4" />}
            className={`border-2 border-black ${activeTab === 'form' ? 'bg-primary text-primary-foreground' : 'bg-transparent text-foreground'}`}
          >
            {t('form.title')}
          </Button>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {activeTab === 'chat' ? (
            /* Conversation UI */
            <ChatContainer
              onGenerateMessage={handleGenerate}
              onSaveTemplate={handleSaveAsTemplate}
            />
          ) : (
            /* Traditional Form UI */
            <>
              {/* Step Indicator */}
              <div className="mb-6">
                <StepIndicator 
                  currentStep={currentStep} 
                  totalSteps={3} 
                  steps={steps} 
                  messageGenerated={!!messageGenerator.generatedMessage} 
                />
              </div>

              {/* Form Steps */}
              <VacationForm 
                form={vacationForm} 
                currentStep={currentStep} 
                onNextStep={() => setCurrentStep(prev => Math.min(prev + 1, 3))}
                onPrevStep={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
              />

              {/* Style Selection */}
              {currentStep >= 3 && (
                <div className="space-y-6">
                  <StyleSelector 
                    selectedStyle={selectedStyle}
                    onStyleSelect={setSelectedStyle}
                  />

                  {/* Navigation and Generate Buttons */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <Button 
                      onClick={() => setCurrentStep(2)}
                      variant="outline"
                      className="border-2 border-black px-6 py-3"
                    >
                      ← {t('button.back')}
                    </Button>
                    <Button 
                      onClick={handleGenerate} 
                      disabled={messageGenerator.isGenerating || !vacationForm.isValid} 
                      size="lg" 
                      className="px-8 py-4 text-base font-bold bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 border-2 border-black shadow-brutal hover:shadow-none transition-all duration-200"
                    >
                      {messageGenerator.isGenerating ? (
                        <>
                          <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                          {t('generate.button.loading')}
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-5 w-5" />
                          {t('generate.button')}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Generated Message */}
              <MessageDisplay 
                message={messageGenerator.generatedMessage}
                isGenerating={messageGenerator.isGenerating}
                onRegenerate={handleRegenerate}
                onSaveAsTemplate={handleSaveAsTemplate}
              />
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 py-6 border-t-2 border-border">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {t('footer.created')}{' '}
              <a 
                href="https://www.linkedin.com/in/hugomrvt/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Hugo Mourlevat
              </a>
            </p>
            
            <p className="text-xs text-muted-foreground/70">
              {t('footer.tagline')}
            </p>
            
            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-muted-foreground">
              <button 
                onClick={() => navigate('/templates')}
                className="hover:text-primary transition-colors"
              >
                {t('templates.title')}
              </button>
              <span>•</span>
              <button 
                onClick={() => navigate('/history')}
                className="hover:text-primary transition-colors"
              >
                {t('history.title')}
              </button>
              <span>•</span>
              <span>{t('footer.secure')}</span>
              <span>•</span>
              <span>{t('footer.instant')}</span>
              <span>•</span>
              <span>{t('footer.compatible')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
