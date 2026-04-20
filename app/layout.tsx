import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Outfit({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const interBody = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Discipline Admin',
  description: 'Admin panel for Discipline — habit tracker, fitness, focus timer',
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${interBody.variable} h-full antialiased dark`} suppressHydrationWarning>
      <body className="min-h-full ios-scroll bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
