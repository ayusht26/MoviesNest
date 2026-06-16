'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Film, Tv, Clock, Trash2 } from 'lucide-react';
import { searchMulti, imgUrl } from '../../lib/tmdb';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Result {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  media_type: 'movie' | 'tv' | 'person';
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  overview?: string;
}

const HISTORY_KEY = 'nest_search_history';

export default function SearchModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [activeType, setActiveType] = useState<'all' | 'movie' | 'tv'>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) setHistory(JSON.parse(saved));
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Keyboard shortcut for closing Search Modal (Esc is already handled here, Cmd+K / Ctrl+K is handled by Navbar)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); return; }
    setLoading(true);
    try {
      const data = await searchMulti(q);
      setResults((data.results || []).filter((r: Result) => r.media_type !== 'person').slice(0, 12));
    } catch { setResults([]); }
    finally { setLoading(false); }
  }, []);

  const onInput = (val: string) => {
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val), 350);
  };

  const saveHistory = (q: string) => {
    const updated = [q, ...history.filter(h => h !== q)].slice(0, 5);
    setHistory(updated);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  };

  const filteredResults = activeType === 'all'
    ? results
    : results.filter(r => r.media_type === activeType);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-nest-bg/85 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl glass-card rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-nest-border z-10"
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.25 }}
          >
            {/* Input row */}
            <div className="flex items-center gap-3 p-4 border-b border-nest-border">
              <Search className="w-5 h-5 text-nest-accent flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => onInput(e.target.value)}
                placeholder="Search movies, TV shows..."
                className="flex-1 bg-transparent text-nest-text placeholder:text-nest-muted text-base outline-none"
              />
              {/* Filter pills */}
              <div className="flex gap-1">
                {(['all', 'movie', 'tv'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setActiveType(t)}
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all ${
                      activeType === t
                        ? 'bg-nest-accent text-nest-bg'
                        : 'text-nest-muted hover:text-nest-text'
                    }`}
                  >
                    {t === 'all' ? 'All' : t === 'tv' ? 'TV' : 'Movies'}
                  </button>
                ))}
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-nest-muted hover:text-nest-text transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content area */}
            <div className="max-h-[60vh] overflow-y-auto">
              {/* Loading skeleton */}
              {loading && (
                <div className="p-4 space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-3 animate-pulse">
                      <div className="w-12 h-16 rounded-lg bg-white/5" />
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-3 bg-white/5 rounded w-3/4" />
                        <div className="h-3 bg-white/5 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Search history (no query) */}
              {!query && !loading && history.length > 0 && (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-widest text-nest-muted font-mono">Recent</span>
                    <button
                      onClick={() => { setHistory([]); localStorage.removeItem(HISTORY_KEY); }}
                      className="text-xs text-nest-muted hover:text-nest-accent flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Clear
                    </button>
                  </div>
                  {history.map(h => (
                    <button
                      key={h}
                      onClick={() => { setQuery(h); onInput(h); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
                    >
                      <Clock className="w-4 h-4 text-nest-muted" />
                      <span className="text-nest-muted text-sm">{h}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Results */}
              {!loading && filteredResults.length > 0 && (
                <div className="p-3">
                  {filteredResults.map(item => {
                    const title = item.title || item.name || '';
                    const href = `/${item.media_type}/${item.id}`;
                    const year = (item.release_date || item.first_air_date || '').slice(0, 4);
                    return (
                      <a
                        key={item.id}
                        href={href}
                        onClick={() => { saveHistory(query); onClose(); }}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
                      >
                        <div className="w-12 h-16 rounded-lg overflow-hidden bg-nest-surface flex-shrink-0">
                          <img
                            src={item.poster_path ? imgUrl(item.poster_path, 'w92') : '/placeholder.jpg'}
                            alt={title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-nest-text font-semibold text-sm truncate group-hover:text-nest-accent transition-colors">
                            {title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {item.media_type === 'tv'
                              ? <Tv className="w-3 h-3 text-nest-muted" />
                              : <Film className="w-3 h-3 text-nest-muted" />
                            }
                            <span className="text-nest-muted text-xs font-mono">{year}</span>
                            {item.vote_average && item.vote_average > 0 && (
                              <span className="text-nest-gold text-xs font-mono">★ {item.vote_average.toFixed(1)}</span>
                            )}
                          </div>
                          {item.overview && (
                            <p className="text-nest-muted text-xs mt-1 line-clamp-1">{item.overview}</p>
                          )}
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}

              {/* No results */}
              {!loading && query && filteredResults.length === 0 && (
                <div className="p-12 text-center">
                  <Search className="w-12 h-12 text-nest-muted mx-auto mb-3 opacity-40" />
                  <p className="text-nest-muted">No results for "{query}"</p>
                  <p className="text-nest-muted text-sm mt-1">Try a different spelling or keyword</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
