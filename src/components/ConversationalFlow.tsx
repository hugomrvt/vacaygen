import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import ChatBubble from './ChatBubble';
import QuestionStep from './QuestionStep';
import StyleCard from './StyleCard';
import GeneratedMessage from './GeneratedMessage';
import FreeChatInput from './FreeChatInput';
import BotResponseHandler from './BotResponseHandler';
import ContextualSuggestions from './ContextualSuggestions';

interface ConversationalFlowProps {
  onMessageGenerated?: (message: string) => void;
}

const ConversationalFlow = ({ onMessageGenerated }: ConversationalFlowProps) => {
  const { t, language } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [conversation, setConversation] = useState<Array<{ type: 'bot' | 'user'; message: string; isFreeChat?: boolean }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    destination: '',
    activity: '',
    recipients: [] as string[],
    backupContact: '',
    style: 'millennial-pro'
  });
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [waitingForStructuredResponse, setWaitingForStructuredResponse] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      id: 'welcome',
      question: "Salut ! 👋 Je vais t'aider à créer le message de vacances parfait. C'est parti !",
      type: 'welcome' as const
    },
    {
      id: 'dates',
      question: "Pour commencer, quelles sont tes dates de vacances ? 📅\nCommençons par la date de début :",
      type: 'date' as const,
      placeholder: "Date de début"
    },
    {
      id: 'endDate',
      question: "Parfait ! Et maintenant la date de fin :",
      type: 'date' as const,
      placeholder: "Date de fin"
    },
    {
      id: 'destination',
      question: "Super ! Où pars-tu en vacances ? 🌴",
      type: 'text' as const,
      placeholder: "Ex: Thaïlande, Bretagne, chez mes parents..."
    },
    {
      id: 'activity',
      question: "Cool ! Qu'est-ce que tu prévois de faire là-bas ? (optionnel)",
      type: 'text' as const,
      placeholder: "Ex: plage et farniente, randonnée, visite familiale...",
      isOptional: true
    },
    {
      id: 'recipients',
      question: "Qui doit recevoir ton message de vacances ?",
      type: 'multiselect' as const,
      options: [
        { id: 'team', label: 'Mon équipe', icon: 'Users', color: 'from-blue-500 to-blue-600' },
        { id: 'clients', label: 'Mes clients', icon: 'Handshake', color: 'from-purple-500 to-purple-600' },
        { id: 'management', label: 'Management', icon: 'Briefcase', color: 'from-green-500 to-green-600' },
        { id: 'partners', label: 'Partenaires', icon: 'Globe', color: 'from-orange-500 to-orange-600' }
      ]
    },
    {
      id: 'backup',
      question: "As-tu un contact de substitution ? (optionnel)",
      type: 'text' as const,
      placeholder: "Ex: Marie Dupont, Service Client...",
      isOptional: true
    },
    {
      id: 'style',
      question: "Dernier détail : quel style te correspond le mieux ?",
      type: 'style' as const
    }
  ];

  const styles = [
    {
      id: 'millennial-pro',
      name: 'Millennial Pro',
      description: 'Décontracté mais professionnel',
      example: 'Salut l\'équipe ! Je pars me ressourcer...',
      emoji: 'Rocket',
      color: 'from-blue-500 to-cyan-500',
      popularity: 'hot' as const
    },
    {
      id: 'gen-z',
      name: 'Gen Z',
      description: 'Moderne et fun',
      example: 'no cap je pars en vacances bestie...',
      emoji: 'Sparkles',
      color: 'from-pink-500 to-purple-500',
      popularity: 'trending' as const
    },
    {
      id: 'professional',
      name: 'Professionnel',
      description: 'Formel et classique',
      example: 'Bonjour, je serai absent(e) du...',
      emoji: 'Briefcase',
      color: 'from-gray-600 to-gray-700'
    },
    {
      id: 'creative',
      name: 'Créatif',
      description: 'Original et artistique',
      example: 'BREAKING NEWS - Votre humble collègue...',
      emoji: 'Star',
      color: 'from-orange-500 to-red-500'
    }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation, isTyping, currentStep]);

  useEffect(() => {
    if (conversation.length === 0) {
      addBotMessage(steps[0].question, 800);
      setTimeout(() => setCurrentStep(1), 2000);
    }
  }, []);

  const addBotMessage = (message: string, delay = 1200, isFreeChat = false) => {
    setIsTyping(true);
    setTimeout(() => {
      setConversation(prev => [...prev, { type: 'bot', message, isFreeChat }]);
      setIsTyping(false);
      if (!isFreeChat) {
        setWaitingForStructuredResponse(true);
      }
    }, delay);
  };

  const addUserMessage = (message: string, isFreeChat = false) => {
    setConversation(prev => [...prev, { type: 'user', message, isFreeChat }]);
    if (!isFreeChat) {
      setWaitingForStructuredResponse(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const currentStepData = steps[currentStep - 1];
    
    if (currentStepData && currentStep > 1 && currentStep <= steps.length) {
      if (shouldTreatAsSuggestionAnswer(suggestion, currentStepData.id)) {
        handleAnswer(currentStepData.id, suggestion, suggestion);
        return;
      }
    }
    
    handleFreeMessage(suggestion);
  };

  const shouldTreatAsSuggestionAnswer = (suggestion: string, stepId: string): boolean => {
    const directAnswerSteps = ['destination', 'activity', 'backup'];
    if (directAnswerSteps.includes(stepId)) {
      return !suggestion.includes('?') && !suggestion.toLowerCase().includes('comment') && 
             !suggestion.toLowerCase().includes('aide') && !suggestion.toLowerCase().includes('peux-tu');
    }
    return false;
  };

  const handleFreeMessage = (message: string) => {
    addUserMessage(message, true);
    
    const botResponse = BotResponseHandler({
      userMessage: message,
      currentStep,
      formData
    });
    
    setTimeout(() => {
      addBotMessage(botResponse, 1200, true);
    }, 600);
  };

  const handleAnswer = (field: string, value: any, displayValue?: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    addUserMessage(displayValue || value);
    
    const nextStepIndex = currentStep + 1;
    if (nextStepIndex < steps.length) {
      setTimeout(() => {
        addBotMessage(steps[nextStepIndex].question, 1500);
        setCurrentStep(nextStepIndex + 1);
      }, 800);
    } else {
      setTimeout(() => {
        addBotMessage("Parfait ! Je génère ton message personnalisé... ✨", 1000);
        setTimeout(() => generateMessage(), 1500);
      }, 800);
    }
  };

  const handleSkip = (field: string) => {
    addUserMessage("Je passe cette étape");
    
    const nextStepIndex = currentStep + 1;
    if (nextStepIndex < steps.length) {
      setTimeout(() => {
        addBotMessage(steps[nextStepIndex].question, 1200);
        setCurrentStep(nextStepIndex + 1);
      }, 800);
    } else {
      setTimeout(() => {
        addBotMessage("Parfait ! Je génère ton message personnalisé... ✨", 1000);
        setTimeout(() => generateMessage(), 1500);
      }, 800);
    }
  };

  const generateMessage = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const message = generateVacationMessage(formData, formData.style, language);
      setGeneratedMessage(message);
      setIsGenerating(false);
      onMessageGenerated?.(message);
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

Cordialement,`
      },
      'millennial-pro': {
        'fr': (data) => `Salut l'équipe ! 👋

Je pars me ressourcer ${destination ? `en ${destination}` : ''} du ${startDate} au ${endDate} ! ${activity ? `Au programme : ${activity.toLowerCase()}` : ''} 🌴

Je serai complètement déconnecté(e) pendant cette période (promis, je ne regarderai pas Slack à 2h du matin 😅).

Pour tout ce qui ne peut pas attendre mon retour, ${backupContact || '[nom du contact]'} pourra vous aider.

Hâte de revenir avec plein d'énergie pour attaquer la suite ! 🚀

À bientôt,`
      }
    };

    const template = styleTemplates[style]?.['fr'] || styleTemplates['millennial-pro']['fr'];
    return template(data);
  };

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Chat History */}
      <div ref={scrollRef} className="h-96 overflow-y-auto mb-6 space-y-4 p-4 bg-card/20 rounded-xl border border-border/20">
        {conversation.map((item, index) => (
          <ChatBubble
            key={index}
            type={item.type}
            message={item.message}
          />
        ))}
        {isTyping && <ChatBubble type="bot" message="" isTyping />}
      </div>

      {/* Contextual Suggestions */}
      {!generatedMessage && !isGenerating && (
        <ContextualSuggestions
          currentStep={currentStepData?.id || 'general'}
          onSuggestionClick={handleSuggestionClick}
          formData={formData}
        />
      )}

      {/* Free Chat Input */}
      {!generatedMessage && (
        <div className="mb-6">
          <FreeChatInput 
            onSendMessage={handleFreeMessage}
            isDisabled={isTyping || isGenerating}
            placeholder={
              waitingForStructuredResponse 
                ? "Réponds à la question ci-dessus ou pose-moi une question..." 
                : "Pose-moi une question ou discute librement..."
            }
          />
        </div>
      )}

      {/* Current Question */}
      {currentStepData && currentStep > 1 && currentStep <= steps.length && !isGenerating && !generatedMessage && !isTyping && (
        <div className="mb-6 animate-fade-in">
          {currentStepData.type === 'style' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {styles.map((style) => (
                  <StyleCard
                    key={style.id}
                    style={style}
                    isSelected={formData.style === style.id}
                    onSelect={() => {
                      handleAnswer('style', style.id, `Style : ${style.name}`);
                    }}
                    onPreview={() => {}}
                  />
                ))}
              </div>
            </div>
          ) : (
            <QuestionStep
              step={currentStepData.id}
              question=""
              type={currentStepData.type as any}
              placeholder={currentStepData.placeholder}
              options={currentStepData.options}
              value={formData[currentStepData.id as keyof typeof formData]}
              onAnswer={(value) => handleAnswer(currentStepData.id, value)}
              onSkip={currentStepData.isOptional ? () => handleSkip(currentStepData.id) : undefined}
              isOptional={currentStepData.isOptional}
            />
          )}
        </div>
      )}

      {/* Generated Message */}
      {(isGenerating || generatedMessage) && (
        <GeneratedMessage 
          message={generatedMessage}
          isGenerating={isGenerating}
          onRegenerate={() => generateMessage()}
        />
      )}

      {/* Restart Button */}
      {generatedMessage && (
        <div className="text-center mt-6">
          <Button 
            variant="outline" 
            onClick={() => {
              setCurrentStep(0);
              setConversation([]);
              setFormData({
                startDate: '',
                endDate: '',
                destination: '',
                activity: '',
                recipients: [],
                backupContact: '',
                style: 'millennial-pro'
              });
              setGeneratedMessage('');
              setIsGenerating(false);
              setWaitingForStructuredResponse(false);
            }}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Recommencer
          </Button>
        </div>
      )}
    </div>
  );
};

export default ConversationalFlow;
