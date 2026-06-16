import { useState } from 'react';
import { EMBED_SERVERS } from '../../lib/servers';

interface ServerSelectorProps {
  tmdbId: string | number;
  mediaType: 'movie' | 'tv';
  season?: number;
  episode?: number;
}

export default function ServerSelector({ tmdbId, mediaType, season, episode }: ServerSelectorProps) {
  const [activeServerId, setActiveServerId] = useState<string>(EMBED_SERVERS[0].id);

  const activeServer = EMBED_SERVERS.find(s => s.id === activeServerId)!;
  const iframeUrl =
    mediaType === 'movie'
      ? activeServer.buildMovieUrl(tmdbId)
      : activeServer.buildTvUrl(tmdbId, season!, episode!);

  const iframeKey = `${activeServerId}-${tmdbId}-${season ?? 0}-${episode ?? 0}`;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-gray-400 mr-1">Servers:</span>
        {EMBED_SERVERS.map(server => (
          <button
            key={server.id}
            onClick={() => setActiveServerId(server.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeServerId === server.id
                ? 'bg-cyan-400 text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {server.name}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-500">
        If one server doesn't work, try another — availability varies by title.
      </p>

      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <iframe
          key={iframeKey}
          src={iframeUrl}
          className="w-full h-full border-0"
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        />
      </div>
    </div>
  );
}
