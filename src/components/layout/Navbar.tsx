'use client';
import { useState, useEffect } from 'react';
import { Search, Film, Menu, X, Play } from 'lucide-react';
import SearchModal from '../search/SearchModal';

interface Props {
  cinemaMode?: boolean;
}

export default function Navbar({ cinemaMode = false }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const bgStyle = cinemaMode
    ? (scrolled ? 'bg-[#0a0a0a]/95 border-b border-[#262626]' : 'bg-transparent')
    : (scrolled ? 'bg-white/95 border-b border-hairline' : 'bg-transparent');

  const textStyle = cinemaMode ? 'text-white' : 'text-ink';
  const muteStyle = cinemaMode ? 'text-gray-400 hover:text-white' : 'text-body hover:text-ink';
  const buttonStyle = cinemaMode
    ? 'bg-white text-black hover:bg-gray-100'
    : 'bg-primary text-white hover:bg-neutral-800';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${bgStyle}`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-link via-violet to-highlight-pink flex items-center justify-center shadow-sm">
                <Film className="w-4 h-4 text-white" />
              </div>
              <span className={`font-mono text-lg font-bold tracking-tight uppercase ${textStyle}`}>
                Movies<span className="text-link">Nest</span>
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
                  cinemaMode
                    ? 'bg-neutral-900 border-neutral-800 text-gray-400 hover:text-white'
                    : 'bg-canvas-soft border-hairline text-mute hover:text-ink'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Search Catalogue...</span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.2 rounded bg-neutral-200/50 dark:bg-neutral-800 font-mono text-[9px]">⌘K</kbd>
              </button>

              <a
                href="/"
                className={`hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-level-1 ${buttonStyle}`}
              >
                Start Watching
              </a>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden p-1.5 rounded-md border transition-colors ${
                  cinemaMode
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
          <div className={`md:hidden border-t ${cinemaMode ? 'border-neutral-800 bg-[#0a0a0a]' : 'border-hairline bg-white'}`}>
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
                    cinemaMode ? 'text-gray-300 hover:text-white hover:bg-neutral-900' : 'text-body hover:text-ink hover:bg-canvas-soft-2'
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

