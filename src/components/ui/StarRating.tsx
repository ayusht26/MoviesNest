import { Star, StarHalf } from 'lucide-react';

interface Props {
  rating: number; // e.g. 8.4 out of 10
  maxStars?: number;
}

export default function StarRating({ rating, maxStars = 5 }: Props) {
  const scaledRating = (rating / 10) * maxStars;
  const fullStars = Math.floor(scaledRating);
  const hasHalfStar = scaledRating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5 text-nest-gold">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="w-4.5 h-4.5 fill-current text-nest-gold" />
      ))}
      {hasHalfStar && <StarHalf className="w-4.5 h-4.5 fill-current text-nest-gold" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="w-4.5 h-4.5 text-white/20" />
      ))}
    </div>
  );
}
