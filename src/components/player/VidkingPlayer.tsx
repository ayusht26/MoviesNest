'use client';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { movieEmbedUrl, tvEmbedUrl } from '../../lib/vidking';

interface MovieProps {
  type: 'movie';
  tmdbId: string | number;
  progress?: number;
}

interface TVProps {
  type: 'tv';
  tmdbId: string | number;
  season: number;
  episode: number;
  progress?: number;
}

type Props = MovieProps | TVProps;

export default function VidkingPlayer(props: Props) {
  const [loading, setLoading] = useState(true);
  const [savedProgress, setSavedProgress] = useState<number | undefined>();
  
  const isTV = props.type === 'tv';
  const tvProps = props as TVProps;
  
  const storageKey = props.type === 'movie'
    ? `nest_progress_movie_${props.tmdbId}`
    : `nest_progress_tv_${props.tmdbId}_s${tvProps.season}_e${tvProps.episode}`;

  // Load saved progress on mount
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setSavedProgress(Number(saved));
    setLoading(true); // Reset loader on source change
  }, [storageKey]);

  // Listen for progress events from Vidking
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      try {
        const msg = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (msg?.type === 'PLAYER_EVENT' && msg.data?.event === 'timeupdate') {
          localStorage.setItem(storageKey, String(Math.floor(msg.data.currentTime)));
        }
      } catch {}
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [storageKey]);

  const src = props.type === 'movie'
    ? movieEmbedUrl({ tmdbId: props.tmdbId, progress: savedProgress ?? props.progress })
    : tvEmbedUrl({
        tmdbId: props.tmdbId,
        season: tvProps.season,
        episode: tvProps.episode,
        progress: savedProgress ?? props.progress,
      });

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-level-3">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] z-10 gap-3">
          <Loader2 className="w-8 h-8 text-cyan animate-spin" />
          <p className="text-xs text-gray-500 font-mono">Initializing player server...</p>
        </div>
      )}
      <iframe
        src={src}
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen; picture-in-picture"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
