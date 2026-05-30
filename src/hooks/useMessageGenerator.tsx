import { useState } from 'react';
import { generateRandomMessage, VacationData } from '@/lib/messageTemplates';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { useHistory } from '@/hooks/useLocalStorage';
import { validateMessageContent, messageGenerationLimiter } from '@/lib/securityUtils';

export interface UseMessageGeneratorReturn {
  generatedMessage: string;
  isGenerating: boolean;
  generateVacationMessage: (data: VacationData, style: string) => Promise<string>;
  regenerateMessage: (data: VacationData, style: string) => Promise<string>;
}

export function useMessageGenerator(): UseMessageGeneratorReturn {
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const { toast } = useToast();
  const { t, language } = useTranslation();
  const { saveToHistory } = useHistory();

  const generateVacationMessage = async (data: VacationData, style: string): Promise<string> => {
    // Check rate limiting
    if (!messageGenerationLimiter.canAttempt()) {
      const remainingMs = messageGenerationLimiter.getRemainingTime();
      const remainingMin = Math.ceil(remainingMs / 60000);
      toast({
        title: t('toast.rateLimit.title'),
        description: t('toast.rateLimit.desc').replace('{minutes}', remainingMin.toString()),
        variant: 'destructive'
      });
      return '';
    }

    if (!data.startDate || !data.endDate || !data.destination) {
      toast({
        title: t('toast.missing.title'),
        description: t('toast.missing.desc'),
        variant: "destructive"
      });
      return '';
    }

    setIsGenerating(true);
    
    // Simulate generation delay
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const message = generateRandomMessage(data, style, language);
          
          // Validate generated content
          if (!validateMessageContent(message)) {
            throw new Error('Generated content failed validation');
          }
          
          setGeneratedMessage(message);
          
          // Save to history
          saveToHistory({
            message,
            styleId: style,
            language,
            vacationData: data,
          });
          
          // Success feedback
          toast({
            title: t('toast.generated.title'),
            description: t('toast.generated.desc'),
            variant: "default"
          });

          // Confetti effect
          createConfettiEffect();
          
          resolve(message);
        } catch (error) {
          console.error('Error generating message:', error);
          toast({
            title: 'Erreur de génération',
            description: 'Une erreur est survenue lors de la génération du message.',
            variant: 'destructive'
          });
          resolve('');
        } finally {
          setIsGenerating(false);
        }
      }, 1000); // Reduced delay for better UX
    });
  };

  const regenerateMessage = async (data: VacationData, style: string): Promise<string> => {
    return generateVacationMessage(data, style);
  };

  const createConfettiEffect = () => {
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['🎉', '✨', '🎊', '⭐', '🔥'][Math.floor(Math.random() * 5)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = Math.random() * 100 + 'vh';
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
    regenerateMessage,
  };
}
