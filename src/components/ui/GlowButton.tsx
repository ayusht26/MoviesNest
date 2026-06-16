import React from 'react';
import { cn } from '../../lib/utils';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
}

export default function GlowButton({ variant = 'primary', className, children, ...props }: Props) {
  return (
    <button
      className={cn(
        'relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform active:scale-95 focus:outline-none flex items-center justify-center gap-2',
        variant === 'primary' && 'bg-nest-accent text-nest-bg hover:bg-white hover:shadow-lg hover:shadow-nest-accent/30 glow-cyan',
        variant === 'secondary' && 'glass-card text-nest-text hover:bg-white/10 hover:border-white/20',
        variant === 'accent' && 'bg-gradient-to-r from-nest-accent to-purple-500 text-white hover:brightness-110 hover:shadow-lg hover:shadow-purple-500/25',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
