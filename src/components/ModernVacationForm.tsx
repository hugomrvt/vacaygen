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

interface VacationFormData {
  startDate: Date | undefined;
  endDate: Date | undefined;
  destination: string;
  activity: string;
  companions: number;
  budget: string;
  interests: string[];
  additionalInfo: string;
}

const activityIcons: { [key: string]: React.ComponentType<any> } = {
  beach: Camera,
  city: MapPin,
  nature: Activity,
  food: Utensils,
  road: Car,
  culture: Music,
  wellness: Heart,
};

export default function ModernVacationForm() {
  const { t, language } = useTranslation();
  const [formData, setFormData] = useState<VacationFormData>({
    startDate: undefined,
    endDate: undefined,
    destination: '',
    activity: '',
    companions: 1,
    budget: '',
    interests: [],
    additionalInfo: ''
  });

  const [dateError, setDateError] = useState<string>('');

  const activityOptions = [
    { value: 'beach', label: t('form.activity.beach') },
    { value: 'city', label: t('form.activity.city') },
    { value: 'nature', label: t('form.activity.nature') },
    { value: 'food', label: t('form.activity.food') },
    { value: 'road', label: t('form.activity.road') },
    { value: 'culture', label: t('form.activity.culture') },
    { value: 'wellness', label: t('form.activity.wellness') }
  ];

  const budgetOptions = [
    { value: 'low', label: t('form.budget.low') },
    { value: 'medium', label: t('form.budget.medium') },
    { value: 'high', label: t('form.budget.high') },
    { value: 'luxury', label: t('form.budget.luxury') }
  ];

  const interestsOptions = [
    { value: 'monuments', label: t('form.interests.monuments') },
    { value: 'museums', label: t('form.interests.museums') },
    { value: 'restaurants', label: t('form.interests.restaurants') },
    { value: 'nightlife', label: t('form.interests.nightlife') },
    { value: 'shopping', label: t('form.interests.shopping') },
    { value: 'nature', label: t('form.interests.nature') },
    { value: 'beaches', label: t('form.interests.beaches') },
    { value: 'adventure', label: t('form.interests.adventure') }
  ];

  const validateDates = (start: Date | undefined, end: Date | undefined) => {
    if (start && end && end < start) {
      const errorMessage = language === 'fr' 
        ? 'La date de fin ne peut pas être antérieure à la date de début'
        : 'End date cannot be earlier than start date';
      setDateError(errorMessage);
    } else {
      setDateError('');
    }
  };

  const handleDateChange = (field: 'startDate' | 'endDate', date: Date | undefined) => {
    const newFormData = { ...formData, [field]: date };
    setFormData(newFormData);
    validateDates(
      field === 'startDate' ? date : formData.startDate,
      field === 'endDate' ? date : formData.endDate
    );
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dateError) return;
    console.log('Form submitted:', formData);
  };

  const locale = language === 'fr' ? fr : enUS;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <Calendar className="w-6 h-6" />
          {t('form.title')}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dates Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('form.dates')}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Start Date */}
              <div className="space-y-2">
                <Label>{t('form.dates.from')}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? (
                        format(formData.startDate, "PPP", { locale })
                      ) : (
                        <span>{t('form.dates.selectStart')}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) => handleDateChange('startDate', date)}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <Label>{t('form.dates.to')}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate ? (
                        format(formData.endDate, "PPP", { locale })
                      ) : (
                        <span>{t('form.dates.selectEnd')}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={formData.endDate}
                      onSelect={(date) => handleDateChange('endDate', date)}
                      disabled={(date) => date < new Date() || (formData.startDate && date < formData.startDate)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {dateError && (
                <div className="col-span-full">
                  <p className="text-sm text-destructive">{dateError}</p>
                </div>
              )}
            </CardContent>
          </Card>

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
              onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
              required
            />
          </div>

          {/* Activity */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              {t('form.activity')}
            </Label>
            <Select value={formData.activity} onValueChange={(value) => setFormData(prev => ({ ...prev, activity: value }))}>
              <SelectTrigger>
                <SelectValue placeholder={t('form.activity.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {activityOptions.map(option => {
                  const IconComponent = activityIcons[option.value];
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4" />
                        {option.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Companions */}
          <div className="space-y-2">
            <Label htmlFor="companions" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {t('form.companions')}
            </Label>
            <Select value={formData.companions.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, companions: parseInt(value) }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? t('form.companions.person') : t('form.companions.people')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <Label className="text-base font-medium">{t('form.budget')}</Label>
            <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
              <SelectTrigger>
                <SelectValue placeholder={t('form.budget.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {budgetOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <Label className="text-base font-medium">{t('form.interests')}</Label>
            <div className="flex flex-wrap gap-2">
              {interestsOptions.map(interest => (
                <Badge
                  key={interest.value}
                  variant={formData.interests.includes(interest.value) ? "default" : "outline"}
                  className="cursor-pointer transition-colors"
                  onClick={() => toggleInterest(interest.value)}
                >
                  {interest.label}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Additional Info */}
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">{t('form.additionalInfo')}</Label>
            <Textarea
              id="additionalInfo"
              placeholder={t('form.additionalInfo.placeholder')}
              value={formData.additionalInfo}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={!!dateError}>
            {t('form.submit')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
