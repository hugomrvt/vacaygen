import { useState, useEffect } from 'react';
import { CustomTemplate, MessageHistoryItem, VacationData } from '@/types';

// ============================================
// LocalStorage Keys
// ============================================
const STORAGE_KEYS = {
  TEMPLATES: 'away_custom_templates',
  HISTORY: 'away_message_history',
  LAST_USED_STYLE: 'away_last_used_style',
  LAST_LANGUAGE: 'away_last_language',
  THEME: 'away_theme',
} as const;

// ============================================
// Custom Templates Hook
// ============================================
export interface UseTemplatesReturn {
  templates: CustomTemplate[];
  saveTemplate: (template: Omit<CustomTemplate, 'id' | 'createdAt' | 'updatedAt'>) => CustomTemplate;
  updateTemplate: (id: string, updates: Partial<CustomTemplate>) => CustomTemplate | null;
  deleteTemplate: (id: string) => boolean;
  getTemplateById: (id: string) => CustomTemplate | null;
}

export function useTemplates(): UseTemplatesReturn {
  const [templates, setTemplates] = useState<CustomTemplate[]>([]);

  // Load templates from localStorage
  useEffect(() => {
    try {
      const savedTemplates = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
      if (savedTemplates) {
        setTemplates(JSON.parse(savedTemplates));
      }
    } catch (error) {
      console.error('Error loading templates from localStorage:', error);
    }
  }, []);

  // Save templates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
    } catch (error) {
      console.error('Error saving templates to localStorage:', error);
    }
  }, [templates]);

  const saveTemplate = (template: Omit<CustomTemplate, 'id' | 'createdAt' | 'updatedAt'>): CustomTemplate => {
    const newTemplate: CustomTemplate = {
      ...template,
      id: `template_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTemplates((prev) => [...prev, newTemplate]);
    return newTemplate;
  };

  const updateTemplate = (id: string, updates: Partial<CustomTemplate>): CustomTemplate | null => {
    setTemplates((prev) => {
      const updatedTemplates = prev.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            ...updates,
            updatedAt: new Date().toISOString(),
          };
        }
        return t;
      });
      return updatedTemplates;
    });
    
    // Return the updated template or null if not found
    const updatedTemplate = templates.find((t) => t.id === id);
    return updatedTemplate ? { ...updatedTemplate, ...updates, updatedAt: new Date().toISOString() } : null;
  };

  const deleteTemplate = (id: string): boolean => {
    const initialLength = templates.length;
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    return templates.length < initialLength;
  };

  const getTemplateById = (id: string): CustomTemplate | null => {
    return templates.find((t) => t.id === id) || null;
  };

  return {
    templates,
    saveTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplateById,
  };
}

// ============================================
// Message History Hook
// ============================================
export interface UseHistoryReturn {
  history: MessageHistoryItem[];
  saveToHistory: (data: Omit<MessageHistoryItem, 'id' | 'createdAt'>) => MessageHistoryItem;
  deleteFromHistory: (id: string) => boolean;
  clearHistory: () => void;
  getHistoryByStyle: (styleId: string) => MessageHistoryItem[];
}

export function useHistory(): UseHistoryReturn {
  const [history, setHistory] = useState<MessageHistoryItem[]>([]);

  // Load history from localStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading history from localStorage:', error);
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving history to localStorage:', error);
    }
  }, [history]);

  const saveToHistory = (data: Omit<MessageHistoryItem, 'id' | 'createdAt'>): MessageHistoryItem => {
    const newHistoryItem: MessageHistoryItem = {
      ...data,
      id: `history_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    setHistory((prev) => [newHistoryItem, ...prev].slice(0, 50)); // Keep last 50 items
    return newHistoryItem;
  };

  const deleteFromHistory = (id: string): boolean => {
    const initialLength = history.length;
    setHistory((prev) => prev.filter((h) => h.id !== id));
    return history.length < initialLength;
  };

  const clearHistory = (): void => {
    setHistory([]);
  };

  const getHistoryByStyle = (styleId: string): MessageHistoryItem[] => {
    return history.filter((h) => h.styleId === styleId);
  };

  return {
    history,
    saveToHistory,
    deleteFromHistory,
    clearHistory,
    getHistoryByStyle,
  };
}

// ============================================
// Settings Hook (for user preferences)
// ============================================
export interface UserSettings {
  lastUsedStyle: string;
  lastLanguage: string;
  theme: 'light' | 'dark' | 'system';
}

export interface UseSettingsReturn {
  settings: UserSettings;
  updateSetting: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
  resetSettings: () => void;
}

export function useSettings(): UseSettingsReturn {
  const defaultSettings: UserSettings = {
    lastUsedStyle: 'millennial-pro',
    lastLanguage: 'fr',
    theme: 'system',
  };

  const [settings, setSettings] = useState<UserSettings>(defaultSettings);

  // Load settings from localStorage
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEYS.LAST_USED_STYLE);
      const savedLanguage = localStorage.getItem(STORAGE_KEYS.LAST_LANGUAGE);
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      
      setSettings({
        lastUsedStyle: savedSettings || defaultSettings.lastUsedStyle,
        lastLanguage: savedLanguage || defaultSettings.lastLanguage,
        theme: (savedTheme as UserSettings['theme']) || defaultSettings.theme,
      });
    } catch (error) {
      console.error('Error loading settings from localStorage:', error);
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_USED_STYLE, settings.lastUsedStyle);
      localStorage.setItem(STORAGE_KEYS.LAST_LANGUAGE, settings.lastLanguage);
      localStorage.setItem(STORAGE_KEYS.THEME, settings.theme);
    } catch (error) {
      console.error('Error saving settings to localStorage:', error);
    }
  }, [settings]);

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]): void => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = (): void => {
    setSettings(defaultSettings);
  };

  return {
    settings,
    updateSetting,
    resetSettings,
  };
}

// ============================================
// Conversation State Hook (for chat-like UI)
// ============================================
export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  data?: Partial<VacationData>; // Optional data associated with the message
  styleId?: string; // Optional style for generated messages
}

export interface UseConversationReturn {
  messages: ConversationMessage[];
  addMessage: (message: Omit<ConversationMessage, 'id' | 'timestamp'>) => ConversationMessage;
  updateMessage: (id: string, updates: Partial<ConversationMessage>) => ConversationMessage | null;
  deleteMessage: (id: string) => boolean;
  clearConversation: () => void;
  getLastUserMessage: () => ConversationMessage | null;
}

export function useConversation(): UseConversationReturn {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);

  // Initialize with a welcome message
  useEffect(() => {
    const welcomeMessage: ConversationMessage = {
      id: `msg_welcome_${Date.now()}`,
      role: 'assistant',
      content: "Bonjour ! Je suis Away, votre assistant pour créer des messages d'absence percutants. Par où commençons-nous ?",
      timestamp: new Date().toISOString(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const addMessage = (message: Omit<ConversationMessage, 'id' | 'timestamp'>): ConversationMessage => {
    const newMessage: ConversationMessage = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  const updateMessage = (id: string, updates: Partial<ConversationMessage>): ConversationMessage | null => {
    setMessages((prev) => {
      const updatedMessages = prev.map((m) => {
        if (m.id === id) {
          return { ...m, ...updates };
        }
        return m;
      });
      return updatedMessages;
    });
    
    const updatedMessage = messages.find((m) => m.id === id);
    return updatedMessage ? { ...updatedMessage, ...updates } : null;
  };

  const deleteMessage = (id: string): boolean => {
    const initialLength = messages.length;
    setMessages((prev) => prev.filter((m) => m.id !== id));
    return messages.length < initialLength;
  };

  const clearConversation = (): void => {
    setMessages([]);
  };

  const getLastUserMessage = (): ConversationMessage | null => {
    const userMessages = messages.filter((m) => m.role === 'user');
    return userMessages[userMessages.length - 1] || null;
  };

  return {
    messages,
    addMessage,
    updateMessage,
    deleteMessage,
    clearConversation,
    getLastUserMessage,
  };
}

// ============================================
// Export all hooks
// ============================================
export {
  STORAGE_KEYS,
};
