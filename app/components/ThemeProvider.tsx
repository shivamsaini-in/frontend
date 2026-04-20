'use client';
import { useEffect } from 'react';
import { useThemeStore } from '@/app/store/themeStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (dark: boolean) => {
      root.classList.remove('dark', 'light');
      root.classList.add(dark ? 'dark' : 'light');
    };

    if (mode === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(mq.matches);
      const handler = (e: MediaQueryListEvent) => applyTheme(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    } else {
      applyTheme(mode === 'dark');
    }
  }, [mode]);

  return <>{children}</>;
}
