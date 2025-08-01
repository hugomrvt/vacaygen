
import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatBubbleProps {
  type: 'bot' | 'user';
  message: string;
  isTyping?: boolean;
}

const ChatBubble = ({ type, message, isTyping = false }: ChatBubbleProps) => {
  return (
    <div className={`flex gap-3 mb-4 ${type === 'user' ? 'justify-end' : 'justify-start'}`}>
      {type === 'bot' && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary" />
        </div>
      )}
      
      <div className={`max-w-[80%] ${type === 'user' ? 'order-first' : ''}`}>
        <div className={`
          px-4 py-3 rounded-2xl text-sm
          ${type === 'bot' 
            ? 'bg-card border border-border text-foreground' 
            : 'bg-primary text-primary-foreground'
          }
          ${isTyping ? 'animate-pulse' : ''}
        `}>
          {isTyping ? (
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{message}</p>
          )}
        </div>
      </div>

      {type === 'user' && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
