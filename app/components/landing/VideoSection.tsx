'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="video" className="relative py-28 px-6 bg-[#0D0D0F] overflow-hidden">
      {/* Glow bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/6 blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 mb-5">
            <span className="text-xs font-medium text-primary/80 tracking-wide">See it in action</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Watch Discipline<br />
            <span className="text-ember">change everything.</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-lg mx-auto text-base leading-relaxed">
            A 2-minute walkthrough of how Discipline turns scattered effort into focused, measurable progress.
          </p>
        </motion.div>

        {/* Video frame */}
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(255,77,28,0.08)' }}
        >
          {!playing ? (
            <div
              className="relative w-full bg-gradient-to-br from-[#1a0a06] via-[#0d0d0f] to-[#0a0a12] cursor-pointer group"
              style={{ paddingBottom: '56.25%' }}
              onClick={() => setPlaying(true)}
            >
              {/* Fake video thumbnail */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Grid overlay */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
                    backgroundSize: '50px 50px',
                  }}
                />
                {/* Glow orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />

                {/* Play button */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:scale-110 transition-all duration-300 glow-primary">
                    <Play className="h-8 w-8 text-white fill-white ml-1" />
                  </div>
                  <span className="text-white/50 text-sm font-medium">Play Demo — 2 min</span>
                </div>

                {/* Bottom info bar */}
                <div className="absolute bottom-0 left-0 right-0 px-8 py-5 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-lg bg-primary/20 flex items-center justify-center">
                      <span className="text-primary text-xs">▲</span>
                    </div>
                    <span className="text-white/40 text-xs">discipline-demo.mp4</span>
                  </div>
                  <span className="text-white/25 text-xs">2:04</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white/40 text-sm">Video player — add your video URL here</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Caption */}
        <p className="text-center text-white/25 text-xs mt-5">
          Full product walkthrough · No signup required to watch
        </p>
      </div>
    </section>
  );
}
