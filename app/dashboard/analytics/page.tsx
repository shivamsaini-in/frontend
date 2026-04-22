'use client';
import { useDashboardSummary } from '@/app/hooks/useDashboard';
import { useAnalyticsSummary } from '@/app/hooks/useMobileAnalytics';
import { useUsers } from '@/app/hooks/useUsers';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TrendingUp, Users, Clock, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/app/utils/formatDate';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</h2>
      {children}
    </div>
  );
}

function MetricRow({ label, value, sub, isLoading }: { label: string; value: string | number; sub?: string; isLoading?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/40 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      {isLoading ? (
        <Skeleton className="h-4 w-16 bg-white/5" />
      ) : (
        <div className="text-right">
          <span className="text-sm font-semibold">{value}</span>
          {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
        </div>
      )}
    </div>
  );
}

export default function AnalyticsPage() {
  const { data: dash, isLoading: dashLoading } = useDashboardSummary();
  const { data: mobile, isLoading: mobileLoading } = useAnalyticsSummary();
  const { data: usersData, isLoading: usersLoading } = useUsers({ page: 1, limit: 5 });
  const recentUsers = usersData?.data ?? [];

  const activeRate = dash && dash.totalUsers > 0
    ? ((dash.activeUsers / dash.totalUsers) * 100).toFixed(1)
    : '0';
  const avgHours = mobile ? (mobile.avgDailyScreenTimeMinutes / 60).toFixed(1) : '—';

  return (
    <div className="space-y-8 w-full">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Platform and mobile usage statistics</p>
      </div>

      {/* Active rate bar */}
      <div className="glass-card rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Active Rate</span>
          </div>
          {dashLoading ? <Skeleton className="h-6 w-14 bg-white/5" /> : <span className="text-2xl font-semibold">{activeRate}%</span>}
        </div>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: dashLoading ? '0%' : `${activeRate}%` }} />
        </div>
        {!dashLoading && <p className="text-xs text-muted-foreground">{dash?.activeUsers} of {dash?.totalUsers} users are currently active</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="User Distribution">
          <div className="glass-card rounded-2xl px-5 py-1">
            <MetricRow label="Total Users"    value={dash?.totalUsers ?? '—'}   isLoading={dashLoading} />
            <MetricRow label="Active"         value={dash?.activeUsers ?? '—'}  isLoading={dashLoading} />
            <MetricRow label="New This Week"  value={dash?.newLast7Days ?? '—'} isLoading={dashLoading} />
            <MetricRow label="Avg Score Today" value={dash?.avgScoreToday !== undefined ? `${dash.avgScoreToday}/100` : '—'} isLoading={dashLoading} />
          </div>
        </Section>

        <Section title="Mobile Usage">
          <div className="glass-card rounded-2xl px-5 py-1">
            <MetricRow label="Total Records"         value={mobile?.totalRecords ?? '—'}   isLoading={mobileLoading} />
            <MetricRow label="Unique Users"          value={mobile?.uniqueUsers ?? '—'}    isLoading={mobileLoading} />
            <MetricRow label="Avg Daily Screen Time" value={mobileLoading ? '—' : `${avgHours}h`} sub={mobile ? `${mobile.avgDailyScreenTimeMinutes}m` : undefined} isLoading={mobileLoading} />
          </div>
        </Section>
      </div>

      {/* Top apps */}
      <Section title="Top Apps by Usage">
        <div className="glass-card rounded-2xl p-5 space-y-4">
          {mobileLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between">
                  <Skeleton className="h-3.5 w-24 bg-white/5" />
                  <Skeleton className="h-3.5 w-12 bg-white/5" />
                </div>
                <Skeleton className="h-1.5 w-full bg-white/5 rounded-full" />
              </div>
            ))
          ) : !mobile || mobile.topApps.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-6 text-muted-foreground">
              <BarChart2 className="h-7 w-7 opacity-30" />
              <p className="text-sm">No mobile data yet</p>
            </div>
          ) : (
            (() => {
              const max = mobile.topApps[0]?.totalMinutes ?? 1;
              const colors = ['bg-primary','bg-accent','bg-emerald-400','bg-amber-400','bg-sky-400','bg-rose-400','bg-violet-400','bg-teal-400','bg-orange-400','bg-pink-400'];
              return mobile.topApps.map((app, i) => {
                const pct = ((app.totalMinutes / max) * 100).toFixed(1);
                const hrs = Math.floor(app.totalMinutes / 60);
                const mins = Math.round(app.totalMinutes % 60);
                const label = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
                return (
                  <div key={app.appName} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', colors[i % colors.length])} />
                        <span className="font-medium">{app.appName}</span>
                      </div>
                      <span className="text-muted-foreground text-xs">{label}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className={cn('h-full rounded-full transition-all duration-500', colors[i % colors.length])} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              });
            })()
          )}
        </div>
      </Section>

      {/* Recent signups */}
      <Section title="Recent Signups">
        <div className="glass-card rounded-2xl overflow-hidden divide-y divide-border/40">
          {usersLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                <Skeleton className="h-7 w-7 rounded-full bg-white/5 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-28 bg-white/5" />
                  <Skeleton className="h-3 w-40 bg-white/5" />
                </div>
                <Skeleton className="h-3 w-20 bg-white/5" />
              </div>
            ))
          ) : recentUsers.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
              <Users className="h-7 w-7 opacity-30" />
              <p className="text-sm">No recent signups</p>
            </div>
          ) : (
            recentUsers.map((user) => {
              const initials = user.fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
              return (
                <div key={user._id} className="flex items-center gap-3 px-5 py-3 hover:bg-white/3 transition-colors">
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarFallback className="text-[10px] font-semibold bg-primary/15 text-primary">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.fullName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground shrink-0">
                    <Clock className="h-3 w-3 shrink-0" />
                    {formatDate(user.createdAt)}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Section>
    </div>
  );
}
