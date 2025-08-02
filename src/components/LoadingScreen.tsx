import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Bot, Sparkles, Clock, Users, Zap } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Génération automatique",
      description: "Messages de vacances personnalisés en quelques secondes"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Styles adaptés",
      description: "Différents tons selon vos destinataires (famille, collègues, clients)"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Gain de temps",
      description: "Plus besoin de réfléchir, VacayGen s'occupe de tout"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "100% gratuit",
      description: "Aucune inscription requise, utilisez-le immédiatement"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 1250);

    return () => clearInterval(featureInterval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Logo et titre */}
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse">
            <Bot className="h-10 w-10 text-primary" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-display font-bold gradient-text">
              VacayGen
            </h1>
            <p className="text-lg text-muted-foreground">
              Votre assistant pour créer des messages de vacances parfaits
            </p>
          </div>
        </div>

        {/* Fonctionnalités */}
        <div className="bg-card rounded-lg p-6 border shadow-sm min-h-[120px] flex items-center justify-center">
          <div className="space-y-3 animate-fade-in" key={currentFeature}>
            <div className="flex items-center justify-center text-primary">
              {features[currentFeature].icon}
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground">
                {features[currentFeature].title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {features[currentFeature].description}
              </p>
            </div>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Chargement</span>
              <span className="text-sm font-medium text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <p className="text-xs text-muted-foreground">
            Préparation de votre expérience VacayGen...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;