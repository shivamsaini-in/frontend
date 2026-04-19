import { Skeleton } from '@/components/ui/skeleton';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  isLoading?: boolean;
  className?: string;
  accent?: 'primary' | 'accent' | 'success' | 'destructive';
}

const accentMap = {
  primary:     { bg: 'bg-primary/10',     icon: 'text-primary',     glow: 'glow-primary' },
  accent:      { bg: 'bg-accent/10',      icon: 'text-accent',      glow: 'glow-accent'  },
  success:     { bg: 'bg-emerald-500/10', icon: 'text-emerald-400', glow: ''             },
  destructive: { bg: 'bg-destructive/10', icon: 'text-destructive',  glow: ''             },
};

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  isLoading,
  className,
  accent = 'primary',
}: StatCardProps) {
  const colors = accentMap[accent];

  return (
    <div
      className={cn(
        'glass-card rounded-2xl p-5 flex flex-col gap-4',
        'transition-all duration-200 hover:border-border',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </p>
        <div
          className={cn(
            'h-8 w-8 rounded-xl flex items-center justify-center shrink-0',
            colors.bg,
            colors.glow
          )}
        >
          <Icon className={cn('h-4 w-4', colors.icon)} />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-8 w-20 bg-white/5" />
          {description && <Skeleton className="h-3 w-28 bg-white/5" />}
        </div>
      ) : (
        <div>
          <p className="text-3xl font-semibold tracking-tight">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}
    </div>
  );
}