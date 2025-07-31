
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, Users, Copy, RefreshCw, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import VacationForm from '@/components/VacationForm';
import StyleSelector from '@/components/StyleSelector';
import GeneratedMessage from '@/components/GeneratedMessage';

const Index = () => {
  const { toast } = useToast();
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
        title: "Informations manquantes",
        description: "Veuillez renseigner au minimum les dates et la destination.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation with realistic delay
    setTimeout(() => {
      const message = generateVacationMessage(formData, selectedStyle);
      setGeneratedMessage(message);
      setIsGenerating(false);
      toast({
        title: "Message généré !",
        description: "Votre message de vacances est prêt à être utilisé.",
        variant: "default"
      });
    }, 2000);
  };

  const generateVacationMessage = (data: any, style: string) => {
    const { startDate, endDate, destination, activity, recipients, backupContact } = data;
    
    const styleTemplates: { [key: string]: (data: any) => string } = {
      'professional': (data) => `Bonjour,

Je serai absent(e) du ${startDate} au ${endDate} pour mes congés annuels.

Durant cette période, je ne consulterai pas mes emails de manière régulière. Pour toute urgence, veuillez contacter ${backupContact || '[contact de secours]'}.

Je reprendrai mes fonctions le [date de retour] et traiterai votre demande dans les plus brefs délais.

Cordialement,`,

      'millennial-pro': (data) => `Salut l'équipe ! 👋

Je pars me ressourcer ${destination ? `en ${destination}` : ''} du ${startDate} au ${endDate} ! ${activity ? `Au programme : ${activity.toLowerCase()}` : ''} 🌴

Je serai complètement déconnecté(e) pendant cette période (promis, je ne regarderai pas Slack à 2h du matin 😅). 

Pour tout ce qui ne peut pas attendre mon retour, ${backupContact || '[nom du contact]'} pourra vous aider.

Hâte de revenir avec plein d'énergie pour attaquer la suite ! 🚀

À bientôt,`,

      'personal': (data) => `Hey ! 😊

Je m'absente quelques jours du ${startDate} au ${endDate} pour ${destination ? `profiter de ${destination}` : 'des vacances bien méritées'} !

Je ne serai pas disponible pendant cette période, mais promis je reviens avec plein d'histoires à raconter ${activity ? `et peut-être quelques photos de ${activity.toLowerCase()}` : ''} ! 📸

En cas d'urgence, vous pouvez contacter ${backupContact || '[personne de contact]'}.

À très vite !`,

      'creative': (data) => `🌟 BREAKING NEWS 🌟

Votre humble collègue s'évapore temporairement de l'écosystème digital du ${startDate} au ${endDate} !

📍 Localisation : ${destination || 'Quelque part où le wifi est optionnel'}
🎯 Mission : ${activity || 'Recharger les batteries créatives'}
📧 Statut emails : Mode hibernation activé

En cas de situation critique nécessitant mon expertise légendaire, ${backupContact || '[votre sauveur désigné]'} prendra le relais avec brio !

Retour prévu avec 200% d'inspiration en plus ✨`,

      'minimalist': (data) => `Absent(e) : ${startDate} - ${endDate}
Lieu : ${destination || 'En congés'}
Contact urgent : ${backupContact || '[contact]'}

De retour bientôt.`,

      'gen-z': (data) => `no cap je pars en vacances bestie 🏖️

dates : ${startDate} → ${endDate}
localisation : ${destination || 'somewhere iconic'} ${activity ? `(${activity.toLowerCase()} era)` : ''}

je serai en mode touch grass donc rip emails 💀
si c'est vraiment important contactez ${backupContact || '[la personne responsable]'}

see you on the flip side ! ✨`,

      'formal': (data) => `Madame, Monsieur,

J'ai l'honneur de vous informer que je serai en congés du ${startDate} au ${endDate} inclus.

Durant cette période d'absence, je ne serai pas en mesure de consulter ma messagerie électronique ni de répondre aux sollicitations professionnelles.

En cas de nécessité absolue, je vous prie de bien vouloir vous adresser à ${backupContact || 'mon suppléant désigné'} qui se fera un plaisir de vous assister.

Je vous remercie de votre compréhension et vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.`,

      'friendly': (data) => `Coucou ! 🌞

Je pars en vacances du ${startDate} au ${endDate} ${destination ? `direction ${destination}` : ''} !

${activity ? `J'ai hâte de ${activity.toLowerCase()}` : 'J\'ai vraiment hâte de déconnecter'} et de prendre du temps pour moi. Je ne consulterai pas mes mails pendant cette période.

Si c'est urgent, n'hésitez pas à écrire à ${backupContact || '[mon collègue]'} qui pourra vous aider !

Merci et à bientôt ! 💙`
    };

    return styleTemplates[style]?.(data) || styleTemplates['millennial-pro'](data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-4xl">🏖️</span>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Messages Vacances
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Générez le message de vacances parfait avec l'IA. Professionnel, personnel ou créatif - trouvez le ton qui vous ressemble !
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              ✨ Gratuit
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              🚀 Instantané
            </Badge>
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              🎨 8 Styles
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-1">
            <VacationForm formData={formData} setFormData={setFormData} />
            
            <div className="mt-6">
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-6 text-lg font-semibold"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Générer mon message
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
        <div className="text-center mt-12 py-8 border-t border-gray-200">
          <p className="text-gray-500 mb-2">
            Créé avec ❤️ pour simplifier vos messages de vacances
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <span>🔒 Données sécurisées</span>
            <span>⚡ Génération instantanée</span>
            <span>🌍 Compatible toutes plateformes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
