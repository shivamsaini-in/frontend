'use client';
import { useAuthStore } from '@/app/store/authStore';
import { useLogout } from '@/app/hooks/useAuth';
import { useThemeStore } from '@/app/store/themeStore';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, Sun, Moon, Monitor, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ThemeMode } from '@/app/store/themeStore';

const THEME_OPTIONS: { label: string; value: ThemeMode; icon: React.ElementType }[] = [
  { label: 'Light',  value: 'light',  icon: Sun },
  { label: 'Dark',   value: 'dark',   icon: Moon },
  { label: 'System', value: 'system', icon: Monitor },
];

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user } = useAuthStore();
  const logout = useLogout();
  const { mode, setMode } = useThemeStore();

  const initials =
    user?.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) ?? 'U';

  return (
    <header className={cn(
      'h-16 shrink-0 flex items-center justify-between px-4 lg:px-6',
      'glass border-b border-border/60 sticky top-0 z-30',
    )}>
      {/* Left — mobile hamburger + page breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className={cn(
            'md:hidden p-2 rounded-xl text-muted-foreground',
            'hover:text-foreground hover:bg-white/5 transition-colors',
          )}
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md bg-primary/15 flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          </div>
          <span className="text-sm font-medium text-muted-foreground hidden sm:block">
            Discipline Admin
          </span>
        </div>
      </div>

      {/* Right — theme toggle + user menu */}
      <div className="flex items-center gap-2">
        {/* Theme picker */}
        <div className="flex items-center gap-0.5 p-1 rounded-xl bg-secondary/60 border border-border/60">
          {THEME_OPTIONS.map(({ value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setMode(value)}
              title={value}
              className={cn(
                'p-1.5 rounded-lg transition-all duration-150',
                mode === value
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className={cn(
            'flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 outline-none cursor-pointer',
            'transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-ring',
          )}>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold leading-none font-heading">{user?.name}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{user?.email}</p>
            </div>
            <Avatar className="h-8 w-8 ring-2 ring-primary/25">
              <AvatarFallback className="text-[11px] font-bold bg-primary/15 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <Badge
              variant="outline"
              className="hidden sm:flex text-[10px] border-primary/30 text-primary bg-primary/10 px-1.5 py-0 font-medium"
            >
              {user?.role}
            </Badge>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 rounded-2xl border-border/60 bg-popover p-1.5 shadow-card">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal px-3 py-2.5">
                <div className="flex items-center gap-2.5">
                  <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                    <AvatarFallback className="text-[11px] font-bold bg-primary/15 text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold font-heading">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-border/60 mx-1 my-1" />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="text-destructive cursor-pointer focus:text-destructive focus:bg-destructive/10 rounded-xl mx-0.5 gap-2.5 py-2"
                onClick={() => logout.mutate()}
                disabled={logout.isPending}
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium">{logout.isPending ? 'Signing out…' : 'Sign out'}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
