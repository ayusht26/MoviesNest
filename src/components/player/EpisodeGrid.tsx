import { useState, useEffect } from 'react';
import { getTVSeason } from '../../lib/tmdb';
import { img } from '../../lib/tmdb';

interface Episode {
  episode_number: number;
  name: string;
  still_path?: string;
  overview?: string;
  air_date?: string;
  runtime?: number;
}

interface Season {
  season_number: number;
  episode_count: number;
  name: string;
}

interface Props {
  showId: number;
  seasons: Season[];
  currentSeason: number;
  currentEpisode: number;
  onSelect: (season: number, episode: number) => void;
  onSeasonChange: (season: number) => void;
}

export default function EpisodeGrid({ showId, seasons, currentSeason, currentEpisode, onSelect, onSeasonChange }: Props) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    const fetchEpisodes = async () => {
      try {
        const data = await getTVSeason(showId, currentSeason);
        if (active) setEpisodes(data.episodes || []);
      } catch (err) {
        console.error('Error fetching season:', err);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchEpisodes();
    return () => { active = false; };
  }, [showId, currentSeason]);

  return (
    <div className="bg-[#141414] rounded-lg overflow-hidden border border-[#2a2a2a]">
      {/* Season tabs */}
      <div className="flex gap-2 p-4 border-b border-[#2a2a2a] overflow-x-auto hide-scrollbar">
        {seasons.map(season => (
          <button
            key={season.season_number}
            onClick={() => { onSeasonChange(season.season_number); onSelect(season.season_number, 1); }}
            className={`flex-shrink-0 px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
              currentSeason === season.season_number
                ? 'bg-cyan-400 border-cyan-400 text-black'
                : 'bg-[#1f1f1f] border-[#2a2a2a] text-gray-400 hover:text-white'
            }`}
          >
            {season.name || `Season ${season.season_number}`}
          </button>
        ))}
      </div>

      {/* Episode grid */}
      <div className="p-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-3 p-2 rounded-lg bg-[#1f1f1f] animate-pulse">
                <div className="w-[120px] aspect-video rounded bg-[#2a2a2a] flex-shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-3 w-1/4 bg-[#2a2a2a] rounded" />
                  <div className="h-3 w-3/4 bg-[#2a2a2a] rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {episodes.map(episode => {
              const isActive = episode.episode_number === currentEpisode;
              return (
                <button
                  key={episode.episode_number}
                  onClick={() => onSelect(currentSeason, episode.episode_number)}
                  className={`flex gap-3 text-left p-2 rounded-lg border transition-all ${
                    isActive
                      ? 'border-cyan-400/40 bg-cyan-400/5'
                      : 'border-[#2a2a2a] bg-[#1a1a1a] hover:bg-[#222]'
                  }`}
                >
                  <div className="w-[120px] aspect-video rounded overflow-hidden bg-black flex-shrink-0 relative">
                    {episode.still_path ? (
                      <img src={img(episode.still_path, 'w300')} alt="" className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">No image</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold">
                        EP {episode.episode_number}
                      </span>
                      {isActive && (
                        <span className="text-[8px] px-1 py-0.5 rounded bg-cyan-400 text-black font-bold">NOW</span>
                      )}
                    </div>
                    <p className="text-sm text-white font-medium truncate">{episode.name}</p>
                    {episode.overview && (
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">{episode.overview}</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
