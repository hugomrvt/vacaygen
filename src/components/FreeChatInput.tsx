
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

interface FreeChatInputProps {
  onSendMessage: (message: string) => void;
  isDisabled?: boolean;
  placeholder?: string;
}

const FreeChatInput = ({ 
  onSendMessage, 
  isDisabled = false, 
  placeholder = "Tapez votre message..." 
}: FreeChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !isDisabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2 items-end p-4 bg-card/30 backdrop-blur-sm rounded-xl border border-border/20">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={isDisabled}
        className="min-h-[60px] max-h-[120px] resize-none flex-1"
        rows={2}
      />
      <Button 
        onClick={handleSend}
        disabled={!message.trim() || isDisabled}
        size="icon"
        className="h-[60px] w-12 flex-shrink-0"
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default FreeChatInput;
