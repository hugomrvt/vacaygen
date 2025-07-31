
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarDays, MapPin, Activity, Users, UserCheck, Sparkles } from 'lucide-react';
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
    <Card className="w-full shadow-xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
      <CardHeader className="pb-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-orange-400/20 rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
        <CardTitle className="flex items-center gap-3 text-gray-800 relative z-10">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
            <span className="text-2xl">📝</span>
          </div>
          <div>
            <div className="text-xl font-bold">{t('form.title')}</div>
            <div className="text-sm font-normal text-gray-600 mt-1">✨ Remplissez vos infos de vacances</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dates */}
        <div className="space-y-4 p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl border border-blue-100/50 hover:border-blue-200 transition-colors duration-200">
          <Label className="flex items-center gap-3 text-sm font-bold text-gray-700">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white shadow-md">
              <CalendarDays className="h-4 w-4" />
            </div>
            <div>
              <div>{t('form.dates')}</div>
              <div className="text-xs font-normal text-gray-500">📅 Quand partez-vous ?</div>
            </div>
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-xs text-gray-600 font-semibold flex items-center gap-1">
                <span className="text-green-500">🚀</span>
                {t('form.dates.from')}
              </Label>
              <Input
                id="start-date"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 hover:border-blue-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date" className="text-xs text-gray-600 font-semibold flex items-center gap-1">
                <span className="text-orange-500">🏁</span>
                {t('form.dates.to')}
              </Label>
              <Input
                id="end-date"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 hover:border-blue-300"
              />
            </div>
          </div>
        </div>

        {/* Destination */}
        <div className="space-y-3 p-4 bg-gradient-to-r from-orange-50/50 to-yellow-50/50 rounded-xl border border-orange-100/50 hover:border-orange-200 transition-colors duration-200">
          <Label htmlFor="destination" className="flex items-center gap-3 text-sm font-bold text-gray-700">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white shadow-md">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <div>{t('form.destination')}</div>
              <div className="text-xs font-normal text-gray-500">🌍 Votre destination de rêve</div>
            </div>
          </Label>
          <Input
            id="destination"
            placeholder={t('form.destination.placeholder')}
            value={formData.destination}
            onChange={(e) => handleInputChange('destination', e.target.value)}
            className="border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 hover:border-orange-300"
          />
        </div>

        {/* Activity */}
        <div className="space-y-3 p-4 bg-gradient-to-r from-green-50/50 to-emerald-50/50 rounded-xl border border-green-100/50 hover:border-green-200 transition-colors duration-200">
          <Label htmlFor="activity" className="flex items-center gap-3 text-sm font-bold text-gray-700">
            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg text-white shadow-md">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <div>{t('form.activity')}</div>
              <div className="text-xs font-normal text-gray-500">🏖️ Qu'allez-vous faire ?</div>
            </div>
          </Label>
          <Input
            id="activity"
            placeholder={t('form.activity.placeholder')}
            value={formData.activity}
            onChange={(e) => handleInputChange('activity', e.target.value)}
            className="border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 hover:border-green-300"
          />
        </div>

        {/* Recipients */}
        <div className="space-y-4 p-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-xl border border-purple-100/50 hover:border-purple-200 transition-colors duration-200">
          <Label className="flex items-center gap-3 text-sm font-bold text-gray-700">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg text-white shadow-md">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <div>{t('form.recipients')}</div>
              <div className="text-xs font-normal text-gray-500">👥 Qui va recevoir votre message ?</div>
            </div>
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'team', label: t('form.recipients.team'), value: 'team', emoji: '👨‍💼' },
              { id: 'clients', label: t('form.recipients.clients'), value: 'clients', emoji: '🤝' },
              { id: 'management', label: t('form.recipients.management'), value: 'management', emoji: '👔' },
              { id: 'partners', label: t('form.recipients.partners'), value: 'partners', emoji: '🌟' }
            ].map((recipient) => (
              <div key={recipient.id} className="flex items-center space-x-3 p-3 bg-white/70 rounded-lg border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all duration-200">
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
        </div>

        {/* Backup Contact */}
        <div className="space-y-3 p-4 bg-gradient-to-r from-indigo-50/50 to-blue-50/50 rounded-xl border border-indigo-100/50 hover:border-indigo-200 transition-colors duration-200">
          <Label htmlFor="backup" className="flex items-center gap-3 text-sm font-bold text-gray-700">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg text-white shadow-md">
              <UserCheck className="h-4 w-4" />
            </div>
            <div>
              <div>{t('form.backup')}</div>
              <div className="text-xs font-normal text-gray-500">🆘 Contact de secours</div>
            </div>
          </Label>
          <Input
            id="backup"
            placeholder={t('form.backup.placeholder')}
            value={formData.backupContact}
            onChange={(e) => handleInputChange('backupContact', e.target.value)}
            className="border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 hover:border-indigo-300"
          />
        </div>

        {/* Fun tip */}
        <div className="p-4 bg-gradient-to-r from-yellow-100/80 to-orange-100/80 rounded-xl border border-yellow-200 text-center">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-700">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span>💡 Plus vous renseignez d'infos, plus votre message sera personnalisé !</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VacationForm;
