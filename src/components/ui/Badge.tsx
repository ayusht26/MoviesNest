import { cn } from '../../lib/utils';

interface Props {
  variant?: 'accent' | 'muted' | 'gold' | 'default';
  className?: string;
  children: React.ReactNode;
}

export default function Badge({ variant = 'default', className, children }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-medium border uppercase tracking-wider',
        variant === 'default' && 'bg-white/5 border-white/10 text-nest-text',
        variant === 'accent' && 'bg-nest-accent/10 border-nest-accent/30 text-nest-accent',
        variant === 'muted' && 'bg-white/5 border-white/5 text-nest-muted',
        variant === 'gold' && 'bg-nest-gold/10 border-nest-gold/30 text-nest-gold',
        className
      )}
    >
      {children}
    </span>
  );
}
