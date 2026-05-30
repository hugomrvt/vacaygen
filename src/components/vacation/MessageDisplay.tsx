import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Textarea } from '@/components/ui/Textarea';
import { Copy, RefreshCw, Heart, Mail, Download } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/hooks/use-toast';
import { sanitizeInput, validateMessageContent } from '@/lib/securityUtils';

interface MessageDisplayProps {
  message: string;
  isGenerating: boolean;
  onRegenerate: () => void;
  onSaveAsTemplate?: (content: string, styleId?: string) => void;
  styleId?: string;
}

export function MessageDisplay({ 
  message, 
  isGenerating, 
  onRegenerate,
  onSaveAsTemplate,
  styleId 
}: MessageDisplayProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [editableMessage, setEditableMessage] = useState(message);

  // Update editable message when original message changes
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
    // Keep original formatting, only basic sanitization
    setEditableMessage(value);
  };

  const getMessageStats = (text: string) => {
    const words = text.trim().split(/\s+/).length;
    const characters = text.length;
    return { words, characters };
  };

  const handleSaveAsTemplate = () => {
    if (onSaveAsTemplate && editableMessage) {
      onSaveAsTemplate(editableMessage, styleId);
    }
  };

  const handleEmail = () => {
    // Create mailto link with the message
    const subject = encodeURIComponent('Out of Office Message');
    const body = encodeURIComponent(editableMessage);
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
  };

  const handleDownload = () => {
    // Create a downloadable text file
    const blob = new Blob([editableMessage], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `away-message-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (isGenerating) {
    return (
      <Card className="border-2 border-black">
        <CardHeader>
          <CardTitle className="text-xl">
            {t('generated.generating')}
          </CardTitle>
          <CardDescription>
            {t('generated.generating.subtitle')}
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
      <Card className="border-2 border-black opacity-60">
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
    <Card className="border-2 border-black">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">
            {t('generated.message.title')}
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs border-1 border-black">
              {stats.words} {t('generated.stats.words')}
            </Badge>
            <Badge variant="secondary" className="text-xs border-1 border-black">
              {stats.characters} {t('generated.stats.characters')}
            </Badge>
          </div>
        </div>
        <CardDescription>
          {t('generated.message.subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Message Content - Editable */}
        <div className="space-y-2">
          <Textarea
            value={editableMessage}
            onChange={(e) => handleMessageChange(e.target.value)}
            className="resize-none text-sm whitespace-pre-wrap leading-relaxed border-2 border-input"
            style={{ height: 'auto', minHeight: '120px', whiteSpace: 'pre-wrap' }}
            rows={Math.max(6, editableMessage.split('\n').length + 2)}
            placeholder={t('generated.message.placeholder')}
            maxLength={5000}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={handleCopy}
            variant="primary"
            className="flex-1 sm:flex-none"
            leftIcon={<Copy className="w-4 h-4" />}
          >
            {t('generated.copy')}
          </Button>
          
          <Button 
            onClick={handleEmail}
            variant="secondary"
            className="flex-1 sm:flex-none"
            leftIcon={<Mail className="w-4 h-4" />}
          >
            Email
          </Button>
          
          <Button 
            onClick={handleDownload}
            variant="outline"
            className="flex-1 sm:flex-none"
            leftIcon={<Download className="w-4 h-4" />}
          >
            Télécharger
          </Button>
          
          {onSaveAsTemplate && (
            <Button 
              onClick={handleSaveAsTemplate}
              variant="ghost"
              className="flex-1 sm:flex-none"
              leftIcon={<Heart className="w-4 h-4" />}
            >
              Template
            </Button>
          )}
          
          <Button 
            onClick={onRegenerate}
            variant="outline"
            className="flex-1 sm:flex-none"
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            {t('generated.regenerate')}
          </Button>
        </div>

        {/* Usage Tips */}
        <div className="mt-6 p-4 bg-primary/5 rounded-none border border-primary/20">
          <h4 className="font-medium text-sm mb-2 text-primary">
            💡 {t('generated.tips.title')}
          </h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>• {t('generated.tips.regenerate')}</p>
            <p>• {t('generated.tips.customize')}</p>
            <p>• {t('generated.tips.signature')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default MessageDisplay;
