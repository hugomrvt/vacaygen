import React from 'react';
import { Check, Calendar, Users, Sparkles } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: { title: string; icon: string }[];
  messageGenerated?: boolean;
}

const StepIndicator = ({ currentStep, totalSteps, steps, messageGenerated }: StepIndicatorProps) => {
  const getStepIcon = (index: number) => {
    const icons = [Calendar, Users, Sparkles];
    const IconComponent = icons[index] || Calendar;
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber || (stepNumber === 3 && messageGenerated);
          const isCurrent = currentStep === stepNumber && !messageGenerated;
          
          return (
            <div key={stepNumber} className="flex items-center">
              <div className={`
                relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                  isCurrent ? 'bg-primary border-primary text-primary-foreground' : 
                  'bg-muted border-border text-muted-foreground'}
              `}>
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  getStepIcon(index)
                )}
              </div>
              
              <div className={`ml-3 ${index < steps.length - 1 ? 'mr-8' : ''}`}>
                <div className={`text-sm font-medium transition-colors duration-200 ${
                  isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  Step {stepNumber}/{totalSteps}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`h-0.5 flex-1 mx-4 transition-colors duration-200 ${
                  isCompleted ? 'bg-green-500' : 'bg-border'
                }`} />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div 
          className="bg-gradient-primary h-full transition-all duration-300 ease-out"
          style={{ 
            width: `${messageGenerated ? 100 : (currentStep / totalSteps) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};

export default StepIndicator;
