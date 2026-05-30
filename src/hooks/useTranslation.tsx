
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: { [key: string]: any }) => string;
  tArray: (key: string) => string[];
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations = {
  fr: {
    // SEO
    'seo.title': 'Away - Générateur de Messages d\'Absence Brutaliste',
    'seo.description': 'Créez des messages d\'absence percutants et personnalisés en quelques secondes avec Away. 8 styles uniques, design brutaliste, 100% local et gratuit.',
    'seo.keywords': 'message absence, générateur, out of office, brutaliste, design, professionnel, créatif, gratuit, sans IA, local',

    // Header
    'app.title': 'Away',
    'app.subtitle': 'Créez des messages d\'absence qui font une déclaration. 8 styles uniques, design brutaliste, 100% local.',
    'app.badge.free': 'Gratuit',
    'app.badge.instant': 'Instantané',
    'app.badge.styles': '8 Styles',

    // Steps
    'step.basic.title': 'Informations de base',
    'step.recipients.title': 'Destinataires',
    'step.style.title': 'Style & Message',

    // Form
    'form.title': 'Votre Message',
    'form.dates': 'Dates de vacances',
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
     'form.backup': 'Contacts de substitution (optionnel)',
     'form.backup.placeholder': 'ex: Marie Dupont, Service Client, Jean Martin',
     'form.backup.hint': 'Séparez plusieurs contacts par des virgules',
    'form.example': 'ex:',
    'form.destination.examples': ['Thaïlande 🏝️', 'Bretagne 🌊', 'Chez mes parents 🏠', 'Montagne 🏔️', 'New York 🗽'],
    'form.activity.examples': ['Plage et farniente 🏖️', 'Randonnée en montagne 🥾', 'Visite familiale 👨‍👩‍👧‍👦', 'Road trip 🚗', 'Yoga et détente 🧘‍♀️'],
    'form.recipients.section': 'Destinataires et Contact',
    'form.recipients.question': 'Pour qui ?',
    
    // Form validation
    'form.validation.date': 'La date de fin doit être après la date de début',
    'form.validation.destination': 'Destination invalide. Utilisez uniquement des lettres, espaces et tirets.',
    'form.validation.activity': 'Activité invalide. Utilisez uniquement des lettres, espaces et ponctuation de base.',
    'form.validation.backup': 'Contacts invalides. Utilisez uniquement des lettres, espaces, tirets, apostrophes et virgules.',

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
    'generated.generating.subtitle': 'Génération d\'une nouvelle version...',
    'generated.waiting.title': 'En attente de génération',
    'generated.waiting.subtitle': 'Remplissez le formulaire et cliquez sur "Générer" pour créer votre message',
    'generated.message.title': 'Message Généré',
    'generated.message.subtitle': 'Modifiez le message avant de le copier',
    'generated.message.placeholder': 'Votre message apparaîtra ici...',
    'generated.stats.words': 'mots',
    'generated.stats.characters': 'caractères',
    'generated.actions.copy': 'Copier le message',
    'generated.actions.regenerate': 'Générer une nouvelle version',
    'generated.tips.title': 'Conseil d\'utilisation',
    'generated.tips.regenerate': 'Cliquez sur "Générer une nouvelle version" pour obtenir une variante',
    'generated.tips.customize': 'Personnalisez le message selon votre contexte professionnel',
    'generated.tips.signature': 'N\'oubliez pas d\'ajouter votre signature !',
    'generated.copy': 'Copier',
    'generated.copied': 'Copié !',
    'generated.regenerate': 'Régénérer',
    'generated.format.title': 'Copier dans un autre format :',
    'generated.format.html': 'HTML',
    'generated.format.markdown': 'Markdown',
    'generated.preview': 'Aperçu du Style',

    // Buttons
    'button.continue': 'Continuer',
    'button.back': 'Retour',
    
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
    'footer.created': 'Créé par',
    
    'footer.secure': '🔒 100% Local',
    'footer.instant': '⚡ Instantané',
    'footer.compatible': '🌍 Sans Tracking',
    'footer.tagline': 'Parce que votre absence mérite une déclaration.',

    // Loading Screen
    'loading.title': 'Away',
    'loading.subtitle': 'Votre outil pour créer des messages d\'absence percutants',
    'loading.features.generation.title': 'Génération instantanée',
    'loading.features.generation.desc': 'Messages d\'absence personnalisés en quelques secondes',
    'loading.features.styles.title': '8 Styles Uniques',
    'loading.features.styles.desc': 'Du professionnel au décalé, trouvez votre ton',
    'loading.features.time.title': 'Gain de temps',
    'loading.features.time.desc': 'Plus besoin de réfléchir, Away s\'occupe de tout',
    'loading.features.free.title': '100% Gratuit',
    'loading.features.free.desc': 'Aucune inscription, aucun tracking, zéro BS',
    'loading.progress': 'Chargement',
    'loading.preparing': 'Préparation de votre expérience Away...',

    // Conversation UI
    'conversation.title': 'Conversation',
    'conversation.send': 'Envoyer',
    'conversation.clear': 'Effacer',
    'conversation.history': 'Historique',
    'conversation.welcome': 'Bonjour ! Je suis Away, votre assistant pour créer des messages d\'absence percutants. Par où commençons-nous ?',
    'conversation.askForInfo': 'Pour générer un message, j\'ai besoin de : {fields}. Pouvez-vous me donner ces informations ?',
    'conversation.error': 'Désolé, une erreur est survenue lors de la génération du message.',
    'conversation.savedAsTemplate': 'Template enregistré ! Vous pouvez le retrouver dans la section "Mes Templates".',

    // Templates
    'templates.title': 'Mes Templates',
    'templates.subtitle': 'Gérez vos templates personnalisés pour gagner du temps.',
    'templates.new': 'Nouveau Template',
    'templates.newButton': 'Créer un Template',
    'templates.name': 'Nom',
    'templates.namePlaceholder': 'Ex: Message professionnel court',
    'templates.style': 'Style',
    'templates.content': 'Contenu',
    'templates.contentPlaceholder': 'Écrivez votre message ici...',
    'templates.save': 'Enregistrer',
    'templates.cancel': 'Annuler',
    'templates.edit': 'Modifier',
    'templates.delete': 'Supprimer',
    'templates.copy': 'Copier',
    'templates.use': 'Utiliser',
    'templates.empty': 'Aucun template enregistré.',
    'templates.createFirst': 'Créer mon premier template',

    // History
    'history.title': 'Historique',
    'history.subtitle': 'Retrouvez tous vos messages générés précédemment.',
    'history.clearAll': 'Tout effacer',
    'history.filter': 'Filtrer par style',
    'history.allStyles': 'Tous les styles',
    'history.empty': 'Aucun message dans l\'historique.',
    'history.emptyHint': 'Générez un message pour commencer à remplir votre historique.',
    'history.messageSingular': 'message',
    'history.messagePlural': 'messages',

    // Templates
    'templates.templateSingular': 'template',
    'templates.templatePlural': 'templates',

    // Email
    'email.subject': 'Message d\'absence',
    'email.openInClient': 'Ouvrir dans le client email',

    // Download
    'download.text': 'Télécharger en texte',
    'download.filename': 'message-absence-{date}.txt',

    // Legal
    'legal.notice': 'Mentions légales',
    'legal.terms': 'Conditions d\'utilisation',
    'legal.privacy': 'Politique de confidentialité',
    'legal.close': 'Fermer',
    
    // Legal Notice Content
    'legal.notice.title': 'Mentions Légales',
    'legal.notice.subtitle': 'Informations légales concernant VacayGen',
    'legal.notice.editor.title': 'Éditeur du site',
    'legal.notice.editor.name': 'Nom',
    'legal.notice.editor.website': 'Site web',
    'legal.notice.editor.contact': 'Contact',
    'legal.notice.hosting.title': 'Hébergement',
    'legal.notice.hosting.provider': 'Hébergeur',
    'legal.notice.hosting.address': 'Adresse',
    'legal.notice.hosting.cloud': 'Services d\'hébergement cloud',
    'legal.notice.ip.title': 'Propriété intellectuelle',
    'legal.notice.ip.content': 'Le contenu de ce site web (textes, images, logos, icônes, sons, logiciels) est la propriété exclusive de Hugo Mourlevat, sauf mention contraire. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site est interdite, sauf autorisation écrite préalable.',
    'legal.notice.liability.title': 'Limitation de responsabilité',
    'legal.notice.liability.content': 'L\'éditeur ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l\'utilisateur, lors de l\'accès au site, et résultant soit de l\'utilisation d\'un matériel ne répondant pas aux spécifications indiquées, soit de l\'apparition d\'un bug ou d\'une incompatibilité.',
    'legal.notice.data.title': 'Données personnelles',
    'legal.notice.data.content': 'VacayGen respecte votre vie privée. Aucune donnée personnelle n\'est collectée, stockée ou transmise par cette application. Tous les traitements sont effectués localement dans votre navigateur.',

    // Terms of Service Content
    'legal.terms.title': 'Conditions d\'Utilisation',
    'legal.terms.subtitle': 'Conditions générales d\'utilisation de VacayGen',
    'legal.terms.object.title': '1. Objet',
    'legal.terms.object.content': 'Les présentes conditions générales d\'utilisation (CGU) ont pour objet de définir les modalités et conditions d\'utilisation du service VacayGen, ainsi que les droits et obligations des utilisateurs.',
    'legal.terms.service.title': '2. Description du service',
    'legal.terms.service.content': 'VacayGen est un générateur gratuit de messages d\'absence automatique. Le service permet aux utilisateurs de créer des messages personnalisés pour informer de leur absence temporaire.',
    'legal.terms.access.title': '3. Accès au service',
    'legal.terms.access.content': 'Le service est accessible gratuitement à tout utilisateur disposant d\'un accès internet. Aucune inscription n\'est requise. L\'utilisateur s\'engage à utiliser le service de manière responsable et conforme à sa destination.',
    'legal.terms.usage.title': '4. Utilisation autorisée',
    'legal.terms.usage.allowed': 'Utilisations autorisées :',
    'legal.terms.usage.allowed.1': 'Génération de messages d\'absence professionnels',
    'legal.terms.usage.allowed.2': 'Personnalisation des messages selon vos besoins',
    'legal.terms.usage.allowed.3': 'Utilisation à des fins personnelles ou professionnelles',
    'legal.terms.usage.forbidden': 'Utilisations interdites :',
    'legal.terms.usage.forbidden.1': 'Utilisation à des fins illégales ou frauduleuses',
    'legal.terms.usage.forbidden.2': 'Génération de contenus offensants, diffamatoires ou inappropriés',
    'legal.terms.usage.forbidden.3': 'Tentative de contournement des mesures de sécurité',
    'legal.terms.usage.forbidden.4': 'Utilisation abusive pouvant perturber le fonctionnement du service',
    'legal.terms.ip.title': '5. Propriété intellectuelle',
    'legal.terms.ip.content': 'Les messages générés par VacayGen sont libres d\'utilisation par l\'utilisateur. Cependant, le code source et l\'interface de l\'application restent la propriété de l\'éditeur.',
    'legal.terms.responsibility.title': '6. Responsabilité',
    'legal.terms.responsibility.content': 'L\'utilisateur est seul responsable de l\'usage qu\'il fait des messages générés. L\'éditeur ne saurait être tenu responsable des conséquences de l\'utilisation des messages dans un contexte professionnel ou personnel.',
    'legal.terms.availability.title': '7. Disponibilité du service',
    'legal.terms.availability.content': 'L\'éditeur s\'efforce d\'assurer une disponibilité du service 24h/24 et 7j/7, mais ne saurait être tenu responsable d\'interruptions temporaires liées à la maintenance ou à des causes techniques indépendantes de sa volonté.',
    'legal.terms.modifications.title': '8. Modification des CGU',
    'legal.terms.modifications.content': 'L\'éditeur se réserve le droit de modifier les présentes CGU à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.',

    // Privacy Policy Content
    'legal.privacy.title': 'Politique de Confidentialité',
    'legal.privacy.subtitle': 'Protection de vos données personnelles',
    'legal.privacy.highlight': 'VacayGen fonctionne entièrement dans votre navigateur. Aucune donnée n\'est envoyée vers nos serveurs ou stockée en ligne.',
    'legal.privacy.data.title': '1. Collecte de données',
    'legal.privacy.data.none': 'Aucune collecte de données personnelles',
    'legal.privacy.data.content': 'VacayGen ne collecte, ne stocke et ne transmet aucune donnée personnelle. L\'application fonctionne entièrement dans votre navigateur web.',
    'legal.privacy.data.not.collected': 'Données NON collectées :',
    'legal.privacy.data.not.1': 'Informations de contact (email, téléphone, nom)',
    'legal.privacy.data.not.2': 'Dates de vacances saisies',
    'legal.privacy.data.not.3': 'Messages générés',
    'legal.privacy.data.not.4': 'Préférences utilisateur',
    'legal.privacy.data.not.5': 'Adresse IP ou données de géolocalisation',
    'legal.privacy.data.not.6': 'Historique de navigation',
    'legal.privacy.processing.title': '2. Traitement des données',
    'legal.privacy.processing.content': 'Toutes les données saisies dans VacayGen (dates, messages personnalisés, préférences de style) sont traitées localement dans votre navigateur uniquement. Ces informations :',
    'legal.privacy.processing.1': 'Ne quittent jamais votre ordinateur',
    'legal.privacy.processing.2': 'Ne sont pas sauvegardées sur nos serveurs',
    'legal.privacy.processing.3': 'Sont automatiquement effacées lorsque vous fermez l\'onglet',
    'legal.privacy.processing.4': 'Ne sont pas partagées avec des tiers',
    'legal.privacy.cookies.title': '3. Cookies et stockage local',
    'legal.privacy.cookies.technical': 'Cookies techniques uniquement',
    'legal.privacy.cookies.technical.content': 'VacayGen utilise uniquement des cookies techniques nécessaires au fonctionnement de l\'application (préférences de langue, thème sombre/clair). Aucun cookie de tracking ou publicitaire n\'est utilisé.',
    'legal.privacy.storage.title': 'Stockage local temporaire',
    'legal.privacy.storage.content': 'Les données saisies peuvent être temporairement stockées dans le stockage local de votre navigateur pour améliorer l\'expérience utilisateur. Ces données sont automatiquement supprimées à la fermeture de l\'onglet.',
    'legal.privacy.sharing.title': '4. Partage de données',
    'legal.privacy.sharing.none': 'Aucun partage de données',
    'legal.privacy.sharing.content': 'VacayGen ne partage aucune donnée avec des tiers, partenaires commerciaux, ou services d\'analyse, car aucune donnée n\'est collectée.',
    'legal.privacy.security.title': '5. Sécurité',
    'legal.privacy.security.content': 'Bien qu\'aucune donnée ne soit transmise ou stockée en ligne, VacayGen implémente plusieurs mesures de sécurité :',
    'legal.privacy.security.1': 'Validation et sanitisation des entrées utilisateur',
    'legal.privacy.security.2': 'Protection contre les attaques XSS (Cross-Site Scripting)',
    'legal.privacy.security.3': 'Limitation du taux de génération de messages',
    'legal.privacy.security.4': 'Code source sécurisé et régulièrement audité',
    'legal.privacy.rights.title': '6. Vos droits',
    'legal.privacy.rights.content': 'Même si aucune donnée personnelle n\'est collectée, vous disposez des droits suivants :',
    'legal.privacy.rights.1': 'Droit à l\'information : Cette politique vous informe de nos pratiques',
    'legal.privacy.rights.2': 'Droit de contrôle : Vous contrôlez entièrement vos données locales',
    'legal.privacy.rights.3': 'Droit d\'effacement : Fermez l\'onglet pour effacer toutes les données',
    'legal.privacy.rights.4': 'Droit de portabilité : Copiez vos messages générés librement',
    'legal.privacy.third.title': '7. Services tiers',
    'legal.privacy.third.content': 'VacayGen est hébergé sur la plateforme Lovable. Aucune donnée utilisateur n\'est transmise à Lovable ou à d\'autres services tiers. Seules des données techniques anonymes (statistiques de visite) peuvent être collectées par l\'hébergeur.',
    'legal.privacy.contact.title': '8. Contact',
    'legal.privacy.contact.content': 'Pour toute question concernant cette politique de confidentialité, vous pouvez contacter le développeur via son profil LinkedIn :'
  },
  en: {
    // SEO
    'seo.title': 'Away - Brutalist Out-of-Office Message Generator',
    'seo.description': 'Create bold and personalized out-of-office messages in seconds with Away. 8 unique styles, brutalist design, 100% local and free.',
    'seo.keywords': 'out of office, generator, brutalist, design, professional, creative, free, no AI, local, privacy',

    // Header
    'app.title': 'Away',
    'app.subtitle': 'Create out-of-office messages that make a statement. 8 unique styles, brutalist design, 100% local.',
    'app.badge.free': 'Free',
    'app.badge.instant': 'Instant',
    'app.badge.styles': '8 Styles',

    // Steps
    'step.basic.title': 'Basic Info',
    'step.recipients.title': 'Recipients',
    'step.style.title': 'Style & Message',

    // Form
    'form.title': 'Your Message',
    'form.dates': 'Vacation dates',
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
     'form.backup': 'Backup contacts (optional)',
     'form.backup.placeholder': 'e.g.: Marie Dupont, Customer Service, John Martin',
     'form.backup.hint': 'Separate multiple contacts with commas',
    'form.example': 'e.g.:',
    'form.destination.examples': ['Thailand 🏝️', 'Brittany 🌊', 'Visiting family 🏠', 'Mountains 🏔️', 'New York 🗽'],
    'form.activity.examples': ['Beach & relaxation 🏖️', 'Mountain hiking 🥾', 'Family visit 👨‍👩‍👧‍👦', 'Road trip 🚗', 'Yoga & relaxation 🧘‍♀️'],
    'form.recipients.section': 'Recipients and Contact',
    'form.recipients.question': 'For whom?',
    
    // Form validation
    'form.validation.date': 'End date must be after start date',
    'form.validation.destination': 'Invalid destination. Use only letters, spaces and hyphens.',
    'form.validation.activity': 'Invalid activity. Use only letters, spaces and basic punctuation.',
    'form.validation.backup': 'Invalid contacts. Use only letters, spaces, hyphens, apostrophes and commas.',

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
    'generated.generating.subtitle': 'Generating a new version...',
    'generated.waiting.title': 'Waiting for generation',
    'generated.waiting.subtitle': 'Fill out the form and click "Generate" to create your message',
    'generated.message.title': 'Generated Message',
    'generated.message.subtitle': 'Edit the message before copying it',
    'generated.message.placeholder': 'Your message will appear here...',
    'generated.stats.words': 'words',
    'generated.stats.characters': 'characters',
    'generated.actions.copy': 'Copy message',
    'generated.actions.regenerate': 'Generate new version',
    'generated.tips.title': 'Usage tips',
    'generated.tips.regenerate': 'Click "Generate new version" to get a variant',
    'generated.tips.customize': 'Customize the message according to your professional context',
    'generated.tips.signature': "Don't forget to add your signature!",
    'generated.copy': 'Copy',
    'generated.copied': 'Copied!',
    'generated.regenerate': 'Regenerate',
    'generated.format.title': 'Copy in another format:',
    'generated.format.html': 'HTML',
    'generated.format.markdown': 'Markdown',
    'generated.preview': 'Style Preview',

    // Buttons
    'button.continue': 'Continue',
    'button.back': 'Back',
    
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
    'footer.created': 'Created by',
    'footer.messages.count': '{count} message{count, plural, =1 {} other {s}} generated',
    'footer.secure': '🔒 100% Local',
    'footer.instant': '⚡ Instant',
    'footer.compatible': '🌍 No Tracking',
    'footer.tagline': 'Because your absence deserves a statement.',

    // Loading Screen
    'loading.title': 'Away',
    'loading.subtitle': 'Your tool for creating bold out-of-office messages',
    'loading.features.generation.title': 'Instant Generation',
    'loading.features.generation.desc': 'Personalized out-of-office messages in seconds',
    'loading.features.styles.title': '8 Unique Styles',
    'loading.features.styles.desc': 'From professional to quirky, find your tone',
    'loading.features.time.title': 'Time Saving',
    'loading.features.time.desc': 'No need to think, Away takes care of everything',
    'loading.features.free.title': '100% Free',
    'loading.features.free.desc': 'No registration, no tracking, zero BS',
    'loading.progress': 'Loading',
    'loading.preparing': 'Preparing your Away experience...',

    // Conversation UI
    'conversation.title': 'Conversation',
    'conversation.send': 'Send',
    'conversation.clear': 'Clear',
    'conversation.history': 'History',
    'conversation.welcome': 'Hello! I am Away, your assistant for creating bold out-of-office messages. Where should we start?',
    'conversation.askForInfo': 'To generate a message, I need: {fields}. Can you provide these?',
    'conversation.error': 'Sorry, an error occurred while generating the message.',
    'conversation.savedAsTemplate': 'Template saved! You can find it in the "My Templates" section.',

    // Templates
    'templates.title': 'My Templates',
    'templates.subtitle': 'Manage your custom templates to save time.',
    'templates.new': 'New Template',
    'templates.newButton': 'Create a Template',
    'templates.name': 'Name',
    'templates.namePlaceholder': 'Ex: Short professional message',
    'templates.style': 'Style',
    'templates.content': 'Content',
    'templates.contentPlaceholder': 'Write your message here...',
    'templates.save': 'Save',
    'templates.cancel': 'Cancel',
    'templates.edit': 'Edit',
    'templates.delete': 'Delete',
    'templates.copy': 'Copy',
    'templates.use': 'Use',
    'templates.empty': 'No templates saved yet.',
    'templates.createFirst': 'Create your first template',

    // History
    'history.title': 'History',
    'history.subtitle': 'Find all your previously generated messages.',
    'history.clearAll': 'Clear All',
    'history.filter': 'Filter by style',
    'history.allStyles': 'All Styles',
    'history.empty': 'No messages in history yet.',
    'history.emptyHint': 'Generate a message to start filling your history.',
    'history.messageSingular': 'message',
    'history.messagePlural': 'messages',

    // Templates
    'templates.templateSingular': 'template',
    'templates.templatePlural': 'templates',

    // Email
    'email.subject': 'Out of Office Message',
    'email.openInClient': 'Open in Email Client',

    // Download
    'download.text': 'Download as Text',
    'download.filename': 'away-message-{date}.txt',

    // Legal
    'legal.notice': 'Legal Notice',
    'legal.terms': 'Terms of Service',
    'legal.privacy': 'Privacy Policy',
    'legal.close': 'Close',
    
    // Legal Notice Content
    'legal.notice.title': 'Legal Notice',
    'legal.notice.subtitle': 'Legal information about VacayGen',
    'legal.notice.editor.title': 'Site Editor',
    'legal.notice.editor.name': 'Name',
    'legal.notice.editor.website': 'Website',
    'legal.notice.editor.contact': 'Contact',
    'legal.notice.hosting.title': 'Hosting',
    'legal.notice.hosting.provider': 'Host',
    'legal.notice.hosting.address': 'Address',
    'legal.notice.hosting.cloud': 'Cloud hosting services',
    'legal.notice.ip.title': 'Intellectual Property',
    'legal.notice.ip.content': 'The content of this website (texts, images, logos, icons, sounds, software) is the exclusive property of Hugo Mourlevat, unless otherwise stated. Any reproduction, representation, modification, publication, adaptation of all or part of the site elements is prohibited, except with prior written authorization.',
    'legal.notice.liability.title': 'Limitation of Liability',
    'legal.notice.liability.content': 'The editor cannot be held responsible for direct and indirect damages caused to the user\'s equipment, when accessing the site, and resulting either from the use of equipment that does not meet the specified specifications, or from the appearance of a bug or incompatibility.',
    'legal.notice.data.title': 'Personal Data',
    'legal.notice.data.content': 'VacayGen respects your privacy. No personal data is collected, stored or transmitted by this application. All processing is performed locally in your browser.',

    // Terms of Service Content
    'legal.terms.title': 'Terms of Service',
    'legal.terms.subtitle': 'General terms of use for VacayGen',
    'legal.terms.object.title': '1. Purpose',
    'legal.terms.object.content': 'These general terms of use (GTU) aim to define the terms and conditions of use of the VacayGen service, as well as the rights and obligations of users.',
    'legal.terms.service.title': '2. Service Description',
    'legal.terms.service.content': 'VacayGen is a free automatic out-of-office message generator. The service allows users to create personalized messages to inform about their temporary absence.',
    'legal.terms.access.title': '3. Service Access',
    'legal.terms.access.content': 'The service is freely accessible to any user with internet access. No registration is required. The user undertakes to use the service responsibly and in accordance with its intended purpose.',
    'legal.terms.usage.title': '4. Authorized Use',
    'legal.terms.usage.allowed': 'Authorized uses:',
    'legal.terms.usage.allowed.1': 'Generation of professional out-of-office messages',
    'legal.terms.usage.allowed.2': 'Customization of messages according to your needs',
    'legal.terms.usage.allowed.3': 'Use for personal or professional purposes',
    'legal.terms.usage.forbidden': 'Prohibited uses:',
    'legal.terms.usage.forbidden.1': 'Use for illegal or fraudulent purposes',
    'legal.terms.usage.forbidden.2': 'Generation of offensive, defamatory or inappropriate content',
    'legal.terms.usage.forbidden.3': 'Attempt to circumvent security measures',
    'legal.terms.usage.forbidden.4': 'Abusive use that may disrupt the service operation',
    'legal.terms.ip.title': '5. Intellectual Property',
    'legal.terms.ip.content': 'Messages generated by VacayGen are free to use by the user. However, the source code and application interface remain the property of the editor.',
    'legal.terms.responsibility.title': '6. Responsibility',
    'legal.terms.responsibility.content': 'The user is solely responsible for the use they make of the generated messages. The editor cannot be held responsible for the consequences of using messages in a professional or personal context.',
    'legal.terms.availability.title': '7. Service Availability',
    'legal.terms.availability.content': 'The editor strives to ensure service availability 24/7, but cannot be held responsible for temporary interruptions related to maintenance or technical causes beyond their control.',
    'legal.terms.modifications.title': '8. GTU Modifications',
    'legal.terms.modifications.content': 'The editor reserves the right to modify these GTU at any time. Modifications take effect upon their publication on the site.',

    // Privacy Policy Content
    'legal.privacy.title': 'Privacy Policy',
    'legal.privacy.subtitle': 'Protection of your personal data',
    'legal.privacy.highlight': 'VacayGen operates entirely in your browser. No data is sent to our servers or stored online.',
    'legal.privacy.data.title': '1. Data Collection',
    'legal.privacy.data.none': 'No personal data collection',
    'legal.privacy.data.content': 'VacayGen does not collect, store and transmit any personal data. The application operates entirely in your web browser.',
    'legal.privacy.data.not.collected': 'Data NOT collected:',
    'legal.privacy.data.not.1': 'Contact information (email, phone, name)',
    'legal.privacy.data.not.2': 'Vacation dates entered',
    'legal.privacy.data.not.3': 'Generated messages',
    'legal.privacy.data.not.4': 'User preferences',
    'legal.privacy.data.not.5': 'IP address or geolocation data',
    'legal.privacy.data.not.6': 'Navigation history',
    'legal.privacy.processing.title': '2. Data Processing',
    'legal.privacy.processing.content': 'All data entered in VacayGen (dates, custom messages, style preferences) are processed locally in your browser only. This information:',
    'legal.privacy.processing.1': 'Never leaves your computer',
    'legal.privacy.processing.2': 'Is not saved on our servers',
    'legal.privacy.processing.3': 'Is automatically deleted when you close the tab',
    'legal.privacy.processing.4': 'Is not shared with third parties',
    'legal.privacy.cookies.title': '3. Cookies and Local Storage',
    'legal.privacy.cookies.technical': 'Technical cookies only',
    'legal.privacy.cookies.technical.content': 'VacayGen uses only technical cookies necessary for the application to function (language preferences, dark/light theme). No tracking or advertising cookies are used.',
    'legal.privacy.storage.title': 'Temporary local storage',
    'legal.privacy.storage.content': 'Entered data may be temporarily stored in your browser\'s local storage to improve user experience. This data is automatically deleted when the tab is closed.',
    'legal.privacy.sharing.title': '4. Data Sharing',
    'legal.privacy.sharing.none': 'No data sharing',
    'legal.privacy.sharing.content': 'VacayGen does not share any data with third parties, business partners, or analytics services, as no data is collected.',
    'legal.privacy.security.title': '5. Security',
    'legal.privacy.security.content': 'Although no data is transmitted or stored online, VacayGen implements several security measures:',
    'legal.privacy.security.1': 'Validation and sanitization of user inputs',
    'legal.privacy.security.2': 'Protection against XSS (Cross-Site Scripting) attacks',
    'legal.privacy.security.3': 'Rate limiting for message generation',
    'legal.privacy.security.4': 'Secure source code and regular audits',
    'legal.privacy.rights.title': '6. Your Rights',
    'legal.privacy.rights.content': 'Even though no personal data is collected, you have the following rights:',
    'legal.privacy.rights.1': 'Right to information: This policy informs you of our practices',
    'legal.privacy.rights.2': 'Right to control: You fully control your local data',
    'legal.privacy.rights.3': 'Right to deletion: Close the tab to delete all data',
    'legal.privacy.rights.4': 'Right to portability: Copy your generated messages freely',
    'legal.privacy.third.title': '7. Third-party Services',
    'legal.privacy.third.content': 'VacayGen is hosted on the Lovable platform. No user data is transmitted to Lovable or other third-party services. Only anonymous technical data (visit statistics) may be collected by the host.',
    'legal.privacy.contact.title': '8. Contact',
    'legal.privacy.contact.content': 'For any questions regarding this privacy policy, you can contact the developer via his LinkedIn profile:'
  }
};

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Detect browser language automatically
  const detectBrowserLanguage = (): Language => {
    const browserLang = navigator.language || navigator.languages?.[0] || 'fr';
    return browserLang.startsWith('en') ? 'en' : 'fr';
  };

  const [language, setLanguage] = useState<Language>(detectBrowserLanguage());

  const t = (key: string, params?: { [key: string]: any }): string => {
    // Get translation directly by key (since keys use dot notation as strings)
    const translationSet = translations[language];
    let value = translationSet[key as keyof typeof translationSet];
    
    // If not found, return the key itself for debugging
    if (typeof value !== 'string') {
      console.warn(`Translation key not found: ${key} for language: ${language}`);
      return key;
    }
    
    let result = value;
    
    // Simple interpolation for parameters
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        if (paramKey === 'count') {
          // Handle plural forms for the specific pattern
          const pluralMatch = result.match(/\{count, plural, =1 \{([^}]*)\} other \{([^}]*)\}\}/);
          if (pluralMatch) {
            const singular = pluralMatch[1];
            const plural = pluralMatch[2];
            result = result.replace(pluralMatch[0], paramValue === 1 ? singular : plural);
          }
        }
        // Replace simple placeholders
        result = result.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue));
      });
    }
    
    return result;
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
