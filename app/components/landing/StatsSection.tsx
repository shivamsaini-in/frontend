'use client';
import { motion } from 'framer-motion';

const STATS = [
  { value: '10K+',  label: 'Active Users',       desc: 'and growing every day' },
  { value: '4.9★',  label: 'App Store Rating',   desc: 'from 2,400+ reviews' },
  { value: '94%',   label: 'Habit Completion',    desc: 'average across all users' },
  { value: '3.2h',  label: 'Focus Time / Day',    desc: 'average per active user' },
];

export function StatsSection() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Ember gradient line */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      </div>

      <div className="relative max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map(({ value, label, desc }, i) => (
          <motion.div
            key={label}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="font-heading text-4xl sm:text-5xl font-extrabold text-ember mb-2">{value}</div>
            <div className="text-sm font-semibold text-white/80 mb-1">{label}</div>
            <div className="text-xs text-white/35">{desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
