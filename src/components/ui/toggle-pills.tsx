import * as React from "react"
import { cn } from "@/lib/utils"

interface TogglePill {
  id: string
  label: string
}

interface TogglePillsProps {
  options: TogglePill[]
  selectedValues: string[]
  onToggle: (value: string) => void
  className?: string
}

export function TogglePills({ options, selectedValues, onToggle, className }: TogglePillsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.id)
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onToggle(option.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              "border border-border hover:border-primary/50",
              isSelected
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground hover:bg-accent"
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}