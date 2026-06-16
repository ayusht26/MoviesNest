'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkipBack, SkipForward, ArrowLeft, Play } from 'lucide-react';
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
  const [paused, setPaused] = useState(false);
  const [ended, setEnded] = useState(false);
  const [progress, setProgress] = useState(0); // 0–100
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [savedProgress, setSavedProgress] = useState<number | undefined>();
  const [showControls, setShowControls] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const isTV = props.type === 'tv';
  const tvProps = props as TVProps;

  const storageKey = props.type === 'movie'
    ? `nest_progress_movie_${props.tmdbId}`
    : `nest_progress_tv_${props.tmdbId}_s${tvProps.season}_e${tvProps.episode}`;

  // Disable body scroll when full-tab player is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

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

  // Hide controls after 3 seconds of mouse inactivity
  useEffect(() => {
    if (paused) {
      setShowControls(true);
      return;
    }
    let timeoutId: NodeJS.Timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [paused]);

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
      className="fixed inset-0 w-screen h-screen bg-black z-[9999] flex flex-col justify-center items-center overflow-hidden animate-fade-up"
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
        className="w-full h-full border-0"
        allowFullScreen
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        onLoad={() => setLoading(false)}
        referrerPolicy="no-referrer"
      />

      {/* ── IMMERSIVE CONTROL OVERLAY (Top bar and Bottom HUD) ── */}
      <AnimatePresence>
        {(showControls || paused) && !loading && !ended && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between"
          >
            {/* Top Bar - contains Back button and Title */}
            <div className="w-full p-6 flex items-center gap-4 bg-gradient-to-b from-black/95 via-black/70 to-transparent pointer-events-none">
              {props.onClose && (
                <button
                  onClick={props.onClose}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium text-sm transition-all pointer-events-auto cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Exit Player
                </button>
              )}
              <div className="flex-1 min-w-0">
                <span className="text-xs text-nest-accent dark:text-cyan font-mono uppercase tracking-widest block mb-0.5">
                  {props.type === 'movie' ? 'Cinema Movie' : 'TV Series'}
                </span>
                <h1 className="text-white text-lg sm:text-xl font-bold truncate tracking-tight">{title}</h1>
              </div>
            </div>

            {/* Bottom HUD - contains playback details, progress bar, Next Episode */}
            <div className="w-full p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent pointer-events-none flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="flex items-start gap-4 max-w-2xl">
                {props.posterUrl && (
                  <img
                    src={props.posterUrl}
                    alt={title}
                    className="w-14 h-20 rounded-md object-cover shadow-2xl border border-neutral-800 hidden sm:block opacity-90"
                  />
                )}
                <div className="flex-1">
                  {isTV_ && (
                    <p className="text-white/60 text-sm font-mono mb-1">
                      S{tvProps.season} · E{tvProps.episode}
                      {tvProps.episodeName && ` — ${tvProps.episodeName}`}
                    </p>
                  )}
                  {/* Progress bar */}
                  {duration > 0 && (
                    <div className="space-y-1.5">
                      <div className="w-64 sm:w-80 h-1.5 rounded-full bg-white/20 overflow-hidden">
                        <div
                          className="h-full bg-nest-accent rounded-full transition-all duration-1000"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-white/40 text-xs font-mono">
                        {fmt(currentTime)} / {fmt(duration)} ({Math.floor(progress)}%)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Next Episode Button */}
              {isTV_ && tvProps.onNextEpisode && (
                <button
                  onClick={tvProps.onNextEpisode}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-nest-accent hover:bg-white text-nest-bg hover:text-black font-semibold text-sm transition-all pointer-events-auto cursor-pointer shadow-lg shadow-nest-accent/20 align-self-start sm:align-self-auto"
                >
                  Next Episode
                  <SkipForward className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PAUSE OVERLAY (pulsing center play indicator) ── */}
      <AnimatePresence>
        {paused && !loading && !ended && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-[3px] pointer-events-none z-8 flex flex-col items-center justify-center"
          >
            {/* Center pulsing Play Icon (click-through) */}
            <div className="flex flex-col items-center gap-3">
              <motion.div
                className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white"
                animate={{ scale: [1, 1.05, 1], opacity: [0.8, 0.9, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </motion.div>
              <p className="text-white/60 text-xs font-mono uppercase tracking-widest">
                Click anywhere to resume
              </p>
            </div>
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
            className="absolute inset-0 bg-black/90 backdrop-blur-md z-20 flex flex-col items-center justify-center gap-6 pointer-events-auto"
          >
            <div className="text-center">
              <p className="text-nest-accent dark:text-cyan text-sm font-mono uppercase tracking-widest mb-2">
                {isTV_ ? 'Episode Finished' : 'Movie Finished'}
              </p>
              <h3 className="text-white font-bold text-2xl sm:text-3xl tracking-tight">{title}</h3>
            </div>
            <div className="flex gap-4">
              {/* Watch again — reload iframe */}
              <button
                onClick={() => { setEnded(false); setLoading(true); }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-all cursor-pointer shadow-lg"
              >
                <SkipBack className="w-4 h-4" />
                Watch Again
              </button>
              {/* Next episode (TV only) */}
              {isTV_ && tvProps.onNextEpisode && (
                <button
                  onClick={tvProps.onNextEpisode}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-nest-accent text-nest-bg font-semibold text-sm hover:bg-white transition-all cursor-pointer shadow-lg glow-cyan"
                >
                  Next Episode
                  <SkipForward className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Progress indicator bar — thin strip at very bottom of player when playing ── */}
      {!loading && duration > 0 && !paused && !ended && (
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
