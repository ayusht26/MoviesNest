import MovieCard from '../cards/MovieCard';

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

interface Props {
  results: Result[];
}

export default function SearchResults({ results }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 justify-items-center">
      {results.map(item => {
        const title = item.title || item.name || '';
        const type = item.media_type === 'tv' ? 'tv' : 'movie';
        return (
          <MovieCard
            key={item.id}
            id={item.id}
            title={title}
            poster_path={item.poster_path || ''}
            vote_average={item.vote_average || 0}
            release_date={item.release_date}
            first_air_date={item.first_air_date}
            media_type={type}
          />
        );
      })}
    </div>
  );
}
