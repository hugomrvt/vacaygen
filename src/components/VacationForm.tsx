
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarDays, MapPin, Activity, Users, UserCheck } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useFormValidation } from '@/hooks/useFormValidation';
import FormProgress from './FormProgress';
import FieldHelper from './FieldHelper';

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
  const validation = useFormValidation(formData);
  
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
    <div className="space-y-6">
      <FormProgress 
        completionRate={validation.completionRate}
        requiredFields={validation.requiredFields}
        errors={validation.errors}
      />
      
      <Card className="w-full shadow-lg border border-gray-200 bg-white hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-gray-800">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
              <span className="text-xl">📝</span>
            </div>
            <div>
              <div className="text-lg font-bold">{t('form.title')}</div>
              <div className="text-sm font-normal text-gray-600 mt-1">Remplissez vos infos de vacances</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Dates */}
          <div className="space-y-4 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
            <Label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white">
                <CalendarDays className="h-4 w-4" />
              </div>
              <span>{t('form.dates')}</span>
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date" className="text-xs text-gray-600 font-medium">
                  🚀 {t('form.dates.from')}
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className={`border-gray-200 transition-all duration-200 ${
                    validation.errors.startDate ? 'border-red-300 ring-2 ring-red-100' :
                    validation.requiredFields.startDate ? 'border-green-300 ring-2 ring-green-100' :
                    'hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                  }`}
                />
                <FieldHelper 
                  fieldName="startDate"
                  value={formData.startDate}
                  error={validation.errors.startDate}
                  isValid={validation.requiredFields.startDate}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date" className="text-xs text-gray-600 font-medium">
                  🏁 {t('form.dates.to')}
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className={`border-gray-200 transition-all duration-200 ${
                    validation.errors.endDate ? 'border-red-300 ring-2 ring-red-100' :
                    validation.requiredFields.endDate ? 'border-green-300 ring-2 ring-green-100' :
                    'hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                  }`}
                />
                <FieldHelper 
                  fieldName="endDate"
                  value={formData.endDate}
                  error={validation.errors.endDate}
                  isValid={validation.requiredFields.endDate}
                />
              </div>
            </div>
          </div>

          {/* Destination */}
          <div className="space-y-3 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
            <Label htmlFor="destination" className="flex items-center gap-3 text-sm font-semibold text-gray-700">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white">
                <MapPin className="h-4 w-4" />
              </div>
              <span>{t('form.destination')}</span>
            </Label>
            <Input
              id="destination"
              placeholder={t('form.destination.placeholder')}
              value={formData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              className={`border-gray-200 transition-all duration-200 ${
                validation.errors.destination ? 'border-red-300 ring-2 ring-red-100' :
                validation.requiredFields.destination ? 'border-green-300 ring-2 ring-green-100' :
                'hover:border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
              }`}
            />
            <FieldHelper 
              fieldName="destination"
              value={formData.destination}
              error={validation.errors.destination}
              isValid={validation.requiredFields.destination}
              helpText="💡 Soyez précis : ville, pays ou région"
            />
          </div>

          {/* Activity */}
          <div className="space-y-3 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
            <Label htmlFor="activity" className="flex items-center gap-3 text-sm font-semibold text-gray-700">
              <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg text-white">
                <Activity className="h-4 w-4" />
              </div>
              <span>{t('form.activity')}</span>
            </Label>
            <Input
              id="activity"
              placeholder={t('form.activity.placeholder')}
              value={formData.activity}
              onChange={(e) => handleInputChange('activity', e.target.value)}
              className="border-gray-200 hover:border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
            />
            <FieldHelper 
              fieldName="activity"
              value={formData.activity}
              isValid={formData.activity.trim().length > 0}
              helpText="✨ Optionnel : personnalise votre message"
            />
          </div>

          {/* Recipients */}
          <div className="space-y-4 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
            <Label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg text-white">
                <Users className="h-4 w-4" />
              </div>
              <span>{t('form.recipients')}</span>
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'team', label: t('form.recipients.team'), value: 'team', emoji: '👨‍💼' },
                { id: 'clients', label: t('form.recipients.clients'), value: 'clients', emoji: '🤝' },
                { id: 'management', label: t('form.recipients.management'), value: 'management', emoji: '👔' },
                { id: 'partners', label: t('form.recipients.partners'), value: 'partners', emoji: '🌟' }
              ].map((recipient) => (
                <div key={recipient.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all duration-200">
                  <Checkbox
                    id={recipient.id}
                    checked={formData.recipients.includes(recipient.value)}
                    onCheckedChange={(checked) => 
                      handleRecipientsChange(recipient.value, checked as boolean)
                    }
                    className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                  <Label 
                    htmlFor={recipient.id} 
                    className="text-sm font-medium cursor-pointer flex items-center gap-2 flex-1"
                  >
                    <span>{recipient.emoji}</span>
                    {recipient.label}
                  </Label>
                </div>
              ))}
            </div>
            <FieldHelper 
              fieldName="recipients"
              value={formData.recipients}
              error={validation.errors.recipients}
              isValid={validation.requiredFields.recipients}
            />
          </div>

          {/* Backup Contact */}
          <div className="space-y-3 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
            <Label htmlFor="backup" className="flex items-center gap-3 text-sm font-semibold text-gray-700">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg text-white">
                <UserCheck className="h-4 w-4" />
              </div>
              <span>{t('form.backup')}</span>
            </Label>
            <Input
              id="backup"
              placeholder={t('form.backup.placeholder')}
              value={formData.backupContact}
              onChange={(e) => handleInputChange('backupContact', e.target.value)}
              className="border-gray-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
            />
            <FieldHelper 
              fieldName="backup"
              value={formData.backupContact}
              isValid={formData.backupContact.trim().length > 0}
              helpText="🆘 Optionnel : nom ou service de contact"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VacationForm;
