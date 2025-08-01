import React, { useState } from 'react';
import { Calendar, CalendarIcon, Users, MapPin, Activity, Camera, Utensils, Car, Music, Heart } from 'lucide-react';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import TogglePills from './TogglePills';

interface VacationFormData {
  startDate: string;
  endDate: string;
  destination: string;
  activity: string;
  recipients: string[];
  backupContact: string;
}

interface ModernVacationFormProps {
  formData: VacationFormData;
  setFormData: React.Dispatch<React.SetStateAction<VacationFormData>>;
  currentStep: number;
}

const activityIcons: {
  [key: string]: React.ComponentType<any>;
} = {
  beach: Camera,
  city: MapPin,
  nature: Activity,
  food: Utensils,
  road: Car,
  culture: Music,
  wellness: Heart
};

export default function ModernVacationForm({
  formData,
  setFormData,
  currentStep
}: ModernVacationFormProps) {
  const { t, language } = useTranslation();
  const [dateError, setDateError] = useState<string>('');

  const activityOptions = [
    {
      id: 'beach',
      label: t('form.activity.beach'),
      icon: Camera,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'city',
      label: t('form.activity.city'),
      icon: MapPin,
      color: 'from-gray-400 to-gray-600'
    },
    {
      id: 'nature',
      label: t('form.activity.nature'),
      icon: Activity,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'food',
      label: t('form.activity.food'),
      icon: Utensils,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'road',
      label: t('form.activity.road'),
      icon: Car,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'culture',
      label: t('form.activity.culture'),
      icon: Music,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'wellness',
      label: t('form.activity.wellness'),
      icon: Heart,
      color: 'from-pink-400 to-rose-500'
    }
  ];

  const validateDates = (start: string, end: string) => {
    if (start && end && new Date(end) < new Date(start)) {
      const errorMessage = language === 'fr' ? 'La date de fin ne peut pas être antérieure à la date de début' : 'End date cannot be earlier than start date';
      setDateError(errorMessage);
    } else {
      setDateError('');
    }
  };

  const handleDateChange = (field: 'startDate' | 'endDate', date: Date | undefined) => {
    if (date) {
      const dateString = date.toISOString().split('T')[0];
      const newFormData = {
        ...formData,
        [field]: dateString
      };
      setFormData(newFormData);
      validateDates(field === 'startDate' ? dateString : formData.startDate, field === 'endDate' ? dateString : formData.endDate);
    }
  };

  const handleActivityToggle = (activityId: string) => {
    setFormData(prev => ({
      ...prev,
      activity: activityId
    }));
  };

  const locale = language === 'fr' ? fr : enUS;

  return (
    <div className="space-y-6">
      {/* Step 1: Basic Information */}
      {currentStep >= 1 && (
        <Card className="glass-card border border-border/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              {t('form.dates')}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Start Date */}
              <div className="space-y-2">
                <Label>{t('form.dates.from')}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !formData.startDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? format(new Date(formData.startDate), "PPP", {
                    locale
                  }) : <span>{t('form.dates.selectStart')}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent mode="single" selected={formData.startDate ? new Date(formData.startDate) : undefined} onSelect={date => handleDateChange('startDate', date)} disabled={date => date < new Date()} initialFocus className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <Label>{t('form.dates.to')}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !formData.endDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate ? format(new Date(formData.endDate), "PPP", {
                    locale
                  }) : <span>{t('form.dates.selectEnd')}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent mode="single" selected={formData.endDate ? new Date(formData.endDate) : undefined} onSelect={date => handleDateChange('endDate', date)} disabled={date => date < new Date() || formData.startDate && date < new Date(formData.startDate)} initialFocus className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>

              {dateError && <div className="col-span-full">
                  <p className="text-sm text-destructive">{dateError}</p>
                </div>}
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <Label htmlFor="destination" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {t('form.destination')}
              </Label>
              <Input 
                id="destination" 
                type="text" 
                placeholder={t('form.destination.placeholder')} 
                value={formData.destination} 
                onChange={e => setFormData(prev => ({
                  ...prev,
                  destination: e.target.value
                }))} 
              />
            </div>

            {/* Activity Selection */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                {t('form.activity')}
              </Label>
              <TogglePills
                options={activityOptions}
                selectedOptions={formData.activity ? [formData.activity] : []}
                onToggle={handleActivityToggle}
                multiSelect={false}
              />
            </div>
            
          </CardContent>
        </Card>
      )}

      {/* Step 2: Recipients */}
      {currentStep >= 2 && <Card className="glass-card border border-border/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              {t('step.recipients.title')}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Recipients */}
            <div className="space-y-2">
              <Label htmlFor="recipients">{t('form.recipients')}</Label>
              <Textarea id="recipients" placeholder={t('form.recipients.placeholder')} value={formData.recipients.join(', ')} onChange={e => setFormData(prev => ({
            ...prev,
            recipients: e.target.value.split(',').map(r => r.trim()).filter(r => r)
          }))} rows={3} />
            </div>

            {/* Backup Contact */}
            <div className="space-y-2">
              <Label htmlFor="backupContact">{t('form.backupContact')}</Label>
              <Input id="backupContact" type="text" placeholder={t('form.backupContact.placeholder')} value={formData.backupContact} onChange={e => setFormData(prev => ({
            ...prev,
            backupContact: e.target.value
          }))} />
            </div>
          </CardContent>
        </Card>}
    </div>
  );
}
