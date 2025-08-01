import React from 'react';
import { CheckCircle, Calendar, Users, Sparkles } from 'lucide-react';

interface Step {
  title: string;
  icon: string;
}

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: Step[];
  messageGenerated: boolean;
}

const iconMap = {
  calendar: Calendar,
  users: Users,
  sparkles: Sparkles
};

export function StepIndicator({ currentStep, totalSteps, steps, messageGenerated }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep || (stepNumber === totalSteps && messageGenerated);
        const isActive = stepNumber === currentStep;
        const IconComponent = iconMap[step.icon as keyof typeof iconMap] || Calendar;

        return (
          <div key={stepNumber} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300
                  ${isCompleted 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : isActive 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-border bg-background text-muted-foreground'
                  }
                `}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <IconComponent className="w-5 h-5" />
                )}
              </div>
              
              {/* Step Title */}
              <span
                className={`
                  mt-2 text-xs font-medium text-center max-w-20
                  ${isActive ? 'text-primary' : 'text-muted-foreground'}
                `}
              >
                {step.title}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  h-[2px] w-12 mx-4 transition-all duration-300
                  ${stepNumber < currentStep ? 'bg-primary' : 'bg-border'}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}