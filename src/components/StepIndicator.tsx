import React from 'react';
import { Check, Calendar, Users, Sparkles } from 'lucide-react';
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: {
    title: string;
    icon: string;
  }[];
  messageGenerated?: boolean;
}
const StepIndicator = ({
  currentStep,
  totalSteps,
  steps,
  messageGenerated
}: StepIndicatorProps) => {
  const getStepIcon = (index: number) => {
    const icons = [Calendar, Users, Sparkles];
    const IconComponent = icons[index] || Calendar;
    return <IconComponent className="h-5 w-5" />;
  };
  return <div className="w-full mb-8">
      <div className="relative flex items-center justify-between mb-4 px-4">
        {/* Background line with gradient overlay */}
        <div className="absolute inset-0 flex items-center mt-10">
          
        </div>

        {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = currentStep > stepNumber || stepNumber === 3 && messageGenerated;
        const isCurrent = currentStep === stepNumber && !messageGenerated;
        return <div key={stepNumber} className="relative flex flex-col items-center z-10">
              {/* Step circle */}
              <div className={`
                relative flex items-center justify-center w-12 h-12 rounded-full border-3 transition-all duration-300 shadow-lg
                ${isCompleted ? 'bg-green-500 border-green-400 text-white shadow-green-500/30' : isCurrent ? 'bg-primary border-primary text-primary-foreground shadow-primary/30 scale-110' : 'bg-card border-border text-muted-foreground shadow-card/50'}
              `}>
                {isCompleted ? <Check className="h-6 w-6" /> : getStepIcon(index)}
                
                {/* Glow effect for current step */}
                {isCurrent && <div className="absolute inset-0 rounded-full bg-primary opacity-20 animate-pulse" />}
              </div>
              
              {/* Step info */}
              <div className="mt-3 text-center min-w-[120px]">
                <div className={`text-sm font-semibold transition-all duration-300 ${isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.title}
                </div>
                <div className={`text-xs mt-1 transition-all duration-300 ${isCompleted ? 'text-green-600' : isCurrent ? 'text-primary' : 'text-muted-foreground'}`}>
                  Étape {stepNumber}/{totalSteps}
                </div>
              </div>
            </div>;
      })}
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-3 overflow-hidden shadow-inner">
        <div className="h-full bg-gradient-to-r from-green-500 via-primary to-chart-3 transition-all duration-700 ease-out shadow-sm" style={{
        width: `${messageGenerated ? 100 : currentStep / totalSteps * 100}%`
      }} />
      </div>
    </div>;
};
export default StepIndicator;
