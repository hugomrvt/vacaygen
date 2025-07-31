
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, CheckCircle, AlertTriangle } from 'lucide-react';

interface FieldHelperProps {
  fieldName: string;
  value: string | string[];
  error?: string;
  isValid?: boolean;
  helpText?: string;
}

const FieldHelper = ({ fieldName, value, error, isValid, helpText }: FieldHelperProps) => {
  const getIcon = () => {
    if (error) return <AlertTriangle className="h-4 w-4" />;
    if (isValid) return <CheckCircle className="h-4 w-4" />;
    return <Info className="h-4 w-4" />;
  };

  const getVariant = () => {
    if (error) return 'destructive';
    if (isValid) return 'default';
    return 'default';
  };

  const getMessage = () => {
    if (error) return error;
    if (isValid) {
      switch (fieldName) {
        case 'destination':
          return '✅ Super choix de destination !';
        case 'dates':
          return '✅ Dates bien définies !';
        case 'recipients':
          return '✅ Destinataires sélectionnés !';
        default:
          return '✅ Champ validé !';
      }
    }
    return helpText;
  };

  const shouldShow = error || isValid || helpText;

  if (!shouldShow) return null;

  return (
    <Alert variant={getVariant()} className="mt-2 border-l-4">
      <div className="flex items-start gap-2">
        {getIcon()}
        <AlertDescription className="text-sm">
          {getMessage()}
        </AlertDescription>
      </div>
    </Alert>
  );
};

export default FieldHelper;
