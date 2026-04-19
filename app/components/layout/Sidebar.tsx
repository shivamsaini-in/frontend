'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, BarChart2, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/app/store/authStore';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    roles: ['SUPER_ADMIN', 'USER'],
  },
  {
    label: 'Users',
    href: '/users',
    icon: Users,
    roles: ['SUPER_ADMIN'],
  },
  {
    label: 'Analytics',
    href: '/analytics',
    icon: BarChart2,
    roles: ['SUPER_ADMIN', 'USER'],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  const visibleItems = NAV_ITEMS.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <aside
      className={cn(
        'relative flex flex-col shrink-0 min-h-screen transition-all duration-300 ease-in-out',
        'border-r border-border/60',
        'bg-sidebar',
        collapsed ? 'w-16' : 'w-55'
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          'flex items-center gap-3 px-4 py-5 border-b border-border/60 shrink-0',
          collapsed && 'justify-center px-0'
        )}
      >
        <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center shrink-0 glow-primary">
          <Zap className="h-4 w-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-foreground leading-tight truncate">
              Discipline
            </p>
            <p className="text-[10px] text-muted-foreground leading-tight">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className={cn('flex-1 py-4 space-y-1', collapsed ? 'px-2' : 'px-3')}>
        {visibleItems.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={cn(
                'group flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-150',
                collapsed ? 'justify-center h-10 w-10 mx-auto' : 'px-3 h-10',
                isActive
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
              )}
            >
              <Icon
                className={cn(
                  'h-4.5 w-4.5 shrink-0 transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                )}
              />
              {!collapsed && <span className="truncate">{label}</span>}
              {/* Active indicator dot */}
              {isActive && collapsed && (
                <span className="absolute left-1 h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="px-4 pb-4 pt-2 border-t border-border/60">
          <p className="text-[10px] text-muted-foreground/50">v1.0.0</p>
        </div>
      )}

      {/* Collapse toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed((c) => !c)}
        className={cn(
          'absolute -right-3 top-18 h-6 w-6 rounded-full border border-border/60 bg-sidebar',
          'text-muted-foreground hover:text-foreground hover:bg-secondary',
          'transition-all duration-200 shadow-sm'
        )}
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>
    </aside>
  );
}