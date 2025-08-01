
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Copy, Edit3, Save, X, Download, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';

interface GeneratedMessageProps {
  message: string;
  formData: any;
  onRegenerate: () => void;
  onReset: () => void;
}

const GeneratedMessage: React.FC<GeneratedMessageProps> = ({ 
  message, 
  formData, 
  onRegenerate, 
  onReset 
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(isEditing ? editedMessage : message);
      toast({
        title: t('success.copied'),
        description: t('success.copiedDescription'),
      });
    } catch (error) {
      toast({
        title: t('error.copyFailed'),
        description: t('error.copyFailedDescription'),
        variant: "destructive",
      });
    }
  };

  const saveEdits = () => {
    setIsEditing(false);
    toast({
      title: t('success.saved'),
      description: t('success.savedDescription'),
    });
  };

  const cancelEdits = () => {
    setEditedMessage(message);
    setIsEditing(false);
  };

  const exportAsText = () => {
    const content = isEditing ? editedMessage : message;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `message-vacances-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openEmailClient = () => {
    const subject = encodeURIComponent('Message d\'absence automatique');
    const body = encodeURIComponent(isEditing ? editedMessage : message);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <Card className="border-green-200 bg-green-50/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-green-800 flex items-center gap-2">
            ✨ {t('result.title')}
          </CardTitle>
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300">
            {t('result.ready')}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Message Display/Edit */}
        <div className="space-y-2">
          {isEditing ? (
            <Textarea
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              className="min-h-[200px] font-mono text-sm bg-white border-2 border-primary"
              placeholder={t('result.editPlaceholder')}
            />
          ) : (
            <div className="bg-white p-4 rounded-lg border-2 border-green-200 shadow-sm">
              <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800">
                {message}
              </pre>
            </div>
          )}
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {isEditing ? (
            <>
              <Button onClick={saveEdits} size="sm" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                {t('actions.save')}
              </Button>
              <Button onClick={cancelEdits} variant="outline" size="sm" className="flex items-center gap-2">
                <X className="w-4 h-4" />
                {t('actions.cancel')}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={copyToClipboard} size="sm" className="flex items-center gap-2">
                <Copy className="w-4 h-4" />
                {t('actions.copy')}
              </Button>
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                {t('actions.edit')}
              </Button>
              <Button onClick={exportAsText} variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                {t('actions.export')}
              </Button>
              <Button onClick={openEmailClient} variant="outline" size="sm" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {t('actions.email')}
              </Button>
            </>
          )}
        </div>

        <Separator />

        {/* Generate New Message / Reset */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button onClick={onRegenerate} variant="secondary" className="flex items-center gap-2">
            ✨ {t('actions.regenerate')}
          </Button>
          <Button onClick={onReset} variant="outline" className="flex items-center gap-2">
            🔄 {t('actions.newMessage')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneratedMessage;
