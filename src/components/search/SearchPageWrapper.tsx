'use client';
import { useState, useEffect } from 'react';
import { searchMulti } from '../../lib/tmdb';
import SearchResults from './SearchResults';
import Skeleton from '../ui/Skeleton';
import { Search } from 'lucide-react';

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

export default function SearchPageWrapper() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    setQuery(q);

    if (!q) {
      setLoading(false);
      return;
    }

    let active = true;
    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await searchMulti(q);
        if (active) {
          setResults((data.results || []).filter((r: Result) => r.media_type !== 'person'));
        }
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchResults();

    return () => { active = false; };
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <div className="mb-8 border-b border-hairline pb-6 animate-fade-up">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink flex items-center gap-3">
          <Search className="w-6 h-6 text-link" />
          {query ? (
            <span>Search results for <span className="text-link">"{query}."</span></span>
          ) : (
            <span>Search catalogue.</span>
          )}
        </h1>
        {query && !loading && (
          <p className="text-xs text-mute mt-2 font-mono uppercase tracking-wider">Found {results.length} matches</p>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[2/3] rounded-xl" />
          ))}
        </div>
      ) : results.length > 0 ? (
        <SearchResults results={results} />
      ) : (
        <div className="py-20 text-center glass-card rounded-2xl border border-nest-border max-w-lg mx-auto animate-fade-up">
          <Search className="w-16 h-16 text-nest-muted mx-auto mb-4 opacity-40" />
          <h3 className="text-lg font-bold text-nest-text">No results found</h3>
          <p className="text-sm text-nest-muted mt-1 px-6">
            We couldn't find any movies or TV shows matching your search query. Try checking for typos or searching for another title.
          </p>
        </div>
      )}
    </div>
  );
}
