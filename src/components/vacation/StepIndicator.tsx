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
    <div className="w-full mb-8">
      {/* Desktop Layout - Horizontal */}
      <div className="hidden md:flex items-center justify-center max-w-4xl mx-auto px-8">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep || (stepNumber === totalSteps && messageGenerated);
          const isActive = stepNumber === currentStep;
          const IconComponent = iconMap[step.icon as keyof typeof iconMap] || Calendar;

          return (
            <div key={stepNumber} className="flex items-center justify-center flex-1">
              {/* Step Circle */}
                <div className="flex flex-col items-center justify-center">
                <div
                  className={`
                    w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300
                    ${isCompleted 
                      ? 'bg-primary border-primary text-primary-foreground shadow-lg' 
                      : isActive 
                        ? 'border-primary bg-primary/10 text-primary shadow-md' 
                        : 'border-border bg-background text-muted-foreground'
                    }
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <IconComponent className="w-6 h-6" />
                  )}
                </div>
                
                {/* Step Title */}
                <span
                  className={`
                    mt-3 text-sm font-medium text-center whitespace-nowrap
                    ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground'}
                  `}
                >
                  {step.title}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-6">
                  <div
                    className={`
                      h-[2px] w-full transition-all duration-300
                      ${stepNumber < currentStep ? 'bg-primary' : 'bg-border'}
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Layout - Compact Vertical */}
      <div className="md:hidden flex items-center justify-center gap-3 px-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep || (stepNumber === totalSteps && messageGenerated);
          const isActive = stepNumber === currentStep;
          const IconComponent = iconMap[step.icon as keyof typeof iconMap] || Calendar;

          return (
            <div key={stepNumber} className="flex items-center">
              {/* Step Circle - Smaller on mobile */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300
                    ${isCompleted 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : isActive 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-border bg-background text-muted-foreground'
                    }
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <IconComponent className="w-4 h-4" />
                  )}
                </div>
                
                {/* Step Title - Smaller text on mobile */}
                <span
                  className={`
                    mt-1 text-xs font-medium text-center max-w-16 leading-tight
                    ${isActive ? 'text-primary' : 'text-muted-foreground'}
                  `}
                >
                  {step.title}
                </span>
              </div>

              {/* Connector Line - Shorter on mobile */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    h-[2px] w-8 mx-2 transition-all duration-300
                    ${stepNumber < currentStep ? 'bg-primary' : 'bg-border'}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}