'use client';
import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { getTVSeason, imgUrl } from '../../lib/tmdb';
import Skeleton from '../ui/Skeleton';

interface Episode {
  episode_number: number;
  name: string;
  still_path?: string;
  overview?: string;
  air_date?: string;
}

interface Season {
  season_number: number;
  episode_count: number;
  name: string;
}

interface Props {
  showId: number;
  seasons: Season[];
  onPlayEpisode?: (season: number, episode: number, title: string) => void;
}

export default function EpisodeSelector({ showId, seasons, onPlayEpisode }: Props) {
  const [activeSeason, setActiveSeason] = useState(seasons.length > 0 ? seasons.filter(s => s.season_number > 0)[0]?.season_number || 1 : 1);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchEpisodes = async () => {
      setLoading(true);
      try {
        const data = await getTVSeason(String(showId), String(activeSeason));
        if (active) {
          setEpisodes(data.episodes || []);
        }
      } catch (err) {
        console.error("Error fetching season episodes:", err);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchEpisodes();
    return () => { active = false; };
  }, [showId, activeSeason]);

  const validSeasons = seasons.filter(s => s.season_number > 0);

  return (
    <div className="bg-neutral-900/30 rounded-xl overflow-hidden mt-8 border border-neutral-800 shadow-level-2">
      {/* Season Tabs */}
      <div className="flex gap-2 p-4 border-b border-neutral-800 overflow-x-auto hide-scrollbar bg-neutral-950/20">
        {validSeasons.map(season => {
          const isActive = activeSeason === season.season_number;
          return (
            <button
              key={season.season_number}
              onClick={() => setActiveSeason(season.season_number)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                isActive
                  ? 'bg-cyan border-cyan text-black shadow-md shadow-cyan/10 font-bold'
                  : 'bg-neutral-900 border-neutral-800 text-gray-400 hover:text-white hover:border-neutral-700'
              }`}
            >
              {season.name || `Season ${season.season_number}`}
            </button>
          );
        })}
      </div>

      {/* Episode Grid/List */}
      <div className="p-4 bg-neutral-950/10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg bg-neutral-900/40 border border-neutral-800/50">
                <Skeleton className="w-[120px] sm:w-[140px] aspect-[16/10] rounded bg-neutral-800 flex-shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <Skeleton className="h-3 w-1/4 bg-neutral-800" />
                  <Skeleton className="h-3 w-3/4 bg-neutral-800" />
                  <Skeleton className="h-2.5 w-5/6 bg-neutral-800" />
                </div>
              </div>
            ))}
          </div>
        ) : episodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {episodes.map(episode => {
              return (
                <button
                  key={episode.episode_number}
                  onClick={() => onPlayEpisode?.(activeSeason, episode.episode_number, episode.name)}
                  className="flex gap-3 text-left p-3 rounded-lg border border-neutral-800/40 bg-neutral-900/25 hover:bg-neutral-900/65 hover:border-neutral-800 transition-all duration-200 group w-full cursor-pointer focus:outline-none"
                >
                  {/* Thumbnail Still */}
                  <div className="relative w-[110px] sm:w-[130px] aspect-[16/10] rounded overflow-hidden bg-neutral-950 flex-shrink-0">
                    <img
                      src={episode.still_path ? imgUrl(episode.still_path, 'w300') : '/placeholder.jpg'}
                      alt={episode.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-5 h-5 text-white fill-white/80" />
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="font-mono text-[9px] text-cyan font-bold tracking-wide uppercase">
                        EP {episode.episode_number}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-white group-hover:text-cyan transition-colors truncate">
                      {episode.name}
                    </h4>
                    {episode.overview && (
                      <p className="text-[11px] text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                        {episode.overview}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-400 text-xs font-mono">
            No episodes found for this season.
          </div>
        )}
      </div>
    </div>
  );
}
