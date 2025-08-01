import { formatDate } from './dateUtils';

export interface VacationData {
  startDate: string;
  endDate: string;
  destination: string;
  activity: string;
  recipients: string[];
  backupContact: string;
}

export interface MessageTemplate {
  [lang: string]: (data: VacationData) => string;
}

export const messageTemplates: Record<string, MessageTemplate> = {
  'professional': {
    'fr': (data) => {
      const startDate = formatDate(data.startDate, 'fr');
      const endDate = formatDate(data.endDate, 'fr');
      
      return `Bonjour,

Je serai absent(e) du ${startDate} au ${endDate} pour mes congés annuels.

Durant cette période, je ne consulterai pas mes emails de manière régulière.${data.backupContact ? ` Pour toute urgence, veuillez contacter ${data.backupContact}.` : ''}

Je reprendrai mes fonctions le ${endDate} et traiterai votre demande dans les plus brefs délais.

Cordialement,`;
    },
    'en': (data) => {
      const startDate = formatDate(data.startDate, 'en');
      const endDate = formatDate(data.endDate, 'en');
      
      return `Hello,

I will be out of office from ${startDate} to ${endDate} for my annual leave.

During this period, I will not be checking emails regularly.${data.backupContact ? ` For any urgent matters, please contact ${data.backupContact}.` : ''}

I will resume work on ${endDate} and will address your request as soon as possible.

Best regards,`;
    }
  },

  'millennial-pro': {
    'fr': (data) => {
      const startDate = formatDate(data.startDate, 'fr');
      const endDate = formatDate(data.endDate, 'fr');
      
      return `Salut l'équipe ! 👋

Je pars me ressourcer ${data.destination ? `en ${data.destination}` : ''} du ${startDate} au ${endDate} ! ${data.activity ? `Au programme : ${data.activity.toLowerCase()}` : ''} 🌴

Je serai complètement déconnecté(e) pendant cette période (promis, je ne regarderai pas Slack à 2h du matin 😅). 

${data.backupContact ? `Pour tout ce qui ne peut pas attendre mon retour, ${data.backupContact} pourra vous aider.` : ''}

Hâte de revenir avec plein d'énergie pour attaquer la suite ! 🚀

À bientôt,`;
    },
    'en': (data) => {
      const startDate = formatDate(data.startDate, 'en');
      const endDate = formatDate(data.endDate, 'en');
      
      return `Hey team! 👋

I'm going to recharge ${data.destination ? `in ${data.destination}` : ''} from ${startDate} to ${endDate}! ${data.activity ? `Planning to: ${data.activity.toLowerCase()}` : ''} 🌴

I'll be completely disconnected during this time (promise I won't check Slack at 2am 😅).

${data.backupContact ? `For anything that can't wait until I'm back, ${data.backupContact} can help you out.` : ''}

Can't wait to come back with tons of energy to tackle what's next! 🚀

See you soon,`;
    }
  },

  'gen-z': {
    'fr': (data) => {
      const startDate = formatDate(data.startDate, 'fr');
      const endDate = formatDate(data.endDate, 'fr');
      
      return `no cap je pars en vacances bestie 🏖️

dates : ${startDate} → ${endDate}
localisation : ${data.destination || 'somewhere iconic'} ${data.activity ? `(${data.activity.toLowerCase()} era)` : ''}

je serai en mode touch grass donc rip emails 💀
${data.backupContact ? `si c'est vraiment important contactez ${data.backupContact}` : ''}

see you on the flip side ! ✨`;
    },
    'en': (data) => {
      const startDate = formatDate(data.startDate, 'en');
      const endDate = formatDate(data.endDate, 'en');
      
      return `no cap going on vacation bestie 🏖️

dates: ${startDate} → ${endDate}
location: ${data.destination || 'somewhere iconic'} ${data.activity ? `(${data.activity.toLowerCase()} era)` : ''}

I'll be touching grass so rip emails 💀
${data.backupContact ? `if it's actually important contact ${data.backupContact}` : ''}

see you on the flip side! ✨`;
    }
  },

  'creative': {
    'fr': (data) => {
      const startDate = formatDate(data.startDate, 'fr');
      const endDate = formatDate(data.endDate, 'fr');
      
      return `🌟 BREAKING NEWS 🌟

Votre humble collègue s'évapore temporairement de l'écosystème digital du ${startDate} au ${endDate} !

📍 Localisation : ${data.destination || 'Quelque part où le wifi est optionnel'}
🎯 Mission : ${data.activity || 'Recharger les batteries créatives'}
📧 Statut emails : Mode hibernation activé

${data.backupContact ? `En cas de situation critique nécessitant mon expertise légendaire, ${data.backupContact} prendra le relais avec brio !` : ''}

Retour prévu le ${endDate} avec 200% d'inspiration en plus ✨`;
    },
    'en': (data) => {
      const startDate = formatDate(data.startDate, 'en');
      const endDate = formatDate(data.endDate, 'en');
      
      return `🌟 BREAKING NEWS 🌟

Your humble colleague is temporarily vanishing from the digital ecosystem from ${startDate} to ${endDate}!

📍 Location: ${data.destination || 'Somewhere where wifi is optional'}
🎯 Mission: ${data.activity || 'Recharge creative batteries'}
📧 Email status: Hibernation mode activated

${data.backupContact ? `In case of critical situation requiring my legendary expertise, ${data.backupContact} will take over brilliantly!` : ''}

Expected return on ${endDate} with 200% more inspiration ✨`;
    }
  },

  'friendly': {
    'fr': (data) => {
      const startDate = formatDate(data.startDate, 'fr');
      const endDate = formatDate(data.endDate, 'fr');
      
      return `Coucou ! 🌞

Je pars en vacances du ${startDate} au ${endDate} ${data.destination ? `direction ${data.destination}` : ''} !

${data.activity ? `J'ai hâte de ${data.activity.toLowerCase()}` : 'J\'ai vraiment hâte de déconnecter'} et de prendre du temps pour moi. Je ne consulterai pas mes mails pendant cette période.

${data.backupContact ? `Si c'est urgent, n'hésitez pas à écrire à ${data.backupContact} qui pourra vous aider !` : ''}

Merci et à bientôt ! 💙`;
    },
    'en': (data) => {
      const startDate = formatDate(data.startDate, 'en');
      const endDate = formatDate(data.endDate, 'en');
      
      return `Hi there! 🌞

I'm going on vacation from ${startDate} to ${endDate} ${data.destination ? `heading to ${data.destination}` : ''}!

${data.activity ? `I can't wait to ${data.activity.toLowerCase()}` : 'I really can\'t wait to disconnect'} and take some time for myself. I won't be checking emails during this period.

${data.backupContact ? `If it's urgent, don't hesitate to write to ${data.backupContact} who can help you!` : ''}

Thanks and see you soon! 💙`;
    }
  },

  'minimalist': {
    'fr': (data) => {
      const startDate = formatDate(data.startDate, 'fr');
      const endDate = formatDate(data.endDate, 'fr');
      
      return `Vacances du ${startDate} au ${endDate}.${data.backupContact ? `\nContact d'urgence : ${data.backupContact}` : ''}`;
    },
    'en': (data) => {
      const startDate = formatDate(data.startDate, 'en');
      const endDate = formatDate(data.endDate, 'en');
      
      return `Vacation from ${startDate} to ${endDate}.${data.backupContact ? `\nEmergency contact: ${data.backupContact}` : ''}`;
    }
  }
};

export const generateMessage = (data: VacationData, style: string, language: string): string => {
  const template = messageTemplates[style]?.[language] || messageTemplates['millennial-pro'][language];
  return template(data);
};

// Generate a random message from available variations
export const generateRandomMessage = (data: VacationData, style: string, language: string): string => {
  const variations = generateVariations(data, style, language);
  const randomIndex = Math.floor(Math.random() * variations.length);
  return variations[randomIndex];
};

// Create variations for each style
const generateVariations = (data: VacationData, style: string, language: string): string[] => {
  const startDate = formatDate(data.startDate, language);
  const endDate = formatDate(data.endDate, language);
  const destination = data.destination;
  const activity = data.activity;
  const backup = data.backupContact;

  if (style === 'professional' && language === 'fr') {
    return [
      `Bonjour,\n\nJe serai absent(e) du ${startDate} au ${endDate} pour mes congés annuels.\n\nDurant cette période, je ne consulterai pas mes emails de manière régulière.${backup ? ` Pour toute urgence, veuillez contacter ${backup}.` : ''}\n\nJe reprendrai mes fonctions le ${endDate} et traiterai votre demande dans les plus brefs délais.\n\nCordialement,`,
      
      `Madame, Monsieur,\n\nPar la présente, je vous informe de mon absence du ${startDate} au ${endDate} inclus pour congés payés.\n\nJe ne serai pas joignable par email durant cette période.${backup ? ` En cas d'urgence, merci de vous adresser à ${backup}.` : ''}\n\nJe reviendrai le ${endDate} et m'empresserai de répondre à vos sollicitations.\n\nJe vous prie d'agréer mes salutations distinguées.`,
      
      `Bonjour,\n\nJe vous confirme ma période d'absence du ${startDate} au ${endDate} pour congés annuels.\n\nMes emails ne seront pas consultés pendant cette durée.${backup ? ` Pour les demandes urgentes, ${backup} reste disponible.` : ''}\n\nJe reprendrai le travail le ${endDate} et donnerai suite à votre message dès que possible.\n\nBien à vous,`,
      
      `Cher/Chère collègue,\n\nJe serai en congés du ${startDate} au ${endDate} et ne pourrai donc pas traiter vos demandes.\n\nMerci de votre compréhension.${backup ? ` ${backup} peut vous assister en mon absence.` : ''}\n\nJe reprendrai mes activités le ${endDate}.\n\nCordialement,`,
      
      `Bonjour,\n\nJe vous informe que je serai absent(e) du bureau du ${startDate} au ${endDate} pour mes vacances annuelles.\n\nJe n'aurai pas accès à ma messagerie durant cette période.${backup ? ` Pour toute question urgente, contactez ${backup}.` : ''}\n\nDe retour le ${endDate}, je traiterai votre message en priorité.\n\nSalutations,`,
      
      `Madame, Monsieur,\n\nJe vous prie de noter que je serai indisponible du ${startDate} au ${endDate} pour congés.\n\nAucun email ne sera traité pendant cette absence.${backup ? ` ${backup} peut répondre aux demandes urgentes.` : ''}\n\nJe vous recontacterai dès mon retour le ${endDate}.\n\nMerci de votre patience.`,
      
      `Bonjour,\n\nJe profite de cette occasion pour vous informer de mon absence du ${startDate} au ${endDate}.\n\nJe ne consulterai pas ma boîte email durant ces congés.${backup ? ` En cas d'urgence, ${backup} reste joignable.` : ''}\n\nÀ mon retour, je m'occuperai de votre demande rapidement.\n\nBonne journée,`,
      
      `Cher(e) correspondant(e),\n\nJe serai absent(e) du ${startDate} au ${endDate} inclus.\n\nPendant cette période, je ne pourrai pas répondre à vos messages.${backup ? ` Pour les urgences, merci de contacter ${backup}.` : ''}\n\nJe reviendrai le ${endDate} et traiterai votre email dès que possible.\n\nCordialement,`,
      
      `Bonjour,\n\nPour information, je serai en vacances du ${startDate} au ${endDate}.\n\nJe n'aurai pas accès à mes emails.${backup ? ` ${backup} peut vous aider pendant mon absence.` : ''}\n\nJe vous répondrai à mon retour le ${endDate}.\n\nBien cordialement,`,
      
      `Madame, Monsieur,\n\nJe vous confirme être absent(e) du ${startDate} au ${endDate} pour congés payés.\n\nMa messagerie ne sera pas surveillée.${backup ? ` Pour les dossiers urgents, adressez-vous à ${backup}.` : ''}\n\nReprise le ${endDate}. Merci de votre compréhension.\n\nSalutations distinguées,`
    ];
  }

  if (style === 'millennial-pro' && language === 'fr') {
    return [
      `Salut l'équipe ! 👋\n\nJe pars me ressourcer ${destination ? `en ${destination}` : ''} du ${startDate} au ${endDate} ! ${activity ? `Au programme : ${activity.toLowerCase()}` : ''} 🌴\n\nJe serai complètement déconnecté(e) pendant cette période (promis, je ne regarderai pas Slack à 2h du matin 😅).\n\n${backup ? `Pour tout ce qui ne peut pas attendre mon retour, ${backup} pourra vous aider.` : ''}\n\nHâte de revenir avec plein d'énergie pour attaquer la suite ! 🚀\n\nÀ bientôt,`,
      
      `Hey ! 🌟\n\nC'est parti pour mes vacances ! Je déconnecte du ${startDate} au ${endDate} ${destination ? `direction ${destination}` : ''} !\n\n${activity ? `Mission : ${activity.toLowerCase()} intensif` : 'Mission : recharge des batteries'} 🔋\n\nZéro email, zéro notif (oui, même WhatsApp sera en sourdine !) ${backup ? `${backup} gère en cas d'urgence.` : ''}\n\nSee you soon avec le plein d'idées ! ✨`,
      
      `Coucou les copains ! 🎉\n\nPause bien méritée du ${startDate} au ${endDate} ! ${destination ? `Cap sur ${destination}` : ''}\n\n${activity ? `Programme chargé : ${activity.toLowerCase()} !` : 'Programme : détente maximale !'} 😎\n\nJe mets mon cerveau en mode avion ✈️ ${backup ? `${backup} prend le relais si besoin.` : ''}\n\nOn se retrouve après pour tout déchirer ! 💪`,
      
      `Hello team ! 🚀\n\nMode vacances activé du ${startDate} au ${endDate} ! ${destination ? `Destination : ${destination}` : ''}\n\n${activity ? `Au menu : ${activity.toLowerCase()}` : 'Au menu : farniente total'} 🏖️\n\nPas de laptop, pas d'emails, que du bonheur ! ${backup ? `${backup} assure la permanence.` : ''}\n\nJ'ai hâte de revenir boosté(e) à 200% ! ⚡`,
      
      `Yooo ! 🎈\n\nC'est l'heure de mes vacances ! Absent(e) du ${startDate} au ${endDate} ${destination ? `en route pour ${destination}` : ''}\n\n${activity ? `Planning : ${activity.toLowerCase()} non-stop !` : 'Planning : relax total !'} 🧘‍♀️\n\nMode déconnexion complète ON ${backup ? `(${backup} gère si vraiment nécessaire)` : ''}\n\nSee you soon, plus motivé(e) que jamais ! 🔥`,
      
      `Salut la team ! 🌈\n\nGrande évasion du ${startDate} au ${endDate} ! ${destination ? `Objectif ${destination}` : ''}\n\n${activity ? `Mission secrète : ${activity.toLowerCase()}` : 'Mission secrète : ne rien faire'} 🕵️‍♀️\n\nInjoignable mais pas perdu(e) ! ${backup ? `${backup} vous sauvera en cas de pépin.` : ''}\n\nReturn of the Jedi prévu pour défoncer les objectifs ! 🌟`,
      
      `Hey ! 🎊\n\nPetite pause du système du ${startDate} au ${endDate} ! ${destination ? `Direction ${destination}` : ''}\n\n${activity ? `Objectif : ${activity.toLowerCase()} champion !` : 'Objectif : recharger les neurones !'} 🧠\n\nMode focus sur moi-même activé ${backup ? `(${backup} assure l'intérim)` : ''}\n\nReviens bientôt avec des super pouvoirs ! 🦸‍♂️`,
      
      `Coucou ! 🎯\n\nJe m'évapore du ${startDate} au ${endDate} ! ${destination ? `${destination} m'appelle` : ''}\n\n${activity ? `Programme : ${activity.toLowerCase()} intensif !` : 'Programme : mode zen activate !'} 🧘\n\nDigital detox complet en cours ${backup ? `${backup} vous accompagne si besoin` : ''}\n\nHâte de revenir avec le mental d'acier ! 💎`,
      
      `Hello ! 🚁\n\nDécollage immédiat pour mes vacances ! ${startDate} → ${endDate} ${destination ? `destination ${destination}` : ''}\n\n${activity ? `Mission : ${activity.toLowerCase()} expert !` : 'Mission : expert en détente !'} 🏆\n\nPause totale du digital ${backup ? `${backup} prend les commandes` : ''}\n\nRetour programmé avec 1000 nouvelles idées ! 💡`,
      
      `Yo ! 🎪\n\nGrande aventure du ${startDate} au ${endDate} ! ${destination ? `En route vers ${destination}` : ''}\n\n${activity ? `Au programme : ${activity.toLowerCase()} hardcore !` : 'Au programme : relax hardcore !'} 🤘\n\nMode hors-ligne total ${backup ? `(${backup} assure le show)` : ''}\n\nReviens plus fort(e) pour cartonner ! 🎯`
    ];
  }

  if (style === 'gen-z' && language === 'fr') {
    return [
      `no cap je pars en vacances bestie 🏖️\n\ndates : ${startDate} → ${endDate}\nlocalisation : ${destination || 'somewhere iconic'} ${activity ? `(${activity.toLowerCase()} era)` : ''}\n\nje serai en mode touch grass donc rip emails 💀\n${backup ? `si c'est vraiment important contactez ${backup}` : ''}\n\nsee you on the flip side ! ✨`,
      
      `yo c'est parti pour mes main character holidays ✨\n\n${startDate} jusqu'au ${endDate} je vais être off the grid\n${destination ? `direction ${destination}` : 'destination mystère'} ${activity ? `pour du ${activity.toLowerCase()} premium` : ''}\n\nmode airplane activé, zero stress 🛩️\n${backup ? `${backup} prend le lead si jamais` : ''}\n\nback soon avec la main character energy ! 💅`,
      
      `besties je décroche officiellement ! 🌴\n\nvacances du ${startDate} au ${endDate}\n${destination ? `${destination} here I come` : 'somewhere aesthetic'} ${activity ? `mission ${activity.toLowerCase()}` : ''}\n\nphone en mode ne pas déranger, je vis ma meilleure vie 📱✋\n${backup ? `pour les trucs urgents → ${backup}` : ''}\n\nreviens rechargée à 200% ! ⚡`,
      
      `aight imma head out pour mes holidays 🚁\n\n${startDate} - ${endDate} = mode déconnexion totale\nlocation : ${destination || 'paradise vibes'} ${activity ? `(${activity.toLowerCase()} szn)` : ''}\n\nzero chance que je check mes mails sorry not sorry 💅\n${backup ? `${backup} has got your back` : ''}\n\ncatch me when I catch me ! 🎭`,
      
      `breaking news : je pars recharger mes batteries ⚡\n\noff du ${startDate} au ${endDate}\n${destination ? `cap sur ${destination}` : 'destination secrète'} ${activity ? `pour vivre mon ${activity.toLowerCase()} moment` : ''}\n\nmode détox digital activé, mes mails vont pleurer 😭\n${backup ? `emergency only → ${backup}` : ''}\n\nback with that glow up energy ! ✨`,
      
      `plot twist je m'évapore pour mes vacances ! 👻\n\ndisparition prévue : ${startDate} → ${endDate}\n${destination ? `téléportation vers ${destination}` : 'coordonnées classifiées'} ${activity ? `mission ${activity.toLowerCase()}` : ''}\n\nemail game weak pendant cette période 📧❌\n${backup ? `pour les vrais urgences ${backup} est dispo` : ''}\n\nreviens en mode boss babe ! 👑`,
      
      `bestie je vais touch some grass pendant mes vacances 🌱\n\n${startDate} until ${endDate} je suis MIA\n${destination ? `vibes check à ${destination}` : 'secret location'} ${activity ? `${activity.toLowerCase()} core activated` : ''}\n\nsorry mes emails vont être left on read 📱\n${backup ? `real emergencies only → ${backup}` : ''}\n\nback avec cette summer glow ! ☀️`,
      
      `period pooh je pars en vacances ! 🍯\n\nvacay dates : ${startDate} to ${endDate}\n${destination ? `main character moment à ${destination}` : 'living my best life somewhere'} ${activity ? `(${activity.toLowerCase()} princess era)` : ''}\n\ndigital detox in progress, emails can wait bestie 💋\n${backup ? `urgent stuff ? hit up ${backup}` : ''}\n\ncoming back as my higher self ! 🦋`,
      
      `no thoughts head empty just vacances ! 🧠✨\n\n${startDate} → ${endDate} je suis en mode ghost\n${destination ? `spawning à ${destination}` : 'coordinates unknown'} ${activity ? `${activity.toLowerCase()} main quest` : ''}\n\nmails = ignored, grass = touched 🌿\n${backup ? `${backup} prend la suite pour les trucs sérieux` : ''}\n\nrevient avec cette healing girl energy ! 🌸`,
      
      `slay bestie je file pour mes well deserved holidays ! 💫\n\nabsente du ${startDate} au ${endDate}\n${destination ? `off to ${destination}` : 'mystery destination unlocked'} ${activity ? `pour du ${activity.toLowerCase()} premium content` : ''}\n\nsorry not sorry mes emails vont être ghosted 👻\n${backup ? `emergency contact : ${backup} (use wisely)` : ''}\n\nback stronger than a bad bitch ! 💪✨`
    ];
  }
  // For other styles, generate real variations instead of numbered versions
  if (style === 'creative' && language === 'fr') {
    return [
      `🌟 BREAKING NEWS 🌟\n\nVotre humble collègue s'évapore temporairement de l'écosystème digital du ${startDate} au ${endDate} !\n\n📍 Localisation : ${destination || 'Quelque part où le wifi est optionnel'}\n🎯 Mission : ${activity || 'Recharger les batteries créatives'}\n📧 Statut emails : Mode hibernation activé\n\n${backup ? `En cas de situation critique nécessitant mon expertise légendaire, ${backup} prendra le relais avec brio !` : ''}\n\nRetour prévu le ${endDate} avec 200% d'inspiration en plus ✨`,
      
      `🚀 ALERTE SPATIALE 🚀\n\nMission d'exploration personnelle du ${startDate} au ${endDate}\n\n🌍 Coordonnées : ${destination || 'Planète Détente'}\n⚡ Objectif : ${activity || 'Rechargement des super-pouvoirs'}\n📬 Communication : Fréquence radio coupée\n\n${backup ? `Agent ${backup} assure la mission de sauvegarde !` : ''}\n\nRejoins la base avec des idées révolutionnaires ! 💡`,
      
      `🎭 ACTE I : L'ÉVASION 🎭\n\nLe héros disparaît du ${startDate} au ${endDate}\n\n🗺️ Décor : ${destination || 'Un lieu mystérieux'}\n🎬 Action : ${activity || 'Quête de régénération'}\n📱 Technologie : Temporairement désactivée\n\n${backup ? `${backup} endosse le rôle principal en cas d'urgence !` : ''}\n\nFin de l'acte prévue avec un plot twist énergisant ! 🌟`
    ];
  }

  // For remaining styles, create basic variations without version numbers
  const baseMessage = messageTemplates[style]?.[language]?.(data) || messageTemplates['millennial-pro'][language](data);
  return Array(10).fill(null).map(() => baseMessage);
};