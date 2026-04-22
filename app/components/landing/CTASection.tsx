'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

export function CTASection() {
  return (
    /* bg-background pulls from theme.config.json → themeModes.dark.background via CSS var */
    <section className="relative py-28 px-6 overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/4 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 rounded-full bg-primary/8 blur-[80px]" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex h-16 w-16 rounded-3xl bg-primary/15 border border-primary/25 items-center justify-center mb-8 glow-primary">
            <Zap className="h-7 w-7 text-primary" />
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Start building the<br />
            <span className="text-ember">best version of you.</span>
          </h2>

          <p className="text-white/50 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Join 10,000+ people already winning their days. Free forever — upgrade when you're ready.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-primary text-white font-bold text-base glow-primary hover:bg-primary/90 transition-all duration-200"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 rounded-2xl border border-white/15 bg-white/5 text-white/70 font-semibold text-base hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              Sign In →
            </Link>
          </div>

          <p className="mt-6 text-white/25 text-sm">No credit card required · Available on iOS</p>
        </motion.div>
      </div>
    </section>
  );
}
