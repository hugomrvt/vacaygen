import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';
export function SecurityNotice() {
  return (
    <Alert className="border-primary/20 bg-primary/5">
      <Shield className="h-4 w-4" />
      <AlertDescription className="text-xs">
        This tool processes data locally in your browser. No personal information is stored or transmitted.
      </AlertDescription>
    </Alert>
  );
}