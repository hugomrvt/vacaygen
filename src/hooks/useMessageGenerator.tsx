import { useState } from 'react';
import { generateRandomMessage, VacationData } from '@/lib/messageTemplates';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { validateMessageContent, messageGenerationLimiter } from '@/lib/securityUtils';

export interface UseMessageGeneratorReturn {
  generatedMessage: string;
  isGenerating: boolean;
  generateVacationMessage: (data: VacationData, style: string) => Promise<void>;
  
}

export function useMessageGenerator(): UseMessageGeneratorReturn {
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { toast } = useToast();
  const { t, language } = useTranslation();

  const generateVacationMessage = async (data: VacationData, style: string) => {
    // Check rate limiting
    const clientId = 'client'; // In a real app, this would be a user identifier
    if (!messageGenerationLimiter.isAllowed(clientId)) {
      const remaining = messageGenerationLimiter.getRemainingRequests(clientId);
      toast({
        title: 'Limite atteinte',
        description: `Trop de demandes. ${remaining} générations restantes.`,
        variant: 'destructive'
      });
      return;
    }

    if (!data.startDate || !data.endDate || !data.destination) {
      toast({
        title: t('toast.missing.title'),
        description: t('toast.missing.desc'),
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate generation delay
    setTimeout(() => {
      try {
        const message = generateRandomMessage(data, style, language);
        
        // Validate generated content
        if (!validateMessageContent(message)) {
          throw new Error('Generated content failed validation');
        }
        
        setGeneratedMessage(message);
        

        // Success feedback
        toast({
          title: t('toast.generated.title'),
          description: t('toast.generated.desc'),
          variant: "default"
        });

        // Confetti effect
        createConfettiEffect();
      } catch (error) {
        console.error('Error generating message:', error);
        toast({
          title: 'Erreur de génération',
          description: 'Une erreur est survenue lors de la génération du message.',
          variant: 'destructive'
        });
      } finally {
        setIsGenerating(false);
      }
    }, 2500);
  };

  const createConfettiEffect = () => {
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['🎉', '✨', '🎊', '⭐'][Math.floor(Math.random() * 4)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.zIndex = '1000';
        confetti.className = 'animate-bounce';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
      }, i * 100);
    }
  };

  return {
    generatedMessage,
    isGenerating,
    generateVacationMessage,
    
  };
}