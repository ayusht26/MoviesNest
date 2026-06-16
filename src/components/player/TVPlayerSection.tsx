'use client';
import { useState } from 'react';
import PlayGate from './PlayGate';
import EpisodeSelector from './EpisodeSelector';

interface Season {
  season_number: number;
  episode_count: number;
  name: string;
}

interface Props {
  showId: number;
  seasons: Season[];
  showTitle: string;
  backdropUrl?: string;
}

export default function TVPlayerSection({ showId, seasons, showTitle, backdropUrl }: Props) {
  const [activeSeason, setActiveSeason] = useState(1);
  const [activeEpisode, setActiveEpisode] = useState(1);

  const handleSelect = (s: number, e: number) => {
    setActiveSeason(s);
    setActiveEpisode(e);
    // Smooth scroll to player on selection
    const el = document.getElementById('player-display-container');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNextEpisode = () => {
    const seasonInfo = seasons.find(s => s.season_number === activeSeason);
    const maxEpisodes = seasonInfo ? seasonInfo.episode_count : 20;

    if (activeEpisode < maxEpisodes) {
      handleSelect(activeSeason, activeEpisode + 1);
    } else {
      const nextSeasonNum = activeSeason + 1;
      const nextSeasonExists = seasons.some(s => s.season_number === nextSeasonNum);
      if (nextSeasonExists) {
        handleSelect(nextSeasonNum, 1);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Player Display Container */}
      <div id="player-display-container" className="scroll-mt-24">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight flex items-center justify-center gap-2">
            <span className="w-1.5 h-6 rounded-full bg-cyan inline-block animate-pulse" />
            Cinema Stream Player.
          </h2>
          <p className="text-xs text-gray-400 mt-1 font-mono uppercase tracking-wider">
            PLAYING: {showTitle} (S{activeSeason} E{activeEpisode})
          </p>
        </div>
        
        <div className="shadow-level-3 rounded-xl overflow-hidden border border-neutral-800 bg-black">
          <PlayGate
            type="tv"
            tmdbId={showId}
            season={activeSeason}
            episode={activeEpisode}
            title={showTitle}
            backdropUrl={backdropUrl}
            onNextEpisode={handleNextEpisode}
          />
        </div>
      </div>

      {/* Episode Selector */}
      <EpisodeSelector
        showId={showId}
        seasons={seasons}
        currentSeason={activeSeason}
        currentEpisode={activeEpisode}
        onSelect={handleSelect}
      />
    </div>
  );
}
