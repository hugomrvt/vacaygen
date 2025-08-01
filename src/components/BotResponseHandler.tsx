
import React from 'react';

interface BotResponseHandlerProps {
  userMessage: string;
  currentStep: number;
  formData: any;
  onContinueFlow?: () => void;
  onModifyResponse?: (field: string, value: any) => void;
}

const BotResponseHandler = ({ 
  userMessage, 
  currentStep, 
  formData,
  onContinueFlow,
  onModifyResponse 
}: BotResponseHandlerProps) => {
  
  const generateBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Gestion des salutations
    if (lowerMessage.includes('salut') || lowerMessage.includes('bonjour') || lowerMessage.includes('hello')) {
      return "Salut ! 👋 Je suis là pour t'aider à créer le message de vacances parfait. On continue notre conversation ou tu as une question ?";
    }
    
    // Gestion des questions sur le processus
    if (lowerMessage.includes('comment') || lowerMessage.includes('aide') || lowerMessage.includes('help')) {
      return "Je te guide étape par étape pour créer ton message ! On va voir tes dates, destination, activités, et qui doit recevoir le message. Tu peux aussi me poser des questions à tout moment. 😊";
    }
    
    // Gestion des demandes de modification
    if (lowerMessage.includes('modifier') || lowerMessage.includes('changer') || lowerMessage.includes('corriger')) {
      return "Pas de problème ! Tu peux modifier tes réponses. Dis-moi ce que tu veux changer : dates, destination, activités, destinataires, ou style ?";
    }
    
    // Gestion des questions sur l'avancement
    if (lowerMessage.includes('où') && lowerMessage.includes('en') && (lowerMessage.includes('suis') || lowerMessage.includes('sommes'))) {
      const stepNames = ['dates', 'destination', 'activités', 'destinataires', 'contact de secours', 'style'];
      const currentStepName = stepNames[Math.max(0, currentStep - 2)] || 'début';
      return `On en est à l'étape "${currentStepName}". Il nous reste ${Math.max(0, 7 - currentStep)} étapes environ. Tu progresses bien ! 👍`;
    }
    
    // Gestion des demandes de recommencement
    if (lowerMessage.includes('recommencer') || lowerMessage.includes('reset') || lowerMessage.includes('nouveau')) {
      return "Si tu veux recommencer, tu peux utiliser le bouton 'Recommencer' qui apparaîtra à la fin, ou je peux t'aider à modifier juste certaines réponses. Que préfères-tu ?";
    }
    
    // Réponse générale encourageante
    return "Je comprends ! 😊 N'hésite pas à me poser des questions spécifiques ou on peut continuer notre conversation guidée. Je suis là pour t'aider !";
  };

  return generateBotResponse(userMessage);
};

export default BotResponseHandler;
