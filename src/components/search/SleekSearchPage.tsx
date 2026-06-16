'use client';
import { useState, useEffect } from 'react';
import { searchMulti } from '../../lib/tmdb';
import MovieCard from '../cards/MovieCard';
import Skeleton from '../ui/Skeleton';
import { Search, Compass, AlertCircle, Play } from 'lucide-react';

interface Result {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  media_type: 'movie' | 'tv' | 'person';
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
}

// Pre-defined trending/featured lists to show when search is empty (from MOCK_ITEMS)
const FEATURED_ITEMS: Result[] = [
  {
    id: 1084244,
    title: 'Toy Story 5',
    poster_path: '/pxG26JdyuiDvJbSoucknaFiLeZD.jpg',
    media_type: 'movie',
    vote_average: 7.6,
    release_date: '2026-06-17'
  },
  {
    id: 124364,
    name: 'FROM',
    poster_path: '/pRtJagIxpfODzzb0T0NAvZSzErC.jpg',
    media_type: 'tv',
    vote_average: 8.5,
    first_air_date: '2022-02-20'
  },
  {
    id: 936075,
    title: 'Michael',
    poster_path: '/zm0KAbOjlt9eR5y7vDiL2dEOwMl.jpg',
    media_type: 'movie',
    vote_average: 8.6,
    release_date: '2026-04-22'
  },
  {
    id: 220102,
    name: 'Spider-Noir',
    poster_path: '/oD8WSVqz84ZRfelkr7JPeJwR9Iv.jpg',
    media_type: 'tv',
    vote_average: 8.6,
    first_air_date: '2026-05-25'
  },
  {
    id: 37854,
    name: 'One Piece',
    poster_path: '/dB4EDhre2dsC2kxYDavyKWqLQwi.jpg',
    media_type: 'tv',
    vote_average: 8.7,
    first_air_date: '1999-10-20'
  },
  {
    id: 60625,
    name: 'Rick and Morty',
    poster_path: '/owhkU6KRqdXoUQpjV8uyZGPtX58.jpg',
    media_type: 'tv',
    vote_average: 8.7,
    first_air_date: '2013-12-02'
  },
  {
    id: 76479,
    name: 'The Boys',
    poster_path: '/in1R2dDc421JxsoRWaIIAqVI2KE.jpg',
    media_type: 'tv',
    vote_average: 8.5,
    first_air_date: '2019-07-25'
  },
  {
    id: 1273221,
    title: 'Scary Movie',
    poster_path: '/reZ8NInXjMkkaOpUHcI3Pn7iaRN.jpg',
    media_type: 'movie',
    vote_average: 5.6,
    release_date: '2026-06-03'
  }
];

export default function SleekSearchPage() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [trending, setTrending] = useState<Result[]>(FEATURED_ITEMS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [continueWatching, setContinueWatching] = useState<any[]>([]);

  useEffect(() => {
    try {
      const listJson = localStorage.getItem('moviesnest_continue_watching');
      if (listJson) {
        const list = JSON.parse(listJson);
        if (Array.isArray(list)) {
          setContinueWatching(list);
        }
      }
    } catch {}
  }, []);

  // Fetch trending items on mount
  useEffect(() => {
    let active = true;
    const fetchTrending = async () => {
      try {
        const res = await fetch('/api/tmdb/trending/all/week');
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        if (active && data && data.results && data.results.length > 0) {
          const filtered = data.results.filter(
            (r: any) => r.media_type === 'movie' || r.media_type === 'tv'
          );
          if (filtered.length > 0) {
            setTrending(filtered.slice(0, 12)); // Display up to 12 real trending entries
          }
        }
      } catch (err) {
        console.warn('[SearchPage] Failed to fetch real trending, using mock fallback.', err);
      }
    };
    fetchTrending();
    return () => {
      active = false;
    };
  }, []);

  // Debounce the query input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Fetch results when debounced query changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    let active = true;
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchMulti(debouncedQuery.trim());
        if (active) {
          // Filter out people and invalid types
          const filtered = (data.results || []).filter(
            (r: Result) => r.media_type === 'movie' || r.media_type === 'tv'
          );
          setResults(filtered);
        }
      } catch (err: any) {
        console.error('Search error:', err);
        if (active) {
          setError('Failed to fetch search results. Operating in fallback mode.');
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchResults();
    return () => {
      active = false;
    };
  }, [debouncedQuery]);

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 flex flex-col items-center">
      
      {/* Branding / Hero Section */}
      <div className="text-center mb-12 max-w-2xl animate-fade-up">
        <span className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-mute mb-2 block">
          MoviesNest Database
        </span>
        <h1 className="font-display text-6xl sm:text-8xl text-ink tracking-tight leading-[0.85] mb-4">
          EXPLORE. WATCH.
        </h1>
        <p className="font-mono text-xs sm:text-sm text-body uppercase tracking-[0.15em]">
          Instant media streaming without ads.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="relative w-full max-w-xl mb-16 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 h-5 text-mute" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movie or TV series..."
          className="w-full bg-canvas border border-hairline hover:border-hairline-strong text-ink rounded-lg h-12 pl-12 pr-10 font-sans placeholder-mute transition focus:border-link focus:ring-1 focus:ring-link focus:outline-none text-base shadow-level-1"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-mute hover:text-ink text-sm cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="w-full animate-fade-up" style={{ animationDelay: '0.2s' }}>
        {loading ? (
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-mute mb-6 block">
              Searching the database...
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-[150px] sm:w-[170px] lg:w-[190px] flex flex-col gap-3">
                  <Skeleton className="aspect-[2/3] rounded-lg w-full" />
                  <Skeleton className="h-4 rounded-sm w-3/4" />
                  <Skeleton className="h-3 rounded-sm w-1/2" />
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="py-12 text-center glass-card rounded-lg border border-hairline max-w-lg mx-auto p-8 shadow-level-2">
            <AlertCircle className="w-12 h-12 text-warning mx-auto mb-4" />
            <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.15em] text-ink mb-2">Search Error</h3>
            <p className="text-sm text-body">{error}</p>
          </div>
        ) : query.trim() === '' ? (
          <div className="w-full">
            {/* Continue Watching Section */}
            {continueWatching.length > 0 && (
              <div className="mb-12 w-full">
                <div className="flex items-center gap-2 mb-6 border-b border-hairline pb-2">
                  <Play className="w-4 h-4 text-cyan" />
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-ink">
                    Continue Watching.
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
                  {continueWatching.map((item) => (
                    <div key={item.id} className="relative group animate-fade-up">
                      <MovieCard
                        id={item.id}
                        title={item.title}
                        poster_path={item.posterUrl}
                        vote_average={0}
                        media_type={item.mediaType}
                      />
                      {item.mediaType === 'tv' && item.season && item.episode && (
                        <div className="absolute top-2 left-2 pointer-events-none z-20 px-1.5 py-0.5 rounded bg-cyan text-black font-mono text-[9px] font-bold shadow-sm uppercase tracking-wide">
                          S{item.season} E{item.episode}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Show Featured Items when no search query */}
            <div className="flex items-center gap-2 mb-6 border-b border-hairline pb-2">
              <Compass className="w-4 h-4 text-link" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-ink">
                Trending Entries.
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
              {trending.map((item) => (
                <MovieCard
                  key={item.id}
                  id={item.id}
                  title={item.title || item.name || ''}
                  poster_path={item.poster_path || ''}
                  vote_average={item.vote_average || 0}
                  release_date={item.release_date}
                  first_air_date={item.first_air_date}
                  media_type={item.media_type === 'tv' ? 'tv' : 'movie'}
                />
              ))}
            </div>
          </div>
        ) : results.length > 0 ? (
          <div>
            <div className="flex justify-between items-baseline mb-6 border-b border-hairline pb-2">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-ink">
                Search Results.
              </span>
              <span className="font-mono text-[10px] text-mute uppercase tracking-[0.15em]">
                {results.length} Matches Found
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
              {results.map((item) => (
                <MovieCard
                  key={item.id}
                  id={item.id}
                  title={item.title || item.name || ''}
                  poster_path={item.poster_path || ''}
                  vote_average={item.vote_average || 0}
                  release_date={item.release_date}
                  first_air_date={item.first_air_date}
                  media_type={item.media_type === 'tv' ? 'tv' : 'movie'}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="py-20 text-center glass-card rounded-lg border border-hairline max-w-lg mx-auto p-8 shadow-level-2">
            <Search className="w-12 h-12 text-mute mx-auto mb-4 opacity-40" />
            <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.15em] text-ink mb-2">No Results Found</h3>
            <p className="text-sm text-body px-4">
              We couldn't find any movies or TV shows matching "{query}." Try checking for typos or searching for another title.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
