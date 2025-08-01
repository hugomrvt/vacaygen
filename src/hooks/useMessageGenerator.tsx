import { useState } from 'react';
import { generateRandomMessage, VacationData } from '@/lib/messageTemplates';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';

export interface UseMessageGeneratorReturn {
  generatedMessage: string;
  isGenerating: boolean;
  generateVacationMessage: (data: VacationData, style: string) => Promise<void>;
  totalGeneratedMessages: number;
}

export function useMessageGenerator(): UseMessageGeneratorReturn {
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [totalGeneratedMessages, setTotalGeneratedMessages] = useState(0);
  const { toast } = useToast();
  const { t, language } = useTranslation();

  const generateVacationMessage = async (data: VacationData, style: string) => {
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
      const message = generateRandomMessage(data, style, language);
      setGeneratedMessage(message);
      setIsGenerating(false);
      setTotalGeneratedMessages(prev => prev + 1);

      // Success feedback
      toast({
        title: t('toast.generated.title'),
        description: t('toast.generated.desc'),
        variant: "default"
      });

      // Confetti effect
      createConfettiEffect();
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
    totalGeneratedMessages
  };
}