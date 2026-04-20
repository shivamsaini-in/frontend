'use client';
import Link from 'next/link';
import { Zap } from 'lucide-react';

const LINKS = {
  Product:  ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  Company:  ['About', 'Blog', 'Careers', 'Press'],
  Legal:    ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  Support:  ['Help Center', 'Contact Us', 'Status'],
};

const SOCIALS = [
  { label: 'X', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'GitHub', href: '#' },
];

export function Footer() {
  return (
    <footer className="relative bg-[#0A0A0C] border-t border-white/6">
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="h-9 w-9 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center glow-primary">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <span className="font-heading text-base font-bold text-white">Discipline</span>
            </Link>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs">
              The all-in-one app for building habits, crushing tasks, staying fit, and achieving deep focus.
            </p>

            {/* Newsletter */}
            <div className="mt-5">
              <p className="text-xs text-white/40 mb-2">Get updates</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 rounded-xl bg-white/5 border border-white/8 px-3 py-2 text-xs text-white placeholder:text-white/25 focus:outline-none focus:border-primary/40 transition-colors"
                />
                <button className="px-3 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors shrink-0">
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([category, items]) => (
            <div key={category}>
              <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">{category}</p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-white/35 hover:text-white/70 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/6">
          <p className="text-xs text-white/25">© 2025 Discipline. All rights reserved.</p>

          <div className="flex items-center gap-5">
            {SOCIALS.map(({ label, href }) => (
              <Link key={label} href={href} className="text-xs text-white/30 hover:text-white/60 transition-colors">
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            {['#FF4D1C', '#FFAD0D', '#39D98A'].map((c) => (
              <span key={c} className="h-1.5 w-4 rounded-full opacity-60" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
