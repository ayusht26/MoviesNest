// src/lib/vidking.ts
const VIDKING_BASE = 'https://www.vidking.net';
const BRAND_COLOR  = '00D4FF'; // matches nest.accent without #

export interface MovieEmbedOptions {
  tmdbId: string | number;
  progress?: number;
  autoPlay?: boolean;
}

export interface TVEmbedOptions {
  tmdbId: string | number;
  season: number;
  episode: number;
  progress?: number;
  autoPlay?: boolean;
}

export function movieEmbedUrl(opts: MovieEmbedOptions): string {
  const params = new URLSearchParams({
    color: BRAND_COLOR,
    autoPlay: String(opts.autoPlay ?? true),
  });
  if (opts.progress) params.set('progress', String(opts.progress));
  return `${VIDKING_BASE}/embed/movie/${opts.tmdbId}?${params}`;
}

export function tvEmbedUrl(opts: TVEmbedOptions): string {
  const params = new URLSearchParams({
    color: BRAND_COLOR,
    autoPlay: String(opts.autoPlay ?? true),
    nextEpisode: 'true',
    episodeSelector: 'true',
  });
  if (opts.progress) params.set('progress', String(opts.progress));
  return `${VIDKING_BASE}/embed/tv/${opts.tmdbId}/${opts.season}/${opts.episode}?${params}`;
}
