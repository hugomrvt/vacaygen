
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { generateVacayGenImages } from '@/services/imageGenerationService';
import { Loader2, Download, Eye } from 'lucide-react';

const SEOImageGenerator = () => {
  const [apiKey, setApiKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<{
    favicon?: string;
    ogImageFr?: string;
    ogImageEn?: string;
  }>({});

  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      toast.error('Veuillez entrer votre clé API Runware');
      return;
    }

    setIsGenerating(true);
    try {
      const images = await generateVacayGenImages(apiKey);
      setGeneratedImages(images);
      
      // Mettre à jour le favicon
      const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (favicon) {
        favicon.href = images.favicon;
      } else {
        const newFavicon = document.createElement('link');
        newFavicon.rel = 'icon';
        newFavicon.href = images.favicon;
        newFavicon.type = 'image/png';
        document.head.appendChild(newFavicon);
      }

      // Mettre à jour les images OG
      const ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
      if (ogImage) {
        ogImage.content = images.ogImageFr;
      }

      const twitterImage = document.querySelector('meta[name="twitter:image"]') as HTMLMetaElement;
      if (twitterImage) {
        twitterImage.content = images.ogImageFr;
      }

      toast.success('Images générées et appliquées avec succès !');
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
      toast.error('Erreur lors de la génération des images');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Générateur d'Images SEO pour VacayGen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Clé API Runware</label>
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Entrez votre clé API Runware"
            className="mt-1"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Obtenez votre clé API sur{' '}
            <a href="https://runware.ai/" target="_blank" className="text-primary hover:underline">
              runware.ai
            </a>
          </p>
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating || !apiKey.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Génération en cours...
            </>
          ) : (
            'Générer les images SEO'
          )}
        </Button>

        {Object.keys(generatedImages).length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Images générées :</h3>
            
            {generatedImages.favicon && (
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Favicon (512x512)</h4>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(generatedImages.favicon, '_blank')}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Voir
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => downloadImage(generatedImages.favicon!, 'vacaygen-favicon.png')}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Télécharger
                    </Button>
                  </div>
                </div>
                <img 
                  src={generatedImages.favicon} 
                  alt="VacayGen Favicon" 
                  className="w-16 h-16 rounded border"
                />
              </div>
            )}

            {generatedImages.ogImageFr && (
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Image OG Français (1200x630)</h4>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(generatedImages.ogImageFr, '_blank')}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Voir
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => downloadImage(generatedImages.ogImageFr!, 'vacaygen-og-fr.png')}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Télécharger
                    </Button>
                  </div>
                </div>
                <img 
                  src={generatedImages.ogImageFr} 
                  alt="VacayGen OG Image FR" 
                  className="w-full max-w-md rounded border"
                />
              </div>
            )}

            {generatedImages.ogImageEn && (
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Image OG Anglais (1200x630)</h4>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(generatedImages.ogImageEn, '_blank')}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Voir
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => downloadImage(generatedImages.ogImageEn!, 'vacaygen-og-en.png')}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Télécharger
                    </Button>
                  </div>
                </div>
                <img 
                  src={generatedImages.ogImageEn} 
                  alt="VacayGen OG Image EN" 
                  className="w-full max-w-md rounded border"
                />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SEOImageGenerator;
