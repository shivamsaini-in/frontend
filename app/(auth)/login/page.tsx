'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/app/hooks/useAuth';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-accent/8 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm space-y-8">
        {/* Brand mark */}
        <div className="flex flex-col items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center glow-primary">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-semibold">Discipline Admin</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to continue
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-6 space-y-5">
          <form
            onSubmit={handleSubmit((data) => login.mutate(data))}
            className="space-y-4"
          >
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs text-muted-foreground">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                autoComplete="email"
                {...register('email')}
                className={cn(
                  'h-10 rounded-xl bg-white/5 border-border/60 text-sm',
                  'focus:border-primary/50 focus:bg-white/8 transition-colors',
                  errors.email && 'border-destructive/60'
                )}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs text-muted-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                {...register('password')}
                className={cn(
                  'h-10 rounded-xl bg-white/5 border-border/60 text-sm',
                  'focus:border-primary/50 focus:bg-white/8 transition-colors',
                  errors.password && 'border-destructive/60'
                )}
              />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-10 rounded-xl font-medium mt-2"
              disabled={login.isPending}
            >
              {login.isPending ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}