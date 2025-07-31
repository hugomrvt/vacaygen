
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';

interface FormProgressProps {
  completionRate: number;
  requiredFields: Record<string, boolean>;
  errors: Record<string, string>;
}

const FormProgress = ({ completionRate, requiredFields, errors }: FormProgressProps) => {
  const fieldLabels = {
    startDate: 'Dates de début',
    endDate: 'Date de fin', 
    destination: 'Destination',
    recipients: 'Destinataires'
  };

  const getStatusIcon = (fieldName: string) => {
    const isCompleted = requiredFields[fieldName];
    const hasError = errors[fieldName];

    if (hasError) {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
    if (isCompleted) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    return <Circle className="h-4 w-4 text-gray-400" />;
  };

  const getProgressColor = () => {
    if (completionRate < 30) return 'bg-red-500';
    if (completionRate < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card className="mb-6 border-2 border-gray-100 bg-gradient-to-br from-white to-blue-50/30">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            📊 Progression du formulaire
          </h3>
          <Badge 
            variant="outline" 
            className={`font-bold text-sm animate-pulse ${
              completionRate === 100 ? 'bg-green-100 text-green-700 border-green-300' : 
              completionRate >= 50 ? 'bg-yellow-100 text-yellow-700 border-yellow-300' : 
              'bg-red-100 text-red-700 border-red-300'
            }`}
          >
            {completionRate}%
          </Badge>
        </div>
        
        <div className="mb-4">
          <Progress 
            value={completionRate} 
            className="h-3 mb-2"
          />
          <div className={`h-3 rounded-full transition-all duration-500 ${getProgressColor()}`} 
               style={{ width: `${completionRate}%` }}></div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          {Object.entries(fieldLabels).map(([fieldName, label]) => (
            <div key={fieldName} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50/50">
              {getStatusIcon(fieldName)}
              <span className={`${requiredFields[fieldName] ? 'text-green-700 font-medium' : 'text-gray-600'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {completionRate === 100 && (
          <div className="mt-3 p-2 bg-green-100 rounded-lg border border-green-200">
            <p className="text-sm text-green-700 font-medium text-center">
              ✅ Formulaire complet ! Prêt à générer votre message
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormProgress;
