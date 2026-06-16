import { cn } from '../../lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function Skeleton({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800',
        className
      )}
      {...props}
    />
  );
}
