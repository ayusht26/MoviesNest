import TopTenCard from '../cards/TopTenCard';
import ScrollRowWrapper from '../ui/ScrollRowWrapper';

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
  media_type?: 'movie' | 'tv';
  release_date?: string;
  first_air_date?: string;
}

interface Props {
  items: Movie[];
  title?: string;
}

export default function TopTenGrid({ items, title = "Top 10 Rated Movies." }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <section className="relative py-8">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-link dark:text-cyan mb-1 block">
          LEADERBOARDS
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink dark:text-white">
          {title}
        </h2>
      </div>

      {/* Row content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollRowWrapper>
          {items.slice(0, 10).map((item, index) => (
            <TopTenCard
              key={item.id}
              rank={index + 1}
              id={item.id}
              title={item.title || item.name || ''}
              poster_path={item.poster_path}
              vote_average={item.vote_average}
              media_type={item.media_type || 'movie'}
              release_date={item.release_date}
              first_air_date={item.first_air_date}
            />
          ))}
        </ScrollRowWrapper>
      </div>
    </section>
  );
}
