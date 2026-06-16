'use client';
import { useState } from 'react';
import VidkingPlayer from './VidkingPlayer';
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
}

export default function TVPlayerSection({ showId, seasons, showTitle }: Props) {
  const [activeSeason, setActiveSeason] = useState(1);
  const [activeEpisode, setActiveEpisode] = useState(1);

  const handleSelect = (s: number, e: number) => {
    setActiveSeason(s);
    setActiveEpisode(e);
    // Smooth scroll to player on selection
    const el = document.getElementById('player-display-container');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
          <VidkingPlayer type="tv" tmdbId={showId} season={activeSeason} episode={activeEpisode} />
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
