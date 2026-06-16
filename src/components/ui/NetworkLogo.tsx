'use client';

interface Props {
  networkId: string;
  className?: string;
}

export default function NetworkLogo({ networkId, className = 'w-5 h-5 flex-shrink-0' }: Props) {
  // Map TMDB Network IDs to SVGs
  switch (networkId) {
    case '213': // Netflix
      return (
        <svg className={className} viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.2 18L24 36H18.8L10 18V36H4.8V0H10L18.8 18V0H24V18H15.2Z" fill="#E50914" />
        </svg>
      );

    case '1024': // Prime Video
      return (
        <svg className={`${className} text-[#00A8E1]`} viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* prime text */}
          <path d="M4 14c10 4 20 4 30 0 2-1 4-1 2 2-3 4-16 6-24 2-5-2-9-3-8-4z" fill="currentColor" />
          <path d="M31 11l4 5-1-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="3" y="10" fontFamily="system-ui, sans-serif" fontSize="10.5" fontWeight="900" fill="currentColor">prime</text>
        </svg>
      );

    case '3186': // Max (styled HBO Max wordmark with inner circle/dot)
      return (
        <svg className={`${className} text-ink dark:text-white`} viewBox="0 0 32 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="10.5" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13.5" fontWeight="900" letterSpacing="-0.8px" fill="currentColor">max</text>
        </svg>
      );

    case '2739': // Disney+
      return (
        <svg className={`${className} text-[#113CCF] dark:text-cyan`} viewBox="0 0 48 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="14" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13" fontWeight="900" fontStyle="italic" fill="currentColor">Disney</text>
          <text x="40" y="13" fontFamily="system-ui, -apple-system, sans-serif" fontSize="14" fontWeight="600" fill="currentColor">+</text>
        </svg>
      );

    case '2552': // Apple TV+
      return (
        <svg className={`${className} text-black dark:text-white`} viewBox="0 0 48 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Apple shape */}
          <path d="M6.5 12.3c-.8 0-1.8-.8-2.5-1.5-.7-.8-1.2-1.8-1.2-2.7 0-1.3.8-2.3 2-2.3.6 0 1.2.3 1.7.3.5 0 1-.3 1.7-.3 1 0 2 .8 2.3 1.8-2 .8-2.5 2.5-1.5 3.7.5.7 1.3 1 1.7 1-.3 1-1.3 2-2.2 2zm1.2-7.5c0-1.2.8-2 1.8-2 .1 1.2-.8 2.2-1.8 2z" fill="currentColor" />
          <text x="14" y="13" fontFamily="system-ui, -apple-system, sans-serif" fontSize="11.5" fontWeight="900" fill="currentColor">tv+</text>
        </svg>
      );

    case '4330': // Paramount+
      return (
        <svg className={`${className} text-[#0064FF]`} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
          <path d="M12 5l-5 11h3l2-5 2 5h3z" fill="currentColor" />
          <circle cx="12" cy="12" r="8" strokeWidth="0.8" strokeDasharray="2 2" />
        </svg>
      );

    case '453': // Hulu
      return (
        <svg className={`${className} text-[#1CE783]`} viewBox="0 0 32 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="11" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13" fontWeight="900" letterSpacing="-1px" fill="currentColor">hulu</text>
        </svg>
      );

    default: // Fallback icon
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="2" y1="7" x2="7" y2="7" />
          <line x1="2" y1="17" x2="7" y2="17" />
          <line x1="17" y1="17" x2="22" y2="17" />
          <line x1="17" y1="7" x2="22" y2="7" />
        </svg>
      );
  }
}
