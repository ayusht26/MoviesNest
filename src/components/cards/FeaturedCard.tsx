'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Play, Calendar } from 'lucide-react';
import { imgUrl, backdropUrl } from '../../lib/tmdb';

interface Props {
  id: number;
  title: string;
  backdrop_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: 'movie' | 'tv';
  overview?: string;
}

export default function FeaturedCard({ id, title, backdrop_path, vote_average, release_date, first_air_date, media_type = 'movie', overview }: Props) {
  const [hovered, setHovered] = useState(false);
  const href = `/${media_type}/${id}`;
  const year = (release_date || first_air_date || '').slice(0, 4);

  return (
    <motion.a
      href={href}
      className="group block relative flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[380px] rounded-xl overflow-hidden glass-card cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Backdrop */}
      <div className="relative aspect-[16/9] overflow-hidden bg-nest-surface">
        <img
          src={backdrop_path ? backdropUrl(backdrop_path) : '/placeholder.jpg'}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.jpg';
          }}
          draggable={false}
        />

        {/* Gradient vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-nest-bg/95 via-nest-bg/40 to-transparent" />

        {/* Hover play reveal */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-nest-accent/90 flex items-center justify-center glow-cyan">
            <Play className="w-5 h-5 text-nest-bg fill-current ml-0.5" />
          </div>
        </motion.div>

        {/* Rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-sm">
          <Star className="w-3 h-3 fill-nest-gold text-nest-gold" />
          <span className="font-mono text-[11px] text-nest-gold">{vote_average ? vote_average.toFixed(1) : '0.0'}</span>
        </div>

        {/* Info overlay */}
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-nest-accent/20 border border-nest-accent/30 text-nest-accent font-mono uppercase tracking-wider">
            {media_type === 'tv' ? 'Series' : 'Movie'}
          </span>
          <h3 className="text-nest-text font-bold text-sm sm:text-base truncate group-hover:text-nest-accent transition-colors mt-2">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            {year && (
              <span className="font-mono text-[11px] text-nest-muted flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {year}
              </span>
            )}
            {overview && (
              <p className="text-[11px] text-nest-muted line-clamp-1 flex-1">
                {overview}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Glow border on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none border"
        animate={{ borderColor: hovered ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.07)' }}
        transition={{ duration: 0.2 }}
      />
    </motion.a>
  );
}
