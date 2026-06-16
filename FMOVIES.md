# FMOVIES.NZ — Complete Analysis

## Part 1: FMovies (the website)

### Domain Architecture
- **Primary domain**: `www.fmovies.nz` — a React Single Page Application (SPA) built with React + React Router
- **Mirror site analyzed**: `www.fmovies.mk` — built with Python/Django (server-rendered HTML)
- The original FMovies was shut down by Vietnamese authorities in August 2024, but clones and mirrors still operate
- FMovies uses multiple domains/mirrors to evade blocking (fmovies.nz, fmovies.mk, fmoviesz.co, fmovies4.me, etc.)
- The `.nz` domain is a modern SPA; the `.mk` domain is a Django server-rendered version — both serve the same purpose

### Technology Stack (from fmovies.mk — server-rendered version)
- **Backend**: Python/Django (evident from `{{ }}` template syntax, `{% static %}`, `{%%}` tags)
- **Frontend**: jQuery, Swiper.js (carousel), Font Awesome 5 (icons)
- **Database**: TMDB API for all content metadata
- **Analytics**: Matomo (self-hosted at `analytics.pop2watch.com`)
- **Ads**: Google AdSense (`ca-pub-4749918313287411`)
- **CDN/Assets**: Cloudflare, Google Fonts (Roboto), cdnjs
- **Lazy loading**: Custom lazy load CSS/JS for images
- **Star ratings**: Custom star-ratings app
- **Datepicker**: Vanilla JS Datepicker

### Technology Stack (from fmovies.nz — SPA version)
- **Frontend**: React SPA (ships `react-router`, `data-libs`, `ui-libs` as preloaded modules)
- **Server**: Node.js/Express or similar
- **CDN**: Cloudflare with Cloudflare Insights analytics
- **SEO**: Full OpenGraph, Twitter cards, JSON-LD structured data
- **PWA Support**: Has manifest.json, service worker, favicons for all platforms

### Homepage Layout

#### Header/Navigation
```
[Menu Toggler]  [LOGO]  [Home] [Genres ▼] [Movies] [TV Series] [Top IMDb] [Custom Categories]  [Login]  [Search 🔍]
```
- Logo is a link to `/`
- Genre dropdown has 33+ genres (Science Fiction, Action, Comedy, Drama, Horror, Romance, Documentary, Animation, Thriller, Mystery, Fantasy, etc.)
- Top-level nav: Home, Movies, TV Series, Top IMDb
- Optional custom category links (e.g., "European corner")
- Login button opens a modal (`#md-login`)
- Search form submits to `/search?query=...`

#### Hero Slider (Carousel)
- Swiper.js full-width carousel
- Each slide has:
  - **Backdrop image** from TMDB (original quality) — lazy loaded with mobile/desktop breakpoints
  - **Title** (h3)
  - **Meta**: Quality badge (HD), IMDb-style rating, duration, genre links
  - **Description**: Short plot summary
  - **CTA Button**: "Watch now" link → detail page
- Pagination dots at bottom

#### Content Sections
```
Popular
[Movies] [TV Shows] [Trending]  ← Tab switcher
[Grid of content cards]  ← 3+ rows, each with tooltip on hover
```

**Content Card Structure**:
```
┌─────────────────┐
│  [HD]            │  ← Quality badge overlay
│                  │
│   POSTER IMAGE   │  ← TMDB poster (original)
│                  │
├─────────────────┤
│ ★ 7.5           │  ← Rating
│ Title Here       │  ← Clickable link to detail page
│ 2026 • 134 min.  │  ← Year, duration, type badge
│ Movies           │
└─────────────────┘
```

- Cards have **tooltips on hover** showing full metadata (title, rating, year, duration, quality, description, genres, Watch Now button)
- Cards link to detail page via slug URL: `/{tmdbId}-{slugified-title}`
- Images are TMDB `original` size (very large — not optimized thumbs)

#### Footer
- Simple copyright line

### Detail Page Layout (`/376876-michael`)

```
[Breadcrumb: Home > Movies > Michael]

[Ad Banner - horizontal]

[Episode/Server links section]  ← #episodes div with external link
[Movie Info Section]
  ┌─────────┬──────────────────────────────┐
  │         │  Title                        │
  │ POSTER  │  HD ★ 7.5  127 min.          │
  │         │  [Star Rating Widget]         │
  │         │  Description                  │
  │         │  Genres: Music, Drama, History│
  │         │  Release date: March 22, 2026 │
  │         │  Director: Antoine Fuqua      │
  │         │  Actors: Jaafar Jackson, ...  │
  │         │  Tags: watch michael, ...     │
  └─────────┴──────────────────────────────┘

[You may also like section]
  [Content cards grid - similar items]
```

**Key Detail Page Elements**:
- **Breadcrumb**: `Home > Movies > Title`
- **Watch Container** (`#watch` div):
  - `data-id="376876"` → TMDB ID
  - `data-type="movie"` → content type
  - `data-short-url="/376876-michael"`
  - `data-epid="376876"` → episode ID (same as TMDB ID for movies)
- **Server/Episode Section** (`#episodes`):
  - Has a `#controls` div with `.items` for server links
  - Currently shows an external redirect link (to third-party site for streaming)
  - This is where the iframe embed would load dynamically via JavaScript
- **Movie Info Section**:
  - Poster image (TMDB original)
  - Title (h1)
  - Quality badge (HD), rating, duration
  - Star rating widget (1-5 stars, requires login to rate)
  - Full description
  - Genres as links to filtered pages
  - Release date
  - Director
  - Actors (clickable to search by actor)
  - Tags/SEO keywords
- **Similar Content**: "You may also like" with same card format

### URL Structure
```
/                           → Homepage
/home                       → Homepage (alias)
/movies                     → Movie listing
/series                     → TV series listing
/top-rated                  → Top IMDb rated
/genre/{slug}               → Genre filter page (e.g., /genre/action)
/search?query={term}        → Search results
/search?actor={name}        → Search by actor
/{tmdbId}-{slugified-title} → Detail page (e.g., /376876-michael)
/category/{custom}          → Custom categories
/feed/rss                   → RSS feed
```

### Content Data Source
- **All metadata comes from TMDB API**:
  - `https://image.tmdb.org/t/p/original/{path}` — Poster, backdrop, still images
  - Content ID is the TMDB ID (e.g., 376876 for "Michael")
  - Backdrop images from TMDB: `https://image.tmdb.org/t/p/original/{path}`
  - Poster images from TMDB: `https://image.tmdb.org/t/p/original/{path}`
  - Descriptions, ratings, cast, director, genres all from TMDB
- No original content hosting — everything is metadata from TMDB

### Player/Streaming Integration
- The actual video player is **loaded dynamically via JavaScript**
- The `#episodes` div initially contains a link to an external source
- The detail page has `#controls` div with `.items` container for server links
- The `#watch` div has data attributes (`data-id`, `data-type`, `data-epid`) that are used by JavaScript to fetch available embed sources
- FMovies aggregates embed links from multiple third-party video hosting services
- The embed sources are NOT Vidking specifically — FMovies uses multiple sources (Vidcloud, etc.)
- The iframe is injected into the page dynamically when user clicks a server link

### Monetization
- **Google AdSense** (pop-up and banner ads)
- **Affiliate banners** (e.g., Canal+ / Prime Video)
- **Redirect links** — clicking some links goes through affiliate redirects
- **Pop-under ads** — common for free streaming sites
- **Matomo analytics** tracks user behavior

### User System
- Optional login via modal (`data-toggle="modal" data-target="#md-login"`)
- Guest users can still browse and watch everything
- Login required for: rating content, creating watchlists, submitting comments
- User accounts likely store: watch history, favorites, ratings

### TV Series Support
- Series detail page similar to movie but with:
  - Season/episode selector
  - `data-type="tv"` attribute
  - Multiple seasons and episodes from TMDB
  - Episode list for each season
  - Language options for multi-language content

### Multi-language Support (fmovies.nz SPA version)
- Supports: English, Portuguese, Spanish, German, French
- `hreflang` tags in HTML head for SEO
- Default language: English (`x-default`)

---

## Part 2: Vidking Player

### What is Vidking?
Vidking Player (`www.vidking.net`) is an **embeddable video streaming player** that lets you stream movies and TV shows on your website via a simple iframe. It works like an API — you give it a TMDB ID and it handles all video delivery, streaming, CDN, and playback. Vidking itself is a React SPA (Single Page Application) with the following internal architecture:

- **Framework**: React + React Router
- **UI Libraries**: Custom UI and data libraries bundled separately
- **Hosting**: Cloudflare (DNS, CDN, analytics via Cloudflare Insights)
- **Analytics**: Custom analytics via `users.videasy.to` script
- **PWA**: Has manifest.json, service worker, full icon set
- **Structured Data**: Schema.org WebSite with SearchAction for SEO
- **Sitemap**: Available at `/sitemaps/sitemap.xml`

### How Vidking Player Works

The Vidking service does **all the heavy lifting**:
1. Takes a TMDB ID (movie or TV show) as input
2. Finds available video sources for that content from its own CDN
3. Serves an HTML5 video player with HLS.js streaming
4. Handles adaptive bitrate, subtitles, quality selection
5. Reports playback progress back to the parent website via `postMessage`

### Vidking API Reference

#### Base URL
```
https://www.vidking.net
```

#### Embed Endpoints

**Movie Embed**
```
GET /embed/movie/{tmdbId}
```
- `{tmdbId}` — The TMDB ID of the movie (numeric)
- Example: `https://www.vidking.net/embed/movie/1078605`

**TV Series Embed**
```
GET /embed/tv/{tmdbId}/{season}/{episode}
```
- `{tmdbId}` — The TMDB ID of the TV show
- `{season}` — Season number (integer)
- `{episode}` — Episode number (integer)
- Example: `https://www.vidking.net/embed/tv/119051/1/8`

#### URL Parameters (Query String)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `color` | string | Primary color hex (without `#`) | `?color=ff0000` |
| `autoPlay` | boolean | Auto-start playback on load | `?autoPlay=true` |
| `nextEpisode` | boolean | Show "Next Episode" button (TV only) | `?nextEpisode=true` |
| `episodeSelector` | boolean | Enable episode selection menu (TV only) | `?episodeSelector=true` |
| `progress` | number | Resume from specified time in seconds | `?progress=120` |

#### Iframe Requirements
```html
<iframe 
  src="https://www.vidking.net/embed/movie/1078605?color=e50914&autoPlay=true" 
  width="100%" 
  height="600" 
  frameborder="0" 
  allowfullscreen>
</iframe>
```

**Allowed iframe attributes**: `autoplay`, `fullscreen`, `picture-in-picture`, `encrypted-media`

#### Code Examples (from official docs)

**Basic Movie Player**:
```html
<iframe 
  src="https://www.vidking.net/embed/movie/1078605" 
  width="100%" 
  height="600" 
  frameborder="0" 
  allowfullscreen>
</iframe>
```

**TV Series with Full Features**:
```html
<iframe 
  src="https://www.vidking.net/embed/tv/119051/1/8?color=e50914&autoPlay=true&nextEpisode=true&episodeSelector=true" 
  width="100%" 
  height="600" 
  frameborder="0" 
  allowfullscreen>
</iframe>
```

**Custom Branded Player** (Netflix-style red):
```html
<iframe 
  src="https://www.vidking.net/embed/movie/1078605?color=e50914&autoPlay=true" 
  width="100%" 
  height="600" 
  frameborder="0" 
  allowfullscreen>
</iframe>
```

**Player with Start Time (Resume Watching)**:
```html
<iframe 
  src="https://www.vidking.net/embed/movie/1078605?color=e50914&progress=120&autoPlay=true" 
  width="100%" 
  height="600" 
  frameborder="0" 
  allowfullscreen>
</iframe>
```

### Watch Progress Tracking (postMessage API)

The player communicates with the parent window using `window.postMessage`. This allows the embedding website to track what the user is watching and save their progress.

#### How to Receive Events
```javascript
window.addEventListener("message", function (event) {
  console.log("Message received from the player: ", JSON.parse(event.data));
  if (typeof event.data === "string") {
    var messageArea = document.querySelector("#messageArea");
    messageArea.innerText = event.data;
  }
});
```

#### Event Data Structure
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

#### Events Sent by Player

| Event | Trigger | Description |
|---|---|---|
| `timeupdate` | Continuous | Fires periodically during playback (every ~1s) |
| `play` | User clicks play | Video starts or resumes after pause |
| `pause` | User clicks pause | Video is paused |
| `ended` | Video finishes | Video reaches the end |
| `seeked` | User scrubs | User jumps to a different position |

#### Data Fields

| Field | Type | Description |
|---|---|---|
| `event` | string | Event type: `timeupdate`, `play`, `pause`, `ended`, `seeked` |
| `currentTime` | number | Current playback position in seconds |
| `duration` | number | Total video duration in seconds |
| `progress` | number | Watch progress as percentage (0-100) |
| `id` | string | TMDB ID of the content |
| `mediaType` | string | `"movie"` or `"tv"` |
| `season` | number | Season number (TV only, `null` for movies) |
| `episode` | number | Episode number (TV only, `null` for movies) |
| `timestamp` | number | Unix timestamp in milliseconds |

### Key Features of Vidking Player

1. **Simple Integration**: Just one `<iframe>` tag — no complex setup, no API key, no registration required
2. **Lightning Fast**: Optimized for performance with HLS.js and modern streaming protocols
3. **Isolated Storage**: Each configuration uses separate localStorage — no conflicts between multiple players on the same page
4. **Customizable UI**: Change primary color via `?color=` parameter (hex without #)
5. **Auto-play**: Start playback automatically with `?autoPlay=true`
6. **TV Show Support**: Full season/episode navigation with `nextEpisode` and `episodeSelector`
7. **Resume Watching**: Pass `?progress=` parameter to start from a specific time
8. **Progress Tracking**: Real-time playback events via `postMessage` for saving progress
9. **Responsive**: Player fills the iframe dimensions (use `aspect-video` CSS for proper ratio)
10. **Full Screen**: Supports fullscreen mode via `allowfullscreen` attribute
11. **Picture-in-Picture**: Supports PiP mode
12. **Encrypted Media**: Supports DRM-protected streams

### Vidking Website Internal Structure

The Vidking website at `www.vidking.net` is a **React SPA** that serves both as:
1. **Landing Page**: Marketing site describing the player service
2. **Documentation Page**: At `/#documentation` — contains the full API docs (which match what's in API.md)
3. **Embed Endpoints**: The actual player at `/embed/movie/:id` and `/embed/tv/:id/:season/:episode`

Internal assets:
- `/assets/index-{hash}.js` — Main JS bundle
- `/assets/data-libs-{hash}.js` — Data library dependencies
- `/assets/ui-libs-{hash}.js` — UI library dependencies
- `/assets/react-router-{hash}.js` — React Router bundle
- `/assets/index-{hash}.css` — Stylesheet
- `/assets/icon/` — Favicons and PWA icons
- `/manifest.json` — PWA manifest
- `/sitemaps/sitemap.xml` — XML sitemap

The website uses Cloudflare for:
- CDN (static asset delivery)
- DNS
- Analytics (Cloudflare Insights)
- Security (SSL, WAF)

### How FMovies-style sites use embed players

The typical flow for a site like FMovies:

1. **Crawl/Scrape** TMDB for content metadata (or use TMDB API directly)
2. **Store** content in local database with TMDB IDs, titles, descriptions, images
3. **Build catalog pages** with poster grids, search, genre filters
4. **When user clicks "Watch"** on a specific title:
   a. Fetch available embed sources for that TMDB ID
   b. Display list of server options (e.g., "Server 1", "Server 2", "Vidcloud", etc.)
   c. When user selects a server, inject an `<iframe>` pointing to the embed URL
5. **Embed sources** are third-party video streaming services that accept TMDB IDs and return a working video player (like Vidking)
6. **Monetize** with ads, pop-ups, banner ads, affiliate links

### Vidking vs Other Embed Services

Vidking is one of many similar embed streaming services (all follow the same pattern):
- `vidking.net` — Uses TMDB IDs
- `apiplayer.ru` — Uses TMDB or IMDb IDs, similar API
- `embedmaster.link` — Uses IMDb or TMDB IDs
- Various others (vidcloud, etc.)

All work the same way: **give them a TMDB/IMDb ID, get back an iframe with a working video player**.

---

## Part 3: How FMovies.nz Specifically Works

### The SPA Architecture (fmovies.nz)

The `fmovies.nz` domain is a modern React SPA that:
1. Loads a minimal HTML shell with SEO meta tags
2. Fetches content data from a backend API (likely Node.js/Express or Django REST)
3. Renders all pages client-side using React Router
4. Uses Cloudflare for CDN and analytics

Key observations from the HTML:
```html
<div id="root"></div>
```
- React app mounts here
- Preloaded modules: `data-libs`, `ui-libs`, `react-router`
- All assets are versioned with content hashes for caching

### SEO Strategy
- Full meta tags for every page (title, description, keywords, robots)
- OpenGraph tags (og:title, og:description, og:image, og:url, og:locale)
- Twitter card tags
- JSON-LD structured data (WebSite schema with SearchAction, FAQ schema on info pages)
- Multiple language alternates via `hreflang` tags
- Canonical URLs
- Sitemap.xml for search engines
- Meta copyright and keywords for discoverability

### The "No Hosting" Model
FMovies.nz explicitly does NOT host any video files:
- All metadata comes from TMDB API
- All video comes from third-party embed players (like Vidking)
- The site is essentially a **search engine + catalog** for TMDB content
- When you click "Watch Now", it shows embed iframes from external sources
- If the embed sources go down, the content becomes unavailable

### FMovies Business Model
1. **Free access** — No subscription, no payment required
2. **Ad-supported** — Google AdSense, pop-ups, banner ads
3. **Affiliate marketing** — Redirect links to streaming services (Canal+, Prime Video, etc.)
4. **Domain rotation** — When one domain gets blocked, they switch to a new mirror
5. **Multiple mirrors** — Same content, different domains, distributed load

### Mirror Strategy
- When fmovies.nz gets blocked in a country, users can access fmovies.mk, fmoviesz.co, fmovies4.me, etc.
- All mirrors share the same database/content but have different domain names
- Some mirrors are server-rendered (Django), some are SPAs (React) — but the content is identical

---

## Part 4: Summary Comparison

| Feature | FMovies (.nz / .mk) | Vidking Player |
|---|---|---|
| Type | Full streaming website | Embeddable video player |
| Tech | React SPA or Django | React SPA |
| Data Source | TMDB API | Internal CDN (takes TMDB ID) |
| Video Hosting | None (aggregates embeds) | Yes (provides video streams) |
| API Required | TMDB API key | None (just use iframe) |
| Auth | Optional login system | None needed |
| Monetization | Ads, affiliates, pop-ups | Unknown (likely ad-supported) |
| Content Control | Catalog of available titles | Streams whatever TMDB ID you give it |
| Customization | Full UI control | Color, autoPlay, nextEpisode, episodeSelector |
| Progress Tracking | Limited (server-side) | Full postMessage API |
| Episode Selector | In-app React/Django component | Provided in-iframe via `episodeSelector` param |
| Asset Delivery | TMDB images via CDN | Own CDN via Cloudflare |
