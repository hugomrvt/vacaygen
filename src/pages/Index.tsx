
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, Sparkles, Zap, Bot, Palette, Trophy } from 'lucide-react';
import { CheckCircle } from '@siimple/icons';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { generateOutOfOfficeMessage } from '@/lib/openai';
import FormStep from '@/components/FormStep';
import FormInputs from '@/components/FormInputs';
import GeneratedMessage from '@/components/GeneratedMessage';
import LanguageSelector from '@/components/LanguageSelector';
import SEOHead from '@/components/SEOHead';

const Index = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [previewMessage, setPreviewMessage] = useState('');
  const [totalGeneratedMessages, setTotalGeneratedMessages] = useState(0);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    coverage: '',
    tone: '',
    name: '',
    position: '',
    company: '',
    email: '',
    phone: '',
    emergencyContact: '',
    returnDate: '',
    location: '',
    additionalInfo: ''
  });

  // Load saved data
  useEffect(() => {
    const savedMessages = localStorage.getItem('totalGeneratedMessages');
    if (savedMessages) {
      setTotalGeneratedMessages(parseInt(savedMessages));
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      
      if (currentStep === 3) {
        generateMessage();
      }
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateMessage = async () => {
    try {
      const message = await generateOutOfOfficeMessage(formData);
      setPreviewMessage(message);
      
      const newTotal = totalGeneratedMessages + 1;
      setTotalGeneratedMessages(newTotal);
      localStorage.setItem('totalGeneratedMessages', newTotal.toString());
      
      toast({
        title: t('success.generated'),
        description: t('success.generatedDescription'),
      });
      
      setCurrentStep(4);
    } catch (error) {
      console.error('Error generating message:', error);
      toast({
        title: t('error.generation'),
        description: t('error.generationDescription'),
        variant: "destructive",
      });
    }
  };

  const regenerateMessage = () => {
    generateMessage();
  };

  const resetForm = () => {
    setFormData({
      startDate: '',
      endDate: '',
      reason: '',
      coverage: '',
      tone: '',
      name: '',
      position: '',
      company: '',
      email: '',
      phone: '',
      emergencyContact: '',
      returnDate: '',
      location: '',
      additionalInfo: ''
    });
    setPreviewMessage('');
    setCurrentStep(1);
  };

  return (
    <>
      <SEOHead />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 relative">
            {/* Language Selector - Top Right */}
            <div className="absolute top-0 right-0">
              <LanguageSelector />
            </div>
            
            <div className="mb-6">
              <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                VacayGen ✈️
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('hero.description')}
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
              <Card className="p-3 bg-white/60 border-blue-200">
                <CardContent className="p-0 flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-500" />
                  <div className="text-center">
                    <div className="text-sm font-semibold text-blue-700">IA Avancée</div>
                    <div className="text-xs text-muted-foreground">OpenAI GPT</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="p-3 bg-white/60 border-purple-200">
                <CardContent className="p-0 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-500" />
                  <div className="text-center">
                    <div className="text-sm font-semibold text-purple-700">Ultra Rapide</div>
                    <div className="text-xs text-muted-foreground">&lt; 30 secondes</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="p-3 bg-white/60 border-green-200">
                <CardContent className="p-0 flex items-center gap-2">
                  <Palette className="h-5 w-5 text-green-500" />
                  <div className="text-center">
                    <div className="text-sm font-semibold text-green-700">Multi-Tons</div>
                    <div className="text-xs text-muted-foreground">4 styles</div>
                  </div>
                </CardContent>
              </Card>
              
              {totalGeneratedMessages > 0 && (
                <Card className="p-3 bg-white/60 border-orange-200">
                  <CardContent className="p-0 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-orange-500" />
                    <div className="text-center">
                      <div className="text-sm font-semibold text-orange-700">Générés</div>
                      <div className="text-xs text-muted-foreground">{totalGeneratedMessages} messages</div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Main Content */}
          {currentStep <= 3 ? (
            <div className="space-y-6">
              {/* Step 1: Dates and Reason */}
              <FormStep
                title={t('steps.step1.title')}
                description={t('steps.step1.description')}
                stepNumber={1}
                currentStep={currentStep}
              >
                <FormInputs
                  step={1}
                  formData={formData}
                  onInputChange={handleInputChange}
                  onNext={nextStep}
                  onPrevious={previousStep}
                />
              </FormStep>

              {/* Step 2: Coverage and Tone */}
              <FormStep
                title={t('steps.step2.title')}
                description={t('steps.step2.description')}
                stepNumber={2}
                currentStep={currentStep}
              >
                <FormInputs
                  step={2}
                  formData={formData}
                  onInputChange={handleInputChange}
                  onNext={nextStep}
                  onPrevious={previousStep}
                />
              </FormStep>

              {/* Step 3: Personal Information */}
              <FormStep
                title={t('steps.step3.title')}
                description={t('steps.step3.description')}
                stepNumber={3}
                currentStep={currentStep}
              >
                <FormInputs
                  step={3}
                  formData={formData}
                  onInputChange={handleInputChange}
                  onNext={nextStep}
                  onPrevious={previousStep}
                />
              </FormStep>
            </div>
          ) : (
            /* Step 4: Generated Message */
            <GeneratedMessage
              message={previewMessage}
              formData={formData}
              onRegenerate={regenerateMessage}
              onReset={resetForm}
            />
          )}

          {/* Footer */}
          <footer className="mt-12 text-center text-sm text-muted-foreground">
            <p>
              {t('footer.madeWith')} <span className="text-red-500">❤️</span> {t('footer.by')} VacayGen
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Index;
