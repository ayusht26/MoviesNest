import { useState, useRef } from 'react';

interface ContentCardProps {
  id: number;
  title: string;
  posterPath: string | null;
  mediaType: 'movie' | 'tv';
  rating?: number;
  year?: string;
  runtime?: number;
  seasonCount?: number;
  genres?: string[];
  overview?: string;
}

export default function ContentCard({
  id,
  title,
  posterPath,
  mediaType,
  rating,
  year,
  runtime,
  seasonCount,
  genres,
  overview,
}: ContentCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<'left' | 'right'>('right');
  const cardRef = useRef<HTMLAnchorElement>(null);

  const imgSrc = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : '/placeholder-poster.jpg';

  const href = mediaType === 'movie' ? `/movie/${id}` : `/tv/${id}`;

  function handleMouseEnter() {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const rightSpace = window.innerWidth - rect.right;
      setTooltipPos(rightSpace < 320 ? 'left' : 'right');
    }
  }

  const truncateTitle = (text: string, max: number) =>
    text.length > max ? text.slice(0, max).trim() + '...' : text;

  return (
    <a
      ref={cardRef}
      href={href}
      className="group relative flex-shrink-0 w-[160px] sm:w-[180px]"
      onMouseEnter={handleMouseEnter}
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-surface transition-all duration-200 group-hover:scale-105">
        {/* HD badge */}
        <div className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 text-[10px] font-semibold font-mono rounded"
          style={{ background: 'rgba(0,212,255,0.2)', border: '1px solid rgba(0,212,255,0.4)', color: '#00D4FF' }}>
          HD
        </div>

        <div className="absolute inset-0 bg-surface-2 z-0" />
        <img
          src={imgSrc}
          alt={title}
          loading="lazy"
          className="relative z-10 w-full h-full object-cover"
        />
      </div>

      {/* Rating */}
      <div className="mt-1.5 flex items-center gap-1">
        <span className="text-yellow-400 text-xs">&#9733;</span>
        <span className="text-xs text-gray-300 font-medium">
          {rating ? rating.toFixed(1) : 'N/A'}
        </span>
      </div>

      {/* Title */}
      <p className="text-sm text-white leading-tight mt-0.5 line-clamp-2">
        {truncateTitle(title, 40)}
      </p>

      {/* Metadata */}
      {year && (
        <p className="text-xs text-gray-500 mt-0.5">
          {year}
          {runtime && ` • ${formatRuntime(runtime)}`}
          {seasonCount && ` • ${seasonCount} Season${seasonCount > 1 ? 's' : ''}`}
        </p>
      )}

      {/* Hover tooltip */}
      <div
        className={`hidden lg:group-hover:block absolute top-0 z-50 w-72 p-4 rounded-lg shadow-2xl pointer-events-none
          ${tooltipPos === 'right' ? 'left-full ml-3' : 'right-full mr-3'}`}
        style={{ background: '#1a1a1a', border: '1px solid #333' }}
      >
        <p className="text-white font-semibold text-sm mb-1">{title}</p>
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
          {rating && <span className="text-yellow-400">&#9733; {rating.toFixed(1)}</span>}
          {year && <span>{year}</span>}
          {runtime && <span>{formatRuntime(runtime)}</span>}
          {seasonCount && <span>{seasonCount} Season{seasonCount > 1 ? 's' : ''}</span>}
        </div>
        {genres && genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {genres.slice(0, 3).map(g => (
              <span key={g} className="text-[10px] px-1.5 py-0.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#aaa' }}>
                {g}
              </span>
            ))}
          </div>
        )}
        {overview && (
          <p className="text-xs text-gray-500 line-clamp-3">
            {overview}
          </p>
        )}
        <div className="mt-2 px-3 py-1.5 text-xs font-semibold text-center rounded-full"
          style={{ background: '#00D4FF', color: '#000' }}>
          Watch Now
        </div>
      </div>
    </a>
  );
}

function formatRuntime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}
