'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Play, Calendar } from 'lucide-react';
import { imgUrl } from '../../lib/tmdb';
import Skeleton from '../ui/Skeleton';

interface Props {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: 'movie' | 'tv';
}

export default function MovieCard({ id, title, poster_path, vote_average, release_date, first_air_date, media_type = 'movie' }: Props) {
  const [hovered, setHovered] = useState(false);
  const href = `/${media_type}/${id}`;
  const year = (release_date || first_air_date || '').slice(0, 4);

  return (
    <motion.a
      href={href}
      className="group block relative flex-shrink-0 w-[150px] sm:w-[170px] lg:w-[190px] rounded-lg overflow-hidden glass-card cursor-pointer shadow-level-1 hover:shadow-level-3 transition-shadow duration-300"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.025, y: -3 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-canvas-soft-2">
        <Skeleton className="absolute inset-0 w-full h-full rounded-none z-0" />
        <img
          src={poster_path ? imgUrl(poster_path, 'w342') : '/placeholder.jpg'}
          alt={title}
          className="relative z-10 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.jpg';
          }}
          draggable={false}
        />

        {/* Hover play overlay */}
        <motion.div
          className="absolute inset-0 bg-[#171717]/40 flex flex-col items-center justify-center p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-200">
            <Play className="w-4 h-4 text-black fill-current ml-0.5" />
          </div>
        </motion.div>

        {/* Rating badge */}
        <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] text-yellow-400 font-mono font-bold">
          <Star className="w-2.5 h-2.5 fill-current" />
          <span>{vote_average ? vote_average.toFixed(1) : '0.0'}</span>
        </div>
      </div>

      {/* Info Panel */}
      <div className="p-3">
        <p className="text-xs font-semibold leading-snug line-clamp-2 text-ink group-hover:text-link transition-colors font-sans">
          {title}
        </p>
        {year && (
          <div className="flex items-center gap-1 mt-1 text-[10px] text-mute font-mono">
            <Calendar className="w-3 h-3 flex-shrink-0" />
            <span>{year}</span>
            <span className="mx-1">•</span>
            <span className="uppercase text-[9px] font-bold tracking-wider px-1 py-0.2 rounded bg-canvas-soft-2 border border-hairline group-hover:bg-link/5 group-hover:text-link group-hover:border-link/10 transition-colors">
              {media_type}
            </span>
          </div>
        )}
      </div>

      {/* Focus / hover hairline ring */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none border border-transparent"
        animate={{ borderColor: hovered ? 'var(--color-link)' : 'transparent' }}
        transition={{ duration: 0.15 }}
      />
    </motion.a>
  );
}
