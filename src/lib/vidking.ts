// src/lib/vidking.ts
const VIDKING_BASE = 'https://www.vidking.net';

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
  const params = new URLSearchParams({});
  if (opts.autoPlay !== false) params.set('autoPlay', 'true');
  
  const query = params.toString();
  return `${VIDKING_BASE}/embed/movie/${opts.tmdbId}${query ? `?${query}` : ''}`;
}

export function tvEmbedUrl(opts: TVEmbedOptions): string {
  const params = new URLSearchParams({
    color: 'e50914', // TV player with custom color e50914
    autoPlay: String(opts.autoPlay ?? true),
    nextEpisode: 'true', // next episode button enabled
    episodeSelector: 'true', // episode selection menu enabled
  });
  return `${VIDKING_BASE}/embed/tv/${opts.tmdbId}/${opts.season}/${opts.episode}?${params}`;
}
