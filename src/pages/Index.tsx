import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, Users, Copy, RefreshCw, Sparkles, Zap, Crown, Rocket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import VacationForm from '@/components/VacationForm';
import StyleSelector from '@/components/StyleSelector';
import GeneratedMessage from '@/components/GeneratedMessage';
import LanguageSelector from '@/components/LanguageSelector';

const Index = () => {
  const { toast } = useToast();
  const { t, language } = useTranslation();
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

  const handleGenerate = async () => {
    if (!formData.startDate || !formData.endDate || !formData.destination) {
      toast({
        title: t('toast.missing.title'),
        description: t('toast.missing.desc'),
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation with realistic delay
    setTimeout(() => {
      const message = generateVacationMessage(formData, selectedStyle, language);
      setGeneratedMessage(message);
      setIsGenerating(false);
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
        'fr': (data) => `Salut l'équipe! 👋

Je pars me ressourcer ${destination ? `en ${destination}` : ''} du ${startDate} au ${endDate}! ${activity ? `Au programme: ${activity.toLowerCase()}` : ''} 🌴

Je serai complètement déconnecté(e) pendant cette période (promis, je ne regarderai pas Slack à 2h du matin 😅).

Pour tout ce qui ne peut pas attendre mon retour, ${backupContact || '[nom du contact]'} pourra vous aider.

Hâte de revenir avec plein d'énergie pour attaquer la suite! 🚀

À bientôt,`,
        'en': (data) => `Hey team! 👋

I'm going to recharge ${destination ? `in ${destination}` : ''} from ${startDate} to ${endDate}! ${activity ? `Planning to: ${activity.toLowerCase()}` : ''} 🌴

I'll be completely disconnected during this time (promise I won't check Slack at 2am 😅).

For anything that can't wait until I'm back, ${backupContact || '[contact name]'} can help you out.

Can't wait to come back with tons of energy to tackle what's next! 🚀

See you soon,`
      },

      'personal': {
        'fr': (data) => `Hey! 😊

Je m'absente quelques jours du ${startDate} au ${endDate} pour ${destination ? `profiter de ${destination}` : 'des vacances bien méritées'}!

Je ne serai pas disponible pendant cette période, mais promis je reviens avec plein d'histoires à raconter ${activity ? `et peut-être quelques photos de ${activity.toLowerCase()}` : ''}! 📸

En cas d'urgence, vous pouvez contacter ${backupContact || '[personne de contact]'}.

À très vite!`,
        'en': (data) => `Hey! 😊

I'm taking a few days off from ${startDate} to ${endDate} to ${destination ? `enjoy ${destination}` : 'have some well-deserved vacation'}!

I won't be available during this time, but I promise I'll come back with lots of stories to tell ${activity ? `and maybe some photos of ${activity.toLowerCase()}` : ''}! 📸

In case of emergency, you can contact ${backupContact || '[contact person]'}.

See you very soon!`
      },

      'creative': {
        'fr': (data) => `🌟 BREAKING NEWS 🌟

Votre humble collègue s'évapore temporairement de l'écosystème digital du ${startDate} au ${endDate}!

📍 Localisation: ${destination || 'Quelque part où le wifi est optionnel'}
🎯 Mission: ${activity || 'Recharger les batteries créatives'}
📧 Statut emails: Mode hibernation activé

En cas de situation critique nécessitant mon expertise légendaire, ${backupContact || '[votre sauveur désigné]'} prendra le relais avec brio!

Retour prévu avec 200% d'inspiration en plus ✨`,
        'en': (data) => `🌟 BREAKING NEWS 🌟

Your humble colleague is temporarily vanishing from the digital ecosystem from ${startDate} to ${endDate}!

📍 Location: ${destination || 'Somewhere where wifi is optional'}
🎯 Mission: ${activity || 'Recharge creative batteries'}
📧 Email status: Hibernation mode activated

In case of critical situation requiring my legendary expertise, ${backupContact || '[your designated savior]'} will take over brilliantly!

Expected return with 200% more inspiration ✨`
      },

      'minimalist': {
        'fr': (data) => `Absent(e): ${startDate} - ${endDate}
Lieu: ${destination || 'En congés'}
Contact urgent: ${backupContact || '[contact]'}

De retour bientôt.`,
        'en': (data) => `Away: ${startDate} - ${endDate}
Location: ${destination || 'On vacation'}
Urgent contact: ${backupContact || '[contact]'}

Back soon.`
      },

      'gen-z': {
        'fr': (data) => `no cap je pars en vacances bestie 🏖️

dates: ${startDate} → ${endDate}
localisation: ${destination || 'somewhere iconic'} ${activity ? `(${activity.toLowerCase()} era)` : ''}

je serai en mode touch grass donc rip emails 💀
si c'est vraiment important contactez ${backupContact || '[la personne responsable]'}

see you on the flip side! ✨`,
        'en': (data) => `no cap going on vacation bestie 🏖️

dates: ${startDate} → ${endDate}
location: ${destination || 'somewhere iconic'} ${activity ? `(${activity.toLowerCase()} era)` : ''}

I'll be touching grass so rip emails 💀
if it's actually important contact ${backupContact || '[the responsible person]'}

see you on the flip side! ✨`
      },

      'formal': {
        'fr': (data) => `Madame, Monsieur,

J'ai l'honneur de vous informer que je serai en congés du ${startDate} au ${endDate} inclus.

Durant cette période d'absence, je ne serai pas en mesure de consulter ma messagerie électronique ni de répondre aux sollicitations professionnelles.

En cas de nécessité absolue, je vous prie de bien vouloir vous adresser à ${backupContact || 'mon suppléant désigné'} qui se fera un plaisir de vous assister.

Je vous remercie de votre compréhension et vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.`,
        'en': (data) => `Dear Sir/Madam,

I have the honor to inform you that I will be on leave from ${startDate} to ${endDate} inclusive.

During this period of absence, I will not be able to check my email or respond to professional requests.

In case of absolute necessity, please contact ${backupContact || 'my designated substitute'} who will be pleased to assist you.

Thank you for your understanding and please accept, Sir/Madam, the expression of my distinguished salutations.`
      },

      'friendly': {
        'fr': (data) => `Coucou! 🌞

Je pars en vacances du ${startDate} au ${endDate} ${destination ? `direction ${destination}` : ''}!

${activity ? `J'ai hâte de ${activity.toLowerCase()}` : 'J\'ai vraiment hâte de déconnecter'} et de prendre du temps pour moi. Je ne consulterai pas mes mails pendant cette période.

Si c'est urgent, n'hésitez pas à écrire à ${backupContact || '[mon collègue]'} qui pourra vous aider!

Merci et à bientôt! 💙`,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 to-orange-50 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-orange-400/10 to-pink-400/10 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full animate-pulse delay-500"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="flex justify-between items-start mb-6">
            <div className="hidden lg:block w-32"></div>
            <div className="inline-flex items-center gap-4 group">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                <span className="text-5xl animate-bounce">🏖️</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
                {t('app.title')}
              </h1>
            </div>
            <div className="hidden lg:block">
              <LanguageSelector />
            </div>
            <div className="lg:hidden absolute top-0 right-0">
              <LanguageSelector />
            </div>
          </div>
          
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed mb-8">
            {t('app.subtitle')} ✨
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 px-4 py-2 text-sm font-bold shadow-lg hover:shadow-xl transition-shadow duration-200">
              <Zap className="mr-2 h-4 w-4" />
              {t('app.badge.free')}
            </Badge>
            <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200 px-4 py-2 text-sm font-bold shadow-lg hover:shadow-xl transition-shadow duration-200">
              <Rocket className="mr-2 h-4 w-4" />
              {t('app.badge.instant')}
            </Badge>
            <Badge variant="secondary" className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border-orange-200 px-4 py-2 text-sm font-bold shadow-lg hover:shadow-xl transition-shadow duration-200">
              <Crown className="mr-2 h-4 w-4" />
              {t('app.badge.styles')}
            </Badge>
          </div>

          <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">Alimenté par l'IA • Totalement gratuit • Sans inscription</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-1 space-y-6">
            <VacationForm formData={formData} setFormData={setFormData} />
            
            <div className="sticky top-4">
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white py-8 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-3 h-6 w-6 animate-spin" />
                    <span>{t('generate.button.loading')}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-3 h-6 w-6 animate-pulse" />
                    <span>🚀 {t('generate.button')}</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Middle Column - Styles */}
          <div className="lg:col-span-1">
            <StyleSelector 
              selectedStyle={selectedStyle} 
              onStyleSelect={setSelectedStyle} 
            />
          </div>

          {/* Right Column - Generated Message */}
          <div className="lg:col-span-1">
            <GeneratedMessage 
              message={generatedMessage}
              isGenerating={isGenerating}
              onRegenerate={handleGenerate}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 py-12 border-t-2 border-gradient-to-r from-transparent via-gray-200 to-transparent relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          <div className="relative z-10">
            <p className="text-lg text-gray-600 mb-4 font-semibold flex items-center justify-center gap-2">
              <span className="text-red-500 text-xl animate-pulse">❤️</span>
              {t('footer.created')}
              <span className="text-red-500 text-xl animate-pulse">❤️</span>
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full shadow-sm">
                <span className="text-green-500">🔒</span>
                {t('footer.secure')}
              </span>
              <span className="flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full shadow-sm">
                <span className="text-yellow-500">⚡</span>
                {t('footer.instant')}
              </span>
              <span className="flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full shadow-sm">
                <span className="text-blue-500">🌍</span>
                {t('footer.compatible')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
