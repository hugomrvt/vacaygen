import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';
export function SecurityNotice() {
  return (
    <Alert className="border-muted">
      <Shield className="h-4 w-4" />
      <AlertDescription>
        Your data is processed locally in your browser and never stored on our servers.
      </AlertDescription>
    </Alert>
  );
}