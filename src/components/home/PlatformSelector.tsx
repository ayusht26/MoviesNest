'use client';
import { useState, useEffect } from 'react';
import { ChevronDown, Film, Loader2 } from 'lucide-react';
import { getDiscoverByNetwork, NETWORKS } from '../../lib/tmdb';
import MovieCard from '../cards/MovieCard';

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: 'movie' | 'tv';
}

interface Props {
  initialItems: Movie[];
}

export default function PlatformSelector({ initialItems }: Props) {
  const [activeNetwork, setActiveNetwork] = useState(NETWORKS[0]); // Default to Netflix
  const [items, setItems] = useState<Movie[]>(initialItems);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelectNetwork = async (network: typeof NETWORKS[0]) => {
    setActiveNetwork(network);
    setDropdownOpen(false);
    
    setLoading(true);
    try {
      const data = await getDiscoverByNetwork(network.id, 'tv');
      setItems(data.results || []);
    } catch (err) {
      console.error('Failed fetching network shows:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-8">
      {/* Header with trigger dropdown */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <span className="font-mono text-[10px] uppercase tracking-widest text-link font-semibold mb-1 block">
          / Networks
        </span>
        <div className="relative inline-block">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 text-2xl sm:text-3xl font-semibold tracking-tight text-ink hover:text-link transition-colors focus:outline-none"
          >
            Only on <span className="underline decoration-link/40 decoration-wavy underline-offset-4">{activeNetwork.name}</span>
            <ChevronDown className="w-5 h-5 text-mute" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <>
              {/* Overlay to close */}
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              
              <div className="absolute left-0 mt-2 w-64 bg-canvas rounded-xl shadow-level-4 z-50 py-1.5 border border-hairline animate-fade-up">
                {NETWORKS.map(network => {
                  const isSelected = network.id === activeNetwork.id;
                  return (
                    <button
                      key={network.id}
                      onClick={() => handleSelectNetwork(network)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors text-left ${
                        isSelected 
                          ? 'bg-canvas-soft-2 text-ink font-semibold' 
                          : 'text-body hover:bg-canvas-soft-2 hover:text-ink'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span 
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: network.color }}
                        />
                        {network.name}
                      </div>
                      {isSelected && (
                        <span className="text-[10px] bg-link/10 text-link px-1.5 py-0.2 rounded font-mono font-bold">
                          ACTIVE
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Row content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="h-[280px] flex items-center justify-center bg-canvas rounded-xl border border-hairline shadow-level-1">
            <div className="flex flex-col items-center gap-2.5">
              <Loader2 className="w-8 h-8 text-link animate-spin" />
              <p className="text-xs text-mute font-mono">Loading dynamic catalog...</p>
            </div>
          </div>
        ) : items.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-6 scroll-smooth">
            {items.map(item => (
              <MovieCard
                key={item.id}
                id={item.id}
                title={item.title || item.name || ''}
                poster_path={item.poster_path}
                vote_average={item.vote_average}
                release_date={item.release_date}
                first_air_date={item.first_air_date}
                media_type="tv"
              />
            ))}
          </div>
        ) : (
          <div className="h-[280px] flex items-center justify-center bg-canvas rounded-xl border border-hairline shadow-level-1 text-mute text-sm font-mono">
            No shows found for this platform.
          </div>
        )}
      </div>
    </section>
  );
}
