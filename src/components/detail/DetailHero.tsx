'use client';
import { useState } from 'react';
import { Play, Calendar, Clock, Film, Tv, Star } from 'lucide-react';
import { backdropUrl, imgUrl } from '../../lib/tmdb';
import { formatRuntime } from '../../lib/utils';
import Skeleton from '../ui/Skeleton';

interface Genre {
  id: number;
  name: string;
}

interface Props {
  title: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  genres: Genre[];
  runtime?: number;
  tagline?: string;
  media_type: 'movie' | 'tv';
  onPlayClick?: () => void;
}

export default function DetailHero({
  title,
  backdrop_path,
  poster_path,
  vote_average,
  overview,
  release_date,
  first_air_date,
  genres,
  runtime,
  tagline,
  media_type,
  onPlayClick,
}: Props) {
  const [backdropLoaded, setBackdropLoaded] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const year = (release_date || first_air_date || '').slice(0, 4);
  const rawTitle = title.endsWith('.') ? title : `${title}.`;

  return (
    <div className="relative w-full min-h-[50vh] lg:h-[65vh] flex items-end overflow-hidden pb-12 pt-28 bg-[#0a0a0a]">
      {/* Backdrop Image */}
      <div className="absolute inset-0">
        {!backdropLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-none opacity-20" />
        )}
        <img
          src={backdrop_path ? backdropUrl(backdrop_path) : '/placeholder.jpg'}
          alt={title}
          onLoad={() => setBackdropLoaded(true)}
          className={`w-full h-full object-cover object-top transition-opacity duration-700 ${
            backdropLoaded ? 'opacity-30' : 'opacity-0'
          }`}
        />
        {/* Layered Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-end animate-fade-up">
          {/* Poster Card */}
          <div className="hidden lg:block w-[220px] aspect-[2/3] rounded-lg overflow-hidden shadow-level-3 border border-neutral-800 flex-shrink-0 group relative">
            {!posterLoaded && (
              <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
            )}
            <img
              src={poster_path ? imgUrl(poster_path, 'w500') : '/placeholder.jpg'}
              alt={title}
              onLoad={() => setPosterLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-103 ${
                posterLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          {/* Details Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-cyan/15 text-cyan border border-cyan/20 text-[10px] font-mono font-bold uppercase tracking-wider">
                {media_type === 'tv' ? <Tv className="w-3 h-3" /> : <Film className="w-3 h-3" />}
                {media_type === 'tv' ? 'Series' : 'Movie'}
              </span>
              {year && (
                <span className="font-mono text-xs text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {year}
                </span>
              )}
              {runtime ? (
                <span className="font-mono text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {formatRuntime(runtime)}
                </span>
              ) : null}
            </div>

            {/* Title - Vercel Display font style (period terminated, negative tracking, semi-bold) */}
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight mb-2">
              {rawTitle}
            </h1>

            {tagline && (
              <p className="text-cyan font-medium italic text-sm sm:text-base mb-4 opacity-90">
                "{tagline}"
              </p>
            )}

            {/* Ratings row */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="flex items-center gap-0.5 text-yellow-400 font-mono text-xs font-semibold bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{vote_average ? vote_average.toFixed(1) : '0.0'}</span>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mb-6 line-clamp-3 lg:line-clamp-none">
              {overview}
            </p>

            {/* Genres Row */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
              {genres && genres.map(g => (
                <span 
                  key={g.id} 
                  className="px-2.5 py-0.5 rounded bg-neutral-900 text-gray-300 border border-neutral-800 text-[10px] font-mono font-medium"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            {onPlayClick && (
              <div className="flex justify-center lg:justify-start">
                <button
                  onClick={onPlayClick}
                  className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-cyan text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-md shadow-cyan/10"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Launch Player
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
