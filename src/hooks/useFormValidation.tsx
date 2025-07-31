
import { useState, useEffect } from 'react';
import { useTranslation } from './useTranslation';

interface FormData {
  startDate: string;
  endDate: string;
  destination: string;
  activity: string;
  recipients: string[];
  backupContact: string;
}

interface ValidationState {
  isValid: boolean;
  errors: Record<string, string>;
  completionRate: number;
  requiredFields: Record<string, boolean>;
}

export const useFormValidation = (formData: FormData) => {
  const { t } = useTranslation();
  const [validation, setValidation] = useState<ValidationState>({
    isValid: false,
    errors: {},
    completionRate: 0,
    requiredFields: {
      startDate: false,
      endDate: false,
      destination: false,
      recipients: false
    }
  });

  useEffect(() => {
    const errors: Record<string, string> = {};
    const requiredFields = {
      startDate: false,
      endDate: false,
      destination: false,
      recipients: false
    };

    // Validation des dates
    if (!formData.startDate) {
      errors.startDate = 'La date de début est requise';
    } else {
      requiredFields.startDate = true;
    }

    if (!formData.endDate) {
      errors.endDate = 'La date de fin est requise';
    } else {
      requiredFields.endDate = true;
      
      // Vérifier que la date de fin est après la date de début
      if (formData.startDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
        errors.endDate = 'La date de fin doit être après la date de début';
      }
    }

    // Validation de la destination
    if (!formData.destination.trim()) {
      errors.destination = 'La destination est requise';
    } else if (formData.destination.trim().length < 2) {
      errors.destination = 'La destination doit contenir au moins 2 caractères';
    } else {
      requiredFields.destination = true;
    }

    // Validation des destinataires
    if (formData.recipients.length === 0) {
      errors.recipients = 'Sélectionnez au moins un destinataire';
    } else {
      requiredFields.recipients = true;
    }

    // Calcul du taux de completion
    const requiredFieldsCount = Object.keys(requiredFields).length;
    const completedFieldsCount = Object.values(requiredFields).filter(Boolean).length;
    const optionalFieldsBonus = (formData.activity.trim() ? 0.5 : 0) + (formData.backupContact.trim() ? 0.5 : 0);
    
    const completionRate = Math.min(100, Math.round(((completedFieldsCount + optionalFieldsBonus) / (requiredFieldsCount + 1)) * 100));

    const isValid = Object.keys(errors).length === 0 && completedFieldsCount === requiredFieldsCount;

    setValidation({
      isValid,
      errors,
      completionRate,
      requiredFields
    });
  }, [formData, t]);

  return validation;
};
