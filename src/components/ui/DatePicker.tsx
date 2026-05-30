import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Brutalist Date Picker Component (Simplified version)
export interface DatePickerProps {
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
  language?: string;
  disabled?: (date: Date) => boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  date,
  onDateChange,
  placeholder = 'Select a date',
  language = 'fr',
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = language === 'fr' ? fr : enUS;

  const handleDateSelect = (day: Date) => {
    if (disabled && disabled(day)) return;
    onDateChange(day);
    setIsOpen(false);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    if (!isOpen) return null;

    const currentDate = date || new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="p-2 border border-border/20 bg-muted/50" />
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = date.toDateString() === currentDate.toDateString();
      const isDisabled = disabled ? disabled(date) : false;
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <button
          key={`day-${day}`}
          onClick={() => !isDisabled && handleDateSelect(date)}
          disabled={isDisabled}
          className={cn(
            'p-2 border border-border/20 text-sm transition-colors',
            isSelected 
              ? 'bg-primary text-primary-foreground font-bold' 
              : isToday 
                ? 'bg-secondary/10 font-medium' 
                : 'hover:bg-muted/50',
            isDisabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {day}
        </button>
      );
    }

    return (
      <div className="absolute z-50 mt-2 p-4 bg-card border-2 border-card-border shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => onDateChange(undefined)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Effacer
          </button>
          <h3 className="font-bold">
            {format(new Date(year, month), 'MMMM yyyy', { locale })}
          </h3>
          <div />
        </div>
        
        <div className="grid grid-cols-7 gap-0 text-xs font-medium mb-2">
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
            <div key={day} className="p-2 text-center text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-0">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left text-sm bg-transparent border-2 border-input flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {date 
          ? format(date, 'PPP', { locale })
          : placeholder}
        <CalendarIcon className="w-4 h-4 text-muted-foreground" />
      </button>
      {renderCalendar()}
    </div>
  );
};

export { DatePicker };
