
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, MapPin, Activity, Users, UserCheck } from 'lucide-react';
import TogglePills from './TogglePills';

interface QuestionStepProps {
  step: string;
  question: string;
  placeholder?: string;
  type?: 'text' | 'date' | 'multiselect' | 'select';
  options?: Array<{ id: string; label: string; icon?: string; color?: string }>;
  value: any;
  onAnswer: (value: any) => void;
  onSkip?: () => void;
  isOptional?: boolean;
}

const QuestionStep = ({ 
  step, 
  question, 
  placeholder, 
  type = 'text', 
  options = [], 
  value, 
  onAnswer, 
  onSkip,
  isOptional = false 
}: QuestionStepProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (type === 'text' || type === 'date') {
      onAnswer(inputValue);
    }
  };

  const handleMultiSelect = (optionId: string) => {
    const currentValue = Array.isArray(value) ? value : [];
    const newValue = currentValue.includes(optionId)
      ? currentValue.filter(id => id !== optionId)
      : [...currentValue, optionId];
    onAnswer(newValue);
  };

  const getStepIcon = () => {
    switch (step) {
      case 'dates': return <Calendar className="w-5 h-5 text-primary" />;
      case 'destination': return <MapPin className="w-5 h-5 text-primary" />;
      case 'activity': return <Activity className="w-5 h-5 text-primary" />;
      case 'recipients': return <Users className="w-5 h-5 text-primary" />;
      case 'backup': return <UserCheck className="w-5 h-5 text-primary" />;
      default: return null;
    }
  };

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/20">
      <div className="flex items-center gap-3 mb-4">
        {getStepIcon()}
        <h3 className="font-medium text-foreground">{question}</h3>
        {isOptional && (
          <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
            Optionnel
          </span>
        )}
      </div>

      {type === 'multiselect' && options.length > 0 && (
        <div className="space-y-4">
          <TogglePills
            options={options}
            selectedOptions={Array.isArray(value) ? value : []}
            onToggle={handleMultiSelect}
          />
          {Array.isArray(value) && value.length > 0 && (
            <div className="flex gap-2">
              <Button onClick={() => onAnswer(value)} className="flex-1">
                Continuer ({value.length} sélectionné{value.length > 1 ? 's' : ''})
              </Button>
              {isOptional && onSkip && (
                <Button variant="outline" onClick={onSkip}>
                  Passer
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {(type === 'text' || type === 'date') && (
        <div className="space-y-4">
          <Input
            type={type}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            className="w-full"
            onKeyPress={(e) => e.key === 'Enter' && inputValue.trim() && handleSubmit()}
          />
          <div className="flex gap-2">
            <Button 
              onClick={handleSubmit} 
              disabled={!inputValue.trim()}
              className="flex-1"
            >
              Continuer
            </Button>
            {isOptional && onSkip && (
              <Button variant="outline" onClick={onSkip}>
                Passer
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionStep;
