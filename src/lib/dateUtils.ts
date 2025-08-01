import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

export const formatDate = (dateString: string, language: string) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const locale = language === 'fr' ? fr : enUS;
  
  return format(date, 'PPP', { locale });
};

export const formatDateToISO = (date: Date | undefined): string => {
  if (!date) return '';
  return format(date, 'yyyy-MM-dd');
};

export const isValidDateRange = (startDate: string, endDate: string): boolean => {
  if (!startDate || !endDate) return false;
  return new Date(endDate) >= new Date(startDate);
};