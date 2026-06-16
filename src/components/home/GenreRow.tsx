'use client';
import { useState, useEffect } from 'react';
import { getMoviesByGenre } from '../../lib/tmdb';
import MovieCard from '../cards/MovieCard';
import { Loader2 } from 'lucide-react';

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

interface Genre {
  id: number;
  name: string;
}

const DEFAULT_GENRES: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 878, name: 'Sci-Fi' },
  { id: 27, name: 'Horror' },
];

export default function GenreRow() {
  const [selectedGenre, setSelectedGenre] = useState<number>(DEFAULT_GENRES[0].id);
  const [items, setItems] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchGenreContent = async () => {
      setLoading(true);
      try {
        const data = await getMoviesByGenre(String(selectedGenre));
        if (active) {
          setItems(data.results || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchGenreContent();
    return () => { active = false; };
  }, [selectedGenre]);

  return (
    <section className="relative py-8">
      {/* Genre tabs header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-link font-semibold mb-1 block">
            / Filter
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
            Browse by genre.
          </h2>
        </div>
        
        {/* Pills */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {DEFAULT_GENRES.map(genre => {
            const isSelected = selectedGenre === genre.id;
            return (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border shadow-sm ${
                  isSelected
                    ? 'bg-primary border-primary text-white'
                    : 'bg-canvas text-body hover:text-ink border-hairline hover:bg-canvas-soft'
                }`}
              >
                {genre.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Row container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="h-[280px] flex items-center justify-center bg-canvas rounded-xl border border-hairline shadow-level-1">
            <Loader2 className="w-8 h-8 text-link animate-spin" />
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
                media_type="movie"
              />
            ))}
          </div>
        ) : (
          <div className="h-[280px] flex items-center justify-center bg-canvas rounded-xl border border-hairline shadow-level-1 text-mute text-sm font-mono">
            No content found for this genre.
          </div>
        )}
      </div>
    </section>
  );
}
