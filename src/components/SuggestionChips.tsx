
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, MapPin, Calendar, Users } from 'lucide-react';

interface SuggestionChipsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  currentStep?: string;
}

const SuggestionChips = ({ suggestions, onSuggestionClick, currentStep }: SuggestionChipsProps) => {
  const getStepIcon = (step?: string) => {
    switch (step) {
      case 'destination': return <MapPin className="w-3 h-3" />;
      case 'dates': return <Calendar className="w-3 h-3" />;
      case 'recipients': return <Users className="w-3 h-3" />;
      default: return <Sparkles className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {getStepIcon(currentStep)}
        <span>Suggestions pour vous aider :</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSuggestionClick(suggestion)}
            className="h-8 px-3 text-xs bg-background/50 hover:bg-primary/10 hover:text-primary border-border/40 transition-all duration-200 hover:scale-105"
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SuggestionChips;
