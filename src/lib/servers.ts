export interface EmbedServer {
  id: string;
  name: string;
  buildMovieUrl: (tmdbId: string | number, progress?: number) => string;
  buildTvUrl: (tmdbId: string | number, season: number, episode: number, progress?: number) => string;
}

export const EMBED_SERVERS: EmbedServer[] = [
  {
    id: 'vidking',
    name: 'VidKing',
    buildMovieUrl: (id, progress) =>
      `https://www.vidking.net/embed/movie/${id}?autoPlay=true${progress && progress > 10 ? `&progress=${Math.floor(progress)}` : ''}`,
    buildTvUrl: (id, s, e, progress) =>
      `https://www.vidking.net/embed/tv/${id}/${s}/${e}?color=00D4FF&autoPlay=true&nextEpisode=true&episodeSelector=true${progress && progress > 10 ? `&progress=${Math.floor(progress)}` : ''}`,
  },
  {
    id: 'vidsrc',
    name: 'VidSrc',
    buildMovieUrl: (id) => `https://vidsrc.to/embed/movie/${id}`,
    buildTvUrl: (id, s, e) => `https://vidsrc.to/embed/tv/${id}/${s}/${e}`,
  },
  {
    id: 'vidsrc2',
    name: 'VidSrc Pro',
    buildMovieUrl: (id) => `https://vidsrc.pro/embed/movie/${id}`,
    buildTvUrl: (id, s, e) => `https://vidsrc.pro/embed/tv/${id}/${s}/${e}`,
  },
  {
    id: 'embed3',
    name: 'Server 3',
    buildMovieUrl: (id) => `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`,
    buildTvUrl: (id, s, e) => `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${s}&e=${e}`,
  },
  {
    id: 'superembed',
    name: 'SuperEmbed',
    buildMovieUrl: (id) => `https://multiembed.mov/?video_id=${id}&tmdb=1`,
    buildTvUrl: (id, s, e) => `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${s}&e=${e}`,
  },
];
