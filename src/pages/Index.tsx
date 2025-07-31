import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Sparkles, Zap, Crown, Rocket } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1"></div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <span className="text-4xl">🏖️</span>
              </div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
                {t('app.title')}
              </h1>
            </div>
            <div className="flex-1 flex justify-end">
              <LanguageSelector />
            </div>
          </div>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            {t('app.subtitle')}
          </p>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800 px-3 py-1">
              <Zap className="mr-1 h-3 w-3" />
              {t('app.badge.free')}
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">
              <Rocket className="mr-1 h-3 w-3" />
              {t('app.badge.instant')}
            </Badge>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 px-3 py-1">
              <Crown className="mr-1 h-3 w-3" />
              {t('app.badge.styles')}
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form Column */}
          <div className="space-y-4">
            <VacationForm formData={formData} setFormData={setFormData} />
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg font-bold shadow-lg"
            >
              {isGenerating ? (
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

          {/* Style Column */}
          <div>
            <StyleSelector 
              selectedStyle={selectedStyle} 
              onStyleSelect={setSelectedStyle} 
            />
          </div>

          {/* Generated Message Column */}
          <div>
            <GeneratedMessage 
              message={generatedMessage}
              isGenerating={isGenerating}
              onRegenerate={handleGenerate}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 py-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            {t('footer.created')}
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <span>🔒 {t('footer.secure')}</span>
            <span>⚡ {t('footer.instant')}</span>
            <span>🌍 {t('footer.compatible')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
