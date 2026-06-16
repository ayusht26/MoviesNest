'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, SkipBack, SkipForward } from 'lucide-react';
import { movieEmbedUrl, tvEmbedUrl } from '../../lib/vidking';

interface MovieProps {
  type: 'movie';
  tmdbId: string | number;
  progress?: number;
  autoPlay?: boolean;
  title?: string;
  posterUrl?: string;
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
}
type Props = MovieProps | TVProps;

export default function VidkingPlayer(props: Props) {
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [ended, setEnded] = useState(false);
  const [progress, setProgress] = useState(0); // 0–100
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [savedProgress, setSavedProgress] = useState<number | undefined>();
  const containerRef = useRef<HTMLDivElement>(null);

  const isTV = props.type === 'tv';
  const tvProps = props as TVProps;

  const storageKey = props.type === 'movie'
    ? `nest_progress_movie_${props.tmdbId}`
    : `nest_progress_tv_${props.tmdbId}_s${tvProps.season}_e${tvProps.episode}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setSavedProgress(Number(saved));
    setLoading(true);
    setPaused(false);
    setEnded(false);
    setProgress(0);
  }, [storageKey]);

  // Listen to postMessage from Vidking
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      try {
        const msg = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (msg?.type !== 'PLAYER_EVENT') return;
        const d = msg.data;

        if (d.event === 'timeupdate') {
          setCurrentTime(d.currentTime || 0);
          setDuration(d.duration || 0);
          const pct = d.duration > 0 ? (d.currentTime / d.duration) * 100 : 0;
          setProgress(pct);
          setPaused(false);
          setEnded(false);
          localStorage.setItem(storageKey, String(Math.floor(d.currentTime)));
        }
        if (d.event === 'play')  { setPaused(false); setEnded(false); }
        if (d.event === 'pause') { setPaused(true); }
        if (d.event === 'ended') { setEnded(true); setPaused(false); }
        if (d.event === 'seeked') { setPaused(false); }
      } catch {}
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [storageKey]);

  // Format seconds as h:mm:ss or m:ss
  const fmt = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    return `${m}:${String(sec).padStart(2,'0')}`;
  };

  const src = props.type === 'movie'
    ? movieEmbedUrl({ tmdbId: props.tmdbId, progress: savedProgress ?? props.progress, autoPlay: props.autoPlay })
    : tvEmbedUrl({
        tmdbId: props.tmdbId,
        season: tvProps.season,
        episode: tvProps.episode,
        progress: savedProgress ?? props.progress,
        autoPlay: props.autoPlay,
      });

  const title = props.title || '';
  const isTV_ = props.type === 'tv';

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl shadow-black/60"
    >
      {/* ── Loading state ── */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20 gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-nest-accent/20 border-t-nest-accent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-nest-accent animate-pulse" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-white text-sm font-medium animate-pulse">Connecting to server...</p>
            <p className="text-gray-600 text-xs font-mono mt-1">Powered by Vidking</p>
          </div>
        </div>
      )}

      {/* ── Vidking iframe ── */}
      <iframe
        key={src} /* ← key forces remount on src change, preventing crashes */
        src={src}
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        onLoad={() => setLoading(false)}
        referrerPolicy="no-referrer"
      />

      {/* ── Netflix-style PAUSE overlay ── */}
      <AnimatePresence>
        {paused && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 pointer-events-none z-10"
          >
            {/* Dark vignette on pause — like Netflix */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

            {/* Paused info — bottom left, like Netflix */}
            <div className="absolute bottom-8 left-6 right-6">
              {props.posterUrl && (
                <img
                  src={props.posterUrl}
                  alt={title}
                  className="w-12 h-16 rounded-md object-cover mb-3 shadow-lg opacity-90"
                />
              )}
              <p className="text-white/60 text-xs font-mono uppercase tracking-widest mb-1">Paused</p>
              <h3 className="text-white font-semibold text-xl leading-tight">{title}</h3>
              {isTV_ && (
                <p className="text-white/60 text-sm mt-1 font-mono">
                  S{tvProps.season} · E{tvProps.episode}
                  {tvProps.episodeName && ` — ${tvProps.episodeName}`}
                </p>
              )}
              {/* Progress bar */}
              {duration > 0 && (
                <div className="mt-3 space-y-1">
                  <div className="w-64 h-1 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full bg-nest-accent rounded-full transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-white/40 text-xs font-mono">
                    {fmt(currentTime)} / {fmt(duration)}
                  </p>
                </div>
              )}
            </div>

            {/* Center pause icon (brief flash, then fades) — like Netflix */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 1, scale: 0.8 }}
              animate={{ opacity: 0, scale: 1.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Pause className="w-10 h-10 text-white fill-white" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ENDED overlay — Netflix "watch again" style ── */}
      <AnimatePresence>
        {ended && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-6 pointer-events-auto"
          >
            <div className="text-center">
              <p className="text-white/60 text-sm font-mono uppercase tracking-widest mb-2">
                {isTV_ ? 'Episode Finished' : 'Movie Finished'}
              </p>
              <h3 className="text-white font-bold text-2xl">{title}</h3>
            </div>
            <div className="flex gap-4">
              {/* Watch again — reload iframe */}
              <button
                onClick={() => { setEnded(false); setLoading(true); }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-nest-accent transition-all cursor-pointer"
              >
                <SkipBack className="w-4 h-4" />
                Watch Again
              </button>
              {/* Next episode (TV only) */}
              {isTV_ && tvProps.onNextEpisode && (
                <button
                  onClick={tvProps.onNextEpisode}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-nest-accent text-nest-bg font-semibold text-sm hover:bg-white transition-all glow-cyan cursor-pointer"
                >
                  Next Episode
                  <SkipForward className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Progress indicator bar — thin strip at very bottom of player ── */}
      {!loading && duration > 0 && !paused && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-10 pointer-events-none">
          <div
            className="h-full bg-nest-accent transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
