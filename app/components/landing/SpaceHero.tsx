'use client';
import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Zap, ArrowRight, Play } from 'lucide-react';

interface Star {
  x: number; y: number; z: number;
  baseX: number; baseY: number;
  size: number; opacity: number;
  twinkleSpeed: number; twinkleOffset: number;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number; color: string;
}

export function SpaceHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  const initStars = useCallback((w: number, h: number) => {
    starsRef.current = Array.from({ length: 280 }, () => {
      const x = Math.random() * w;
      const y = Math.random() * h;
      return {
        x, y, z: Math.random(),
        baseX: x, baseY: y,
        size: Math.random() * 1.8 + 0.3,
        opacity: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      };
    });
    particlesRef.current = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.5 ? '#FF4D1C' : '#FFAD0D',
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    initStars(w, h);
    let t = 0;

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      initStars(w, h);
    };

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: (e.clientX / w - 0.5) * 2, y: (e.clientY / h - 0.5) * 2 };
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      t += 0.016;
      // Smooth mouse lerp
      mouse.current.x += (target.current.x - mouse.current.x) * 0.04;
      mouse.current.y += (target.current.y - mouse.current.y) * 0.04;

      ctx.clearRect(0, 0, w, h);

      // Deep space gradient
      const bg = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, h);
      bg.addColorStop(0,   'rgba(22,10,30,1)');
      bg.addColorStop(0.4, 'rgba(13,13,18,1)');
      bg.addColorStop(1,   'rgba(8,8,10,1)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Nebula glow 1 — ember
      const neb1 = ctx.createRadialGradient(w * 0.25, h * 0.3, 0, w * 0.25, h * 0.3, w * 0.35);
      neb1.addColorStop(0,   'rgba(255,77,28,0.07)');
      neb1.addColorStop(0.5, 'rgba(255,77,28,0.03)');
      neb1.addColorStop(1,   'rgba(255,77,28,0)');
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, w, h);

      // Nebula glow 2 — amber
      const neb2 = ctx.createRadialGradient(w * 0.75, h * 0.6, 0, w * 0.75, h * 0.6, w * 0.4);
      neb2.addColorStop(0,   'rgba(255,173,13,0.06)');
      neb2.addColorStop(0.6, 'rgba(255,173,13,0.02)');
      neb2.addColorStop(1,   'rgba(255,173,13,0)');
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, w, h);

      // Nebula glow 3 — deep purple
      const neb3 = ctx.createRadialGradient(w * 0.5, h * 0.15, 0, w * 0.5, h * 0.15, w * 0.3);
      neb3.addColorStop(0,   'rgba(120,60,200,0.05)');
      neb3.addColorStop(1,   'rgba(120,60,200,0)');
      ctx.fillStyle = neb3;
      ctx.fillRect(0, 0, w, h);

      // Stars with parallax
      starsRef.current.forEach((star) => {
        const parallax = star.z * 18;
        const sx = star.baseX + mouse.current.x * parallax;
        const sy = star.baseY + mouse.current.y * parallax;
        const twinkle = 0.5 + 0.5 * Math.sin(t * star.twinkleSpeed * 60 + star.twinkleOffset);
        const alpha = star.opacity * (0.6 + 0.4 * twinkle);

        ctx.beginPath();
        ctx.arc(sx, sy, star.size * (0.8 + 0.2 * twinkle), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();

        // Glow on bright stars
        if (star.opacity > 0.8 && star.size > 1.2) {
          const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, star.size * 4);
          g.addColorStop(0, `rgba(255,255,255,${alpha * 0.4})`);
          g.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.beginPath();
          ctx.arc(sx, sy, star.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }
      });

      // Planet 1 — large ember planet (parallax layer 1)
      const p1x = w * 0.85 + mouse.current.x * -25;
      const p1y = h * 0.18 + mouse.current.y * -25;
      const p1r = Math.min(w, h) * 0.11;
      const planet1 = ctx.createRadialGradient(p1x - p1r * 0.3, p1y - p1r * 0.3, 0, p1x, p1y, p1r);
      planet1.addColorStop(0,    'rgba(255,100,50,0.35)');
      planet1.addColorStop(0.5,  'rgba(180,60,20,0.25)');
      planet1.addColorStop(0.85, 'rgba(80,20,10,0.2)');
      planet1.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(p1x, p1y, p1r, 0, Math.PI * 2);
      ctx.fillStyle = planet1;
      ctx.fill();
      // Planet ring
      ctx.beginPath();
      ctx.ellipse(p1x, p1y, p1r * 1.6, p1r * 0.35, -0.3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,120,50,0.12)';
      ctx.lineWidth = 6;
      ctx.stroke();

      // Planet 2 — amber small (parallax layer 2)
      const p2x = w * 0.08 + mouse.current.x * -12;
      const p2y = h * 0.75 + mouse.current.y * -12;
      const p2r = Math.min(w, h) * 0.055;
      const planet2 = ctx.createRadialGradient(p2x - p2r * 0.3, p2y - p2r * 0.3, 0, p2x, p2y, p2r);
      planet2.addColorStop(0,    'rgba(255,200,80,0.3)');
      planet2.addColorStop(0.6,  'rgba(200,130,20,0.2)');
      planet2.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(p2x, p2y, p2r, 0, Math.PI * 2);
      ctx.fillStyle = planet2;
      ctx.fill();

      // Planet 3 — tiny distant blue
      const p3x = w * 0.6 + mouse.current.x * -8;
      const p3y = h * 0.08 + mouse.current.y * -8;
      const p3r = Math.min(w, h) * 0.025;
      const planet3 = ctx.createRadialGradient(p3x, p3y, 0, p3x, p3y, p3r);
      planet3.addColorStop(0,   'rgba(100,180,255,0.25)');
      planet3.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(p3x, p3y, p3r, 0, Math.PI * 2);
      ctx.fillStyle = planet3;
      ctx.fill();

      // Floating ember particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx + mouse.current.x * 0.15;
        p.y += p.vy + mouse.current.y * 0.15;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      // Scan line overlay
      for (let i = 0; i < h; i += 4) {
        ctx.fillStyle = 'rgba(0,0,0,0.03)';
        ctx.fillRect(0, i, w, 1);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [initStars]);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-transparent to-black/60 pointer-events-none" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0D0D0F] to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-8 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-primary/90 tracking-wide">Now in Public Beta</span>
        </div>

        {/* Headline */}
        <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
          Build the life{' '}
          <br className="hidden sm:block" />
          <span className="text-ember">you deserve.</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
          Discipline combines habit tracking, task management, fitness, and deep focus into one beautifully designed app — powered by science.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-primary text-white font-semibold text-sm glow-primary hover:bg-primary/90 transition-all duration-200"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#video"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm text-white/80 font-semibold text-sm hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <Play className="h-4 w-4 fill-white/60" />
            Watch Demo
          </a>
        </div>

        {/* Social proof */}
        <div className="mt-12 flex items-center justify-center gap-6 text-white/30 text-xs">
          <span>⭐ 4.9 App Store</span>
          <span className="h-3 w-px bg-white/20" />
          <span>10,000+ users</span>
          <span className="h-3 w-px bg-white/20" />
          <span>Free to start</span>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
}
