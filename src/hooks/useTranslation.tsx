
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations = {
  fr: {
    // SEO
    'seo.title': 'VacayGen - Générateur de Messages de Vacances IA Gratuit',
    'seo.description': 'Créez des messages d\'absence professionnels et personnalisés en quelques secondes avec VacayGen. IA gratuite, 8 styles disponibles, compatible tous supports.',
    'seo.keywords': 'message vacances, générateur IA, absence bureau, out of office, message automatique, IA gratuit, vacances, congés, message professionnel',

    // Header
    'app.title': 'VacayGen',
    'app.subtitle': 'Générez le message de vacances parfait avec l\'IA. Professionnel, personnel ou créatif - trouvez le ton qui vous ressemble !',
    'app.badge.free': 'Gratuit',
    'app.badge.instant': 'Instantané',
    'app.badge.styles': '8 Styles',

    // Steps
    'step.basic.title': 'Informations de base',
    'step.recipients.title': 'Destinataires',
    'step.style.title': 'Style & Message',
    'steps.step1.title': 'Dates et Motif',
    'steps.step1.description': 'Indiquez vos dates de vacances et le motif de votre absence',
    'steps.step2.title': 'Couverture et Ton',
    'steps.step2.description': 'Précisez qui vous remplace et le ton souhaité',
    'steps.step3.title': 'Informations Personnelles',
    'steps.step3.description': 'Ajoutez vos coordonnées pour finaliser le message',

    // Form
    'form.title': 'Votre Message',
    'form.dates': 'Dates de vacances',
    'form.startDate': 'Date de début',
    'form.endDate': 'Date de fin',
    'form.reason': 'Motif de l\'absence',
    'form.reasonPlaceholder': 'Ex: Congés annuels, congés familiaux, voyage...',
    'form.coverage': 'Qui me remplace ?',
    'form.coveragePlaceholder': 'Ex: Marie Dubois sera disponible pour les urgences...',
    'form.tone': 'Ton du message',
    'form.selectTone': 'Choisissez un ton',
    'form.tones.professional': 'Professionnel',
    'form.tones.casual': 'Décontracté',
    'form.tones.friendly': 'Amical',
    'form.tones.formal': 'Formel',
    'form.name': 'Nom complet',
    'form.namePlaceholder': 'Ex: Jean Dupont',
    'form.position': 'Poste',
    'form.positionPlaceholder': 'Ex: Chef de projet',
    'form.company': 'Entreprise',
    'form.companyPlaceholder': 'Ex: ABC Corporation',
    'form.email': 'Email',
    'form.emailPlaceholder': 'Ex: jean.dupont@entreprise.com',
    'form.location': 'Lieu de vacances',
    'form.locationPlaceholder': 'Ex: Bali, France, chez la famille...',
    'form.next': 'Suivant',
    'form.previous': 'Précédent',
    'form.finish': 'Générer le message',
    'form.dates.from': 'Du',
    'form.dates.to': 'Au',
    'form.dates.selectStart': 'Choisir la date de début',
    'form.dates.selectEnd': 'Choisir la date de fin',
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
    'form.example': 'ex:',
    'form.destination.examples': ['Thaïlande 🏝️', 'Bretagne 🌊', 'Chez mes parents 🏠', 'Montagne 🏔️', 'New York 🗽'],
    'form.activity.examples': ['Plage et farniente 🏖️', 'Randonnée en montagne 🥾', 'Visite familiale 👨‍👩‍👧‍👦', 'Road trip 🚗', 'Yoga et détente 🧘‍♀️'],
    'form.recipients.section': 'Destinataires et Contact',
    'form.recipients.question': 'Pour qui ?',

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

    // Result section
    'result.title': 'Votre message de vacances',
    'result.ready': 'Prêt à utiliser',
    'result.editPlaceholder': 'Modifiez votre message ici...',
    'actions.copy': 'Copier',
    'actions.edit': 'Modifier',
    'actions.save': 'Sauvegarder',
    'actions.cancel': 'Annuler',
    'actions.export': 'Télécharger',
    'actions.email': 'Envoyer par email',
    'actions.regenerate': 'Regénérer',
    'actions.newMessage': 'Nouveau message',
    'success.generated': 'Message généré !',
    'success.generatedDescription': 'Votre message de vacances est prêt',
    'success.copied': 'Copié !',
    'success.copiedDescription': 'Le message a été copié dans le presse-papiers',
    'success.saved': 'Modifications sauvegardées',
    'success.savedDescription': 'Vos modifications ont été enregistrées',
    'error.generation': 'Erreur de génération',
    'error.generationDescription': 'Impossible de générer le message. Réessayez.',
    'error.copyFailed': 'Erreur de copie',
    'error.copyFailedDescription': 'Impossible de copier le texte',
    'hero.description': 'Générez des messages d\'absence professionnels en quelques clics',
    'footer.madeWith': 'Créé avec',
    'footer.by': 'par',

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
    'footer.created': 'Vibe Coded par',
    'footer.secure': '🔒 Données sécurisées',
    'footer.instant': '⚡ Génération instantanée',
    'footer.compatible': '🌍 Compatible toutes plateformes'
  },
  en: {
    // SEO
    'seo.title': 'VacayGen - Free AI Vacation Message Generator',
    'seo.description': 'Create professional and personalized out-of-office messages in seconds with VacayGen. Free AI, 8 styles available, compatible with all platforms.',
    'seo.keywords': 'vacation message, AI generator, out of office, automatic message, free AI, vacation, leave, professional message',

    // Header
    'app.title': 'VacayGen',
    'app.subtitle': 'Generate the perfect vacation message with AI. Professional, personal, or creative - find the tone that suits you!',
    'app.badge.free': 'Free',
    'app.badge.instant': 'Instant',
    'app.badge.styles': '8 Styles',

    // Steps
    'step.basic.title': 'Basic Info',
    'step.recipients.title': 'Recipients',
    'step.style.title': 'Style & Message',
    'steps.step1.title': 'Dates and Reason',
    'steps.step1.description': 'Enter your vacation dates and reason for absence',
    'steps.step2.title': 'Coverage and Tone',
    'steps.step2.description': 'Specify who will cover for you and desired tone',
    'steps.step3.title': 'Personal Information',
    'steps.step3.description': 'Add your contact details to finalize the message',

    // Form
    'form.title': 'Your Message',
    'form.dates': 'Vacation dates',
    'form.startDate': 'Start date',
    'form.endDate': 'End date',
    'form.reason': 'Reason for absence',
    'form.reasonPlaceholder': 'Ex: Annual leave, family time, travel...',
    'form.coverage': 'Who will cover for me?',
    'form.coveragePlaceholder': 'Ex: Marie Dubois will be available for urgent matters...',
    'form.tone': 'Message tone',
    'form.selectTone': 'Choose a tone',
    'form.tones.professional': 'Professional',
    'form.tones.casual': 'Casual',
    'form.tones.friendly': 'Friendly',
    'form.tones.formal': 'Formal',
    'form.name': 'Full name',
    'form.namePlaceholder': 'Ex: John Smith',
    'form.position': 'Position',
    'form.positionPlaceholder': 'Ex: Project Manager',
    'form.company': 'Company',
    'form.companyPlaceholder': 'Ex: ABC Corporation',
    'form.email': 'Email',
    'form.emailPlaceholder': 'Ex: john.smith@company.com',
    'form.location': 'Vacation location',
    'form.locationPlaceholder': 'Ex: Bali, France, visiting family...',
    'form.next': 'Next',
    'form.previous': 'Previous',
    'form.finish': 'Generate message',
    'form.dates.from': 'From',
    'form.dates.to': 'To',
    'form.dates.selectStart': 'Select start date',
    'form.dates.selectEnd': 'Select end date',
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
    'form.example': 'e.g.:',
    'form.destination.examples': ['Thailand 🏝️', 'Brittany 🌊', 'Visiting family 🏠', 'Mountains 🏔️', 'New York 🗽'],
    'form.activity.examples': ['Beach & relaxation 🏖️', 'Mountain hiking 🥾', 'Family visit 👨‍👩‍👧‍👦', 'Road trip 🚗', 'Yoga & relaxation 🧘‍♀️'],
    'form.recipients.section': 'Recipients and Contact',
    'form.recipients.question': 'For whom?',

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

    // Result section
    'result.title': 'Your vacation message',
    'result.ready': 'Ready to use',
    'result.editPlaceholder': 'Edit your message here...',
    'actions.copy': 'Copy',
    'actions.edit': 'Edit',
    'actions.save': 'Save',
    'actions.cancel': 'Cancel',
    'actions.export': 'Download',
    'actions.email': 'Send by email',
    'actions.regenerate': 'Regenerate',
    'actions.newMessage': 'New message',
    'success.generated': 'Message generated!',
    'success.generatedDescription': 'Your vacation message is ready',
    'success.copied': 'Copied!',
    'success.copiedDescription': 'Message copied to clipboard',
    'success.saved': 'Changes saved',
    'success.savedDescription': 'Your changes have been saved',
    'error.generation': 'Generation error',
    'error.generationDescription': 'Unable to generate message. Please try again.',
    'error.copyFailed': 'Copy failed',
    'error.copyFailedDescription': 'Unable to copy text',
    'hero.description': 'Generate professional out-of-office messages in just a few clicks',
    'footer.madeWith': 'Made with',
    'footer.by': 'by',

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
    'footer.created': 'Vibe Coded by',
    'footer.secure': '🔒 Secure data',
    'footer.instant': '⚡ Instant generation',
    'footer.compatible': '🌍 Compatible with all platforms'
  }
};

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    const value = translations[language][key as keyof typeof translations['fr']];
    return Array.isArray(value) ? key : (value || key);
  };

  const tArray = (key: string): string[] => {
    const value = translations[language][key as keyof typeof translations['fr']];
    return Array.isArray(value) ? value : [];
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, tArray }}>
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
