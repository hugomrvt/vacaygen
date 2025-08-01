import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Sparkles, Zap, Bot, Palette } from 'lucide-react';
import { CheckCircle } from '@siimple/icons';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import StepIndicator from '@/components/StepIndicator';
import ModernVacationForm from '@/components/ModernVacationForm';
import StyleCard from '@/components/StyleCard';
import GeneratedMessage from '@/components/GeneratedMessage';
import LanguageSelector from '@/components/LanguageSelector';

const Index = () => {
  const {
    toast
  } = useToast();
  const {
    t,
    language
  } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [previewMessage, setPreviewMessage] = useState('');
  const [totalGeneratedMessages, setTotalGeneratedMessages] = useState(0);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    destination: '',
    activity: '',
    recipients: [] as string[],
    backupContact: ''
  });
  const [selectedStyle, setSelectedStyle] = useState('millennial-pro');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Auto-progress to next step based on form completion
  useEffect(() => {
    if (formData.startDate && formData.endDate && formData.destination && currentStep === 1) {
      setTimeout(() => setCurrentStep(2), 800);
    }
    if (formData.recipients.length > 0 && currentStep === 2) {
      setTimeout(() => setCurrentStep(3), 800);
    }
  }, [formData, currentStep]);

  const steps = [{
    title: t('step.basic.title'),
    icon: 'calendar'
  }, {
    title: t('step.recipients.title'),
    icon: 'users'
  }, {
    title: t('step.style.title'),
    icon: 'sparkles'
  }];

  const styles = [{
    id: 'millennial-pro',
    name: t('style.millennial-pro.name'),
    description: t('style.millennial-pro.desc'),
    example: t('style.millennial-pro.example'),
    emoji: '🚀',
    color: 'from-blue-500 to-cyan-500',
    popularity: 'hot' as const
  }, {
    id: 'gen-z',
    name: t('style.gen-z.name'),
    description: t('style.gen-z.desc'),
    example: t('style.gen-z.example'),
    emoji: '✨',
    color: 'from-pink-500 to-purple-500',
    popularity: 'trending' as const
  }, {
    id: 'professional',
    name: t('style.professional.name'),
    description: t('style.professional.desc'),
    example: t('style.professional.example'),
    emoji: '💼',
    color: 'from-gray-600 to-gray-700'
  }, {
    id: 'creative',
    name: t('style.creative.name'),
    description: t('style.creative.desc'),
    example: t('style.creative.example'),
    emoji: '🌟',
    color: 'from-orange-500 to-red-500'
  }, {
    id: 'friendly',
    name: t('style.friendly.name'),
    description: t('style.friendly.desc'),
    example: t('style.friendly.example'),
    emoji: '😊',
    color: 'from-green-500 to-emerald-500'
  }, {
    id: 'minimalist',
    name: t('style.minimalist.name'),
    description: t('style.minimalist.desc'),
    example: t('style.minimalist.example'),
    emoji: '⚡',
    color: 'from-slate-500 to-zinc-600'
  }];

  const formatDate = (dateString: string, language: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    if (language === 'fr') {
      const months = [
        'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
        'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
      ];
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    } else {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
  };

  const handleGenerate = async () => {
    if (!formData.startDate || !formData.endDate || !formData.destination) {
      // Shake animation for missing fields
      const button = document.getElementById('generate-button');
      button?.classList.add('animate-bounce');
      setTimeout(() => button?.classList.remove('animate-bounce'), 600);
      toast({
        title: t('toast.missing.title'),
        description: t('toast.missing.desc'),
        variant: "destructive"
      });
      return;
    }
    setIsGenerating(true);
    setCurrentStep(3);
    setTimeout(() => {
      const message = generateVacationMessage(formData, selectedStyle, language);
      setGeneratedMessage(message);
      setIsGenerating(false);
      setTotalGeneratedMessages(prev => prev + 1);

      // Confetti effect
      const celebrateGeneration = () => {
        for (let i = 0; i < 50; i++) {
          setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.innerHTML = ['🎉', '✨', '🎊', '⭐'][Math.floor(Math.random() * 4)];
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.zIndex = '1000';
            confetti.className = 'animate-bounce';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
          }, i * 100);
        }
      };
      celebrateGeneration();
      toast({
        title: t('toast.generated.title'),
        description: t('toast.generated.desc'),
        variant: "default"
      });
    }, 2500);
  };

  const generateVacationMessage = (data: any, style: string, lang: string) => {
    const {
      startDate,
      endDate,
      destination,
      activity,
      recipients,
      backupContact
    } = data;

    const formattedStartDate = formatDate(startDate, lang);
    const formattedEndDate = formatDate(endDate, lang);
    
    const styleTemplates: {
      [key: string]: {
        [key: string]: (data: any) => string;
      };
    } = {
      'professional': {
        'fr': data => `Bonjour,

Je serai absent(e) du ${formattedStartDate} au ${formattedEndDate} pour mes congés annuels.

Durant cette période, je ne consulterai pas mes emails de manière régulière.${backupContact ? ` Pour toute urgence, veuillez contacter ${backupContact}.` : ''}

Je reprendrai mes fonctions le ${formattedEndDate} et traiterai votre demande dans les plus brefs délais.

Cordialement,`,
        'en': data => `Hello,

I will be out of office from ${formattedStartDate} to ${formattedEndDate} for my annual leave.

During this period, I will not be checking emails regularly.${backupContact ? ` For any urgent matters, please contact ${backupContact}.` : ''}

I will resume work on ${formattedEndDate} and will address your request as soon as possible.

Best regards,`
      },
      'millennial-pro': {
        'fr': data => `Salut l'équipe ! 👋

Je pars me ressourcer ${destination ? `en ${destination}` : ''} du ${formattedStartDate} au ${formattedEndDate} ! ${activity ? `Au programme : ${activity.toLowerCase()}` : ''} 🌴

Je serai complètement déconnecté(e) pendant cette période (promis, je ne regarderai pas Slack à 2h du matin 😅). 

${backupContact ? `Pour tout ce qui ne peut pas attendre mon retour, ${backupContact} pourra vous aider.` : ''}

Hâte de revenir avec plein d'énergie pour attaquer la suite ! 🚀

À bientôt,`,
        'en': data => `Hey team! 👋

I'm going to recharge ${destination ? `in ${destination}` : ''} from ${formattedStartDate} to ${formattedEndDate}! ${activity ? `Planning to: ${activity.toLowerCase()}` : ''} 🌴

I'll be completely disconnected during this time (promise I won't check Slack at 2am 😅).

${backupContact ? `For anything that can't wait until I'm back, ${backupContact} can help you out.` : ''}

Can't wait to come back with tons of energy to tackle what's next! 🚀

See you soon,`
      },
      'gen-z': {
        'fr': data => `no cap je pars en vacances bestie 🏖️

dates : ${formattedStartDate} → ${formattedEndDate}
localisation : ${destination || 'somewhere iconic'} ${activity ? `(${activity.toLowerCase()} era)` : ''}

je serai en mode touch grass donc rip emails 💀
${backupContact ? `si c'est vraiment important contactez ${backupContact}` : ''}

see you on the flip side ! ✨`,
        'en': data => `no cap going on vacation bestie 🏖️

dates: ${formattedStartDate} → ${formattedEndDate}
location: ${destination || 'somewhere iconic'} ${activity ? `(${activity.toLowerCase()} era)` : ''}

I'll be touching grass so rip emails 💀
${backupContact ? `if it's actually important contact ${backupContact}` : ''}

see you on the flip side! ✨`
      },
      'creative': {
        'fr': data => `🌟 BREAKING NEWS 🌟

Votre humble collègue s'évapore temporairement de l'écosystème digital du ${formattedStartDate} au ${formattedEndDate} !

📍 Localisation : ${destination || 'Quelque part où le wifi est optionnel'}
🎯 Mission : ${activity || 'Recharger les batteries créatives'}
📧 Statut emails : Mode hibernation activé

${backupContact ? `En cas de situation critique nécessitant mon expertise légendaire, ${backupContact} prendra le relais avec brio !` : ''}

Retour prévu le ${formattedEndDate} avec 200% d'inspiration en plus ✨`,
        'en': data => `🌟 BREAKING NEWS 🌟

Your humble colleague is temporarily vanishing from the digital ecosystem from ${formattedStartDate} to ${formattedEndDate}!

📍 Location: ${destination || 'Somewhere where wifi is optional'}
🎯 Mission: ${activity || 'Recharge creative batteries'}
📧 Email status: Hibernation mode activated

${backupContact ? `In case of critical situation requiring my legendary expertise, ${backupContact} will take over brilliantly!` : ''}

Expected return on ${formattedEndDate} with 200% more inspiration ✨`
      },
      'friendly': {
        'fr': data => `Coucou ! 🌞

Je pars en vacances du ${formattedStartDate} au ${formattedEndDate} ${destination ? `direction ${destination}` : ''} !

${activity ? `J'ai hâte de ${activity.toLowerCase()}` : 'J\'ai vraiment hâte de déconnecter'} et de prendre du temps pour moi. Je ne consulterai pas mes mails pendant cette période.

${backupContact ? `Si c'est urgent, n'hésitez pas à écrire à ${backupContact} qui pourra vous aider !` : ''}

Merci et à bientôt ! 💙`,
        'en': data => `Hi there! 🌞

I'm going on vacation from ${formattedStartDate} to ${formattedEndDate} ${destination ? `heading to ${destination}` : ''}!

${activity ? `I can't wait to ${activity.toLowerCase()}` : 'I really can\'t wait to disconnect'} and take some time for myself. I won't be checking emails during this period.

${backupContact ? `If it's urgent, don't hesitate to write to ${backupContact} who can help you!` : ''}

Thanks and see you soon! 💙`
      },
      'minimalist': {
        'fr': data => `Vacances du ${formattedStartDate} au ${formattedEndDate}.${backupContact ? `\nContact d'urgence : ${backupContact}` : ''}`,
        'en': data => `Vacation from ${formattedStartDate} to ${formattedEndDate}.${backupContact ? `\nEmergency contact: ${backupContact}` : ''}`
      }
    };
    const template = styleTemplates[style]?.[lang] || styleTemplates['millennial-pro'][lang];
    return template(data);
  };

  return <div className="min-h-screen bg-background">
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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text">
                VacayGen
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                {t('app.subtitle')}
                {totalGeneratedMessages > 0 && (
                  <span className="block mt-2 text-sm text-primary font-medium">
                    {totalGeneratedMessages} message{totalGeneratedMessages > 1 ? 's' : ''} généré{totalGeneratedMessages > 1 ? 's' : ''} 🎉
                  </span>
                )}
              </p>
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
          <StepIndicator currentStep={currentStep} totalSteps={3} steps={steps} messageGenerated={!!generatedMessage} />
        </div>

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8">
          {/* Form Steps */}
          <ModernVacationForm formData={formData} setFormData={setFormData} currentStep={currentStep} />

          {/* Style Selection */}
          {currentStep >= 3 && (
            <div className="space-y-6">
              <div className="glass-card rounded-xl p-4 sm:p-6 border border-border/20 bg-card/50 backdrop-blur-sm">
                <div className="text-left mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                    <Palette className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    {t('styles.title')}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {t('styles.subtitle')}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {styles.map(style => (
                    <StyleCard 
                      key={style.id} 
                      style={style} 
                      isSelected={selectedStyle === style.id} 
                      onSelect={() => setSelectedStyle(style.id)} 
                    />
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <div className="text-center px-4">
                <Button 
                  id="generate-button" 
                  onClick={handleGenerate} 
                  disabled={isGenerating} 
                  size="lg" 
                  className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-bold bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-slate-50"
                >
                  {isGenerating ? (
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
          <GeneratedMessage message={generatedMessage} isGenerating={isGenerating} onRegenerate={handleGenerate} />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 sm:mt-12 py-6 border-t border-border">
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
        </div>
      </div>
    </div>;
};

export default Index;
