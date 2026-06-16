'use client';
import { useState } from 'react';
import MovieCard from '../cards/MovieCard';
import ScrollRowWrapper from '../ui/ScrollRowWrapper';

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
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-link dark:text-cyan mb-1 block">
            LIVE CATALOG
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink dark:text-white">
            Trending today.
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-hairline pb-px">
          <button
            onClick={() => setActiveTab('movie')}
            className={`px-4 py-2 text-sm font-medium transition-all relative cursor-pointer ${
              activeTab === 'movie' ? 'text-ink dark:text-white font-semibold' : 'text-mute hover:text-ink dark:hover:text-white'
            }`}
          >
            Movies
            {activeTab === 'movie' && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-link dark:bg-cyan rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('tv')}
            className={`px-4 py-2 text-sm font-medium transition-all relative cursor-pointer ${
              activeTab === 'tv' ? 'text-ink dark:text-white font-semibold' : 'text-mute hover:text-ink dark:hover:text-white'
            }`}
          >
            Series
            {activeTab === 'tv' && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-link dark:bg-cyan rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Row content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollRowWrapper>
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
        </ScrollRowWrapper>
      </div>
    </section>
  );
}
