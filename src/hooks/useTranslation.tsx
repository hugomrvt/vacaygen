
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations = {
  fr: {
    // Header
    'app.title': 'Messages Vacances',
    'app.subtitle': 'Générez le message de vacances parfait avec l\'IA. Professionnel, personnel ou créatif - trouvez le ton qui vous ressemble !',
    'app.badge.free': '✨ Gratuit',
    'app.badge.instant': '🚀 Instantané',
    'app.badge.styles': '🎨 8 Styles',

    // Steps
    'step.basic.title': 'Infos de base',
    'step.recipients.title': 'Destinataires',
    'step.style.title': 'Style & Message',

    // Form
    'form.title': 'Votre Message',
    'form.dates': 'Dates de vacances',
    'form.dates.from': 'Du',
    'form.dates.to': 'Au',
    'form.destination': 'Destination',
    'form.destination.placeholder': 'ex: Thaïlande, Bretagne, chez mes parents...',
    'form.activity': 'Activité principale (optionnel)',
    'form.activity.placeholder': 'ex: plage et farniente, randonnée, visite familiale...',
    'form.recipients': 'Destinataires',
    'form.recipients.team': 'Mon équipe',
    'form.recipients.clients': 'Mes clients',
    'form.recipients.management': 'Ma hiérarchie',
    'form.recipients.partners': 'Partenaires externes',
    'form.backup': 'Contact de substitution (optionnel)',
    'form.backup.placeholder': 'ex: Marie Dupont, Service Client...',

    // Style Selector
    'styles.title': 'Style d\'Écriture',
    'styles.subtitle': 'Choisissez le ton qui correspond à votre personnalité',
    'styles.tip': '💡 Astuce : Les styles "Hot" sont les plus populaires auprès des utilisateurs !',
    'styles.hot': '🔥 Popular',
    'styles.trending': '📈 Trending',

    // Style names and descriptions
    'style.professional.name': 'Professionnel Classique',
    'style.professional.desc': 'Ton formel et respectueux',
    'style.professional.example': 'Je serai absent(e) du... pour mes congés annuels.',
    'style.millennial-pro.name': 'Millennial Pro',
    'style.millennial-pro.desc': 'Professionnel mais chaleureux',
    'style.millennial-pro.example': 'Salut l\'équipe ! Je pars me ressourcer...',
    'style.personal.name': 'Personnel Amical',
    'style.personal.desc': 'Décontracté et bienveillant',
    'style.personal.example': 'Hey ! Je m\'absente quelques jours pour...',
    'style.creative.name': 'Créatif Original',
    'style.creative.desc': 'Unique et mémorable',
    'style.creative.example': 'BREAKING NEWS : Votre humble collègue s\'évapore...',
    'style.minimalist.name': 'Minimaliste',
    'style.minimalist.desc': 'Direct et concis',
    'style.minimalist.example': 'Absent(e) : 15-25 Déc. Contact urgent : [nom]',
    'style.gen-z.name': 'Gen Z Authentique',
    'style.gen-z.desc': 'Langage moderne et décontracté',
    'style.gen-z.example': 'no cap je pars en vacances bestie 🏖️',
    'style.formal.name': 'Très Formel',
    'style.formal.desc': 'Protocole strict et élégant',
    'style.formal.example': 'J\'ai l\'honneur de vous informer que...',
    'style.friendly.name': 'Amical Chaleureux',
    'style.friendly.desc': 'Convivial et positif',
    'style.friendly.example': 'Coucou ! Je pars en vacances du... 🌞',

    // Generated Message
    'generated.title': 'Message Généré',
    'generated.generating': 'Génération en cours...',
    'generated.generating.subtitle': 'Notre IA rédige votre message personnalisé',
    'generated.waiting.title': 'En attente de génération',
    'generated.waiting.subtitle': 'Remplissez le formulaire et cliquez sur "Générer" pour créer votre message',
    'generated.words': 'mots',
    'generated.characters': 'caractères',
    'generated.copy': 'Copier',
    'generated.copied': 'Copié !',
    'generated.regenerate': 'Régénérer',
    'generated.format.title': 'Copier dans un autre format :',
    'generated.format.html': 'HTML',
    'generated.format.markdown': 'Markdown',
    'generated.tips.title': '💡 Conseils d\'utilisation :',
    'generated.tips.email': '• Email : Collez directement dans votre signature automatique',
    'generated.tips.slack': '• Slack/Teams : Utilisez le format Markdown pour plus de style',
    'generated.preview': 'Aperçu du Style',

    // Generate Button
    'generate.button': 'Générer mon message',
    'generate.button.loading': 'Génération en cours...',

    // Toast messages
    'toast.missing.title': 'Informations manquantes',
    'toast.missing.desc': 'Veuillez renseigner au minimum les dates et la destination.',
    'toast.generated.title': 'Message généré !',
    'toast.generated.desc': 'Votre message de vacances est prêt à être utilisé.',
    'toast.copied.title': 'Copié !',
    'toast.copied.desc.text': 'Message copié en texte brut.',
    'toast.copied.desc.html': 'Message copié en HTML.',
    'toast.copied.desc.markdown': 'Message copié en Markdown.',
    'toast.copy.error.title': 'Erreur de copie',
    'toast.copy.error.desc': 'Impossible de copier le message. Essayez de le sélectionner manuellement.',

    // Footer
    'footer.created': 'Créé avec ❤️ pour simplifier vos messages de vacances',
    'footer.secure': '🔒 Données sécurisées',
    'footer.instant': '⚡ Génération instantanée',
    'footer.compatible': '🌍 Compatible toutes plateformes'
  },
  en: {
    // Header
    'app.title': 'Vacation Messages',
    'app.subtitle': 'Generate the perfect vacation message with AI. Professional, personal, or creative - find the tone that suits you!',
    'app.badge.free': '✨ Free',
    'app.badge.instant': '🚀 Instant',
    'app.badge.styles': '🎨 8 Styles',

    // Steps
    'step.basic.title': 'Basic Info',
    'step.recipients.title': 'Recipients',
    'step.style.title': 'Style & Message',

    // Form
    'form.title': 'Your Message',
    'form.dates': 'Vacation dates',
    'form.dates.from': 'From',
    'form.dates.to': 'To',
    'form.destination': 'Destination',
    'form.destination.placeholder': 'e.g.: Thailand, Brittany, visiting family...',
    'form.activity': 'Main activity (optional)',
    'form.activity.placeholder': 'e.g.: beach and relaxation, hiking, family visit...',
    'form.recipients': 'Recipients',
    'form.recipients.team': 'My team',
    'form.recipients.clients': 'My clients',
    'form.recipients.management': 'Management',
    'form.recipients.partners': 'External partners',
    'form.backup': 'Backup contact (optional)',
    'form.backup.placeholder': 'e.g.: Marie Dupont, Customer Service...',

    // Style Selector
    'styles.title': 'Writing Style',
    'styles.subtitle': 'Choose the tone that matches your personality',
    'styles.tip': '💡 Tip: "Hot" styles are the most popular among users!',
    'styles.hot': '🔥 Popular',
    'styles.trending': '📈 Trending',

    // Style names and descriptions
    'style.professional.name': 'Classic Professional',
    'style.professional.desc': 'Formal and respectful tone',
    'style.professional.example': 'I will be absent from... for my annual leave.',
    'style.millennial-pro.name': 'Millennial Pro',
    'style.millennial-pro.desc': 'Professional but warm',
    'style.millennial-pro.example': 'Hey team! I\'m going to recharge...',
    'style.personal.name': 'Friendly Personal',
    'style.personal.desc': 'Relaxed and caring',
    'style.personal.example': 'Hey! I\'ll be away for a few days to...',
    'style.creative.name': 'Creative Original',
    'style.creative.desc': 'Unique and memorable',
    'style.creative.example': 'BREAKING NEWS: Your humble colleague is temporarily vanishing...',
    'style.minimalist.name': 'Minimalist',
    'style.minimalist.desc': 'Direct and concise',
    'style.minimalist.example': 'Away: Dec 15-25. Urgent contact: [name]',
    'style.gen-z.name': 'Authentic Gen Z',
    'style.gen-z.desc': 'Modern and casual language',
    'style.gen-z.example': 'no cap I\'m going on vacation bestie 🏖️',
    'style.formal.name': 'Very Formal',
    'style.formal.desc': 'Strict protocol and elegant',
    'style.formal.example': 'I have the honor to inform you that...',
    'style.friendly.name': 'Warm Friendly',
    'style.friendly.desc': 'Convivial and positive',
    'style.friendly.example': 'Hi there! I\'m going on vacation from... 🌞',

    // Generated Message
    'generated.title': 'Generated Message',
    'generated.generating': 'Generating...',
    'generated.generating.subtitle': 'Our AI is writing your personalized message',
    'generated.waiting.title': 'Waiting for generation',
    'generated.waiting.subtitle': 'Fill out the form and click "Generate" to create your message',
    'generated.words': 'words',
    'generated.characters': 'characters',
    'generated.copy': 'Copy',
    'generated.copied': 'Copied!',
    'generated.regenerate': 'Regenerate',
    'generated.format.title': 'Copy in another format:',
    'generated.format.html': 'HTML',
    'generated.format.markdown': 'Markdown',
    'generated.tips.title': '💡 Usage tips:',
    'generated.tips.email': '• Email: Paste directly into your automatic signature',
    'generated.tips.slack': '• Slack/Teams: Use Markdown format for more style',
    'generated.tips.linkedin': '• LinkedIn: Adapt as a post if you want to share publicly',
    'generated.preview': 'Style Preview',

    // Generate Button
    'generate.button': 'Generate my message',
    'generate.button.loading': 'Generating...',

    // Toast messages
    'toast.missing.title': 'Missing information',
    'toast.missing.desc': 'Please provide at least dates and destination.',
    'toast.generated.title': 'Message generated!',
    'toast.generated.desc': 'Your vacation message is ready to use.',
    'toast.copied.title': 'Copied!',
    'toast.copied.desc.text': 'Message copied as plain text.',
    'toast.copied.desc.html': 'Message copied as HTML.',
    'toast.copied.desc.markdown': 'Message copied as Markdown.',
    'toast.copy.error.title': 'Copy error',
    'toast.copy.error.desc': 'Unable to copy message. Try selecting it manually.',

    // Footer
    'footer.created': 'Created with ❤️ to simplify your vacation messages',
    'footer.secure': '🔒 Secure data',
    'footer.instant': '⚡ Instant generation',
    'footer.compatible': '🌍 Compatible with all platforms'
  }
};

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['fr']] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
