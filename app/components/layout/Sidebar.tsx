'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, BarChart2,
  ChevronLeft, ChevronRight, Zap, X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/app/store/authStore';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard',           icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'USER'] },
  { label: 'Users',     href: '/dashboard/users',     icon: Users,           roles: ['SUPER_ADMIN'] },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart2,       roles: ['SUPER_ADMIN', 'USER'] },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

function SidebarContent({
  collapsed,
  onToggle,
  isMobile = false,
  onMobileClose,
}: {
  collapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
  onMobileClose?: () => void;
}) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const visible = NAV_ITEMS.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <aside
      className={cn(
        'relative flex flex-col h-full transition-all duration-300 ease-in-out',
        'bg-sidebar border-r border-sidebar-border',
        isMobile ? 'w-64' : collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Logo */}
      <div className={cn(
        'flex items-center gap-3 h-16 border-b border-sidebar-border shrink-0 px-4',
        !isMobile && collapsed && 'justify-center px-0',
      )}>
        <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center shrink-0 glow-primary">
          <Zap className="h-4 w-4 text-white" />
        </div>
        {(isMobile || !collapsed) && (
          <div className="flex-1 overflow-hidden">
            <p className="font-heading text-sm font-bold text-foreground truncate tracking-tight">
              WinDaily
            </p>
            <p className="text-[10px] text-muted-foreground">Admin Panel</p>
          </div>
        )}
        {isMobile && (
          <button
            onClick={onMobileClose}
            className="ml-auto p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className={cn('flex-1 py-4 space-y-0.5 overflow-y-auto ios-scroll', collapsed && !isMobile ? 'px-2' : 'px-3')}>
        {visible.map(({ label, href, icon: Icon }) => {
          const isActive = href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              title={collapsed && !isMobile ? label : undefined}
              onClick={isMobile ? onMobileClose : undefined}
              className={cn(
                'group relative flex items-center gap-3 rounded-xl text-sm font-medium',
                'transition-all duration-150',
                collapsed && !isMobile
                  ? 'justify-center h-10 w-10 mx-auto'
                  : 'px-3 h-10',
                isActive
                  ? 'bg-primary/12 text-primary'
                  : 'text-sidebar-foreground hover:bg-white/5 hover:text-foreground'
              )}
            >
              {isActive && (
                <span className={cn(
                  'absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-primary',
                  collapsed && !isMobile && '-left-1.5'
                )} />
              )}
              <Icon className={cn(
                'h-4.5 w-4.5 shrink-0 transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
              )} />
              {(isMobile || !collapsed) && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {(isMobile || !collapsed) && (
        <div className="px-4 pb-4 pt-2 border-t border-sidebar-border">
          <p className="text-[10px] text-muted-foreground/40 font-mono">v1.0.0</p>
        </div>
      )}

      {/* Desktop collapse toggle */}
      {!isMobile && (
        <button
          onClick={onToggle}
          className={cn(
            'absolute -right-3 top-18 h-6 w-6 rounded-full z-10',
            'border border-sidebar-border bg-sidebar shadow-sm',
            'text-muted-foreground hover:text-foreground hover:bg-secondary',
            'flex items-center justify-center transition-all duration-200'
          )}
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      )}
    </aside>
  );
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-screen sticky top-0">
        <SidebarContent
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
        />
      </div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          <div className="absolute left-0 top-0 bottom-0 z-50 animate-fade-in">
            <SidebarContent
              collapsed={false}
              onToggle={() => {}}
              isMobile
              onMobileClose={onMobileClose}
            />
          </div>
        </div>
      )}
    </>
  );
}
