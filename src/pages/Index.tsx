import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Sparkles, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import StepIndicator from '@/components/StepIndicator';
import ModernVacationForm from '@/components/ModernVacationForm';
import StyleCard from '@/components/StyleCard';
import GeneratedMessage from '@/components/GeneratedMessage';
import LanguageSelector from '@/components/LanguageSelector';

const Index = () => {
  const { toast } = useToast();
  const { t, language } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [previewMessage, setPreviewMessage] = useState('');
  
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

  const steps = [
    { title: 'Infos de base', icon: '📅' },
    { title: 'Destinataires', icon: '👥' },
    { title: 'Style & Message', icon: '✨' }
  ];

  const styles = [
    {
      id: 'millennial-pro',
      name: t('style.millennial-pro.name'),
      description: t('style.millennial-pro.desc'),
      example: t('style.millennial-pro.example'),
      emoji: '🚀',
      color: 'from-blue-500 to-cyan-500',
      popularity: 'hot' as const
    },
    {
      id: 'gen-z',
      name: t('style.gen-z.name'),
      description: t('style.gen-z.desc'),
      example: t('style.gen-z.example'),
      emoji: '✨',
      color: 'from-pink-500 to-purple-500',
      popularity: 'trending' as const
    },
    {
      id: 'professional',
      name: t('style.professional.name'),
      description: t('style.professional.desc'),
      example: t('style.professional.example'),
      emoji: '💼',
      color: 'from-gray-600 to-gray-700'
    },
    {
      id: 'creative',
      name: t('style.creative.name'),
      description: t('style.creative.desc'),
      example: t('style.creative.example'),
      emoji: '🌟',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'friendly',
      name: t('style.friendly.name'),
      description: t('style.friendly.desc'),
      example: t('style.friendly.example'),
      emoji: '😊',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'minimalist',
      name: t('style.minimalist.name'),
      description: t('style.minimalist.desc'),
      example: t('style.minimalist.example'),
      emoji: '⚡',
      color: 'from-slate-500 to-zinc-600'
    }
  ];

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
    const { startDate, endDate, destination, activity, recipients, backupContact } = data;
    
    const styleTemplates: { [key: string]: { [key: string]: (data: any) => string } } = {
      'professional': {
        'fr': (data) => `Bonjour,

Je serai absent(e) du ${startDate} au ${endDate} pour mes congés annuels.

Durant cette période, je ne consulterai pas mes emails de manière régulière. Pour toute urgence, veuillez contacter ${backupContact || '[contact de secours]'}.

Je reprendrai mes fonctions le [date de retour] et traiterai votre demande dans les plus brefs délais.

Cordialement,`,
        'en': (data) => `Hello,

I will be out of office from ${startDate} to ${endDate} for my annual leave.

During this period, I will not be checking emails regularly. For any urgent matters, please contact ${backupContact || '[backup contact]'}.

I will resume work on [return date] and will address your request as soon as possible.

Best regards,`
      },

      'millennial-pro': {
        'fr': (data) => `Salut l'équipe ! 👋

Je pars me ressourcer ${destination ? `en ${destination}` : ''} du ${startDate} au ${endDate} ! ${activity ? `Au programme : ${activity.toLowerCase()}` : ''} 🌴

Je serai complètement déconnecté(e) pendant cette période (promis, je ne regarderai pas Slack à 2h du matin 😅). 

Pour tout ce qui ne peut pas attendre mon retour, ${backupContact || '[nom du contact]'} pourra vous aider.

Hâte de revenir avec plein d'énergie pour attaquer la suite ! 🚀

À bientôt,`,
        'en': (data) => `Hey team! 👋

I'm going to recharge ${destination ? `in ${destination}` : ''} from ${startDate} to ${endDate}! ${activity ? `Planning to: ${activity.toLowerCase()}` : ''} 🌴

I'll be completely disconnected during this time (promise I won't check Slack at 2am 😅).

For anything that can't wait until I'm back, ${backupContact || '[contact name]'} can help you out.

Can't wait to come back with tons of energy to tackle what's next! 🚀

See you soon,`
      },

      'gen-z': {
        'fr': (data) => `no cap je pars en vacances bestie 🏖️

dates : ${startDate} → ${endDate}
localisation : ${destination || 'somewhere iconic'} ${activity ? `(${activity.toLowerCase()} era)` : ''}

je serai en mode touch grass donc rip emails 💀
si c'est vraiment important contactez ${backupContact || '[la personne responsable]'}

see you on the flip side ! ✨`,
        'en': (data) => `no cap going on vacation bestie 🏖️

dates: ${startDate} → ${endDate}
location: ${destination || 'somewhere iconic'} ${activity ? `(${activity.toLowerCase()} era)` : ''}

I'll be touching grass so rip emails 💀
if it's actually important contact ${backupContact || '[the responsible person]'}

see you on the flip side! ✨`
      },

      'creative': {
        'fr': (data) => `🌟 BREAKING NEWS 🌟

Votre humble collègue s'évapore temporairement de l'écosystème digital du ${startDate} au ${endDate} !

📍 Localisation : ${destination || 'Quelque part où le wifi est optionnel'}
🎯 Mission : ${activity || 'Recharger les batteries créatives'}
📧 Statut emails : Mode hibernation activé

En cas de situation critique nécessitant mon expertise légendaire, ${backupContact || '[votre sauveur désigné]'} prendra le relais avec brio !

Retour prévu avec 200% d'inspiration en plus ✨`,
        'en': (data) => `🌟 BREAKING NEWS 🌟

Your humble colleague is temporarily vanishing from the digital ecosystem from ${startDate} to ${endDate}!

📍 Location: ${destination || 'Somewhere where wifi is optional'}
🎯 Mission: ${activity || 'Recharge creative batteries'}
📧 Email status: Hibernation mode activated

In case of critical situation requiring my legendary expertise, ${backupContact || '[your designated savior]'} will take over brilliantly!

Expected return with 200% more inspiration ✨`
      },

      'friendly': {
        'fr': (data) => `Coucou ! 🌞

Je pars en vacances du ${startDate} au ${endDate} ${destination ? `direction ${destination}` : ''} !

${activity ? `J'ai hâte de ${activity.toLowerCase()}` : 'J\'ai vraiment hâte de déconnecter'} et de prendre du temps pour moi. Je ne consulterai pas mes mails pendant cette période.

Si c'est urgent, n'hésitez pas à écrire à ${backupContact || '[mon collègue]'} qui pourra vous aider !

Merci et à bientôt ! 💙`,
        'en': (data) => `Hi there! 🌞

I'm going on vacation from ${startDate} to ${endDate} ${destination ? `heading to ${destination}` : ''}!

${activity ? `I can't wait to ${activity.toLowerCase()}` : 'I really can\'t wait to disconnect'} and take some time for myself. I won't be checking emails during this period.

If it's urgent, don't hesitate to write to ${backupContact || '[my colleague]'} who can help you!

Thanks and see you soon! 💙`
      }
    };

    const template = styleTemplates[style]?.[lang] || styleTemplates['millennial-pro'][lang];
    return template(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-6">
            <div></div>
            <div className="flex items-center gap-3">
              <span className="text-5xl">🏖️</span>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                {t('app.title')}
              </h1>
            </div>
            <LanguageSelector />
          </div>
          
          <p className="text-xl text-gray-600 mb-4">
            ✨ Créons ton message parfait ensemble !
          </p>
          
          <div className="flex justify-center gap-3">
            <Badge variant="secondary" className="bg-green-100 text-green-700 px-3 py-1">
              <Zap className="w-4 h-4 mr-1" />
              Gratuit
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-3 py-1">
              <RefreshCw className="w-4 h-4 mr-1" />
              Instantané
            </Badge>
          </div>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={3} steps={steps} />

        {/* Main Content */}
        <div className="space-y-8">
          {/* Form Steps */}
          <ModernVacationForm 
            formData={formData} 
            setFormData={setFormData}
            currentStep={currentStep}
          />

          {/* Style Selection */}
          {currentStep >= 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  🎭 Quel style te ressemble ?
                </h2>
                <p className="text-gray-600">
                  Survole les styles pour un aperçu instantané
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {styles.map((style) => (
                  <StyleCard
                    key={style.id}
                    style={style}
                    isSelected={selectedStyle === style.id}
                    onSelect={() => setSelectedStyle(style.id)}
                    onPreview={setPreviewMessage}
                  />
                ))}
              </div>

              {/* Preview Message */}
              {previewMessage && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">👀 Aperçu :</p>
                  <p className="text-sm text-gray-600 italic">"{previewMessage}"</p>
                </div>
              )}

              {/* Generate Button */}
              <div className="text-center">
                <Button 
                  id="generate-button"
                  onClick={handleGenerate} 
                  disabled={isGenerating}
                  className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                      ✨ Création magique en cours...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      🚀 Créer mon message parfait !
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Generated Message */}
          <GeneratedMessage 
            message={generatedMessage}
            isGenerating={isGenerating}
            onRegenerate={handleGenerate}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-12 py-6 border-t border-gray-200">
          <p className="text-gray-500">
            Créé avec ❤️ pour des messages de vacances mémorables
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
