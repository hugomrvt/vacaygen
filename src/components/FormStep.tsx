import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

interface FormStepProps {
  title: string;
  description: string;
  stepNumber: number;
  currentStep: number;
  children: React.ReactNode;
}

const FormStep: React.FC<FormStepProps> = ({ title, description, stepNumber, currentStep, children }) => {
  const isCompleted = currentStep > stepNumber;
  const isActive = currentStep === stepNumber;
  
  return (
    <Card className={`transition-all duration-300 ${
      isActive ? 'ring-2 ring-primary shadow-lg' : 
      isCompleted ? 'border-green-500 bg-green-50/50' : 
      'border-muted'
    }`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              isCompleted ? 'bg-green-500 text-white' :
              isActive ? 'bg-primary text-primary-foreground' :
              'bg-muted text-muted-foreground'
            }`}>
              {isCompleted ? <CheckCircle className="w-4 h-4" /> : stepNumber}
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription className="text-sm">{description}</CardDescription>
            </div>
          </div>
          {isCompleted && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300">
              Terminé
            </Badge>
          )}
        </div>
      </CardHeader>
      {(isActive || isCompleted) && (
        <CardContent className="pt-0">
          {children}
        </CardContent>
      )}
    </Card>
  );
};

export default FormStep;
