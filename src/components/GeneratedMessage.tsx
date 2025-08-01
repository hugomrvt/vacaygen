import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, RefreshCw, Sparkles, Check, Share, Download, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';

interface GeneratedMessageProps {
  message: string;
  isGenerating: boolean;
  onRegenerate: () => void;
}

const GeneratedMessage = ({
  message,
  isGenerating,
  onRegenerate
}: GeneratedMessageProps) => {
  const {
    toast
  } = useToast();
  const {
    t
  } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [copyFormat, setCopyFormat] = useState<'text' | 'html' | 'markdown'>('text');

  const handleCopy = async (format: 'text' | 'html' | 'markdown' = 'text') => {
    if (!message) return;
    let textToCopy = message;
    if (format === 'html') {
      textToCopy = message.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    } else if (format === 'markdown') {
      // Message is already in a markdown-friendly format
      textToCopy = message;
    }
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setCopyFormat(format);
      const descKey = format === 'text' ? 'toast.copied.desc.text' : format === 'html' ? 'toast.copied.desc.html' : 'toast.copied.desc.markdown';
      toast({
        title: t('toast.copied.title'),
        description: t(descKey),
        variant: "default"
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: t('toast.copy.error.title'),
        description: t('toast.copy.error.desc'),
        variant: "destructive"
      });
    }
  };

  const wordCount = message ? message.split(/\s+/).length : 0;
  const charCount = message ? message.length : 0;

  return <Card className="w-full shadow-lg border-0 glass-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            {t('generated.title')}
          </div>
          {message && <div className="flex gap-2 text-xs">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {wordCount} {t('generated.words')}
              </Badge>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                {charCount} {t('generated.characters')}
              </Badge>
            </div>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isGenerating ? <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-full mb-4">
              <RefreshCw className="h-8 w-8 text-primary-foreground animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {t('generated.generating')}
            </h3>
            <p className="text-muted-foreground">
              {t('generated.generating.subtitle')}
            </p>
            <div className="flex justify-center mt-4">
              <div className="flex space-x-1">
                {[0, 1, 2].map(i => <div key={i} className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{
              animationDelay: `${i * 0.2}s`
            }}></div>)}
              </div>
            </div>
          </div> : message ? <>
            <div className="bg-muted/50 rounded-lg p-4 border border-border">
              <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed">
                {message}
              </pre>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => handleCopy('text')} className="flex-1 bg-gradient-to-r from-success to-success/80 hover:from-success/90 hover:to-success/70 text-success-foreground">
                {copied && copyFormat === 'text' ? <>
                    <Check className="mr-2 h-4 w-4" />
                    {t('generated.copied')}
                  </> : <>
                    <Copy className="mr-2 h-4 w-4" />
                    {t('generated.copy')}
                  </>}
              </Button>
              
              <Button variant="outline" onClick={onRegenerate} className="border-primary/30 hover:bg-primary/5 text-neutral-50">
                <RefreshCw className="mr-2 h-4 w-4" />
                {t('generated.regenerate')}
              </Button>
            </div>

            {/* Format Options */}
            <div className="border-t pt-4">
              <p className="text-xs text-muted-foreground mb-2 font-semibold">{t('generated.format.title')}</p>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleCopy('html')} className="text-xs bg-gray-700 hover:bg-gray-600">
                  {copied && copyFormat === 'html' ? `✓ ${t('generated.format.html')}` : t('generated.format.html')}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleCopy('markdown')} className="text-xs bg-gray-700 hover:bg-gray-600">
                  {copied && copyFormat === 'markdown' ? `✓ ${t('generated.format.markdown')}` : t('generated.format.markdown')}
                </Button>
              </div>
            </div>

            {/* Usage Tips */}
            <div className="bg-gradient-to-r from-primary/5 to-warning/5 rounded-lg p-3 border border-primary/10">
              <p className="text-xs text-muted-foreground mb-2">
                <strong>{t('generated.tips.title')}</strong>
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>{t('generated.tips.email')}</li>
                <li>{t('generated.tips.slack')}</li>
                <li>{t('generated.tips.linkedin')}</li>
              </ul>
            </div>
          </> : <div className="text-center py-12 text-muted-foreground">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-muted/30 rounded-full mb-4">
              <Sparkles className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {t('generated.waiting.title')}
            </h3>
            <p className="text-muted-foreground">
              {t('generated.waiting.subtitle')}
            </p>
          </div>}
      </CardContent>
    </Card>;
};

export default GeneratedMessage;
