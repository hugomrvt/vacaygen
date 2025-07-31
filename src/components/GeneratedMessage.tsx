
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

const GeneratedMessage = ({ message, isGenerating, onRegenerate }: GeneratedMessageProps) => {
  const { toast } = useToast();
  const { t } = useTranslation();
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
      
      const descKey = format === 'text' ? 'toast.copied.desc.text' : 
                     format === 'html' ? 'toast.copied.desc.html' : 
                     'toast.copied.desc.markdown';
      
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

  return (
    <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            {t('generated.title')}
          </div>
          {message && (
            <div className="flex gap-2 text-xs">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {wordCount} {t('generated.words')}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {charCount} {t('generated.characters')}
              </Badge>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isGenerating ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full mb-4">
              <RefreshCw className="h-8 w-8 text-white animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t('generated.generating')}
            </h3>
            <p className="text-gray-600">
              {t('generated.generating.subtitle')}
            </p>
            <div className="flex justify-center mt-4">
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        ) : message ? (
          <>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
                {message}
              </pre>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={() => handleCopy('text')} 
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
              >
                {copied && copyFormat === 'text' ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    {t('generated.copied')}
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    {t('generated.copy')}
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={onRegenerate}
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                {t('generated.regenerate')}
              </Button>
            </div>

            {/* Format Options */}
            <div className="border-t pt-4">
              <p className="text-xs text-gray-600 mb-2 font-semibold">{t('generated.format.title')}</p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy('html')}
                  className="text-xs"
                >
                  {copied && copyFormat === 'html' ? `✓ ${t('generated.format.html')}` : t('generated.format.html')}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy('markdown')}
                  className="text-xs"
                >
                  {copied && copyFormat === 'markdown' ? `✓ ${t('generated.format.markdown')}` : t('generated.format.markdown')}
                </Button>
              </div>
            </div>

            {/* Usage Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg p-3 border border-blue-100">
              <p className="text-xs text-gray-600 mb-2">
                <strong>{t('generated.tips.title')}</strong>
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>{t('generated.tips.email')}</li>
                <li>{t('generated.tips.slack')}</li>
                <li>{t('generated.tips.linkedin')}</li>
              </ul>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Sparkles className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {t('generated.waiting.title')}
            </h3>
            <p className="text-gray-500">
              {t('generated.waiting.subtitle')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GeneratedMessage;
