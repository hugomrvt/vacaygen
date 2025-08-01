import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TogglePills } from '@/components/ui/toggle-pills';
import { formatDateToISO, isValidDateRange } from '@/lib/dateUtils';
import { useTranslation } from '@/hooks/useTranslation';
import { UseVacationFormReturn } from '@/hooks/useVacationForm';
import AnimatedPlaceholder from '../AnimatedPlaceholder';

interface VacationFormProps {
  form: UseVacationFormReturn;
  currentStep: number;
}

export function VacationForm({ form, currentStep }: VacationFormProps) {
  const { t, language, tArray } = useTranslation();
  const { formData, updateField, toggleRecipient } = form;

  const recipientOptions = [
    { id: 'team', label: t('form.recipients.team') },
    { id: 'clients', label: t('form.recipients.clients') },
    { id: 'management', label: t('form.recipients.management') },
    { id: 'partners', label: t('form.recipients.partners') }
  ];

  const handleDateChange = (field: 'startDate' | 'endDate', date: Date | undefined) => {
    updateField(field, formatDateToISO(date));
  };

  if (currentStep === 1) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-xl">
            {t('step.basic.title')}
          </CardTitle>
          <CardDescription>
            {t('form.dates')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Date Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('form.dates.from')}</Label>
              <DatePicker
                date={formData.startDate ? new Date(formData.startDate) : undefined}
                onDateChange={(date) => handleDateChange('startDate', date)}
                placeholder={t('form.dates.selectStart')}
                language={language}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('form.dates.to')}</Label>
              <DatePicker
                date={formData.endDate ? new Date(formData.endDate) : undefined}
                onDateChange={(date) => handleDateChange('endDate', date)}
                placeholder={t('form.dates.selectEnd')}
                language={language}
                disabled={(date) => formData.startDate ? date < new Date(formData.startDate) : false}
              />
              {formData.startDate && formData.endDate && !isValidDateRange(formData.startDate, formData.endDate) && (
                <p className="text-destructive text-sm">
                  La date de fin doit être après la date de début
                </p>
              )}
            </div>
          </div>

          {/* Destination */}
          <div className="space-y-2">
            <Label htmlFor="destination">{t('form.destination')}</Label>
            <div className="relative">
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) => updateField('destination', e.target.value)}
                placeholder={t('form.destination.placeholder')}
                className="w-full"
              />
              <AnimatedPlaceholder
                examples={tArray('form.destination.examples')}
                prefix={t('form.example')}
              />
            </div>
          </div>

          {/* Activity */}
          <div className="space-y-2">
            <Label htmlFor="activity">{t('form.activity')}</Label>
            <div className="relative">
              <Input
                id="activity"
                value={formData.activity}
                onChange={(e) => updateField('activity', e.target.value)}
                placeholder={t('form.activity.placeholder')}
                className="w-full"
              />
              <AnimatedPlaceholder
                examples={tArray('form.activity.examples')}
                prefix={t('form.example')}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (currentStep === 2) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-xl">
            {t('step.recipients.title')}
          </CardTitle>
          <CardDescription>
            {t('form.recipients.question')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recipients */}
          <div className="space-y-3">
            <Label>{t('form.recipients')}</Label>
            <TogglePills
              options={recipientOptions}
              selectedValues={formData.recipients}
              onToggle={toggleRecipient}
            />
          </div>

          {/* Backup Contact */}
          <div className="space-y-2">
            <Label htmlFor="backup">{t('form.backup')}</Label>
            <Input
              id="backup"
              value={formData.backupContact}
              onChange={(e) => updateField('backupContact', e.target.value)}
              placeholder={t('form.backup.placeholder')}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}