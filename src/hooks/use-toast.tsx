import { useCallback, useState } from 'react';

// Toast types
export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant: 'default' | 'destructive' | 'success' | 'warning';
  duration?: number;
}

// Toast context type
interface ToastContextType {
  toasts: ToastMessage[];
  toast: (message: Omit<ToastMessage, 'id'>) => void;
  dismiss: (id: string) => void;
}

// Simple toast implementation (without context for now)
let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = useCallback(({
    title,
    description,
    variant = 'default',
    duration = 4000,
  }: Omit<ToastMessage, 'id'>) => {
    const id = String(++toastId);
    setToasts((prev) => [...prev, { id, title, description, variant, duration }]);

    // Auto-dismiss after duration
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, toast, dismiss };
}

// Toast component
export interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const variants = {
    default: 'bg-card text-card-foreground border-2 border-card-border',
    destructive: 'bg-destructive text-destructive-foreground border-2 border-black',
    success: 'bg-success text-success-foreground border-2 border-black',
    warning: 'bg-warning text-warning-foreground border-2 border-black',
  };

  return (
    <div className={`p-4 mb-2 ${variants[toast.variant]}`}>
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-bold">{toast.title}</h4>
          {toast.description && (
            <p className="text-sm mt-1">{toast.description}</p>
          )}
        </div>
        <button
          onClick={() => onDismiss(toast.id)}
          className="ml-4 text-inherit hover:opacity-70"
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Toaster component
export interface ToasterProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toaster: React.FC<ToasterProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};
