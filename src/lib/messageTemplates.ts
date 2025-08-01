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