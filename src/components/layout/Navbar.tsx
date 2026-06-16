'use client';
import { useState, useEffect } from 'react';
import { Search, Home } from 'lucide-react';
import SearchModal from '../search/SearchModal';

interface Props {
  cinemaMode?: boolean;
}

const POPULAR_MEDIA = [
  { id: 299534, type: 'movie' }, // Avengers: Endgame
  { id: 278, type: 'movie' },    // The Shawshank Redemption
  { id: 240, type: 'movie' },    // The Godfather
  { id: 680, type: 'movie' },    // Pulp Fiction
  { id: 155, type: 'movie' },    // The Dark Knight
  { id: 27205, type: 'movie' },  // Inception
  { id: 550, type: 'movie' },    // Fight Club
  { id: 13, type: 'movie' },     // Forrest Gump
  { id: 603, type: 'movie' },    // The Matrix
  { id: 157336, type: 'movie' }, // Interstellar
  { id: 129, type: 'movie' },    // Spirited Away
  { id: 496243, type: 'movie' }, // Parasite
  { id: 324857, type: 'movie' }, // Spider-Man: Into the Spider-Verse
  { id: 244786, type: 'movie' }, // Whiplash
  { id: 1396, type: 'tv' },      // Breaking Bad
  { id: 1399, type: 'tv' },      // Game of Thrones
  { id: 66732, type: 'tv' },     // Stranger Things
  { id: 2316, type: 'tv' },      // The Office
  { id: 19885, type: 'tv' },     // Sherlock
  { id: 1668, type: 'tv' },      // Friends
  { id: 82856, type: 'tv' },     // The Mandalorian
  { id: 87105, type: 'tv' },     // Chernobyl
  { id: 1429, type: 'tv' },      // Attack on Titan
  { id: 2009, type: 'tv' },      // Death Note
  { id: 60625, type: 'tv' },     // Rick and Morty
  { id: 60059, type: 'tv' },     // Better Call Saul
  { id: 38233, type: 'tv' },     // Avatar: The Last Airbender
  { id: 94605, type: 'tv' }      // Arcane
];

export default function Navbar({ cinemaMode = false }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keyboard shortcut listener for search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleWatchRandom = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const randomItem = POPULAR_MEDIA[Math.floor(Math.random() * POPULAR_MEDIA.length)];
    window.location.href = `/${randomItem.type}/${randomItem.id}`;
  };

  const isDarkModeActive = true;

  const bgStyle = scrolled ? 'bg-[#0a0a0a]/95 border-b border-[#262626]' : 'bg-transparent';
  const textStyle = 'text-white';
  const buttonStyle = 'bg-white text-black hover:bg-gray-100';

  return (
    <>
      <nav
        className={`absolute top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${bgStyle}`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Typographic-only styled with Bebas Neue / Impact stack */}
            <a href="/" className="flex items-center group select-none">
              <span className={`font-display text-2xl sm:text-3xl font-black tracking-widest uppercase transition-colors duration-200 ${textStyle} group-hover:text-[#3860be]`}>
                MOVIES<span className="text-[#3cffd0] transition-colors duration-200 group-hover:text-[#3860be]">NEST</span>
              </span>
            </a>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Home Icon Link */}
              <a
                href="/"
                className={`p-2 rounded-md transition-all duration-200 hover:scale-105 ${
                  isDarkModeActive
                    ? 'text-gray-400 hover:text-white hover:bg-neutral-900'
                    : 'text-mute hover:text-ink hover:bg-canvas-soft-2'
                }`}
                title="Home"
                aria-label="Home"
              >
                <Home className="w-4 h-4" />
              </a>

              <button
                onClick={() => setSearchOpen(true)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs transition-all duration-200 ${
                  isDarkModeActive
                    ? 'bg-neutral-900 border-neutral-800 text-gray-400 hover:text-white'
                    : 'bg-canvas-soft border-hairline text-mute hover:text-ink'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Search Catalogue...</span>
                <kbd className="hidden lg:inline-flex items-center justify-center ml-1 px-1.5 py-0.5 rounded border font-mono text-[9px] select-none bg-neutral-800 border-neutral-700 text-gray-300">⌘K</kbd>
              </button>

              <a
                href="#"
                onClick={handleWatchRandom}
                className={`hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-level-1 cursor-pointer ${buttonStyle}`}
              >
                Watch Random
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

