
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  value: string | ReactNode;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

const DashboardCard = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  icon, 
  className,
  children 
}: DashboardCardProps) => {
  return (
    <div className={cn("metric-card group", className)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
          )}
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium rounded-full px-2 py-1",
            trend.isPositive 
              ? "text-success bg-success/10" 
              : "text-destructive bg-destructive/10"
          )}>
            <span>{trend.isPositive ? "↗" : "↘"}</span>
            {trend.value}
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {subtitle && (
          <div className="text-sm text-muted-foreground">{subtitle}</div>
        )}
      </div>
      
      {children}
    </div>
  );
};

export default DashboardCard;
