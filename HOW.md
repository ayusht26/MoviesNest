# HOW THIS WORKS — MoviesNest

## Overview

MoviesNest is a free movie/TV streaming website (like FMovies) that does **not host any video content itself**. It acts as a **catalog + search engine** that uses:
1. **TMDB API** — for all metadata (titles, posters, backdrops, descriptions, cast, genres, ratings, seasons, episodes, similar content, search)
2. **Vidking Player API** — for actual video streaming (embedded via iframe)

---

## 1. TMDB API (The Movie Database)

### What it provides
- Movie and TV show metadata (titles, overviews, release dates, ratings, runtime, genres)
- Images (posters, backdrops, stills) via `https://image.tmdb.org/t/p/{size}{path}`
- Cast and crew information
- Similar/recommended content
- Search (by title, person, keyword)
- Trending, top rated, now playing, popular lists
- TV season and episode details
- Genre listings
- Discover by network (Netflix, Prime Video, Max, Disney+, etc.)

### Endpoints used

| Endpoint | Purpose |
|---|---|
| `/trending/{type}/{time}` | Homepage trending carousel |
| `/{type}/top_rated` | Top 10 rated section |
| `/movie/now_playing` | Hero section carousel |
| `/tv/on_the_air` | Currently airing TV |
| `/movie/{id}` with `append_to_response=credits,similar,videos` | Movie detail page |
| `/tv/{id}` with `append_to_response=credits,similar,videos` | TV show detail page |
| `/tv/{id}/season/{num}` | Episode list for a season |
| `/search/multi` | Global search (movies + TV + people) |
| `/discover/{type}` with `with_genres` | Genre browsing |
| `/discover/{type}` with `with_networks` | Platform-specific browsing |
| `/genre/{type}/list` | Genre list |

### Auth
- Uses `PUBLIC_TMDB_KEY` (API key via query param) or `PUBLIC_TMDB_TOKEN` (Bearer token via Authorization header)
- Falls back to hardcoded mock data if no key is configured or if API calls fail

### Image URLs
- Poster: `https://image.tmdb.org/t/p/w500{path}`
- Backdrop: `https://image.tmdb.org/t/p/w1280{path}`
- Profile (cast): `https://image.tmdb.org/t/p/w150{path}`

---

## 2. Vidking Player API

### What it provides
- Video streaming for movies and TV shows via simple iframe embed
- Takes a **TMDB ID** (not IMDb) to identify content
- No API key, no registration required
- Handles all video sources, CDN delivery, and playback

### Embed Routes

#### Movie
```
https://www.vidking.net/embed/movie/{tmdbId}
```
Example: `https://www.vidking.net/embed/movie/1078605`

#### TV Series
```
https://www.vidking.net/embed/tv/{tmdbId}/{season}/{episode}
```
Example: `https://www.vidking.net/embed/tv/119051/1/8`

### URL Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| `color` | string | Primary color (hex without #) | `?color=ff0000` |
| `autoPlay` | boolean | Enable auto-play | `?autoPlay=true` |
| `nextEpisode` | boolean | Show next episode button (TV only) | `?nextEpisode=true` |
| `episodeSelector` | boolean | Enable episode selection menu (TV only) | `?episodeSelector=true` |
| `progress` | number | Start time in seconds (resume watching) | `?progress=120` |

### Iframe attributes required
```html
<iframe 
  src="..." 
  width="100%" 
  height="600" 
  frameborder="0" 
  allowfullscreen>
</iframe>
```
In the project, we use: `allow="autoplay; fullscreen; picture-in-picture; encrypted-media"`

### Watch Progress Tracking (postMessage API)

The player sends progress events to the parent window via `window.postMessage`. The data format is:

```json
{
  "type": "PLAYER_EVENT",
  "data": {
    "event": "timeupdate|play|pause|ended|seeked",
    "currentTime": 120.5,
    "duration": 7200,
    "progress": 1.6,
    "id": "299534",
    "mediaType": "movie",
    "season": 1,
    "episode": 8,
    "timestamp": 1640995200000
  }
}
```

#### Events sent
| Event | Description |
|---|---|
| `timeupdate` | Continuous progress during playback (fires periodically) |
| `play` | Video started/resumed |
| `pause` | Video paused |
| `ended` | Video finished |
| `seeked` | User scrubbed to different time |

### Progress data fields
| Field | Description |
|---|---|
| `id` | Content ID (TMDB ID) |
| `mediaType` | Content type (`movie` or `tv`) |
| `progress` | Watch progress percentage |
| `currentTime` | Current playback position in seconds |
| `duration` | Total duration in seconds |
| `season` | Season number (for TV) |
| `episode` | Episode number (for TV) |
| `timestamp` | Unix timestamp in milliseconds |

### How we use it
In `src/lib/vidking.ts`, the embed URLs are built with:
- Brand color: `00D4FF` (cyan)
- `autoPlay=true` by default when user clicks play
- `nextEpisode=true` and `episodeSelector=true` for TV embeds
- `progress` parameter from localStorage for resume watching

In `src/components/player/VidkingPlayer.tsx`:
- Listens to `window.postMessage` events
- Saves progress to `localStorage` on each `timeupdate` event
- Uses storage keys: `nest_progress_movie_{tmdbId}` or `nest_progress_tv_{tmdbId}_s{season}_e{episode}`
- Shows pause overlay (like Netflix) when paused
- Shows ended overlay with "Watch Again" and "Next Episode" buttons
- Shows loading spinner while iframe loads

---

## 3. FMovies Architecture (Reference)

### Homepage
1. **Hero Section** — Large featured movie/show with backdrop image, title, description, and a "Play" button
2. **Search Bar** — Prominent, centered. Searches across movies and TV shows via TMDB
3. **Trending/Most Popular** — Horizontal scrollable rows of cards (poster + title + metadata)
4. **Genre Filters** — Dropdown or row of genre buttons to filter content
5. **Content Grid** — Cards with poster image, title, year, duration/episode count, quality badge (HD, 4K)
6. **Footer** — Links, copyright info

### Movie/TV Detail Page
1. **Hero/Header** — Backdrop image, poster, title, year, runtime, rating, genres, description, cast
2. **Server/Player Selection** — Choose streaming server (in our case, Vidking is the single server)
3. **Video Player** — Iframe embed of the selected server
4. **Episode Selector (TV)** — Season dropdown + episode grid/list
5. **Cast Section** — Horizontal scroll of cast photos + names + character names
6. **Similar/Recommended** — More content cards
7. **Comments (optional)** — Not implemented in our version

### Search Page
1. Search input at top
2. Results displayed as grid cards
3. Filter by type (movies/TV/people)

### Key Design Patterns
- **No authentication required** — anyone can watch
- **No content hosting** — all video comes from third-party embed players
- **All metadata comes from TMDB** — posters, descriptions, ratings, cast
- **Watch progress is stored in `localStorage`** — no backend needed
- **Progress is sent to the iframe via URL param** to resume playback
- **Content is organized by**: genre, country, year, popularity, network/platform
- **Cards show**: poster image, title, genre tags, year, duration/episode count
- **Multiple server fallback** — FMovies has multiple embed sources; our project uses only Vidking

---

## 4. MoviesNest Project Architecture

### Tech Stack
- **Framework**: Astro (SSR with Vercel adapter)
- **UI Library**: React (for interactive components)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Icons**: Lucide React

### File Structure
```
src/
  pages/
    index.astro          — Homepage
    search.astro         — Search results page
    blocked.astro        — Blocked region fallback
    movie/[id].astro     — Movie detail + player page
    tv/[id].astro        — TV show detail + player page
  components/
    home/
      HeroSection.tsx    — Hero carousel
      TopTenGrid.tsx     — Top 10 rated grid
      TrendingTabs.tsx   — Trending movies/TV tabs
      PlatformSelector.tsx — Browse by streaming platform
      GenreRow.tsx       — Genre filter row
    detail/
      DetailHero.tsx     — Movie/TV hero with backdrop
      CastRow.tsx        — Cast carousel
      SimilarRow.tsx     — Similar content carousel
    player/
      VidkingPlayer.tsx  — Core Vidking iframe player with progress tracking
      PlayGate.tsx       — Click-to-play overlay before loading player
      TVPlayerSection.tsx — TV player + episode selector wrapper
      EpisodeSelector.tsx — Season/episode selection UI
    search/
      SearchPageWrapper.tsx — Search UI
    layout/
      Navbar.astro       — Top navigation
      Footer.astro       — Page footer
    cards/
      ContentCard.tsx    — Reusable content card
    ui/                  — Small reusable UI components
  lib/
    tmdb.ts              — TMDB API client with mock fallback
    vidking.ts           — Vidking embed URL builder
    utils.ts             — Utility functions
  layouts/
    BaseLayout.astro     — Main page layout (meta, fonts, etc.)
  styles/
    global.css           — Base styles
```

### Data Flow
1. **Server-side (Astro SSR)**: TMDB data is fetched during `Astro.params` processing. Movie/TV detail pages fetch metadata, cast, and similar content at build/request time.
2. **Client-side (React)**: Search, player interactions, episode selection, progress tracking, and some dynamic data fetching happen in the browser.
3. **Player flow**: User clicks "Play" → `PlayGate` reveals `VidkingPlayer` → iframe loads from `https://www.vidking.net/embed/...` → player sends `postMessage` events → component tracks progress in `localStorage` → on revisit, progress is passed back to iframe via URL `?progress=` param.

### Watch Progress System
- Stored in `localStorage` with key pattern: `nest_progress_movie_{tmdbId}` or `nest_progress_tv_{tmdbId}_s{season}_e{episode}`
- Value is the current playback position in seconds (integer)
- On revisit, if saved progress exists, it's passed to the Vidking iframe via the `progress` URL parameter
- Player listens for `timeupdate` events from the iframe and continuously saves progress
- This allows "Resume Watching" functionality without any backend

### Content Organization (Homepage)
1. **Now Playing** → Hero carousel (movies currently in theaters)
2. **Top 10 Rated** → Grid of highest-rated movies
3. **Trending** → Tabs for trending movies / trending TV (this week)
4. **Platform Catalog** → Browse by streaming platform (Netflix, Prime Video, Max, Disney+, etc.)
5. **Genre Row** → Click a genre → discover movies in that genre

---

## 5. How FMovies mirror sites typically work

The actual FMovies (.nz and mirrors) pattern:
1. **Scrape/Crawl** metadata sources or use TMDB API for content listings
2. **Aggregate embed links** from multiple third-party video hosting services
3. **Serve a searchable catalog** with poster images, descriptions, ratings
4. **Display content** via iframes pointing to those embed services
5. **Handle domain blocking** by frequently switching domains/mirrors
6. **Monetize** via pop-up ads, banner ads, and redirect ads

Our project (MoviesNest) follows the same pattern but:
- Uses only Vidking as the embed source (simpler)
- Has zero ads (clean UX)
- Uses TMDB directly (no scraping)
- Has detailed progress tracking with localStorage
- Has a polished Netflix-like UI

---

## 6. Key Differences Between FMovies and MoviesNest

| Feature | FMovies (reference) | MoviesNest |
|---|---|---|
| Embed sources | Multiple servers (Vidcloud, etc.) | Single: Vidking |
| Ads | Heavy pop-ups and banners | None |
| Progress tracking | Limited | Full localStorage resume |
| UI | Basic, functional | Netflix-like polished UI |
| TV episode selector | Basic server-side | In-app React component |
| Search | Server-rendered | Client-side with debounce |
| Metadata source | Mixed (TMDB, scraping) | TMDB only |
| Mock/offline mode | No | Yes (mock data fallback) |
| Framework | PHP + HTML/JS | Astro + React + Tailwind |
