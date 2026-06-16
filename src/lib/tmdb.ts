// src/lib/tmdb.ts
const BASE = 'https://api.tmdb.org/3';
const IMG  = 'https://image.tmdb.org/t/p';
const KEY  = import.meta.env.PUBLIC_TMDB_KEY;
const TOKEN = import.meta.env.PUBLIC_TMDB_TOKEN;


export const imgUrl = (path: string, size = 'w500') => {
  if (!path) return '/placeholder.jpg';
  if (path.startsWith('http') || path.startsWith('/placeholder')) return path;
  return `${IMG}/${size}${path}`;
};

export const backdropUrl = (path: string) => imgUrl(path, 'w1280');

// High-quality mock data for fallback
const MOCK_GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' }
];

const MOCK_ITEMS = [
  {
    id: 299534,
    title: 'Avengers: Endgame',
    overview: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
    backdrop_path: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
    poster_path: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=500&auto=format&fit=crop',
    vote_average: 8.3,
    release_date: '2019-04-24',
    media_type: 'movie',
    genre_ids: [28, 12, 878]
  },
  {
    id: 1396,
    name: 'Breaking Bad',
    overview: 'Walter White, a New Mexico chemistry teacher, diagnoses himself with Stage III cancer and decides to cook meth to secure his family\'s financial future.',
    backdrop_path: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop',
    poster_path: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?q=80&w=500&auto=format&fit=crop',
    vote_average: 8.9,
    first_air_date: '2008-01-20',
    media_type: 'tv',
    genre_ids: [18, 80]
  },
  {
    id: 671,
    title: 'Harry Potter and the Philosopher\'s Stone',
    overview: 'Harry Potter has lived under the stairs at his aunt and uncle\'s house his whole life. But on his 11th birthday, he learns he\'s a powerful wizard.',
    backdrop_path: 'https://images.unsplash.com/photo-1547756536-cde3673fa2e5?q=80&w=1200&auto=format&fit=crop',
    poster_path: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=500&auto=format&fit=crop',
    vote_average: 7.9,
    release_date: '2001-11-16',
    media_type: 'movie',
    genre_ids: [12, 14, 10751]
  },
  {
    id: 155,
    title: 'The Dark Knight',
    overview: 'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.',
    backdrop_path: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1200&auto=format&fit=crop',
    poster_path: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=500&auto=format&fit=crop',
    vote_average: 8.5,
    release_date: '2008-07-16',
    media_type: 'movie',
    genre_ids: [28, 80, 18, 53]
  },
  {
    id: 19995,
    title: 'Avatar',
    overview: 'In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following his orders and protecting the world he feels is his home.',
    backdrop_path: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    poster_path: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=500&auto=format&fit=crop',
    vote_average: 7.5,
    release_date: '2009-12-10',
    media_type: 'movie',
    genre_ids: [28, 12, 14, 878]
  },
  {
    id: 31917,
    name: 'Pretty Little Liars',
    overview: 'Based on the Pretty Little Liars series of young adult novels by Sara Shepard, the series follows the lives of four girls whose clique falls apart after the disappearance of their leader, Alison DiLaurentis.',
    backdrop_path: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
    poster_path: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=500&auto=format&fit=crop',
    vote_average: 8.0,
    first_air_date: '2010-06-08',
    media_type: 'tv',
    genre_ids: [18, 9648]
  },
  {
    id: 60735,
    name: 'The Flash',
    overview: 'After a particle accelerator causes a freak storm, CSI Investigator Barry Allen is struck by lightning and falls into a coma. Months later he awakens with the power of super speed.',
    backdrop_path: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
    poster_path: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=500&auto=format&fit=crop',
    vote_average: 7.8,
    first_air_date: '2014-10-07',
    media_type: 'tv',
    genre_ids: [18, 878, 28]
  }
];

// Helper to check if API key or token exists
const hasAuth = () => {
  const hasKey = !!KEY && KEY !== 'your_api_key_here' && KEY.trim() !== '';
  const hasToken = !!TOKEN && TOKEN !== 'your_api_token_here' && TOKEN.trim() !== '';
  return hasKey || hasToken;
};

// Global server-side trackers
export let isRateLimited = false;
export let isAuthError = false;

export function getTMDBStatus() {
  return {
    isRateLimited,
    isAuthError,
    hasAuth: hasAuth(),
    fallbackActive: !hasAuth() || isRateLimited || isAuthError
  };
}

async function tmdb(endpoint: string, params: Record<string,string> = {}): Promise<any> {
  if (!hasAuth()) {
    console.warn(`[TMDB API] Neither PUBLIC_TMDB_KEY nor PUBLIC_TMDB_TOKEN is configured. Using fallback mock data.`);
    return getMockResponse(endpoint, params);
  }

  const url = new URL(`${BASE}${endpoint}`);
  const headers: Record<string, string> = {
    'Accept': 'application/json'
  };

  const useToken = !!TOKEN && TOKEN !== 'your_api_token_here' && TOKEN.trim() !== '';
  if (useToken) {
    headers['Authorization'] = `Bearer ${TOKEN}`;
  } else {
    url.searchParams.set('api_key', KEY);
  }

  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  
  try {
    const res = await fetch(url.toString(), {
      headers,
      signal: AbortSignal.timeout(8000), // 8s timeout
    });
    if (!res.ok) {
      if (res.status === 429) {
        isRateLimited = true;
        console.warn(`[TMDB API] Rate limit reached (429). Falling back to mock data.`);
      } else if (res.status === 401 || res.status === 403) {
        isAuthError = true;
        console.warn(`[TMDB API] Authentication failed (status ${res.status}). Key/token might be invalid or suspended. Falling back to mock data.`);
      } else {
        console.warn(`TMDB error status: ${res.status}. Falling back to mock data.`);
      }
      return getMockResponse(endpoint, params);
    }
    return res.json();
  } catch (err: any) {
    const isNetworkError =
      err?.code === 'ETIMEDOUT' ||
      err?.code === 'EACCES' ||
      err?.cause?.code === 'UND_ERR_CONNECT_TIMEOUT' ||
      err?.message?.includes('fetch failed') ||
      err?.message?.includes('connect timeout');
    
    if (isNetworkError) {
      // Return empty stub so Astro pages don't crash — they render empty rows
      // The client-side VPN banner (Issue 3B) will catch remaining failures
      console.warn(`TMDB blocked (ISP): ${endpoint}`);
      return { results: [], total_results: 0, __blocked: true };
    }
    
    console.error(`TMDB fetch failed:`, err);
    return getMockResponse(endpoint, params);
  }
}

// Generate mock responses for all endpoints
function getMockResponse(endpoint: string, params: Record<string, string> = {}): any {
  if (endpoint.startsWith('/genre/')) {
    return { genres: MOCK_GENRES };
  }

  if (endpoint.startsWith('/person/')) {
    const id = Number(endpoint.match(/\/person\/(\d+)/)?.[1] || 1);
    return {
      id,
      name: 'Robert Downey Jr.',
      biography: 'Robert John Downey Jr. is an American actor, producer, and singer. His career has been characterized by critical and popular success in his youth, followed by a period of substance abuse and legal difficulties, before a resurgence of commercial success in middle age.',
      profile_path: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      known_for_department: 'Acting',
      birthday: '1965-04-04',
      place_of_birth: 'Manhattan, New York, USA',
      combined_credits: {
        cast: [
          { id: 299534, title: 'Avengers: Endgame', poster_path: '/placeholder.jpg', media_type: 'movie', vote_count: 5000, vote_average: 8.3 },
          { id: 155, title: 'The Dark Knight', poster_path: '/placeholder.jpg', media_type: 'movie', vote_count: 4000, vote_average: 8.5 }
        ]
      }
    };
  }
  
  if (endpoint.includes('/trending/')) {
    return { results: MOCK_ITEMS };
  }

  if (endpoint.endsWith('/top_rated') || endpoint.endsWith('/popular') || endpoint.endsWith('/now_playing') || endpoint.endsWith('/on_the_air')) {
    const isTV = endpoint.includes('/tv/');
    return { results: MOCK_ITEMS.filter(item => isTV ? item.media_type === 'tv' : item.media_type === 'movie') };
  }

  if (endpoint.startsWith('/search/')) {
    const query = (params.query || '').toLowerCase();
    const results = MOCK_ITEMS.filter(item => {
      const title = (item.title || item.name || '').toLowerCase();
      const overview = (item.overview || '').toLowerCase();
      return title.includes(query) || overview.includes(query);
    });
    return { results };
  }

  if (endpoint.startsWith('/discover/')) {
    const genreId = Number(params.with_genres);
    if (genreId) {
      return { results: MOCK_ITEMS.filter(item => item.genre_ids?.includes(genreId)) };
    }
    return { results: MOCK_ITEMS };
  }

  // Movie or TV Detail Page
  const movieMatch = endpoint.match(/\/movie\/(\d+)/);
  const tvMatch = endpoint.match(/\/tv\/(\d+)/);
  
  if (movieMatch || tvMatch) {
    const id = Number(movieMatch ? movieMatch[1] : tvMatch?.[1]);
    const matchedItem = MOCK_ITEMS.find(item => item.id === id) || MOCK_ITEMS[0];
    
    // Check if season details requested
    const seasonMatch = endpoint.match(/\/tv\/(\d+)\/season\/(\d+)/);
    if (seasonMatch) {
      const seasonNum = Number(seasonMatch[2]);
      return {
        _id: String(id),
        air_date: '2008-01-20',
        name: `Season ${seasonNum}`,
        overview: `Walt and Jesse deal with the aftermath of their first cook.`,
        id: 3572,
        poster_path: matchedItem.poster_path,
        season_number: seasonNum,
        episodes: Array.from({ length: 8 }, (_, i) => ({
          air_date: '2008-01-20',
          episode_number: i + 1,
          id: 62085 + i,
          name: `Episode ${i + 1}: Breaking Points`,
          overview: `Walt and Jesse must deal with the body in the RV, and Skyler begins asking questions about Walt\'s strange behavior.`,
          production_code: '101',
          season_number: seasonNum,
          still_path: matchedItem.backdrop_path,
          vote_average: 8.5 + (i * 0.1),
          vote_count: 231
        }))
      };
    }

    // Return item detail with credits, similar, videos
    return {
      ...matchedItem,
      runtime: 142,
      tagline: 'The end is near.',
      genres: [
        { id: 28, name: 'Action' },
        { id: 12, name: 'Adventure' },
        { id: 878, name: 'Sci-Fi' }
      ],
      credits: {
        cast: [
          { id: 1, name: 'Robert Downey Jr.', character: 'Tony Stark / Iron Man', profile_path: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop' },
          { id: 2, name: 'Chris Evans', character: 'Steve Rogers / Captain America', profile_path: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop' },
          { id: 3, name: 'Mark Ruffalo', character: 'Bruce Banner / Hulk', profile_path: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop' },
          { id: 4, name: 'Chris Hemsworth', character: 'Thor Odinson', profile_path: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop' }
        ]
      },
      similar: {
        results: MOCK_ITEMS.filter(item => item.id !== id)
      },
      videos: {
        results: [
          { id: '1', key: 'TcMBFSGVi1A', site: 'YouTube', type: 'Trailer' }
        ]
      },
      seasons: [
        { season_number: 1, episode_count: 7, name: 'Season 1' },
        { season_number: 2, episode_count: 13, name: 'Season 2' },
        { season_number: 3, episode_count: 13, name: 'Season 3' },
        { season_number: 4, episode_count: 13, name: 'Season 4' },
        { season_number: 5, episode_count: 16, name: 'Season 5' }
      ]
    };
  }

  return {};
}

// Home page data
export const getTrending      = (type='all', time='week') => tmdb(`/trending/${type}/${time}`);
export const getTopRated      = (type='movie') => tmdb(`/${type}/top_rated`);
export const getPopular       = (type='movie') => tmdb(`/${type}/popular`);
export const getNowPlaying    = () => tmdb('/movie/now_playing');
export const getOnAir         = () => tmdb('/tv/on_the_air');

// Detail page data
export const getMovie         = (id: string) => tmdb(`/movie/${id}`, { append_to_response: 'credits,similar,videos' });
export const getTVShow        = (id: string) => tmdb(`/tv/${id}`, { append_to_response: 'credits,similar,videos' });
export const getTVSeason      = (id: string, season: string) => tmdb(`/tv/${id}/season/${season}`);

// Search
export const searchMulti      = (query: string) => tmdb('/search/multi', { query, include_adult: 'false' });
export const searchMovies     = (query: string) => tmdb('/search/movie', { query });
export const searchTV         = (query: string) => tmdb('/search/tv', { query });

// Genre lists
export const getMoviesByGenre = (genreId: string) => tmdb('/discover/movie', { with_genres: genreId, sort_by: 'popularity.desc' });
export const getGenres        = (type='movie') => tmdb(`/genre/${type}/list`);

// Streaming networks configuration
export const NETWORKS = [
  { id: '213', name: 'Netflix', color: '#E50914' },
  { id: '1024', name: 'Prime Video', color: '#00A8E1' },
  { id: '3186', name: 'Max', color: '#0057E7' },
  { id: '2739', name: 'Disney+', color: '#113CCF' },
  { id: '2552', name: 'Apple TV+', color: '#000000' },
  { id: '4330', name: 'Paramount+', color: '#0064FF' },
  { id: '453', name: 'Hulu', color: '#1CE783' }
];

export const getDiscoverByNetwork = (networkId: string, mediaType: 'movie' | 'tv' = 'tv') => 
  tmdb(`/discover/${mediaType}`, { with_networks: networkId, sort_by: 'popularity.desc' });

// Additional exports to resolve page compilation errors
export const discoverMovies = (params: Record<string, string> = {}) => tmdb('/discover/movie', params);
export const discoverTV = (params: Record<string, string> = {}) => tmdb('/discover/tv', params);
export const getMovieGenres = () => tmdb('/genre/movie/list');
export const getTVGenres = () => tmdb('/genre/tv/list');
export const getPopularMovies = (page = 1) => tmdb('/movie/popular', { page: String(page) });
export const getPopularTV = (page = 1) => tmdb('/tv/popular', { page: String(page) });
export const getTopRatedMovies = (page = 1) => tmdb('/movie/top_rated', { page: String(page) });
export const getTopRatedTV = (page = 1) => tmdb('/tv/top_rated', { page: String(page) });
export const getPerson = (id: string) => tmdb(`/person/${id}`, { append_to_response: 'combined_credits' });
export const img = (path: string, size = 'w500') => imgUrl(path, size);


