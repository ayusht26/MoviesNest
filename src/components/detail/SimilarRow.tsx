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
  items: Movie[];
  media_type: 'movie' | 'tv';
}

export default function SimilarRow({ items, media_type }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <ScrollRow title="You May Also Like" accent="cyan">
      {items.map(item => (
        <MovieCard
          key={item.id}
          id={item.id}
          title={item.title || item.name || ''}
          poster_path={item.poster_path}
          vote_average={item.vote_average}
          release_date={item.release_date}
          first_air_date={item.first_air_date}
          media_type={media_type}
        />
      ))}
    </ScrollRow>
  );
}
