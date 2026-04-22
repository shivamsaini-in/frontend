import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

/**
 * Fonts sourced from theme.config.json → fonts.heading.web / fonts.body.web
 * To change fonts: update theme.config.json and swap the import + constructor below.
 */
const headingFont = Outfit({           /* fonts.heading.web = "Outfit" */
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const bodyFont = Inter({               /* fonts.body.web = "Inter" */
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'WinDaily Admin',
  description: 'Admin panel for WinDaily — screen time control, habit building, and daily focus tracking',
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full ios-scroll bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
