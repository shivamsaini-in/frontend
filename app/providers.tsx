'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/ThemeProvider';
import { TopLoadingBar } from './components/TopLoadingBar';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: 1, refetchOnWindowFocus: false },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TopLoadingBar />
        {children}
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: { borderRadius: '12px', fontSize: '13px' },
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
