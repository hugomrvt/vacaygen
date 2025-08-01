
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, MapPin, User, Mail, Briefcase } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface FormData {
  startDate: string;
  endDate: string;
  reason: string;
  coverage: string;
  tone: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  emergencyContact: string;
  returnDate: string;
  location: string;
  additionalInfo: string;
}

interface FormInputsProps {
  step: number;
  formData: FormData;
  onInputChange: (field: string, value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const FormInputs: React.FC<FormInputsProps> = ({ step, formData, onInputChange, onNext, onPrevious }) => {
  const { t } = useTranslation();

  if (step === 1) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              {t('form.startDate')}
            </Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => onInputChange('startDate', e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endDate" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              {t('form.endDate')}
            </Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => onInputChange('endDate', e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">{t('form.reason')}</Label>
          <Textarea
            id="reason"
            placeholder={t('form.reasonPlaceholder')}
            value={formData.reason}
            onChange={(e) => onInputChange('reason', e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={onNext} className="min-w-[120px]">
            {t('form.next')}
          </Button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>{t('form.coverage')}</Label>
          <Textarea
            placeholder={t('form.coveragePlaceholder')}
            value={formData.coverage}
            onChange={(e) => onInputChange('coverage', e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label>{t('form.tone')}</Label>
          <Select value={formData.tone} onValueChange={(value) => onInputChange('tone', value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('form.selectTone')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">{t('form.tones.professional')}</SelectItem>
              <SelectItem value="casual">{t('form.tones.casual')}</SelectItem>
              <SelectItem value="friendly">{t('form.tones.friendly')}</SelectItem>
              <SelectItem value="formal">{t('form.tones.formal')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrevious}>
            {t('form.previous')}
          </Button>
          <Button onClick={onNext}>
            {t('form.next')}
          </Button>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {t('form.name')}
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => onInputChange('name', e.target.value)}
              placeholder={t('form.namePlaceholder')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              {t('form.position')}
            </Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => onInputChange('position', e.target.value)}
              placeholder={t('form.positionPlaceholder')}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {t('form.email')}
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => onInputChange('email', e.target.value)}
              placeholder={t('form.emailPlaceholder')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">{t('form.company')}</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => onInputChange('company', e.target.value)}
              placeholder={t('form.companyPlaceholder')}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {t('form.location')}
          </Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => onInputChange('location', e.target.value)}
            placeholder={t('form.locationPlaceholder')}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrevious}>
            {t('form.previous')}
          </Button>
          <Button onClick={onNext}>
            {t('form.finish')}
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default FormInputs;
