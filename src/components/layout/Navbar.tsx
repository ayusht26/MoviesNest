'use client';
import { useState, useEffect } from 'react';
import { Search, Film, Menu, X, Play, Sun, Moon } from 'lucide-react';
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Initialize theme state from html class
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

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

  const isDarkModeActive = cinemaMode || theme === 'dark';

  const bgStyle = isDarkModeActive
    ? (scrolled ? 'bg-[#0a0a0a]/95 border-b border-[#262626]' : 'bg-transparent')
    : (scrolled ? 'bg-white/95 border-b border-hairline' : 'bg-transparent');

  const textStyle = isDarkModeActive ? 'text-white' : 'text-ink';
  const muteStyle = isDarkModeActive ? 'text-gray-400 hover:text-white' : 'text-body hover:text-ink';
  const buttonStyle = isDarkModeActive
    ? 'bg-white text-black hover:bg-gray-100'
    : 'bg-primary text-white hover:bg-neutral-800';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${bgStyle}`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Redesigned to use Bebas Neue with custom gradient film brand icon */}
            <a href="/" className="flex items-center gap-2 group select-none">
              <div className="w-7 h-7 rounded bg-gradient-to-tr from-link via-violet to-highlight-pink flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
                <Film className="w-3.5 h-3.5 text-white fill-current" />
              </div>
              <span className={`font-display text-2.5xl font-black tracking-wider uppercase transition-colors duration-200 ${textStyle}`}>
                MOVIES<span className="text-link dark:text-cyan">NEST</span>
              </span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {[
                { href: '/', label: 'Home' },
                { href: '/?type=movie', label: 'Movies' },
                { href: '/?type=tv', label: 'TV Shows' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${muteStyle}`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
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
                <kbd className={`hidden lg:inline-flex items-center justify-center ml-1 px-1.5 py-0.5 rounded border font-mono text-[9px] select-none ${
                  isDarkModeActive
                    ? 'bg-neutral-800 border-neutral-700 text-gray-300'
                    : 'bg-neutral-100 border-neutral-200 text-gray-500'
                }`}>⌘K</kbd>
              </button>

              <a
                href="#"
                onClick={handleWatchRandom}
                className={`hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-level-1 cursor-pointer ${buttonStyle}`}
              >
                Watch Random
              </a>

              {/* Theme Toggle Button */}
              {!cinemaMode && (
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full border transition-all duration-200 cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-neutral-900 border-neutral-800 text-yellow-400 hover:text-yellow-300 hover:bg-neutral-800'
                      : 'bg-canvas-soft border-hairline text-body hover:text-ink hover:bg-canvas-soft-2'
                  }`}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4 animate-pulse-glow" /> : <Moon className="w-4 h-4" />}
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden p-1.5 rounded-md border transition-colors ${
                  isDarkModeActive
                    ? 'border-neutral-800 text-gray-400 hover:text-white'
                    : 'border-hairline text-mute hover:text-ink'
                }`}
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className={`md:hidden border-t ${isDarkModeActive ? 'border-neutral-800 bg-[#0a0a0a]' : 'border-hairline bg-white'}`}>
            <div className="px-4 py-3 flex flex-col gap-1">
              {[
                { href: '/', label: 'Home' },
                { href: '/?type=movie', label: 'Movies' },
                { href: '/?type=tv', label: 'TV Shows' },
              ].map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                    isDarkModeActive ? 'text-gray-300 hover:text-white hover:bg-neutral-900' : 'text-body hover:text-ink hover:bg-canvas-soft-2'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

