'use client';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

export default function ScrollRowWrapper({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  // Drag to scroll mouse state
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const checkScroll = () => {
    const el = containerRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 10);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      checkScroll();
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [children]);

  const scroll = (direction: 'left' | 'right') => {
    const el = containerRef.current;
    if (el) {
      const scrollAmount = el.clientWidth * 0.75;
      el.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 400);
    }
  };

  // Mouse drag events
  const onMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
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
    const el = containerRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed modifier
    el.scrollLeft = scrollLeftState - walk;
  };

  return (
    <div className="relative group/row w-full">
      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar pb-6 scroll-smooth cursor-grab active:cursor-grabbing select-none"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {children}
      </div>

      {/* Floating Arrows */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-6 z-20 w-12 bg-gradient-to-r from-nest-bg via-nest-bg/70 to-transparent flex items-center justify-start pl-2 opacity-100 md:opacity-0 md:group-hover/row:opacity-100 transition-opacity duration-200 cursor-pointer disabled:pointer-events-none"
          aria-label="Scroll left"
        >
          <div className="w-8 h-8 rounded-full border border-hairline bg-canvas dark:bg-neutral-900 flex items-center justify-center shadow-level-2 hover:scale-105 transition-all text-ink dark:text-white">
            <ChevronLeft className="w-4 h-4" />
          </div>
        </button>
      )}
      
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-6 z-20 w-12 bg-gradient-to-l from-nest-bg via-nest-bg/70 to-transparent flex items-center justify-end pr-2 opacity-100 md:opacity-0 md:group-hover/row:opacity-100 transition-opacity duration-200 cursor-pointer disabled:pointer-events-none"
          aria-label="Scroll right"
        >
          <div className="w-8 h-8 rounded-full border border-hairline bg-canvas dark:bg-neutral-900 flex items-center justify-center shadow-level-2 hover:scale-105 transition-all text-ink dark:text-white">
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>
      )}
    </div>
  );
}
