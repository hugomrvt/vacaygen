
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarDays, MapPin, Activity, Users, UserCheck } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

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
  const { t } = useTranslation();
  
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
    <Card className="w-full shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-gray-800">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md">
            <span className="text-xl">📝</span>
          </div>
          <div>
            <div className="text-lg font-bold">{t('form.title')}</div>
            <div className="text-sm font-normal text-gray-600 mt-1">Remplissez vos infos de vacances</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Dates */}
        <div className="space-y-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <Label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <CalendarDays className="h-4 w-4 text-blue-600" />
            {t('form.dates')}
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="start-date" className="text-xs text-gray-600 font-medium">
                {t('form.dates.from')}
              </Label>
              <Input
                id="start-date"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="border-gray-200 focus:border-blue-500 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="end-date" className="text-xs text-gray-600 font-medium">
                {t('form.dates.to')}
              </Label>
              <Input
                id="end-date"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="border-gray-200 focus:border-blue-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <Label htmlFor="destination" className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <MapPin className="h-4 w-4 text-orange-600" />
            {t('form.destination')}
          </Label>
          <Input
            id="destination"
            placeholder={t('form.destination.placeholder')}
            value={formData.destination}
            onChange={(e) => handleInputChange('destination', e.target.value)}
            className="border-gray-200 focus:border-orange-500"
          />
        </div>

        {/* Activity */}
        <div className="space-y-2">
          <Label htmlFor="activity" className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <Activity className="h-4 w-4 text-green-600" />
            {t('form.activity')}
          </Label>
          <Input
            id="activity"
            placeholder={t('form.activity.placeholder')}
            value={formData.activity}
            onChange={(e) => handleInputChange('activity', e.target.value)}
            className="border-gray-200 focus:border-green-500"
          />
        </div>

        {/* Recipients */}
        <div className="space-y-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
          <Label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <Users className="h-4 w-4 text-purple-600" />
            {t('form.recipients')}
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'team', label: t('form.recipients.team'), value: 'team', emoji: '👥' },
              { id: 'clients', label: t('form.recipients.clients'), value: 'clients', emoji: '🤝' },
              { id: 'management', label: t('form.recipients.management'), value: 'management', emoji: '👔' },
              { id: 'partners', label: t('form.recipients.partners'), value: 'partners', emoji: '🌟' }
            ].map((recipient) => (
              <div key={recipient.id} className="flex items-center space-x-2 p-2 bg-white rounded-md">
                <Checkbox
                  id={recipient.id}
                  checked={formData.recipients.includes(recipient.value)}
                  onCheckedChange={(checked) => 
                    handleRecipientsChange(recipient.value, checked as boolean)
                  }
                  className="data-[state=checked]:bg-purple-500"
                />
                <Label 
                  htmlFor={recipient.id} 
                  className="text-sm cursor-pointer flex items-center gap-1"
                >
                  <span className="text-xs">{recipient.emoji}</span>
                  {recipient.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Backup Contact */}
        <div className="space-y-2">
          <Label htmlFor="backup" className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <UserCheck className="h-4 w-4 text-indigo-600" />
            {t('form.backup')}
          </Label>
          <Input
            id="backup"
            placeholder={t('form.backup.placeholder')}
            value={formData.backupContact}
            onChange={(e) => handleInputChange('backupContact', e.target.value)}
            className="border-gray-200 focus:border-indigo-500"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default VacationForm;
