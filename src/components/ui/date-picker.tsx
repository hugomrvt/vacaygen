import * as React from "react"
import { format } from "date-fns"
import { fr, enUS } from 'date-fns/locale'
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  date?: Date
  onDateChange: (date: Date | undefined) => void
  placeholder?: string
  language?: string
  disabled?: (date: Date) => boolean
}

export function DatePicker({ date, onDateChange, placeholder, language = 'fr', disabled }: DatePickerProps) {
  const locale = language === 'fr' ? fr : enUS

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale }) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          disabled={disabled}
          initialFocus
          className={cn("p-3 pointer-events-auto")}
        />
      </PopoverContent>
    </Popover>
  )
}