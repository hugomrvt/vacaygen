import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Copy, RefreshCw } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/hooks/use-toast';
import { sanitizeInput, validateMessageContent } from '@/lib/securityUtils';

interface MessageDisplayProps {
  message: string;
  isGenerating: boolean;
  onRegenerate: () => void;
}

export function MessageDisplay({ message, isGenerating, onRegenerate }: MessageDisplayProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [editableMessage, setEditableMessage] = useState(message);

  // Mettre à jour le message éditable quand le message original change
  useEffect(() => {
    setEditableMessage(message);
  }, [message]);

  const handleCopy = async () => {
    // Validate content before copying
    if (!validateMessageContent(editableMessage)) {
      toast({
        title: 'Contenu invalide',
        description: 'Le message contient du contenu non autorisé.',
        variant: "destructive"
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(editableMessage);
      toast({
        title: t('toast.copied.title'),
        description: t('toast.copied.desc.text'),
        variant: "default"
      });
    } catch (error) {
      toast({
        title: t('toast.copy.error.title'),
        description: t('toast.copy.error.desc'),
        variant: "destructive"
      });
    }
  };

  const handleMessageChange = (value: string) => {
    // Sanitize input while maintaining user experience
    const sanitized = sanitizeInput(value);
    setEditableMessage(sanitized);
  };

  const getMessageStats = (text: string) => {
    const words = text.trim().split(/\s+/).length;
    const characters = text.length;
    return { words, characters };
  };

  if (isGenerating) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-xl">
            {t('generated.generating')}
          </CardTitle>
          <CardDescription>
            Génération d'une nouvelle version...
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!message) {
    return (
      <Card className="glass-card opacity-60">
        <CardHeader>
          <CardTitle className="text-xl">
            {t('generated.waiting.title')}
          </CardTitle>
          <CardDescription>
            {t('generated.waiting.subtitle')}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const stats = getMessageStats(editableMessage);

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">
            Message Généré
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs">
              {stats.words} mots
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {stats.characters} caractères
            </Badge>
          </div>
        </div>
        <CardDescription>
          Modifiez le message avant de le copier
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Message Content - Editable */}
        <div className="space-y-2">
          <Textarea
            value={editableMessage}
            onChange={(e) => handleMessageChange(e.target.value)}
            className="resize-none font-mono text-sm"
            style={{ height: 'auto', minHeight: '80px' }}
            rows={editableMessage.split('\n').length + 2}
            placeholder="Votre message apparaîtra ici..."
            maxLength={5000}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleCopy}
            variant="default"
            className="flex-1"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copier le message
          </Button>
          <Button 
            onClick={onRegenerate}
            variant="outline"
            className="flex-1"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Générer une nouvelle version
          </Button>
        </div>

        {/* Usage Tips */}
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h4 className="font-medium text-sm mb-2 text-primary">
            💡 Conseil d'utilisation
          </h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>• Cliquez sur "Générer une nouvelle version" pour obtenir une variante</p>
            <p>• Personnalisez le message selon votre contexte professionnel</p>
            <p>• N'oubliez pas d'ajouter votre signature !</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}