
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarDays, MapPin, Activity, UserCheck } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import TogglePills from './TogglePills';
import AnimatedPlaceholder from './AnimatedPlaceholder';

interface ModernVacationFormProps {
  formData: {
    startDate: string;
    endDate: string;
    destination: string;
    activity: string;
    recipients: string[];
    backupContact: string;
  };
  setFormData: (data: any) => void;
  currentStep: number;
}

const ModernVacationForm = ({ formData, setFormData, currentStep }: ModernVacationFormProps) => {
  const { t } = useTranslation();
  
  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRecipientsToggle = (recipient: string) => {
    const updatedRecipients = formData.recipients.includes(recipient)
      ? formData.recipients.filter(r => r !== recipient)
      : [...formData.recipients, recipient];
    setFormData({ ...formData, recipients: updatedRecipients });
  };

  const recipientOptions = [
    { 
      id: 'team', 
      label: t('form.recipients.team'), 
      icon: '👥', 
      color: 'from-blue-500 to-blue-600' 
    },
    { 
      id: 'clients', 
      label: t('form.recipients.clients'), 
      icon: '🤝', 
      color: 'from-purple-500 to-purple-600' 
    },
    { 
      id: 'management', 
      label: t('form.recipients.management'), 
      icon: '👔', 
      color: 'from-green-500 to-green-600' 
    },
    { 
      id: 'partners', 
      label: t('form.recipients.partners'), 
      icon: '🌐', 
      color: 'from-orange-500 to-orange-600' 
    }
  ];

  const destinationPlaceholders = [
    "Thaïlande 🏝️",
    "Bretagne 🌊", 
    "Chez mes parents 🏠",
    "Montagne 🏔️",
    "New York 🗽"
  ];

  const activityPlaceholders = [
    "Plage et farniente 🏖️",
    "Randonnée en montagne 🥾", 
    "Visite familiale 👨‍👩‍👧‍👦",
    "Road trip 🚗",
    "Yoga et détente 🧘‍♀️"
  ];

  return (
    <div className="space-y-6">
      {/* Étape 1: Dates et Destination */}
      {currentStep >= 1 && (
        <Card className={`transition-all duration-500 ${
          currentStep === 1 ? 'ring-2 ring-blue-500 shadow-xl' : ''
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-800">
                📅 Quand pars-tu ?
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="start-date" className="text-sm font-medium text-gray-700">
                  Du
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="end-date" className="text-sm font-medium text-gray-700">
                  Au
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MapPin className="h-4 w-4 text-orange-500" />
                Destination
              </Label>
              <Input
                id="destination"
                placeholder=""
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              <div className="text-xs text-gray-500 ml-1">
                ex: <AnimatedPlaceholder placeholders={destinationPlaceholders} />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Label htmlFor="activity" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Activity className="h-4 w-4 text-green-500" />
                Activité principale (optionnel)
              </Label>
              <Input
                id="activity"
                placeholder=""
                value={formData.activity}
                onChange={(e) => handleInputChange('activity', e.target.value)}
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              <div className="text-xs text-gray-500 ml-1">
                ex: <AnimatedPlaceholder placeholders={activityPlaceholders} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Étape 2: Destinataires et Contact */}
      {currentStep >= 2 && (
        <Card className={`transition-all duration-500 ${
          currentStep === 2 ? 'ring-2 ring-blue-500 shadow-xl' : ''
        }`}>
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                👥 Pour qui ?
              </h3>
              
              <TogglePills
                options={recipientOptions}
                selectedOptions={formData.recipients}
                onToggle={handleRecipientsToggle}
              />

              <div className="mt-6 space-y-2">
                <Label htmlFor="backup" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <UserCheck className="h-4 w-4 text-indigo-500" />
                  Contact de substitution (optionnel)
                </Label>
                <Input
                  id="backup"
                  placeholder="ex: Marie Dupont, Service Client..."
                  value={formData.backupContact}
                  onChange={(e) => handleInputChange('backupContact', e.target.value)}
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ModernVacationForm;
