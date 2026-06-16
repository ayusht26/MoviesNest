import { Film, Github, Globe, Heart } from 'lucide-react';

interface Props {
  cinemaMode?: boolean;
}

export default function Footer({ cinemaMode = false }: Props) {
  const borderClass = cinemaMode ? 'border-[#262626]' : 'border-hairline';
  const bgClass = cinemaMode ? 'bg-[#0a0a0a]' : 'bg-canvas-soft-2';
  const textClass = cinemaMode ? 'text-white' : 'text-ink';
  const muteClass = cinemaMode ? 'text-gray-400' : 'text-body';
  const linkHoverClass = cinemaMode ? 'hover:text-white' : 'hover:text-link';

  return (
    <footer className={`relative border-t ${borderClass} ${bgClass} pb-12 pt-16`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <a href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-link via-violet to-highlight-pink flex items-center justify-center">
                <Film className="w-4 h-4 text-white" />
              </div>
              <span className={`font-mono text-lg font-bold tracking-tight uppercase ${textClass}`}>
                Movies<span className="text-link">Nest</span>
              </span>
            </a>
            <p className={`text-xs leading-relaxed ${muteClass}`}>
              Explore your favorite movies and TV shows, with instant playback powered by premium streaming technology. Zero ads, zero subscription required.
            </p>
          </div>

          {/* Browse Column */}
          <div>
            <h3 className={`text-xs font-semibold uppercase tracking-widest mb-4 font-mono ${textClass}`}>Browse</h3>
            <ul className={`space-y-2.5 text-xs ${muteClass}`}>
              <li><a href="/" className={`transition-colors ${linkHoverClass}`}>Home</a></li>
              <li><a href="/?type=movie" className={`transition-colors ${linkHoverClass}`}>Movies</a></li>
              <li><a href="/?type=tv" className={`transition-colors ${linkHoverClass}`}>TV Series</a></li>
            </ul>
          </div>

          {/* Sources Column */}
          <div>
            <h3 className={`text-xs font-semibold uppercase tracking-widest mb-4 font-mono ${textClass}`}>Sources</h3>
            <ul className={`space-y-2.5 text-xs ${muteClass}`}>
              <li><a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" className={`transition-colors ${linkHoverClass}`}>TMDB API</a></li>
              <li><a href="https://www.vidking.net" target="_blank" rel="noopener noreferrer" className={`transition-colors ${linkHoverClass}`}>Vidking Player</a></li>
            </ul>
          </div>

          {/* Disclaimer Column */}
          <div>
            <h3 className={`text-xs font-semibold uppercase tracking-widest mb-4 font-mono ${textClass}`}>Disclaimer</h3>
            <p className={`text-[11px] leading-relaxed ${muteClass}`}>
              MoviesNest does not store any files on our server. We only link to media which is hosted on third-party services. All data is fetched dynamically via public endpoints.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`flex flex-col sm:flex-row items-center justify-between border-t ${borderClass} pt-8 text-xs ${muteClass}`}>
          <p>© {new Date().getFullYear()} MoviesNest. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-current" /> using Astro &amp; React
            </span>
            <div className="flex gap-4">
              <a href="https://github.com/ayusht26/" target="_blank" rel="noopener noreferrer" className={`transition-colors ${linkHoverClass}`} aria-label="GitHub Developer Profile"><Github className="w-3.5 h-3.5" /></a>
              <a href="#" className={`transition-colors ${linkHoverClass}`} aria-label="Developer Portfolio Website"><Globe className="w-3.5 h-3.5" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
