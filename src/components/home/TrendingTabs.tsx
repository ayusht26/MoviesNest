'use client';
import { useState } from 'react';
import MovieCard from '../cards/MovieCard';
import ScrollRow from '../ui/ScrollRow';

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
  movies: Movie[];
  tv: Movie[];
}

export default function TrendingTabs({ movies, tv }: Props) {
  const [activeTab, setActiveTab] = useState<'movie' | 'tv'>('movie');

  const currentItems = activeTab === 'movie' ? movies : tv;

  return (
    <section className="relative py-8">
      {/* Tab Header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-link font-semibold mb-1 block">
            / Live Catalog
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
            Trending today.
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-hairline pb-px">
          <button
            onClick={() => setActiveTab('movie')}
            className={`px-4 py-2 text-sm font-medium transition-all relative ${
              activeTab === 'movie' ? 'text-ink font-semibold' : 'text-mute hover:text-ink'
            }`}
          >
            Movies
            {activeTab === 'movie' && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-link rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('tv')}
            className={`px-4 py-2 text-sm font-medium transition-all relative ${
              activeTab === 'tv' ? 'text-ink font-semibold' : 'text-mute hover:text-ink'
            }`}
          >
            Series
            {activeTab === 'tv' && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-link rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Row content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-6 scroll-smooth">
          {currentItems.map(item => (
            <MovieCard
              key={item.id}
              id={item.id}
              title={item.title || item.name || ''}
              poster_path={item.poster_path}
              vote_average={item.vote_average}
              release_date={item.release_date}
              first_air_date={item.first_air_date}
              media_type={activeTab}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
