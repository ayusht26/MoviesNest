import { cn } from '../../lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function Skeleton({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-white/5',
        className
      )}
      {...props}
    />
  );
}
