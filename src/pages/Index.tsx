import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RefreshCw, Sparkles, Zap, Bot, Trophy, X } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useVacationForm } from '@/hooks/useVacationForm';
import { useMessageGenerator } from '@/hooks/useMessageGenerator';

// Import refactored components
import { VacationForm } from '@/components/vacation/VacationForm';
import { StyleSelector } from '@/components/vacation/StyleSelector';
import { MessageDisplay } from '@/components/vacation/MessageDisplay';
import { StepIndicator } from '@/components/vacation/StepIndicator';
import LanguageSelector from '@/components/LanguageSelector';
import SEOHead from '@/components/SEOHead';
import { SecurityNotice } from '@/components/SecurityNotice';
import { LegalNoticeContent, TermsOfServiceContent, PrivacyPolicyContent } from '@/components/LegalContent';

const Index = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState('millennial-pro');
  const [openSheet, setOpenSheet] = useState<string | null>(null);
  
  // Use custom hooks for cleaner state management
  const vacationForm = useVacationForm();
  const messageGenerator = useMessageGenerator();

  // Remove auto-progress - users will control navigation with buttons

  const steps = [
    { title: t('step.basic.title'), icon: 'calendar' },
    { title: t('step.recipients.title'), icon: 'users' },
    { title: t('step.style.title'), icon: 'sparkles' }
  ];

  const handleGenerate = async () => {
    await messageGenerator.generateVacationMessage(vacationForm.formData, selectedStyle);
    setCurrentStep(3);
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 relative">
          {/* Language Selector - Top Right */}
          <div className="absolute top-0 right-0">
            <LanguageSelector />
          </div>
          
          {/* Main Header Content */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Bot className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold gradient-text">
                VacayGen
              </h1>
              <div className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                <p>
                  {t('app.subtitle')}
                </p>
              </div>
            </div>
          </div>
          
          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20 text-sm px-4 py-2 rounded-full">
              <Zap className="w-4 h-4 mr-2" />
              {t('app.badge.free')}
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-sm px-4 py-2 rounded-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              {t('app.badge.instant')}
            </Badge>
          </div>
        </div>


        {/* Step Indicator */}
        <div className="mb-6 sm:mb-8">
          <StepIndicator 
            currentStep={currentStep} 
            totalSteps={3} 
            steps={steps} 
            messageGenerated={!!messageGenerator.generatedMessage} 
          />
        </div>

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8">
          {/* Form Steps */}
          <VacationForm 
            form={vacationForm} 
            currentStep={currentStep} 
            onNextStep={() => setCurrentStep(prev => Math.min(prev + 1, 3))}
          />

          {/* Style Selection */}
          {currentStep >= 3 && (
            <div className="space-y-6">
              <StyleSelector 
                selectedStyle={selectedStyle}
                onStyleSelect={setSelectedStyle}
              />

              {/* Generate Button */}
              <div className="text-center px-4">
                <Button 
                  onClick={handleGenerate} 
                  disabled={messageGenerator.isGenerating || !vacationForm.isValid} 
                  size="lg" 
                  className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-bold bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-slate-50"
                >
                  {messageGenerator.isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      {t('generate.button.loading')}
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
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
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 sm:mt-12 py-6 border-t border-border">
          {/* Security Notice */}
          <div className="mb-6">
            <SecurityNotice />
          </div>
          <div className="space-y-2">
            {messageGenerator.totalGeneratedMessages > 0 && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <Trophy className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">
                  {messageGenerator.totalGeneratedMessages} message{messageGenerator.totalGeneratedMessages > 1 ? 's' : ''} généré{messageGenerator.totalGeneratedMessages > 1 ? 's' : ''}
                </span>
              </div>
            )}
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
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-muted-foreground">
              <Sheet open={openSheet === 'legal'} onOpenChange={(open) => setOpenSheet(open ? 'legal' : null)}>
                <SheetTrigger asChild>
                  <button className="hover:text-primary transition-colors">
                    {t('legal.notice')}
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center justify-between">
                      {t('legal.notice.title')}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setOpenSheet(null)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-full pr-4">
                    <LegalNoticeContent />
                  </ScrollArea>
                </SheetContent>
              </Sheet>
              
              <span>•</span>
              
              <Sheet open={openSheet === 'terms'} onOpenChange={(open) => setOpenSheet(open ? 'terms' : null)}>
                <SheetTrigger asChild>
                  <button className="hover:text-primary transition-colors">
                    {t('legal.terms')}
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center justify-between">
                      {t('legal.terms.title')}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setOpenSheet(null)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-full pr-4">
                    <TermsOfServiceContent />
                  </ScrollArea>
                </SheetContent>
              </Sheet>
              
              <span>•</span>
              
              <Sheet open={openSheet === 'privacy'} onOpenChange={(open) => setOpenSheet(open ? 'privacy' : null)}>
                <SheetTrigger asChild>
                  <button className="hover:text-primary transition-colors">
                    {t('legal.privacy')}
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center justify-between">
                      {t('legal.privacy.title')}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setOpenSheet(null)}
                        className="h-12 w-12 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-full pr-4">
                    <PrivacyPolicyContent />
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;