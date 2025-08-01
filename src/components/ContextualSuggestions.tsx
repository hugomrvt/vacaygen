
import React from 'react';
import SuggestionChips from './SuggestionChips';

interface ContextualSuggestionsProps {
  currentStep: string;
  onSuggestionClick: (suggestion: string) => void;
  formData?: any;
}

const ContextualSuggestions = ({ currentStep, onSuggestionClick, formData }: ContextualSuggestionsProps) => {
  const getSuggestions = (step: string): string[] => {
    switch (step) {
      case 'dates':
        return [
          "Du 15 au 30 juillet",
          "Une semaine en août",
          "Pendant les vacances scolaires",
          "Du lundi au vendredi"
        ];
      
      case 'destination':
        return [
          "Thaïlande 🏝️",
          "Bretagne 🌊",
          "Montagne ⛰️",
          "Chez la famille 👨‍👩‍👧‍👦",
          "Paris 🗼",
          "Espagne ☀️"
        ];
      
      case 'activity':
        return [
          "Plage et farniente 🏖️",
          "Randonnée en montagne 🥾",
          "Visite culturelle 🏛️",
          "Temps en famille 👪",
          "Road trip 🚗",
          "Détente absolue 🧘‍♀️"
        ];
      
      case 'backup':
        return [
          "Marie Dupont - Responsable équipe",
          "Service Client",
          "Mon manager direct",
          "Collègue de bureau"
        ];
      
      case 'general':
        return [
          "Comment ça marche ? 🤔",
          "Peux-tu modifier mes réponses ? ✏️",
          "Où en sommes-nous ? 📍",
          "Recommencer depuis le début 🔄"
        ];
      
      default:
        return [
          "Aide-moi à choisir 💡",
          "Donne-moi des exemples 📝",
          "Comment procéder ? 🤝"
        ];
    }
  };

  const suggestions = getSuggestions(currentStep);

  return (
    <div className="mt-4 p-4 bg-muted/20 rounded-lg border border-border/20">
      <SuggestionChips 
        suggestions={suggestions}
        onSuggestionClick={onSuggestionClick}
        currentStep={currentStep}
      />
    </div>
  );
};

export default ContextualSuggestions;
