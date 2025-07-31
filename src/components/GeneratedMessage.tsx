
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, RefreshCw, Sparkles, Check, Zap } from 'lucide-react';
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

  const handleCopy = async () => {
    if (!message) return;

    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      
      toast({
        title: t('toast.copied.title'),
        description: t('toast.copied.desc.text'),
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

  return (
    <Card className="w-full shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg shadow-md">
              <span className="text-xl">✨</span>
            </div>
            <div>
              <div className="text-lg font-bold">{t('generated.title')}</div>
              <div className="text-sm font-normal text-gray-600 mt-1">Votre message personnalisé</div>
            </div>
          </div>
          {message && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {wordCount} {t('generated.words')}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isGenerating ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg">
              <RefreshCw className="h-8 w-8 text-white animate-spin" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-500" />
              {t('generated.generating')}
            </h3>
            <p className="text-gray-600 font-medium">
              {t('generated.generating.subtitle')}
            </p>
          </div>
        ) : message ? (
          <>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
                {message}
              </pre>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                onClick={handleCopy} 
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white shadow-md"
              >
                {copied ? (
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

            {/* Usage Tips */}
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <p className="text-sm text-gray-700 mb-2 font-semibold flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-500" />
                {t('generated.tips.title')}
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• {t('generated.tips.email')}</li>
                <li>• {t('generated.tips.slack')}</li>
                <li>• {t('generated.tips.linkedin')}</li>
              </ul>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
              <Sparkles className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-600 mb-2">
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
