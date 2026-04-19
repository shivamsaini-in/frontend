'use client';
import { useAuthStore } from '@/app/store/authStore';
import { useLogout } from '@/app/hooks/useAuth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { user } = useAuthStore();
  const logout = useLogout();

  const initials =
    user?.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) ?? 'U';

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header
      className={cn(
        'h-14 shrink-0 flex items-center justify-between px-5',
        'glass border-b border-border/60',
        'sticky top-0 z-30'
      )}
    >
      {/* Left — date */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <CalendarDays className="h-3.5 w-3.5 shrink-0" />
        <span className="text-xs hidden sm:block">{today}</span>
      </div>

      {/* Right — user menu */}
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            'flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 outline-none',
            'transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-ring',
            'cursor-pointer'
          )}
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{user?.email}</p>
          </div>
          <Avatar className="h-7 w-7 ring-2 ring-primary/30">
            <AvatarFallback className="text-[10px] font-semibold bg-primary/20 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <Badge
            variant="outline"
            className="hidden sm:flex text-[10px] border-primary/30 text-primary bg-primary/10 px-1.5 py-0"
          >
            {user?.role}
          </Badge>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56 glass-card border-border/60 rounded-xl p-1"
        >
          <DropdownMenuLabel className="font-normal px-3 py-2">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border/60 mx-2" />
          <DropdownMenuItem
            className="text-destructive cursor-pointer focus:text-destructive focus:bg-destructive/10 rounded-lg mx-1 gap-2"
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
          >
            <LogOut className="h-3.5 w-3.5" />
            {logout.isPending ? 'Signing out…' : 'Sign out'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}