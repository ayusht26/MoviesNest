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
  const containerRef = useRef<HTMLElement>(null);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  // Drag to scroll mouse state
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Mouse drag events
  const onMouseDown = (e: React.MouseEvent) => {
    const el = rowRef.current;
    if (!el) return;
    setIsDown(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftState(el.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDown(false);
  };

  const onMouseUp = () => {
    setIsDown(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const el = rowRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed modifier
    el.scrollLeft = scrollLeftState - walk;
  };

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

  // Intersection Observer to lazy load the row
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = rowRef.current;
    if (el && hasEnteredViewport) {
      updateScrollState();
      // Add resize listener
      window.addEventListener('resize', updateScrollState);
      return () => window.removeEventListener('resize', updateScrollState);
    }
  }, [children, hasEnteredViewport]);

  return (
    <section ref={containerRef} className="mb-10">
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
        className="flex gap-3 overflow-x-auto hide-scrollbar px-4 sm:px-6 lg:px-8 pb-4 scroll-smooth cursor-grab active:cursor-grabbing select-none"
        onScroll={updateScrollState}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {hasEnteredViewport ? children : Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-[150px] sm:w-[170px] lg:w-[190px] aspect-[2/3] rounded-lg bg-canvas-soft-2 animate-pulse flex-shrink-0" />
        ))}
      </div>
    </section>
  );
}
