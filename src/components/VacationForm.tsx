
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarDays, MapPin, Activity, Users, UserCheck } from 'lucide-react';

interface VacationFormProps {
  formData: {
    startDate: string;
    endDate: string;
    destination: string;
    activity: string;
    recipients: string[];
    backupContact: string;
  };
  setFormData: (data: any) => void;
}

const VacationForm = ({ formData, setFormData }: VacationFormProps) => {
  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRecipientsChange = (recipient: string, checked: boolean) => {
    const updatedRecipients = checked 
      ? [...formData.recipients, recipient]
      : formData.recipients.filter(r => r !== recipient);
    setFormData({ ...formData, recipients: updatedRecipients });
  };

  return (
    <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <span className="text-2xl">📝</span>
          Votre Message
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dates */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <CalendarDays className="h-4 w-4 text-blue-600" />
            Dates de vacances
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="start-date" className="text-xs text-gray-600">Du</Label>
              <Input
                id="start-date"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="end-date" className="text-xs text-gray-600">Au</Label>
              <Input
                id="end-date"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <Label htmlFor="destination" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <MapPin className="h-4 w-4 text-orange-500" />
            Destination
          </Label>
          <Input
            id="destination"
            placeholder="ex: Thaïlande, Bretagne, chez mes parents..."
            value={formData.destination}
            onChange={(e) => handleInputChange('destination', e.target.value)}
            className="border-gray-200 focus:border-blue-500"
          />
        </div>

        {/* Activity */}
        <div className="space-y-2">
          <Label htmlFor="activity" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Activity className="h-4 w-4 text-green-500" />
            Activité principale (optionnel)
          </Label>
          <Input
            id="activity"
            placeholder="ex: plage et farniente, randonnée, visite familiale..."
            value={formData.activity}
            onChange={(e) => handleInputChange('activity', e.target.value)}
            className="border-gray-200 focus:border-blue-500"
          />
        </div>

        {/* Recipients */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Users className="h-4 w-4 text-purple-500" />
            Destinataires
          </Label>
          <div className="space-y-2">
            {[
              { id: 'team', label: 'Mon équipe', value: 'team' },
              { id: 'clients', label: 'Mes clients', value: 'clients' },
              { id: 'management', label: 'Ma hiérarchie', value: 'management' },
              { id: 'partners', label: 'Partenaires externes', value: 'partners' }
            ].map((recipient) => (
              <div key={recipient.id} className="flex items-center space-x-2">
                <Checkbox
                  id={recipient.id}
                  checked={formData.recipients.includes(recipient.value)}
                  onCheckedChange={(checked) => 
                    handleRecipientsChange(recipient.value, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={recipient.id} 
                  className="text-sm font-normal cursor-pointer"
                >
                  {recipient.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Backup Contact */}
        <div className="space-y-2">
          <Label htmlFor="backup" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <UserCheck className="h-4 w-4 text-indigo-500" />
            Contact de substitution (optionnel)
          </Label>
          <Input
            id="backup"
            placeholder="ex: Marie Dupont, Service Client..."
            value={formData.backupContact}
            onChange={(e) => handleInputChange('backupContact', e.target.value)}
            className="border-gray-200 focus:border-blue-500"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default VacationForm;
