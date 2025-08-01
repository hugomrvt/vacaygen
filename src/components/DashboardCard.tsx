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
  return;
};
export default DashboardCard;