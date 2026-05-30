import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useConversation } from '@/hooks/useLocalStorage';
import { useMessageGenerator } from '@/hooks/useMessageGenerator';
import { useVacationForm } from '@/hooks/useVacationForm';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Send, Bot, User, Sparkles, History, Trash2, Copy, Heart } from 'lucide-react';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { generateRandomMessage, VacationData } from '@/lib/messageTemplates';

// Chat Message Component
interface ChatMessageProps {
  message: {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: string;
    data?: Partial<VacationData>;
    styleId?: string;
  };
  onRegenerate?: (messageId: string) => void;
  onCopy?: (content: string) => void;
  onSaveAsTemplate?: (content: string, styleId?: string) => void;
  language: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onRegenerate,
  onCopy,
  onSaveAsTemplate,
  language,
}) => {
  const { t } = useTranslation();
  const locale = language === 'fr' ? fr : enUS;
  const formattedTime = format(new Date(message.timestamp), 'HH:mm', { locale });

  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'} flex items-start gap-3`}
      >
        {!isUser && (
          <div className="flex-shrink-0 w-8 h-8 bg-secondary text-secondary-foreground rounded-none flex items-center justify-center border-2 border-black">
            {message.role === 'assistant' ? <Bot className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          </div>
        )}
        
        <div className="flex flex-col gap-1">
          <div
            className={`px-4 py-3 border-2 border-black ${
              isUser 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card text-card-foreground'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            
            {/* Message metadata and actions */}
            {(message.data || message.styleId || onRegenerate) && (
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                {message.styleId && (
                  <Badge variant="secondary" size="sm">
                    {message.styleId}
                  </Badge>
                )}
                
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span>{formattedTime}</span>
                </div>
                
                <div className="flex items-center gap-1 ml-auto">
                  {onCopy && message.content && (
                    <button
                      onClick={() => onCopy(message.content)}
                      className="p-1 hover:bg-muted rounded-none transition-colors"
                      title={t('generated.copy')}
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  )}
                  
                  {onSaveAsTemplate && message.content && (
                    <button
                      onClick={() => onSaveAsTemplate(message.content, message.styleId)}
                      className="p-1 hover:bg-muted rounded-none transition-colors"
                      title="Enregistrer comme template"
                    >
                      <Heart className="w-3 h-3" />
                    </button>
                  )}
                  
                  {onRegenerate && message.role === 'assistant' && (
                    <button
                      onClick={() => onRegenerate(message.id)}
                      className="p-1 hover:bg-muted rounded-none transition-colors"
                      title={t('generated.regenerate')}
                    >
                      <Sparkles className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {isUser && (
          <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-none flex items-center justify-center border-2 border-black">
            <User className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
};

// Suggested Prompts Component
interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
  language: string;
}

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onSelectPrompt, language }) => {
  const { t } = useTranslation();
  
  const prompts = [
    { id: 1, text: language === 'fr' ? 'Crée un message professionnel pour mes collègues' : 'Create a professional message for my colleagues' },
    { id: 2, text: language === 'fr' ? 'J’ai besoin d’un message décontracté pour mes amis' : 'I need a casual message for my friends' },
    { id: 3, text: language === 'fr' ? 'Génère un message créatif avec des emojis' : 'Generate a creative message with emojis' },
    { id: 4, text: language === 'fr' ? 'Je pars en vacances à Bali du 15 au 30 juillet' : 'I’m going to Bali from July 15th to 30th' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {prompts.map((prompt) => (
        <button
          key={prompt.id}
          onClick={() => onSelectPrompt(prompt.text)}
          className="px-3 py-2 text-xs bg-muted text-muted-foreground border border-border hover:bg-primary hover:text-primary-foreground transition-colors rounded-none"
        >
          {prompt.text}
        </button>
      ))}
    </div>
  );
};

// Main Chat Container Component
interface ChatContainerProps {
  onGenerateMessage: (data: VacationData, styleId: string) => Promise<string>;
  onSaveTemplate: (content: string, styleId?: string) => void;
  className?: string;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  onGenerateMessage,
  onSaveTemplate,
  className,
}) => {
  const { t, language } = useTranslation();
  const { messages, addMessage, clearConversation } = useConversation();
  const { formData, updateField, setFormData } = useVacationForm();
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle form data extraction from user input
  const extractFormDataFromInput = (input: string): Partial<VacationData> => {
    const extracted: Partial<VacationData> = {};
    
    // Simple pattern matching for dates
    const datePattern = /(du|from)\s*(\d{1,2})\s*(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre|January|February|March|April|May|June|July|August|September|October|November|December)\s*(au|to)?\s*(\d{1,2})\s*(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre|January|February|March|April|May|June|July|August|September|October|November|December)/gi;
    
    // Pattern for destination
    const destinationPattern = /(à|en|in|at|direction)\s*([A-ZÉÈÊËÀÂÇÔÏÜa-zéèêëàâçôïü\s]+)/gi;
    
    // Pattern for activity
    const activityPattern = /(pour|to|afin de)\s*([A-ZÉÈÊËÀÂÇÔÏÜa-zéèêëàâçôïü\s]+)/gi;
    
    // Extract destination
    const destinationMatch = input.match(destinationPattern);
    if (destinationMatch) {
      const destination = destinationMatch[0].replace(/^(à|en|in|at|direction)\s*/i, '');
      extracted.destination = destination;
    }
    
    // Extract activity
    const activityMatch = input.match(activityPattern);
    if (activityMatch) {
      const activity = activityMatch[0].replace(/^(pour|to|afin de)\s*/i, '');
      extracted.activity = activity;
    }
    
    return extracted;
  };

  // Handle sending a message
  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = addMessage({
      role: 'user',
      content: inputValue.trim(),
    });

    setInputValue('');
    setIsLoading(true);

    try {
      // Extract data from user input
      const extractedData = extractFormDataFromInput(inputValue);
      
      // Update form with extracted data
      if (extractedData.destination) {
        updateField('destination', extractedData.destination);
      }
      if (extractedData.activity) {
        updateField('activity', extractedData.activity);
      }

      // Check if we have enough data to generate a message
      const hasEnoughData = formData.startDate && formData.endDate && (formData.destination || extractedData.destination);
      
      if (hasEnoughData) {
        // Generate a message
        const generatedMessage = await onGenerateMessage(
          { ...formData, ...extractedData },
          'millennial-pro' // Default style
        );

        // Add assistant response
        addMessage({
          role: 'assistant',
          content: generatedMessage,
          styleId: 'millennial-pro',
          data: { ...formData, ...extractedData },
        });
      } else {
        // Ask for missing information
        const missingFields = [];
        if (!formData.startDate) missingFields.push(language === 'fr' ? 'date de début' : 'start date');
        if (!formData.endDate) missingFields.push(language === 'fr' ? 'date de fin' : 'end date');
        if (!formData.destination && !extractedData.destination) missingFields.push(language === 'fr' ? 'destination' : 'destination');

        const response = language === 'fr' 
          ? `Pour générer un message, j'ai besoin de : ${missingFields.join(', ')}. Pouvez-vous me donner ces informations ?`
          : `To generate a message, I need: ${missingFields.join(', ')}. Can you provide these?`;

        addMessage({
          role: 'assistant',
          content: response,
        });
      }
    } catch (error) {
      console.error('Error generating message:', error);
      addMessage({
        role: 'assistant',
        content: language === 'fr' 
          ? "Désolé, une erreur est survenue lors de la génération du message."
          : "Sorry, an error occurred while generating the message.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle copying message
  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      // Could add a toast notification here
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  // Handle saving as template
  const handleSaveAsTemplate = (content: string, styleId?: string) => {
    onSaveTemplate(content, styleId);
    addMessage({
      role: 'assistant',
      content: language === 'fr' 
        ? 'Template enregistré ! Vous pouvez le retrouver dans la section "Mes Templates".'
        : 'Template saved! You can find it in the "My Templates" section.',
    });
  };

  // Handle regenerating message
  const handleRegenerate = async (messageId: string) => {
    const message = messages.find((m) => m.id === messageId);
    if (!message?.data) return;

    setIsLoading(true);
    try {
      const generatedMessage = await onGenerateMessage(
        message.data as VacationData,
        message.styleId || 'millennial-pro'
      );

      addMessage({
        role: 'assistant',
        content: generatedMessage,
        styleId: message.styleId || 'millennial-pro',
        data: message.data,
      });
    } catch (error) {
      console.error('Error regenerating message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle selecting a suggested prompt
  const handleSelectPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  // Handle key down for sending message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className={`border-2 border-black ${className}`}>
      <CardHeader className="pb-4 border-b-2 border-border">
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight">
            {t('conversation.title')}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearConversation}
              leftIcon={<Trash2 className="w-4 h-4" />}
              className="text-destructive hover:text-destructive"
            >
              {t('conversation.clear')}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4">
        {/* Messages Container */}
        <div className="h-[400px] overflow-y-auto mb-4 pr-2">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onRegenerate={handleRegenerate}
              onCopy={handleCopy}
              onSaveAsTemplate={handleSaveAsTemplate}
              language={language}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        {messages.length === 1 && (
          <SuggestedPrompts
            onSelectPrompt={handleSelectPrompt}
            language={language}
          />
        )}

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={language === 'fr' 
              ? "Écrivez votre message... (ex: Je pars à Bali du 15 au 30 juillet)" 
              : "Type your message... (ex: I'm going to Bali from July 15th to 30th)"
            }
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            leftIcon={isLoading ? null : <Send className="w-4 h-4" />}
            size="md"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-none animate-spin" />
            ) : (
              t('conversation.send')
            )}
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-border">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<History className="w-4 h-4" />}
              onClick={() => {
                // Could open history modal
                addMessage({
                  role: 'assistant',
                  content: language === 'fr' 
                    ? 'Votre historique est disponible dans la section dédiée.'
                    : 'Your history is available in the dedicated section.',
                });
              }}
            >
              {t('conversation.history')}
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground">
            {language === 'fr' 
              ? 'Away ne stocke aucune donnée sur ses serveurs. Tout est local.'
              : 'Away does not store any data on its servers. Everything is local.'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatContainer;
