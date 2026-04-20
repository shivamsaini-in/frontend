'use client';
import { use, useState } from 'react';
import Link from 'next/link';
import { useUserDetail, useUserAnalytics } from '@/app/hooks/useMobileAnalytics';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Smartphone, Clock, Calendar, TrendingUp, BarChart2, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate } from '@/app/utils/formatDate';
import type { MobileAnalysisRecord, AppUsageEntry } from '@/app/types';
import { cn } from '@/lib/utils';

function fmtMins(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = Math.round(mins % 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function fmtDay(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

const BAR_COLORS = ['bg-primary','bg-accent','bg-emerald-400','bg-amber-400','bg-sky-400','bg-rose-400','bg-violet-400','bg-teal-400'];

function AppBar({ app, max, idx }: { app: AppUsageEntry; max: number; idx: number }) {
  const pct = max > 0 ? (app.usageTime / max) * 100 : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="truncate max-w-32 text-foreground/80">{app.appName}</span>
        <span className="text-muted-foreground shrink-0 ml-2">{fmtMins(app.usageTime)}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div className={cn('h-full rounded-full transition-all duration-500', BAR_COLORS[idx % BAR_COLORS.length])} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function DayCard({ record }: { record: MobileAnalysisRecord }) {
  const sorted = [...record.appsUsage].sort((a, b) => b.usageTime - a.usageTime);
  const max = sorted[0]?.usageTime ?? 1;
  return (
    <div className="glass-card rounded-2xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
          {fmtDay(record.date)}
        </div>
        <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
          <Clock className="h-3.5 w-3.5" />
          {fmtMins(record.totalScreenTime)}
        </div>
      </div>
      {record.deviceInfo && <p className="text-[10px] text-muted-foreground -mt-2">{record.deviceInfo.deviceName} · {record.deviceInfo.osVersion}</p>}
      <div className="space-y-2.5">
        {sorted.length === 0 ? <p className="text-xs text-muted-foreground">No app data recorded.</p> : sorted.map((app, i) => <AppBar key={app.packageName} app={app} max={max} idx={i} />)}
      </div>
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, sub, isLoading }: { icon: React.ElementType; label: string; value: string; sub?: string; isLoading?: boolean }) {
  return (
    <div className="glass-card rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
        <div className="h-7 w-7 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="h-3.5 w-3.5 text-primary" />
        </div>
      </div>
      {isLoading ? <Skeleton className="h-7 w-20 bg-white/5" /> : (
        <div>
          <p className="text-2xl font-semibold">{value}</p>
          {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
        </div>
      )}
    </div>
  );
}

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [page, setPage] = useState(1);
  const { data: user, isLoading: userLoading } = useUserDetail(id);
  const { data: analyticsData, isLoading: analyticsLoading } = useUserAnalytics(id, page, 14);
  const records = analyticsData?.data ?? [];
  const pagination = analyticsData?.pagination;
  const totalTime = records.reduce((s, r) => s + r.totalScreenTime, 0);
  const avgTime = records.length > 0 ? totalTime / records.length : 0;
  const appTotals: Record<string, number> = {};
  records.forEach((r) => r.appsUsage.forEach((a) => { appTotals[a.appName] = (appTotals[a.appName] ?? 0) + a.usageTime; }));
  const topApp = Object.entries(appTotals).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="space-y-8 w-full">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/users">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1 min-w-0">
          {userLoading ? (<><Skeleton className="h-6 w-36 bg-white/5" /><Skeleton className="h-3.5 w-48 bg-white/5 mt-1.5" /></>) : (<><h1 className="text-xl font-semibold truncate">{user?.name}</h1><p className="text-xs text-muted-foreground mt-0.5">{user?.email}</p></>)}
        </div>
        {!userLoading && user && (
          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="outline" className={cn('text-[10px] rounded-full px-2 border-0', user.role === 'SUPER_ADMIN' ? 'bg-primary/15 text-primary' : 'bg-white/5 text-muted-foreground')}>{user.role === 'SUPER_ADMIN' ? 'Admin' : 'User'}</Badge>
            <div className="flex items-center gap-1.5">
              <span className={cn('h-1.5 w-1.5 rounded-full', user.isActive ? 'bg-emerald-400' : 'bg-muted-foreground')} />
              <span className="text-xs text-muted-foreground">{user.isActive ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard icon={Activity} label="Total Screen Time" value={analyticsLoading ? '—' : fmtMins(totalTime)} sub={`${records.length} day${records.length !== 1 ? 's' : ''} tracked`} isLoading={analyticsLoading} />
        <KpiCard icon={TrendingUp} label="Daily Average" value={analyticsLoading ? '—' : fmtMins(avgTime)} sub="per day" isLoading={analyticsLoading} />
        <KpiCard icon={BarChart2} label="Top App" value={analyticsLoading ? '—' : (topApp?.[0] ?? 'N/A')} sub={topApp ? fmtMins(topApp[1]) + ' total' : undefined} isLoading={analyticsLoading} />
        <KpiCard icon={Smartphone} label="Last Login" value={userLoading ? '—' : (user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never')} sub={user?.lastLogin ? formatDate(user.lastLogin) : undefined} isLoading={userLoading} />
      </div>

      {!userLoading && user && (
        <div className="glass-card rounded-2xl px-5 py-1 grid grid-cols-2 md:grid-cols-4 divide-x divide-border/40">
          {[{ label: 'Member Since', value: formatDate(user.createdAt) }, { label: 'Last Login', value: formatDate(user.lastLogin) }, { label: 'Role', value: user.role }, { label: 'Status', value: user.isActive ? 'Active' : 'Inactive' }].map(({ label, value }) => (
            <div key={label} className="px-4 py-3.5 first:pl-0 last:pr-0">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
              <p className="text-sm font-medium mt-1">{value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Daily Usage History</h2>
        {analyticsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-card rounded-2xl p-4 space-y-3">
                <div className="flex justify-between"><Skeleton className="h-4 w-24 bg-white/5" /><Skeleton className="h-4 w-12 bg-white/5" /></div>
                {Array.from({ length: 5 }).map((_, j) => <Skeleton key={j} className="h-5 w-full bg-white/5 rounded" />)}
              </div>
            ))}
          </div>
        ) : records.length === 0 ? (
          <div className="glass-card rounded-2xl py-14 flex flex-col items-center gap-3 text-muted-foreground">
            <BarChart2 className="h-8 w-8 opacity-25" />
            <p className="text-sm">No analytics data for this user yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {records.map((record) => <DayCard key={record._id} record={record} />)}
          </div>
        )}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-1 pt-2">
            <p className="text-xs text-muted-foreground">Page {pagination.page} of {pagination.totalPages} — {pagination.total} records</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={!pagination.hasPrevPage} onClick={() => setPage((p) => p - 1)} className="h-8 rounded-xl border-border/60 bg-white/5 hover:bg-white/8 text-xs gap-1"><ChevronLeft className="h-3.5 w-3.5" />Prev</Button>
              <Button variant="outline" size="sm" disabled={!pagination.hasNextPage} onClick={() => setPage((p) => p + 1)} className="h-8 rounded-xl border-border/60 bg-white/5 hover:bg-white/8 text-xs gap-1">Next<ChevronRight className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
