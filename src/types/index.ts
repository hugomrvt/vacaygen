// Away - Type Definitions
// ========================

// Core Data Types
export interface VacationData {
  startDate: string;
  endDate: string;
  destination: string;
  activity: string;
  recipients: string[];
  backupContact: string;
}

// Message Template Types
export interface MessageTemplate {
  [lang: string]: (data: VacationData) => string;
}

export interface StyleTemplate {
  id: string;
  name: string;
  description: string;
  example: string;
  emoji: string;
  color: string;
  popularity?: 'hot' | 'trending';
}

// Custom Template Types (New Feature)
export interface CustomTemplate {
  id: string;
  name: string;
  content: string;
  styleId: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

// History Types (New Feature)
export interface MessageHistoryItem {
  id: string;
  message: string;
  styleId: string;
  language: string;
  vacationData: VacationData;
  createdAt: string;
}

// UI Types
export interface Step {
  title: string;
  icon?: string;
}

// Form Types
export interface FormErrors {
  startDate?: string;
  endDate?: string;
  destination?: string;
  activity?: string;
  backupContact?: string;
  recipients?: string;
}

// Toast Types
export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant: 'default' | 'destructive' | 'success' | 'warning';
  duration?: number;
}

// Theme Types
export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    border: string;
  };
}

// Email Integration Types (New Feature)
export interface EmailRecipient {
  name: string;
  email: string;
}

export interface EmailData {
  to: EmailRecipient[];
  subject: string;
  body: string;
}

// API Response Types (if needed in the future)
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
