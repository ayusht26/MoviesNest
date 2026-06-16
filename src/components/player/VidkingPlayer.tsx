'use client';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { movieEmbedUrl, tvEmbedUrl } from '../../lib/vidking';

interface MovieProps {
  type: 'movie';
  tmdbId: string | number;
  progress?: number;
  autoPlay?: boolean;
  title?: string;
  posterUrl?: string;
  onClose?: () => void;
}

interface TVProps {
  type: 'tv';
  tmdbId: string | number;
  season: number;
  episode: number;
  progress?: number;
  autoPlay?: boolean;
  title?: string;
  episodeName?: string;
  posterUrl?: string;
  onNextEpisode?: () => void;
  onClose?: () => void;
}

type Props = MovieProps | TVProps;

export default function VidkingPlayer(props: Props) {
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [initialProgress, setInitialProgress] = useState<number | undefined>(undefined);
  const [showServerTip, setShowServerTip] = useState(true);

  const isTV = props.type === 'tv';
  const tvProps = props as TVProps;

  const storageKey = props.type === 'movie'
    ? `nest_progress_movie_${props.tmdbId}`
    : `nest_progress_tv_${props.tmdbId}_s${tvProps.season}_e${tvProps.episode}`;

  // Hide server tip after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowServerTip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Disable body scroll when full-tab player is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('player-active');
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.classList.remove('player-active');
    };
  }, []);

  // Load progress and mount client-side
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setInitialProgress(Number(saved));
    } else {
      setInitialProgress(undefined);
    }
    setLoading(true);
    setIsMounted(true);
  }, [storageKey]);

  // Listen to postMessage from Vidking to save progress
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      try {
        const msg = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (msg?.type !== 'PLAYER_EVENT') return;
        const d = msg.data;

        if (d.event === 'timeupdate' && d.currentTime !== undefined) {
          const key = d.mediaType === 'movie'
            ? `nest_progress_movie_${d.id}`
            : `nest_progress_tv_${d.id}_s${d.season}_e${d.episode}`;
          localStorage.setItem(key, String(Math.floor(d.currentTime)));
        }
      } catch (err) {
        // Silently catch JSON parsing errors from other sources
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  if (!isMounted) {
    return null;
  }

  const src = props.type === 'movie'
    ? movieEmbedUrl({ tmdbId: props.tmdbId, progress: initialProgress ?? props.progress, autoPlay: props.autoPlay })
    : tvEmbedUrl({
        tmdbId: props.tmdbId,
        season: tvProps.season,
        episode: tvProps.episode,
        progress: initialProgress ?? props.progress,
        autoPlay: props.autoPlay,
      });

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black z-[9999] flex flex-col justify-center items-center overflow-hidden animate-fade-up">
      {/* Loading state */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20 gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-cyan/20 border-t-cyan animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            </div>
          </div>
          <div className="text-center max-w-xs px-4 mt-2">
            <p className="text-white text-sm font-medium animate-pulse">Connecting to server...</p>
            <p className="text-gray-600 text-xs font-mono mt-1 mb-3">Powered by Vidking</p>
            <div className="border-t border-neutral-900 pt-3">
              <p className="text-gray-500 text-[10px] leading-relaxed">
                💡 Stuck on a black screen? Switch servers using the cylinder icon in the bottom-right controls.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Vidking iframe */}
      <iframe
        key={src} // key forces remount on src change
        src={src}
        className="w-full h-full border-0"
        allowFullScreen
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        onLoad={() => setLoading(false)}
        referrerPolicy="no-referrer"
      />

      {/* Floating Exit Button */}
      {props.onClose && (
        <div className="absolute top-4 left-4 z-30 pointer-events-auto">
          <button
            onClick={props.onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-white/90 hover:text-white font-medium text-xs transition-all cursor-pointer shadow-lg backdrop-blur-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Exit Player
          </button>
        </div>
      )}

      {/* Floating Server Tip Overlay */}
      {showServerTip && !loading && (
        <div className="absolute top-4 right-4 z-30 pointer-events-none max-w-[260px] animate-fade-up">
          <div className="bg-black/80 border border-white/10 rounded-xl p-3.5 shadow-2xl backdrop-blur-sm">
            <p className="text-white text-xs font-semibold flex items-center gap-1.5 mb-1">
              <span>💡</span> Stuck loading?
            </p>
            <p className="text-gray-400 text-[10px] leading-relaxed">
              If the video is stuck on a black screen, click the <span className="text-cyan font-semibold">Server Selector Icon</span> (cylinder database symbol) in the bottom-right of the controls to switch sources.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
