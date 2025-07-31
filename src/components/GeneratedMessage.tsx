
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, RefreshCw, Sparkles, Check, Share, Download, Edit, Zap, Heart, Star } from 'lucide-react';
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
    <Card className="w-full shadow-xl border-0 bg-gradient-to-br from-white via-green-50/20 to-blue-50/20 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full -translate-y-12 translate-x-12"></div>
        <CardTitle className="flex items-center justify-between text-gray-800 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg shadow-lg">
              <span className="text-2xl">✨</span>
            </div>
            <div>
              <div className="text-xl font-bold">{t('generated.title')}</div>
              <div className="text-sm font-normal text-gray-600 mt-1">🚀 Votre message personnalisé</div>
            </div>
          </div>
          {message && (
            <div className="flex gap-2 text-xs">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-semibold animate-pulse">
                📝 {wordCount} {t('generated.words')}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-semibold">
                🔤 {charCount} {t('generated.characters')}
              </Badge>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isGenerating ? (
          <div className="text-center py-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-purple-100/30 rounded-lg"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full mb-6 shadow-xl">
                <RefreshCw className="h-10 w-10 text-white animate-spin" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                {t('generated.generating')}
                <Sparkles className="h-5 w-5 text-purple-500" />
              </h3>
              <p className="text-gray-600 mb-6 font-medium">
                {t('generated.generating.subtitle')} 🧠✨
              </p>
              <div className="flex justify-center">
                <div className="flex space-x-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse shadow-md"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : message ? (
          <>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl p-6 border-2 border-gray-100 hover:border-blue-200 transition-colors duration-200 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Star className="h-4 w-4 text-yellow-400 animate-pulse" />
              </div>
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
                {message}
              </pre>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={() => handleCopy('text')} 
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
              >
                {copied && copyFormat === 'text' ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    <span>🎉 {t('generated.copied')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    <span>📋 {t('generated.copy')}</span>
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={onRegenerate}
                className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold hover:border-blue-400 transition-all duration-200"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                <span>🔄 {t('generated.regenerate')}</span>
              </Button>
            </div>

            {/* Format Options */}
            <div className="border-t-2 border-gray-100 pt-6">
              <p className="text-sm text-gray-600 mb-3 font-bold flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                {t('generated.format.title')}
              </p>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy('html')}
                  className="text-sm font-semibold hover:bg-orange-50 hover:text-orange-700 transition-all duration-200"
                >
                  {copied && copyFormat === 'html' ? (
                    <>✅ {t('generated.format.html')}</>
                  ) : (
                    <>🔗 {t('generated.format.html')}</>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy('markdown')}
                  className="text-sm font-semibold hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                >
                  {copied && copyFormat === 'markdown' ? (
                    <>✅ {t('generated.format.markdown')}</>
                  ) : (
                    <>📝 {t('generated.format.markdown')}</>
                  )}
                </Button>
              </div>
            </div>

            {/* Usage Tips */}
            <div className="bg-gradient-to-r from-blue-100/80 via-purple-100/60 to-orange-100/80 rounded-xl p-4 border-2 border-blue-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="relative z-10">
                <p className="text-sm text-gray-700 mb-3 font-bold flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <strong>{t('generated.tips.title')}</strong>
                </p>
                <ul className="text-sm text-gray-700 space-y-2 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">📧</span>
                    {t('generated.tips.email')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">💬</span>
                    {t('generated.tips.slack')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">💼</span>
                    {t('generated.tips.linkedin')}
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-gray-500 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-blue-50/30 rounded-lg"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mb-6 shadow-lg">
                <Sparkles className="h-10 w-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-3 flex items-center justify-center gap-2">
                <span>🎯</span>
                {t('generated.waiting.title')}
                <span>🎯</span>
              </h3>
              <p className="text-gray-500 font-medium">
                {t('generated.waiting.subtitle')} 🚀
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GeneratedMessage;
