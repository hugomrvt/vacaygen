
import React from 'react';
import { Check, Calendar, Users, Sparkles } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: { title: string; icon: string }[];
}

const StepIndicator = ({ currentStep, totalSteps, steps }: StepIndicatorProps) => {
  const getStepIcon = (stepIndex: number) => {
    const iconMap = {
      0: Calendar,
      1: Users,
      2: Sparkles
    };
    return iconMap[stepIndex as keyof typeof iconMap] || Calendar;
  };

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;
          const IconComponent = getStepIcon(index);
          
          return (
            <div key={stepNumber} className="flex items-center">
              <div className={`
                relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                  isCurrent ? 'bg-blue-500 border-blue-500 text-white animate-pulse' : 
                  'bg-gray-100 border-gray-300 text-gray-400'}
              `}>
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <IconComponent className="h-5 w-5" />
                )}
              </div>
              
              <div className={`ml-3 ${index < steps.length - 1 ? 'mr-8' : ''}`}>
                <div className={`text-sm font-medium transition-colors duration-200 ${
                  isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {step.title}
                </div>
                <div className="text-xs text-gray-500">
                  Étape {stepNumber}/{totalSteps}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`h-0.5 flex-1 mx-4 transition-colors duration-300 ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default StepIndicator;
