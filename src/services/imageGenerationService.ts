
import { RunwareService } from '@/lib/runware';

export interface GenerateLogoParams {
  style: 'modern' | 'minimalist' | 'playful';
  size: 'favicon' | 'og' | 'large';
}

export const generateVacayGenImages = async (apiKey: string) => {
  const runware = new RunwareService(apiKey);

  try {
    // Générer le logo/favicon
    const faviconPrompt = `Create a modern, clean logo for "VacayGen" - an AI-powered vacation message generator. The logo should feature:
    - Clean, modern typography for "VacayGen"
    - A vacation/travel icon (palm tree, sun, or suitcase)
    - Professional yet friendly design
    - Simple design that works as a favicon
    - Colors: blue and green gradient
    - White or transparent background
    - Square format, high contrast`;

    const favicon = await runware.generateImage({
      positivePrompt: faviconPrompt,
      model: "runware:100@1",
      width: 512,
      height: 512,
      numberResults: 1,
      outputFormat: "PNG"
    });

    // Générer l'image Open Graph (FR)
    const ogPromptFr = `Create a professional social media banner for "VacayGen" in French:
    - Main title: "VacayGen" in large, bold letters
    - Subtitle: "Générateur de Messages de Vacances IA"
    - Modern, professional design with vacation/travel theme
    - Palm tree or vacation icons
    - Blue and green gradient background
    - Clean typography, easy to read
    - 1200x630 format
    - French language context`;

    const ogImageFr = await runware.generateImage({
      positivePrompt: ogPromptFr,
      model: "runware:100@1",
      width: 1200,
      height: 630,
      numberResults: 1,
      outputFormat: "PNG"
    });

    // Générer l'image Open Graph (EN)
    const ogPromptEn = `Create a professional social media banner for "VacayGen" in English:
    - Main title: "VacayGen" in large, bold letters
    - Subtitle: "AI-Powered Vacation Message Generator"
    - Modern, professional design with vacation/travel theme
    - Palm tree or vacation icons
    - Blue and green gradient background
    - Clean typography, easy to read
    - 1200x630 format
    - English language context`;

    const ogImageEn = await runware.generateImage({
      positivePrompt: ogPromptEn,
      model: "runware:100@1",
      width: 1200,
      height: 630,
      numberResults: 1,
      outputFormat: "PNG"
    });

    return {
      favicon: favicon.imageURL,
      ogImageFr: ogImageFr.imageURL,
      ogImageEn: ogImageEn.imageURL
    };

  } catch (error) {
    console.error('Error generating images:', error);
    throw error;
  }
};
