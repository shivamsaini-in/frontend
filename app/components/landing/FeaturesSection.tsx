'use client';
import { motion } from 'framer-motion';
import { Flame, Target, Dumbbell, Timer, TrendingUp, Bell, BarChart2, Shield } from 'lucide-react';

const FEATURES = [
  {
    icon: Flame,
    title: 'Habit Tracking',
    description: 'Build powerful streaks that last. Visual heatmaps show exactly where you excel and where to push harder.',
    color: '#FF4D1C',
    bg: 'rgba(255,77,28,0.08)',
    border: 'rgba(255,77,28,0.2)',
  },
  {
    icon: Target,
    title: 'Task Manager',
    description: 'Prioritize ruthlessly. Smart scheduling ensures your most important work gets done first, every single day.',
    color: '#FFAD0D',
    bg: 'rgba(255,173,13,0.08)',
    border: 'rgba(255,173,13,0.2)',
  },
  {
    icon: Dumbbell,
    title: 'Fitness Tracker',
    description: 'Log workouts, track reps, monitor progress. Every PR celebrated, every session logged automatically.',
    color: '#39D98A',
    bg: 'rgba(57,217,138,0.08)',
    border: 'rgba(57,217,138,0.2)',
  },
  {
    icon: Timer,
    title: 'Focus Timer',
    description: 'Pomodoro-powered deep work sessions. Block distractions, measure focus time, and build unstoppable momentum.',
    color: '#3B9EFF',
    bg: 'rgba(59,158,255,0.08)',
    border: 'rgba(59,158,255,0.2)',
  },
  {
    icon: TrendingUp,
    title: 'Progress Analytics',
    description: 'Beautiful charts show your growth over weeks and months. Data-driven insights to optimize every routine.',
    color: '#BF5AF2',
    bg: 'rgba(191,90,242,0.08)',
    border: 'rgba(191,90,242,0.2)',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: 'Context-aware nudges that know when to push and when to back off. Never miss a habit again.',
    color: '#FF4D1C',
    bg: 'rgba(255,77,28,0.08)',
    border: 'rgba(255,77,28,0.2)',
  },
  {
    icon: BarChart2,
    title: 'Screen Time Insights',
    description: 'Know exactly where your time goes. App usage reports help you reclaim hours lost to distractions.',
    color: '#FFAD0D',
    bg: 'rgba(255,173,13,0.08)',
    border: 'rgba(255,173,13,0.2)',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data stays yours. End-to-end encryption, no ads, no tracking. We make money when you succeed.',
    color: '#39D98A',
    bg: 'rgba(57,217,138,0.08)',
    border: 'rgba(57,217,138,0.2)',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0 },
};

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 px-6 bg-[#0D0D0F]">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 mb-5">
            <span className="text-xs font-medium text-primary/80 tracking-wide">Everything you need</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            One app to rule<br />
            <span className="text-ember">your entire life.</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto text-base leading-relaxed">
            Stop juggling five different apps. Discipline brings every productivity tool into one elegant, powerful platform.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.08 }}
        >
          {FEATURES.map(({ icon: Icon, title, description, color, bg, border }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="group relative rounded-2xl p-5 cursor-default transition-all duration-300 hover:-translate-y-1"
              style={{ background: bg, border: `1px solid ${border}` }}
            >
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${color}20`, border: `1px solid ${color}30` }}
              >
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <h3 className="font-heading text-sm font-bold text-white mb-2">{title}</h3>
              <p className="text-xs text-white/45 leading-relaxed">{description}</p>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `inset 0 0 30px ${color}10` }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
