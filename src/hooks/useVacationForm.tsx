import { useState, useEffect } from 'react';
import { VacationData } from '@/types';
import { 
  sanitizeName, 
  sanitizeDestination, 
  sanitizeActivity, 
  isValidDateRange as securityIsValidDateRange,
  isValidBackupContacts,
  isValidDestination,
  isValidActivity
} from '@/lib/securityUtils';
import { useSettings } from '@/hooks/useLocalStorage';

export interface UseVacationFormReturn {
  formData: VacationData;
  setFormData: React.Dispatch<React.SetStateAction<VacationData>>;
  updateField: (field: keyof VacationData, value: any) => void;
  toggleRecipient: (recipient: string) => void;
  isValid: boolean;
  isBasicInfoComplete: boolean;
  isRecipientsComplete: boolean;
  resetForm: () => void;
  loadFromData: (data: Partial<VacationData>) => void;
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
  const { settings, updateSetting } = useSettings();

  // Load saved form data from localStorage
  useEffect(() => {
    try {
      const savedFormData = localStorage.getItem('away_form_data');
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }
    } catch (error) {
      console.error('Error loading form data from localStorage:', error);
    }
  }, []);

  // Save form data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('away_form_data', JSON.stringify(formData));
    } catch (error) {
      console.error('Error saving form data to localStorage:', error);
    }
  }, [formData]);

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
  
  const isBackupContactValid = !formData.backupContact || isValidBackupContacts(formData.backupContact);
  
  const isValid = isBasicInfoComplete && isRecipientsComplete && isBackupContactValid;

  const resetForm = () => {
    setFormData(initialFormData);
    localStorage.removeItem('away_form_data');
  };

  const loadFromData = (data: Partial<VacationData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return {
    formData,
    setFormData,
    updateField,
    toggleRecipient,
    isValid: Boolean(isValid),
    isBasicInfoComplete: Boolean(isBasicInfoComplete),
    isRecipientsComplete: Boolean(isRecipientsComplete),
    resetForm,
    loadFromData,
  };
}
