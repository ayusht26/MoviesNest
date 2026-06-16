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
  const [showExit, setShowExit] = useState(false);
  const [paused, setPaused] = useState(false);

  const isTV = props.type === 'tv';
  const tvProps = props as TVProps;

  const storageKey = props.type === 'movie'
    ? `nest_progress_movie_${props.tmdbId}`
    : `nest_progress_tv_${props.tmdbId}_s${tvProps.season}_e${tvProps.episode}`;

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

  // Mount client-side
  useEffect(() => {
    setLoading(true);
    setIsMounted(true);
  }, [storageKey]);

  // Force hide loading screen after 5 seconds to prevent getting stuck
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Listen to postMessage from Vidking to save progress and track play/pause states
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

          try {
            const listJson = localStorage.getItem('moviesnest_continue_watching');
            let list = [];
            if (listJson) {
              list = JSON.parse(listJson);
            }
            if (!Array.isArray(list)) {
              list = [];
            }
            
            // Remove existing entry so the updated one is moved to the top
            list = list.filter((item: any) => !(String(item.id) === String(d.id) && item.mediaType === d.mediaType));

            list.unshift({
              id: d.id,
              mediaType: d.mediaType,
              title: props.title ? props.title.split(' - Season')[0] : (d.mediaType === 'movie' ? 'Movie' : 'Series'),
              posterUrl: props.posterUrl || '',
              season: d.season || undefined,
              episode: d.episode || undefined,
              updatedAt: Date.now()
            });

            // Limit to 12 items
            if (list.length > 12) {
              list = list.slice(0, 12);
            }

            localStorage.setItem('moviesnest_continue_watching', JSON.stringify(list));
          } catch (err) {
            console.error("Error writing to continue watching list:", err);
          }
        }

        if (d.event === 'play') {
          setPaused(false);
        }
        if (d.event === 'pause') {
          setPaused(true);
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

  // Generate source URL (VidKing only)
  const src = props.type === 'movie'
    ? movieEmbedUrl({ tmdbId: props.tmdbId, autoPlay: props.autoPlay })
    : tvEmbedUrl({
        tmdbId: props.tmdbId,
        season: tvProps.season,
        episode: tvProps.episode,
        autoPlay: props.autoPlay,
      });

  const isExitVisible = showExit || paused || loading;

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
            <p className="text-gray-600 text-xs font-mono mt-1">Powered by Vidking</p>
          </div>
        </div>
      )}

      {/* Video Iframe */}
      <iframe
        key={src} // key forces remount on src change
        src={src}
        className="w-full h-full border-0"
        allowFullScreen
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        onLoad={() => setLoading(false)}
        referrerPolicy="no-referrer"
      />

      {/* Invisible Hover Sensor Area (Top Left Corner) */}
      <div
        className="absolute top-0 left-0 w-64 h-32 z-40 bg-transparent pointer-events-auto"
        onMouseEnter={() => setShowExit(true)}
        onMouseLeave={() => setShowExit(false)}
        onTouchStart={() => setShowExit(prev => !prev)}
      />

      {/* Exit Button - Animated visibility */}
      {props.onClose && (
        <div
          className={`absolute top-4 left-4 z-50 transition-opacity duration-300 pointer-events-auto ${
            isExitVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onMouseEnter={() => setShowExit(true)}
          onMouseLeave={() => setShowExit(false)}
        >
          <button
            onClick={props.onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/75 hover:bg-black border border-white/10 text-white/90 hover:text-white font-medium text-xs transition-all cursor-pointer shadow-lg backdrop-blur-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Exit Player
          </button>
        </div>
      )}
    </div>
  );
}
