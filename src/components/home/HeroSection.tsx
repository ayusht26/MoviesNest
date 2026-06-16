'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info, Star } from 'lucide-react';
import { imgUrl, backdropUrl } from '../../lib/tmdb';

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

export default function HeroSection({ items }: Props) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (!items || items.length === 0) return;
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % items.length);
    }, 8000);
    return () => clearInterval(timerRef.current);
  }, [items]);

  if (!items || items.length === 0) return null;

  const item = items[current];
  const rawTitle = item.title || item.name || '';
  // Ensure title ends with a period if it doesn't already have one
  const title = rawTitle.endsWith('.') ? rawTitle : `${rawTitle}.`;
  const year = (item.release_date || item.first_air_date || '').slice(0, 4);
  const type = item.media_type === 'tv' ? 'tv' : 'movie';

  const goTo = (idx: number) => {
    setCurrent(idx);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <div className="relative w-full min-h-[550px] lg:h-[70vh] flex items-center overflow-hidden mesh-gradient-bg pt-16 border-b border-hairline">
      {/* Mesh gradient helper is styled in global.css */}
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Block - Title & Description */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {/* Meta details */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-wider uppercase bg-link/10 text-link px-2 py-0.5 rounded font-bold">
                    {type === 'tv' ? 'TV Series' : 'Feature Movie'}
                  </span>
                  {year && (
                    <span className="font-mono text-xs text-mute">{year}</span>
                  )}
                  <div className="flex items-center gap-0.5 text-yellow-500 font-mono text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{item.vote_average ? item.vote_average.toFixed(1) : '0.0'}</span>
                  </div>
                </div>

                {/* Display Title - Vercel Typography (600, negative tracking, period terminated) */}
                <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink leading-tight">
                  {title}
                </h1>

                {/* Overview */}
                <p className="text-body text-sm leading-relaxed line-clamp-4 max-w-lg">
                  {item.overview || "No description available for this feature content."}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <a
                    href={`/${type}/${item.id}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold tracking-wide hover:bg-neutral-800 transition-all shadow-level-2"
                  >
                    <Play className="w-4 h-4 fill-current text-white" />
                    Play Stream
                  </a>
                  <a
                    href={`/${type}/${item.id}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-canvas text-ink border border-hairline text-sm font-semibold tracking-wide hover:bg-canvas-soft transition-all shadow-level-1"
                  >
                    <Info className="w-4 h-4 text-mute" />
                    See Details
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Block - Cinematic Widescreen Mockup */}
          <div className="lg:col-span-7 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-video rounded-xl overflow-hidden shadow-level-4 bg-canvas-soft-2 border border-hairline group"
              >
                <img
                  src={backdropUrl(item.backdrop_path)}
                  alt={rawTitle}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
                
                {/* Soft gradient card overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Play button floating */}
                <a 
                  href={`/${type}/${item.id}`}
                  className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/35 transition-colors cursor-pointer group/play"
                >
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-level-3 transform scale-90 group-hover/play:scale-100 transition-all duration-300">
                    <Play className="w-6 h-6 text-black fill-current ml-1" />
                  </div>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center sm:justify-start gap-1.5 mt-8">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'w-6 bg-link' : 'w-1.5 bg-mute/40 hover:bg-mute'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
