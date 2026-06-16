'use client';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  title: string;
  accent?: string;
  children: React.ReactNode;
}

export default function ScrollRow({ title, accent = '', children }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateScrollState = () => {
    const el = rowRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 5);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  const scroll = (dir: 'left' | 'right') => {
    const el = rowRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
    setTimeout(updateScrollState, 400);
  };

  useEffect(() => {
    const el = rowRef.current;
    if (el) {
      updateScrollState();
      // Add resize listener
      window.addEventListener('resize', updateScrollState);
      return () => window.removeEventListener('resize', updateScrollState);
    }
  }, [children]);

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-bold text-nest-text flex items-center gap-3">
          {accent && (
            <span className="w-1.5 h-6 rounded-full bg-nest-accent inline-block animate-pulse" />
          )}
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canLeft}
            className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-nest-muted hover:text-nest-accent hover:border-nest-accent/40 disabled:opacity-30 disabled:hover:text-nest-muted disabled:hover:border-nest-border transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canRight}
            className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-nest-muted hover:text-nest-accent hover:border-nest-accent/40 disabled:opacity-30 disabled:hover:text-nest-muted disabled:hover:border-nest-border transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div
        ref={rowRef}
        className="flex gap-3 overflow-x-auto hide-scrollbar px-4 sm:px-6 lg:px-8 pb-4"
        onScroll={updateScrollState}
      >
        {children}
      </div>
    </section>
  );
}
