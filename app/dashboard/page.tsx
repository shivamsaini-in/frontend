'use client';
import { Users, UserCheck, TrendingUp, Star, ArrowUpRight, Smartphone } from 'lucide-react';
import { useDashboardSummary } from '@/app/hooks/useDashboard';
import { useUsers } from '@/app/hooks/useUsers';
import { formatDate } from '@/app/utils/formatDate';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const STATUS_STYLES: Record<string, string> = {
  ACTIVE:    'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  INACTIVE:  'bg-muted text-muted-foreground',
  SUSPENDED: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
};

const PLAN_STYLES: Record<string, string> = {
  FREE:  'bg-white/5 text-muted-foreground',
  PRO:   'bg-primary/15 text-primary',
  ELITE: 'bg-amber-500/15 text-amber-400',
};

function InlineStat({ label, value, icon: Icon, isLoading }: { label: string; value: string | number; icon: React.ElementType; isLoading?: boolean }) {
  return (
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <div className="h-7 w-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
        {isLoading ? <Skeleton className="h-4 w-10 bg-white/5 mt-0.5" /> : <p className="text-sm font-semibold leading-none mt-0.5">{value}</p>}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useDashboardSummary();
  const { data: usersData, isLoading: usersLoading } = useUsers({ page: 1, limit: 10 });
  const recentUsers = usersData?.data ?? [];

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Platform metrics and recent activity</p>
      </div>

      {/* Compact stat bar */}
      <div className="glass-card rounded-2xl px-5 py-4 flex flex-wrap gap-4 divide-x divide-border/40">
        <InlineStat label="Total Users"   value={data?.totalUsers ?? '—'}   icon={Users}      isLoading={isLoading} />
        <div className="pl-4 flex-1 min-w-0"><InlineStat label="Active"        value={data?.activeUsers ?? '—'}   icon={UserCheck}  isLoading={isLoading} /></div>
        <div className="pl-4 flex-1 min-w-0"><InlineStat label="New This Week" value={data?.newLast7Days ?? '—'}  icon={TrendingUp} isLoading={isLoading} /></div>
        <div className="pl-4 flex-1 min-w-0"><InlineStat label="Avg Score"     value={data?.avgScoreToday !== undefined ? `${data.avgScoreToday}/100` : '—'} icon={Star} isLoading={isLoading} /></div>
      </div>

      {/* Users table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-semibold">Recent Users</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Click a row to view analytics</p>
          </div>
          <Link href="/dashboard/users" className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors">
            View all <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_80px_90px_100px_110px] gap-3 px-4 py-2.5 border-b border-border/40 bg-white/2">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">User</span>
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Plan</span>
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Status</span>
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider hidden sm:block">Platform</span>
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider hidden md:block">Joined</span>
          </div>

          {isError ? (
            <div className="py-10 text-center text-muted-foreground text-sm">Failed to load. Check your API connection.</div>
          ) : usersLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="grid grid-cols-[1fr_80px_90px_100px_110px] gap-3 items-center px-4 py-3 border-b border-border/30 last:border-0">
                <div className="flex items-center gap-2.5">
                  <Skeleton className="h-7 w-7 rounded-full bg-white/5 shrink-0" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-24 bg-white/5" />
                    <Skeleton className="h-2.5 w-32 bg-white/5" />
                  </div>
                </div>
                <Skeleton className="h-4 w-12 rounded-full bg-white/5" />
                <Skeleton className="h-4 w-16 rounded-full bg-white/5" />
                <Skeleton className="h-3 w-14 bg-white/5 hidden sm:block" />
                <Skeleton className="h-3 w-16 bg-white/5 hidden md:block" />
              </div>
            ))
          ) : recentUsers.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground text-sm">No users yet.</div>
          ) : (
            recentUsers.map((user) => {
              const initials = user.fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
              return (
                <div
                  key={user._id}
                  onClick={() => router.push(`/dashboard/users/${user._id}`)}
                  className="grid grid-cols-[1fr_80px_90px_100px_110px] gap-3 items-center px-4 py-3 border-b border-border/30 last:border-0 hover:bg-white/3 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Avatar className="h-7 w-7 shrink-0">
                      <AvatarFallback className="text-[10px] font-semibold bg-primary/15 text-primary">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-none truncate">{user.fullName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{user.email}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={cn('text-[10px] px-2 py-0 rounded-full border-0 w-fit', PLAN_STYLES[user.plan])}>
                    {user.plan}
                  </Badge>
                  <Badge variant="outline" className={cn('text-[10px] px-2 py-0 rounded-full w-fit', STATUS_STYLES[user.status])}>
                    {user.status}
                  </Badge>
                  <span className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                    <Smartphone className="h-3 w-3 shrink-0" />
                    {user.platform}
                  </span>
                  <span className="hidden md:block text-xs text-muted-foreground">
                    {formatDate(user.createdAt)}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}