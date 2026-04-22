'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/app/hooks/useAuth';
import { Zap, Flame, Target, Timer, Dumbbell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { loginDots } from '@/config/theme-config/tokens';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type LoginForm = z.infer<typeof loginSchema>;

const FEATURES = [
  { icon: Flame,    label: 'Habit Tracking',  desc: 'Build streaks that last' },
  { icon: Target,   label: 'Task Manager',    desc: 'Crush your daily goals' },
  { icon: Dumbbell, label: 'Fitness Tracker', desc: 'Monitor your progress' },
  { icon: Timer,    label: 'Focus Timer',     desc: 'Deep work, zero distractions' },
];

export default function LoginPage() {
  const login = useLogin();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">

      {/* ── Left panel — brand visual ── */}
      <div className="relative hidden md:flex md:w-1/2 flex-col justify-between overflow-hidden bg-sidebar">
        {/* Ember gradient orbs — uses CSS vars from theme */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-primary/20 blur-[80px]" />
          <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-accent/15 blur-[70px]" />
          <div className="absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-primary/10 blur-[60px]" />
        </div>

        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Logo */}
        <div className="relative z-10 p-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center glow-primary">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-heading text-lg font-bold text-white tracking-tight">Discipline</p>
              <p className="text-[11px] text-white/40">Admin Console</p>
            </div>
          </div>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 px-10 pb-4">
          <h1 className="font-heading text-4xl font-extrabold text-white leading-tight tracking-tight">
            Build habits.<br />
            <span className="text-ember">Achieve more.</span>
          </h1>
          <p className="mt-3 text-sm text-white/50 max-w-xs leading-relaxed">
            Your all-in-one platform for habit tracking, task management, fitness, and deep focus.
          </p>
        </div>

        {/* Feature pills */}
        <div className="relative z-10 px-10 pb-12 grid grid-cols-2 gap-3">
          {FEATURES.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className={cn(
                'flex items-start gap-3 rounded-2xl p-3.5',
                'bg-white/4 border border-white/6 backdrop-blur-sm',
                'hover:bg-white/6 transition-colors',
              )}
            >
              <div className="h-8 w-8 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white/90">{label}</p>
                <p className="text-[10px] text-white/40 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar — brand dot colors from theme.config.json → loginDots */}
        <div className="relative z-10 px-10 py-4 border-t border-white/6 flex items-center justify-between">
          <p className="text-[11px] text-white/25">© 2025 Discipline</p>
          <div className="flex gap-1">
            {loginDots.map((c) => (
              <span key={c} className="h-1.5 w-5 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel — login form ── */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 md:px-12">

        {/* Mobile logo */}
        <div className="flex items-center gap-2.5 mb-10 md:hidden">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center glow-primary">
            <Zap className="h-4.5 w-4.5 text-white" />
          </div>
          <p className="font-heading text-lg font-bold tracking-tight">Discipline Admin</p>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-sm text-muted-foreground mt-1.5">Sign in to your admin account</p>
          </div>

          <form onSubmit={handleSubmit((data) => login.mutate(data))} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium text-muted-foreground">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                autoComplete="email"
                {...register('email')}
                className={cn(
                  'h-11 rounded-xl bg-input border-border/60 text-sm',
                  'focus:border-primary/50 focus:ring-primary/20 transition-all',
                  errors.email && 'border-destructive/60 focus:border-destructive/60'
                )}
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-medium text-muted-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                {...register('password')}
                className={cn(
                  'h-11 rounded-xl bg-input border-border/60 text-sm',
                  'focus:border-primary/50 focus:ring-primary/20 transition-all',
                  errors.password && 'border-destructive/60 focus:border-destructive/60'
                )}
              />
              {errors.password && (
                <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={login.isPending}
              className={cn(
                'w-full h-11 rounded-xl font-semibold text-sm mt-2',
                'bg-primary hover:bg-primary/90 text-white',
                'glow-primary transition-all duration-200',
                'disabled:opacity-60 disabled:cursor-not-allowed',
              )}
            >
              {login.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Signing in…
                </span>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          <p className="text-center text-[11px] text-muted-foreground/50 mt-8">
            Discipline Admin · Secure access only
          </p>
        </div>
      </div>
    </div>
  );
}
