const PREFIX = 'nest_progress';

export function getProgressKey(
  tmdbId: string | number,
  mediaType: 'movie' | 'tv',
  season?: number,
  episode?: number
): string {
  return mediaType === 'movie'
    ? `${PREFIX}_movie_${tmdbId}`
    : `${PREFIX}_tv_${tmdbId}_s${season}_e${episode}`;
}

export function getSavedProgress(key: string): number {
  try {
    const val = localStorage.getItem(key);
    return val ? parseInt(val, 10) : 0;
  } catch {
    return 0;
  }
}

export function saveProgress(key: string, seconds: number): void {
  try {
    localStorage.setItem(key, String(Math.floor(seconds)));
  } catch {}
}

export function clearProgress(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {}
}

export function getAllProgress(): Array<{
  key: string;
  tmdbId: string;
  mediaType: 'movie' | 'tv';
  season?: number;
  episode?: number;
  seconds: number;
}> {
  try {
    return Object.keys(localStorage)
      .filter(k => k.startsWith(PREFIX))
      .map(key => {
        const val = localStorage.getItem(key);
        const seconds = val ? parseInt(val, 10) : 0;
        if (key.includes('_movie_')) {
          const tmdbId = key.replace(`${PREFIX}_movie_`, '');
          return { key, tmdbId, mediaType: 'movie' as const, seconds };
        } else {
          const match = key.match(/_tv_(\d+)_s(\d+)_e(\d+)/);
          if (!match) return null;
          return {
            key,
            tmdbId: match[1],
            mediaType: 'tv' as const,
            season: parseInt(match[2]),
            episode: parseInt(match[3]),
            seconds,
          };
        }
      })
      .filter(Boolean) as any[];
  } catch {
    return [];
  }
}
