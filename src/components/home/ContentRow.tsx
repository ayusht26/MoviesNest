import { useState, useEffect } from 'react';
import ContentCard from '../cards/ContentCard';

interface ContentRowProps {
  title: string;
  fetchFn: () => Promise<any>;
  mediaType?: 'movie' | 'tv';
}

export default function ContentRow({ title, fetchFn, mediaType }: ContentRowProps) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchFn().then((data: any) => {
      setItems(data?.results || []);
    }).catch(() => {});
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
        {items.slice(0, 12).map((item: any) => (
          <ContentCard
            key={item.id}
            id={item.id}
            title={item.title || item.name || ''}
            posterPath={item.poster_path}
            mediaType={mediaType || item.media_type === 'tv' ? 'tv' : 'movie'}
            rating={item.vote_average}
            year={item.release_date || item.first_air_date}
          />
        ))}
      </div>
    </div>
  );
}
