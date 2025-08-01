import { useState, useEffect } from 'react';
import { VacationData } from '@/lib/messageTemplates';

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
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleRecipient = (recipient: string) => {
    setFormData(prev => ({
      ...prev,
      recipients: prev.recipients.includes(recipient)
        ? prev.recipients.filter(r => r !== recipient)
        : [...prev.recipients, recipient]
    }));
  };

  const isBasicInfoComplete = formData.startDate && formData.endDate && formData.destination;
  const isRecipientsComplete = formData.recipients.length > 0;
  const isValid = isBasicInfoComplete && isRecipientsComplete;

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