import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

export function SecurityNotice() {
  return (
    <Alert className="border-primary/20 bg-primary/5">
      <Shield className="h-4 w-4 text-primary" />
      <AlertDescription className="text-sm text-muted-foreground">
        <strong className="text-primary">Sécurité & Confidentialité :</strong> Vos données restent privées et ne sont jamais stockées. 
        Les messages sont générés localement dans votre navigateur.
      </AlertDescription>
    </Alert>
  );
}