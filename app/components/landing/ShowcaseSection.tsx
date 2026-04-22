'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Target, Timer, Dumbbell } from 'lucide-react';
import { brand, hexAlpha } from '@/config/theme-config/tokens';

interface Screen {
  icon: React.ElementType;
  color: string;
  tag: string;
  title: string;
  desc: string;
  mockupBg: string;
  accentBg: string;
  bars: number[];
}

/* Colors from theme.config.json → brand */
const SCREENS: Screen[] = [
  {
    icon: Flame,
    color: brand.primary,
    tag: 'Habits',
    title: 'Visual streak calendar',
    desc: 'See your entire year at a glance. Heatmap view makes streaks addictive — you will never want to break the chain.',
    mockupBg: 'from-[#1a0a06] to-[#0d0d0f]',
    accentBg: hexAlpha(brand.primary, 0.12),
    bars: [90, 75, 60, 88, 95, 70, 82],
  },
  {
    icon: Target,
    color: brand.accent,
    tag: 'Tasks',
    title: 'Priority-first task board',
    desc: 'Drag, reorder, and focus on what actually matters. Smart due-date sorting keeps you ahead of deadlines.',
    mockupBg: 'from-[#1a1100] to-[#0d0d0f]',
    accentBg: hexAlpha(brand.accent, 0.10),
    bars: [65, 80, 95, 55, 78, 90, 70],
  },
  {
    icon: Timer,
    color: brand.info,
    tag: 'Focus',
    title: 'Deep work timer',
    desc: 'Pomodoro sessions with ambient soundscapes. Track focus hours, measure output, and protect your flow state.',
    mockupBg: 'from-[#030a1a] to-[#0d0d0f]',
    accentBg: hexAlpha(brand.info, 0.10),
    bars: [40, 70, 85, 65, 90, 75, 88],
  },
  {
    icon: Dumbbell,
    color: brand.success,
    tag: 'Fitness',
    title: 'Workout progress tracker',
    desc: 'Log sets, reps, and weight. Beautiful progress curves show your strength growing week over week.',
    mockupBg: 'from-[#03120a] to-[#0d0d0f]',
    accentBg: hexAlpha(brand.success, 0.10),
    bars: [55, 68, 72, 80, 85, 91, 95],
  },
];

function MockupCard({ screen }: { screen: Screen }) {
  const { icon: Icon, color, tag, bars, mockupBg, accentBg } = screen;
  return (
    <div
      className={`relative rounded-3xl p-6 aspect-9/16 max-h-72 flex flex-col justify-between overflow-hidden bg-linear-to-b ${mockupBg} border border-white/8`}
      style={{ boxShadow: `0 0 40px ${hexAlpha(color, 0.12)}, 0 20px 40px rgba(0,0,0,0.4)` }}
    >
      <div className="flex justify-between text-[9px] text-white/25 mb-3">
        <span>9:41</span><span>●●●</span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="h-7 w-7 rounded-xl flex items-center justify-center" style={{ background: hexAlpha(color, 0.20) }}>
          <Icon className="h-3.5 w-3.5" style={{ color }} />
        </div>
        <span className="text-xs font-bold text-white/70">{tag}</span>
      </div>

      <div className="flex items-end gap-1.5 flex-1">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md transition-all"
            style={{ height: `${h}%`, background: i === bars.length - 1 ? color : hexAlpha(color, 0.25) }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 80%, ${accentBg} 0%, transparent 70%)` }}
      />
    </div>
  );
}

export function ShowcaseSection() {
  return (
    <section id="product" className="relative py-28 px-6 bg-background overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-4 py-1.5 mb-5">
            <span className="text-xs font-medium text-accent/80 tracking-wide">Product showcase</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Beautifully designed<br />
            <span className="text-ember">for real results.</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-lg mx-auto text-base leading-relaxed">
            Every pixel crafted for clarity. Every interaction designed for speed. Screenshots coming soon — reserve your spot now.
          </p>
        </motion.div>

        <div className="space-y-24">
          {SCREENS.map(({ icon: Icon, color, tag, title, desc, mockupBg, accentBg, bars }, i) => {
            const flip = i % 2 === 1;
            const screen = { icon: Icon, color, tag, title, desc, mockupBg, accentBg, bars };
            return (
              <motion.div
                key={tag}
                className={`flex flex-col ${flip ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
                initial={{ opacity: 0, x: flip ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <div className="w-full md:w-auto md:shrink-0 flex justify-center gap-4">
                  <MockupCard screen={screen} />
                  {i === 0 && (
                    <div className="hidden sm:block mt-8 opacity-50 scale-90 origin-top">
                      <MockupCard screen={{ ...screen, bars: screen.bars.map(b => Math.max(20, b - 20)) }} />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-4"
                    style={{ background: hexAlpha(color, 0.15), color, border: `1px solid ${hexAlpha(color, 0.25)}` }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {tag}
                  </div>
                  <h3 className="font-heading text-3xl font-extrabold text-white tracking-tight mb-4">{title}</h3>
                  <p className="text-white/50 text-base leading-relaxed max-w-md">{desc}</p>

                  <div className="mt-6 inline-flex items-center gap-2 text-xs text-white/25 border border-white/10 rounded-xl px-4 py-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    App screenshots coming soon
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
