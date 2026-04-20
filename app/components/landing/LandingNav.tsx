'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Zap, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Features',    href: '#features' },
  { label: 'Product',     href: '#product' },
  { label: 'Demo',        href: '#video' },
  { label: 'Testimonials', href: '#testimonials' },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <nav className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#0D0D0F]/90 backdrop-blur-xl border-b border-white/6 shadow-[0_1px_20px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      )}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-8 w-8 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center glow-primary transition-transform group-hover:scale-105">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <span className="font-heading text-base font-bold text-white tracking-tight">Discipline</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="px-3.5 py-2 rounded-xl text-sm text-white/55 hover:text-white hover:bg-white/5 transition-all duration-150"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm text-white/55 hover:text-white transition-colors font-medium px-3 py-2">
              Sign In
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 glow-primary transition-all duration-200"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden p-2 rounded-xl text-white/55 hover:text-white hover:bg-white/5 transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden pt-16">
          <div className="absolute inset-0 bg-[#0D0D0F]/95 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 px-6 py-6 flex flex-col gap-2 border-b border-white/6">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 text-sm font-medium transition-all"
              >
                {label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2 pt-3 border-t border-white/8">
              <Link href="/login" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-center border border-white/12 text-white/70 text-sm font-medium hover:bg-white/5 transition-all">
                Sign In
              </Link>
              <Link href="/login" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-center bg-primary text-white text-sm font-semibold hover:bg-primary/90 glow-primary transition-all">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
