'use client';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Sarah K.',
    role: 'Product Designer',
    avatar: 'SK',
    text: 'Discipline completely replaced 4 different apps I was using. The habit streaks alone changed how I approach my mornings.',
    stars: 5,
    color: '#FF4D1C',
  },
  {
    name: 'Marcus T.',
    role: 'Software Engineer',
    avatar: 'MT',
    text: 'The focus timer + task integration is genius. I get more done in 3 focused hours than I used to in an entire workday.',
    stars: 5,
    color: '#FFAD0D',
  },
  {
    name: 'Priya M.',
    role: 'Fitness Coach',
    avatar: 'PM',
    text: "Finally a fitness tracker that doesn't feel clinical. My clients love the progress visuals — it keeps them motivated.",
    stars: 5,
    color: '#39D98A',
  },
  {
    name: 'James R.',
    role: 'Entrepreneur',
    avatar: 'JR',
    text: 'I went from 30% habit completion to 91% in 6 weeks. The analytics showed me exactly where I was failing and why.',
    stars: 5,
    color: '#3B9EFF',
  },
  {
    name: 'Aisha L.',
    role: 'Medical Student',
    avatar: 'AL',
    text: 'The screen time insights were eye-opening. Realizing I was spending 3h/day on social media was the wake-up call I needed.',
    stars: 5,
    color: '#FF4D1C',
  },
  {
    name: 'Daniel W.',
    role: 'Content Creator',
    avatar: 'DW',
    text: 'Best purchase I made this year. Simple, fast, and actually makes you want to build better habits. The design is stunning.',
    stars: 5,
    color: '#FFAD0D',
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-28 px-6 bg-[#0D0D0F] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-4 py-1.5 mb-5">
            <span className="text-xs font-medium text-accent/80 tracking-wide">Loved by thousands</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Real people,<br />
            <span className="text-ember">real results.</span>
          </h2>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {TESTIMONIALS.map(({ name, role, avatar, text, stars, color }, i) => (
            <motion.div
              key={name}
              className="break-inside-avoid rounded-2xl p-5 border border-white/6 bg-white/3 hover:bg-white/5 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: stars }).map((_, j) => (
                  <span key={j} className="text-accent text-sm">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/65 text-sm leading-relaxed mb-4">"{text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="h-8 w-8 rounded-xl flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                  style={{ background: `${color}20`, border: `1px solid ${color}30`, color }}
                >
                  {avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/80">{name}</p>
                  <p className="text-xs text-white/35">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
