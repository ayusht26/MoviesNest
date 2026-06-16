import ScrollRow from '../ui/ScrollRow';
import { imgUrl } from '../../lib/tmdb';

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
}

interface Props {
  cast: CastMember[];
}

export default function CastRow({ cast }: Props) {
  if (!cast || cast.length === 0) return null;

  return (
    <ScrollRow title="Top Billed Cast" accent="cyan">
      {cast.slice(0, 12).map(member => (
        <div key={member.id} className="flex-shrink-0 w-[120px] sm:w-[140px] text-center">
          <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full overflow-hidden mx-auto bg-nest-surface border border-nest-border mb-3 group">
            <img
              src={member.profile_path ? imgUrl(member.profile_path, 'h632') : '/placeholder.jpg'}
              alt={member.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <p className="text-nest-text text-xs font-semibold line-clamp-1">{member.name}</p>
          <p className="text-nest-muted text-[10px] sm:text-xs mt-0.5 line-clamp-1">{member.character}</p>
        </div>
      ))}
    </ScrollRow>
  );
}
