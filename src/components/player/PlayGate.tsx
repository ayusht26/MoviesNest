'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import VidkingPlayer from './VidkingPlayer';
import { backdropUrl } from '../../lib/tmdb';

interface MovieGate {
  type: 'movie';
  tmdbId: string | number;
  backdropUrl?: string;
  title: string;
  posterUrl?: string;
}
interface TVGate {
  type: 'tv';
  tmdbId: string | number;
  season: number;
  episode: number;
  backdropUrl?: string;
  title: string;
  episodeName?: string;
  posterUrl?: string;
  onNextEpisode?: () => void;
}
type Props = MovieGate | TVGate;

export default function PlayGate(props: Props) {
  const [revealed, setRevealed] = useState(false);

  const getBackdrop = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('/') || url.includes('unsplash')) return url;
    return backdropUrl(url);
  };

  const reveal = () => {
    setRevealed(true);
    setTimeout(() => {
      document.getElementById('player-gate')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const hasBackdrop = !!props.backdropUrl;
  const isTV = props.type === 'tv';
  const tvProps = props as TVGate;

  return (
    <div id="player-gate" className="scroll-mt-24 w-full">
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="relative w-full aspect-video rounded-xl overflow-hidden bg-black cursor-pointer group"
            onClick={reveal}
          >
            {/* Backdrop thumbnail */}
            {hasBackdrop && (
              <img
                src={getBackdrop(props.backdropUrl)}
                alt={props.title}
                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
              />
            )}
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Center play button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <motion.div
                className="w-20 h-20 rounded-full bg-nest-accent/90 flex items-center justify-center shadow-2xl shadow-nest-accent/40"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Play className="w-8 h-8 text-nest-bg fill-current ml-1" />
              </motion.div>
              <div className="text-center px-4">
                <p className="text-white font-semibold text-lg sm:text-xl drop-shadow-md">{props.title}</p>
                {isTV && (
                  <p className="text-nest-muted text-sm font-mono mt-1">
                    Season {tvProps.season} · Episode {tvProps.episode}
                  </p>
                )}
                <p className="text-nest-accent text-sm mt-1 font-medium tracking-wide">Click to stream</p>
              </div>
            </div>

            {/* Pulsing ring animation */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <div className="w-28 h-28 rounded-full border-2 border-nest-accent" />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="player"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {props.type === 'movie' ? (
              <VidkingPlayer
                type="movie"
                tmdbId={props.tmdbId}
                autoPlay={true}
                title={props.title}
                posterUrl={props.posterUrl}
                onClose={() => setRevealed(false)}
              />
            ) : (
              <VidkingPlayer
                type="tv"
                tmdbId={props.tmdbId}
                season={tvProps.season}
                episode={tvProps.episode}
                autoPlay={true}
                title={props.title}
                episodeName={tvProps.episodeName}
                posterUrl={props.posterUrl}
                onNextEpisode={tvProps.onNextEpisode}
                onClose={() => setRevealed(false)}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
