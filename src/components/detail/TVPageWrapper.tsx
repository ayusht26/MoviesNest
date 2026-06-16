'use client';
import { useState } from 'react';
import DetailHero from './DetailHero';
import EpisodeSelector from '../player/EpisodeSelector';
import VidkingPlayer from '../player/VidkingPlayer';
import { imgUrl } from '../../lib/tmdb';

interface Genre {
  id: number;
  name: string;
}

interface Season {
  season_number: number;
  episode_count: number;
  name: string;
}

interface Props {
  showId: string;
  title: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  first_air_date?: string;
  genres: Genre[];
  tagline?: string;
  seasons: Season[];
}

export default function TVPageWrapper({
  showId,
  title,
  backdrop_path,
  poster_path,
  vote_average,
  overview,
  first_air_date,
  genres,
  tagline,
  seasons,
}: Props) {
  const [activeEpisode, setActiveEpisode] = useState<{
    season: number;
    episode: number;
    episodeTitle: string;
  } | null>(null);

  const poster = poster_path ? imgUrl(poster_path, 'w342') : '';

  return (
    <>
      {/* Detail Hero Section */}
      <DetailHero
        tmdbId={showId}
        title={title}
        backdrop_path={backdrop_path}
        poster_path={poster_path}
        vote_average={vote_average}
        overview={overview}
        first_air_date={first_air_date}
        genres={genres}
        tagline={tagline}
        media_type="tv"
      />

      {/* TV Episodes Selector */}
      <div id="episodes-section" className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 scroll-mt-24">
        <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight flex items-center gap-2 mb-2">
          <span className="w-1.5 h-6 rounded-full bg-cyan inline-block animate-pulse" />
          Stream Episodes.
        </h2>
        <EpisodeSelector
          showId={Number(showId)}
          seasons={seasons}
          onPlayEpisode={(season, episode, epTitle) => {
            setActiveEpisode({ season, episode, episodeTitle: epTitle });
          }}
        />
      </div>

      {/* Full-screen Player Overlay for TV Episode Playback */}
      {activeEpisode && (
        <VidkingPlayer
          type="tv"
          tmdbId={showId}
          season={activeEpisode.season}
          episode={activeEpisode.episode}
          title={`${title} - Season ${activeEpisode.season}, Episode ${activeEpisode.episode}`}
          episodeName={activeEpisode.episodeTitle}
          posterUrl={poster_path}
          autoPlay={true}
          onClose={() => setActiveEpisode(null)}
          onNextEpisode={() => {
            // Check if there is a next episode in the current season or next season
            const currentSeasonData = seasons.find(s => s.season_number === activeEpisode.season);
            if (currentSeasonData && activeEpisode.episode < currentSeasonData.episode_count) {
              // Play next episode in same season
              setActiveEpisode({
                season: activeEpisode.season,
                episode: activeEpisode.episode + 1,
                episodeTitle: `Episode ${activeEpisode.episode + 1}`
              });
            } else {
              // Try to find next season
              const nextSeasonNum = activeEpisode.season + 1;
              const nextSeasonData = seasons.find(s => s.season_number === nextSeasonNum);
              if (nextSeasonData && nextSeasonData.episode_count > 0) {
                // Play S(N+1) E1
                setActiveEpisode({
                  season: nextSeasonNum,
                  episode: 1,
                  episodeTitle: 'Episode 1'
                });
              } else {
                // No more episodes, close player
                setActiveEpisode(null);
              }
            }
          }}
        />
      )}
    </>
  );
}
