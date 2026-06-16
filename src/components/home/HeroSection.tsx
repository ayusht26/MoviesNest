'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Info } from 'lucide-react';
import { backdropUrl, imgUrl } from '../../lib/tmdb';

interface HeroItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: string;
}

interface Props {
  items: HeroItem[];
}

const SWIPE_THRESHOLD = 50; // px drag needed to trigger slide change

export default function HeroSection({ items }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  // Star-field canvas (keep existing logic unchanged)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.005 + 0.002,
    }));
    let frame: number;
    function draw() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      stars.forEach(s => {
        s.alpha += Math.sin(Date.now() * s.speed) * 0.01;
        s.alpha = Math.max(0.1, Math.min(1, s.alpha));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${s.alpha * 0.6})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
  }, []);

  // Auto-rotate
  useEffect(() => {
    timerRef.current = setInterval(() => navigate(1), 7000);
    return () => clearInterval(timerRef.current);
  }, [current, items.length]);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrent(c => (c + dir + items.length) % items.length);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => navigate(1), 7000);
  };

  // Touch/drag handlers for the ENTIRE section
  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (info.offset.x < -SWIPE_THRESHOLD) navigate(1);
    else if (info.offset.x > SWIPE_THRESHOLD) navigate(-1);
  };

  const item = items[current];
  if (!item) return null;
  const title = item.title || item.name || '';
  const year = (item.release_date || item.first_air_date || '').slice(0, 4);
  const type = item.media_type === 'tv' ? 'tv' : 'movie';
  const href = `/${type}/${item.id}`;

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.35 } }),
  };

  return (
    <div className="relative w-full h-[85vh] min-h-[600px] overflow-hidden select-none">
      {/* Star field */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0" />

      {/* ── DRAGGABLE WRAPPER covers the FULL hero ── */}
      <motion.div
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={item.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex"
          >
            {/* ── Backdrop image ── */}
            <img
              src={backdropUrl(item.backdrop_path)}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
              loading="eager"
              draggable={false}
            />
            {/* Vignette layers */}
            <div className="absolute inset-0 bg-gradient-to-r from-nest-bg via-nest-bg/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-nest-bg via-transparent to-nest-bg/40" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Text content (always on top, not draggable so links work) ── */}
      <div className="relative z-10 h-full flex items-center pointer-events-none">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${item.id}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl pointer-events-auto"
            >
              {/* Tags */}
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-1 rounded-md bg-nest-accent/20 border border-nest-accent/40 text-nest-accent text-xs font-mono uppercase tracking-widest">
                  {type === 'tv' ? 'Series' : 'Movie'}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-nest-gold text-nest-gold" />
                  <span className="font-mono text-sm text-nest-gold font-medium">
                    {item.vote_average.toFixed(1)}
                  </span>
                </div>
                {year && <span className="text-nest-muted font-mono text-sm">{year}</span>}
              </div>

              {/* Title — clicking goes to detail page */}
              <a href={href} className="block group">
                <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-none tracking-wide mb-4 text-nest-text group-hover:text-nest-accent transition-colors">
                  {title}
                </h1>
              </a>

              <p className="text-nest-muted text-base sm:text-lg leading-relaxed mb-8 line-clamp-3">
                {item.overview}
              </p>

              {/* Buttons — click goes to detail page */}
              <div className="flex items-center gap-4">
                {/* "Watch Now" goes to detail page, player is revealed there */}
                <a
                  href={href}
                  className="group flex items-center gap-3 px-7 py-3.5 rounded-xl bg-nest-accent text-nest-bg font-semibold text-sm hover:bg-white hover:shadow-lg hover:shadow-nest-accent/30 transition-all duration-300 glow-cyan"
                >
                  Watch Now
                </a>
                <a
                  href={href}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl glass-card text-nest-text font-medium text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <Info className="w-4 h-4" />
                  More Info
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Arrow buttons (on top of everything) ── */}
      <button
        onClick={() => navigate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-card flex items-center justify-center text-nest-muted hover:text-nest-accent hover:border-nest-accent/40 transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => navigate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-card flex items-center justify-center text-nest-muted hover:text-nest-accent hover:border-nest-accent/40 transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`transition-all duration-300 rounded-full ${
              i === current ? 'w-8 h-2 bg-nest-accent' : 'w-2 h-2 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
