# Design Document - Générateur de GIFs Personnalisés

## Overview

Le générateur de GIFs personnalisés étend VacayGen avec une fonctionnalité de création d'animations visuelles personnalisées. Le système utilise des bibliothèques JavaScript côté client pour générer des GIFs en temps réel, en combinant des éléments visuels prédéfinis avec les données utilisateur (destination, activité, style).

## Architecture

### Composants Principaux

```
GifGenerator/
├── GifGeneratorButton.tsx      # Bouton d'activation
├── GifPreview.tsx             # Prévisualisation du GIF
├── GifCustomizer.tsx          # Options de personnalisation
├── GifDownloader.tsx          # Interface de téléchargement
└── hooks/
    ├── useGifGenerator.tsx    # Logique de génération
    ├── useGifAssets.tsx       # Gestion des assets visuels
    └── useGifExport.tsx       # Export et optimisation
```

### Bibliothèques Techniques

- **gif.js** : Génération de GIFs côté client
- **Fabric.js** : Manipulation de canvas et animations
- **Lottie-web** : Animations vectorielles (optionnel)
- **Canvas API** : Rendu des éléments visuels

## Components and Interfaces

### 1. GifGeneratorButton Component

```typescript
interface GifGeneratorButtonProps {
  vacationData: VacationData;
  selectedStyle: string;
  onGifGenerated: (gifBlob: Blob) => void;
  disabled?: boolean;
}
```

**Responsabilités :**
- Afficher le bouton "Générer un GIF" après la génération du message
- Déclencher le processus de génération
- Gérer les états de chargement

### 2. GifPreview Component

```typescript
interface GifPreviewProps {
  gifBlob: Blob | null;
  isGenerating: boolean;
  onRegenerate: () => void;
  onCustomize: () => void;
}
```

**Responsabilités :**
- Afficher l'aperçu du GIF généré
- Contrôles de lecture/pause
- Boutons d'action (régénérer, personnaliser, télécharger)

### 3. GifCustomizer Component

```typescript
interface GifCustomizerProps {
  currentSettings: GifSettings;
  onSettingsChange: (settings: GifSettings) => void;
  onApply: () => void;
}

interface GifSettings {
  size: 'small' | 'medium' | 'large';
  colorPalette: string[];
  animationSpeed: 'subtle' | 'moderate' | 'dynamic';
  includeText: boolean;
  customText?: string;
  backgroundStyle: 'gradient' | 'solid' | 'pattern';
}
```

### 4. useGifGenerator Hook

```typescript
interface UseGifGeneratorReturn {
  generateGif: (data: VacationData, style: string, settings?: GifSettings) => Promise<Blob>;
  isGenerating: boolean;
  progress: number;
  error: string | null;
}
```

## Data Models

### GifAsset Interface

```typescript
interface GifAsset {
  id: string;
  type: 'background' | 'decoration' | 'character' | 'text';
  category: string; // 'beach', 'mountain', 'city', etc.
  frames: CanvasImageSource[];
  duration: number;
  position: { x: number; y: number };
  scale: number;
}
```

### GifTemplate Interface

```typescript
interface GifTemplate {
  id: string;
  name: string;
  style: string; // correspond aux styles de messages
  assets: GifAsset[];
  animations: AnimationSequence[];
  defaultSettings: GifSettings;
}
```

### AnimationSequence Interface

```typescript
interface AnimationSequence {
  assetId: string;
  keyframes: Keyframe[];
  duration: number;
  easing: string;
}

interface Keyframe {
  time: number; // 0-1
  properties: {
    x?: number;
    y?: number;
    scale?: number;
    rotation?: number;
    opacity?: number;
  };
}
```

## Error Handling

### Stratégies de Gestion d'Erreurs

1. **Erreurs de Génération**
   - Timeout après 15 secondes
   - Fallback vers une version simplifiée
   - Messages d'erreur explicites

2. **Erreurs de Ressources**
   - Chargement progressif des assets
   - Assets de fallback intégrés
   - Mode dégradé sans animations complexes

3. **Erreurs de Performance**
   - Détection des appareils low-end
   - Réduction automatique de la qualité
   - Option de désactivation des animations

### Codes d'Erreur

```typescript
enum GifGenerationError {
  TIMEOUT = 'GENERATION_TIMEOUT',
  MEMORY_LIMIT = 'MEMORY_LIMIT_EXCEEDED',
  ASSET_LOADING = 'ASSET_LOADING_FAILED',
  CANVAS_ERROR = 'CANVAS_RENDERING_ERROR',
  EXPORT_ERROR = 'GIF_EXPORT_FAILED'
}
```

## Testing Strategy

### Tests Unitaires
- Génération de GIFs avec différents paramètres
- Validation des assets et templates
- Gestion des erreurs et timeouts

### Tests d'Intégration
- Intégration avec le formulaire VacayGen
- Compatibilité avec différents navigateurs
- Performance sur appareils mobiles

### Tests de Performance
- Temps de génération < 10 secondes
- Taille de fichier < 2MB
- Utilisation mémoire raisonnable

### Tests d'Accessibilité
- Respect des préférences de mouvement réduit
- Contraste suffisant des éléments textuels
- Navigation au clavier

## Architecture Technique Détaillée

### Processus de Génération

1. **Initialisation**
   ```typescript
   // Chargement des assets nécessaires
   const assets = await loadAssetsForDestination(destination);
   const template = getTemplateForStyle(style);
   ```

2. **Composition**
   ```typescript
   // Création du canvas de travail
   const canvas = createCanvas(settings.size);
   const context = canvas.getContext('2d');
   
   // Application des layers
   await renderBackground(context, template.background);
   await renderDecorations(context, assets.decorations);
   await renderText(context, customText, style);
   ```

3. **Animation**
   ```typescript
   // Génération des frames
   const frames = [];
   for (let frame = 0; frame < totalFrames; frame++) {
     const frameCanvas = renderFrame(template, frame);
     frames.push(frameCanvas);
   }
   ```

4. **Export**
   ```typescript
   // Création du GIF final
   const gif = new GIF({
     workers: 2,
     quality: 10,
     width: canvas.width,
     height: canvas.height
   });
   
   frames.forEach(frame => gif.addFrame(frame, { delay: 100 }));
   ```

### Optimisations Performance

- **Lazy Loading** : Chargement des assets à la demande
- **Web Workers** : Génération en arrière-plan
- **Canvas Pooling** : Réutilisation des canvas
- **Compression Intelligente** : Optimisation automatique de la qualité

### Assets et Templates

Les assets seront organisés par catégories :

```
assets/
├── backgrounds/
│   ├── beach/
│   ├── mountain/
│   ├── city/
│   └── abstract/
├── decorations/
│   ├── tropical/
│   ├── winter/
│   ├── business/
│   └── fun/
├── characters/
│   ├── professional/
│   ├── casual/
│   └── creative/
└── fonts/
    ├── professional.woff2
    ├── casual.woff2
    └── creative.woff2
```

### Intégration avec VacayGen

Le générateur s'intègre naturellement dans le flow existant :

1. L'utilisateur génère son message texte
2. Un bouton "Ajouter un GIF" apparaît
3. Le GIF est généré en parallèle
4. L'utilisateur peut télécharger message + GIF

Cette architecture garantit une expérience fluide tout en respectant les principes de VacayGen (privacy-first, performance, accessibilité).