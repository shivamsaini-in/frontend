'use client';
import { Users, UserCheck, UserX, Clock, ArrowUpRight } from 'lucide-react';
import { StatCard } from '@/app/components/ui/StatCard';
import { useDashboardSummary } from '@/app/hooks/useDashboard';
import { formatDate } from '@/app/utils/formatDate';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { data, isLoading, isError } = useDashboardSummary();

  return (
    <div className="space-y-8 w-full">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Platform metrics and recent activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Users" value={isLoading ? '—' : (data?.totalUsers ?? 0)} icon={Users} description="All registered accounts" isLoading={isLoading} accent="primary" />
        <StatCard title="Active" value={isLoading ? '—' : (data?.activeUsers ?? 0)} icon={UserCheck} description="Currently active accounts" isLoading={isLoading} accent="success" />
        <StatCard title="Inactive" value={isLoading ? '—' : (data?.inactiveUsers ?? 0)} icon={UserX} description="Disabled or dormant" isLoading={isLoading} accent="destructive" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold">Recent Signups</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Latest registered users</p>
          </div>
          <Link href="/dashboard/users" className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors">
            View all <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden divide-y divide-border/60">
          {isError ? (
            <div className="py-12 text-center text-muted-foreground text-sm">Failed to load. Check your API connection.</div>
          ) : isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <Skeleton className="h-8 w-8 rounded-full bg-white/5 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-28 bg-white/5" />
                  <Skeleton className="h-3 w-40 bg-white/5" />
                </div>
                <Skeleton className="h-5 w-14 rounded-full bg-white/5" />
              </div>
            ))
          ) : data?.recentUsers.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-sm">No recent signups.</div>
          ) : (
            data?.recentUsers.map((user) => {
              const initials = user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
              return (
                <div key={user._id} className={cn('flex items-center gap-4 px-5 py-3.5 hover:bg-white/3 transition-colors')}>
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="text-[10px] font-semibold bg-primary/15 text-primary">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 truncate">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant={user.isActive ? 'default' : 'secondary'} className={cn('text-[10px] px-2 py-0 rounded-full', user.isActive ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' : 'bg-muted text-muted-foreground')}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    <span className="hidden sm:flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="h-3 w-3 shrink-0" />
                      {formatDate(user.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
