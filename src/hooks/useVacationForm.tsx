import { useState, useEffect } from 'react';
import { VacationData } from '@/lib/messageTemplates';
import { 
  sanitizeName, 
  sanitizeDestination, 
  sanitizeActivity,
  isValidDateRange as securityIsValidDateRange,
  isValidName,
  isValidDestination,
  isValidActivity
} from '@/lib/securityUtils';

export interface UseVacationFormReturn {
  formData: VacationData;
  setFormData: React.Dispatch<React.SetStateAction<VacationData>>;
  updateField: (field: keyof VacationData, value: any) => void;
  toggleRecipient: (recipient: string) => void;
  isValid: boolean;
  isBasicInfoComplete: boolean;
  isRecipientsComplete: boolean;
}

const initialFormData: VacationData = {
  startDate: '',
  endDate: '',
  destination: '',
  activity: '',
  recipients: [],
  backupContact: ''
};

export function useVacationForm(): UseVacationFormReturn {
  const [formData, setFormData] = useState<VacationData>(initialFormData);

  const updateField = (field: keyof VacationData, value: any) => {
    let sanitizedValue = value;
    
    // Sanitize input based on field type
    if (typeof value === 'string') {
      switch (field) {
        case 'destination':
          sanitizedValue = sanitizeDestination(value);
          break;
        case 'activity':
          sanitizedValue = sanitizeActivity(value);
          break;
        case 'backupContact':
          sanitizedValue = sanitizeName(value);
          break;
        default:
          sanitizedValue = value.trim();
      }
    }
    
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
  };

  const toggleRecipient = (recipient: string) => {
    setFormData(prev => ({
      ...prev,
      recipients: prev.recipients.includes(recipient)
        ? prev.recipients.filter(r => r !== recipient)
        : [...prev.recipients, recipient]
    }));
  };

  // Enhanced validation with security checks
  const isBasicInfoComplete = Boolean(
    formData.startDate && 
    formData.endDate && 
    formData.destination &&
    securityIsValidDateRange(formData.startDate, formData.endDate) &&
    isValidDestination(formData.destination) &&
    (!formData.activity || isValidActivity(formData.activity))
  );
  
  const isRecipientsComplete = formData.recipients.length > 0;
  
  const isBackupContactValid = !formData.backupContact || isValidName(formData.backupContact);
  
  const isValid = isBasicInfoComplete && isRecipientsComplete && isBackupContactValid;

  return {
    formData,
    setFormData,
    updateField,
    toggleRecipient,
    isValid: Boolean(isValid),
    isBasicInfoComplete: Boolean(isBasicInfoComplete),
    isRecipientsComplete: Boolean(isRecipientsComplete)
  };
}