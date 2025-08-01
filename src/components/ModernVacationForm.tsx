
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarDays, MapPin, Activity, UserCheck } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import TogglePills from './TogglePills';
import AnimatedPlaceholder from './AnimatedPlaceholder';
import DashboardCard from './DashboardCard';

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
        <DashboardCard
          title="Informations de Base"
          value=""
          icon={<CalendarDays className="h-4 w-4" />}
          className={currentStep === 1 ? 'ring-2 ring-primary shadow-2xl' : ''}
        >
          <div className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-date" className="text-sm font-medium text-muted-foreground mb-2 block">
                  Du
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="bg-input border-border focus:border-primary focus:ring-primary/20"
                />
              </div>
              <div>
                <Label htmlFor="end-date" className="text-sm font-medium text-muted-foreground mb-2 block">
                  Au
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="bg-input border-border focus:border-primary focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                Destination
              </Label>
              <Input
                id="destination"
                placeholder=""
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                className="bg-input border-border focus:border-primary focus:ring-primary/20"
              />
              <div className="text-xs text-muted-foreground ml-1">
                ex: <AnimatedPlaceholder placeholders={destinationPlaceholders} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="activity" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Activity className="h-4 w-4 text-success" />
                Activité principale (optionnel)
              </Label>
              <Input
                id="activity"
                placeholder=""
                value={formData.activity}
                onChange={(e) => handleInputChange('activity', e.target.value)}
                className="bg-input border-border focus:border-primary focus:ring-primary/20"
              />
              <div className="text-xs text-muted-foreground ml-1">
                ex: <AnimatedPlaceholder placeholders={activityPlaceholders} />
              </div>
            </div>
          </div>
        </DashboardCard>
      )}

      {/* Étape 2: Destinataires et Contact */}
      {currentStep >= 2 && (
        <DashboardCard
          title="Destinataires et Contact"
          value=""
          icon={<UserCheck className="h-4 w-4" />}
          className={currentStep === 2 ? 'ring-2 ring-primary shadow-2xl' : ''}
        >
          <div className="space-y-6 mt-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-4">Pour qui ?</h4>
              <TogglePills
                options={recipientOptions}
                selectedOptions={formData.recipients}
                onToggle={handleRecipientsToggle}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="backup" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <UserCheck className="h-4 w-4 text-chart-3" />
                Contact de substitution (optionnel)
              </Label>
              <Input
                id="backup"
                placeholder="ex: Marie Dupont, Service Client..."
                value={formData.backupContact}
                onChange={(e) => handleInputChange('backupContact', e.target.value)}
                className="bg-input border-border focus:border-primary focus:ring-primary/20"
              />
            </div>
          </div>
        </DashboardCard>
      )}
    </div>
  );
};

export default ModernVacationForm;
