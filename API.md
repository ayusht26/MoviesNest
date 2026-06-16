API Documentation

Everything you need to integrate Vidking Player into your website
Simple Integration

Just one iframe tag - no complex setup required
Lightning Fast

Optimized for performance with HLS.js and modern streaming
Isolated Storage

Each configuration uses separate localStorage - no conflicts
Full Documentation

Complete API reference with examples and best practices
API Routes
Movies
/embed/movie/{tmdbId}

Replace {tmdbId} with the TMDB movie ID
TV Series
/embed/tv/{tmdbId}/{season}/{episode}

Specify the show ID, season number, and episode number
URL Parameters
Parameter	Type	Description	Example
color	string	Primary color (hex without #)	?color=ff0000
autoPlay	boolean	Enable auto-play feature	?autoPlay=true
nextEpisode	boolean	Show next episode button (TV only)	?nextEpisode=true
episodeSelector	boolean	Enable episode selection menu (TV only)	?episodeSelector=true
progress	number	Start time in seconds	?progress=120
Watch Progress Tracking

The player can send watch progress events to the parent window. You can save this progress to localStorage or your own backend. Here's a complete example:
Progress Tracking Script

// Add this script to your website
window.addEventListener("message", function (event) {
  // console.log("event: ", event);
  console.log("Message received from the player: ", JSON.parse(event.data)); // Message received from player
  if (typeof event.data === "string") {
    var messageArea = document.querySelector("#messageArea");
    messageArea.innerText = event.data;
  }
});

The player sends progress updates containing:

    id: Content ID
    type: Content type (movie/tv)
    progress: Watch progress percentage
    timestamp: Current playback position in seconds
    duration: Total duration in seconds
    season: Season number (for TV shows)
    episode: Episode number (for TV shows)

Events Sent

    timeupdate - Continuous progress during playback
    play - When video starts
    pause - When video pauses
    ended - When video ends
    seeked - When user seeks to different time

Event Data Structure

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

Code Examples
Basic Movie Player

Simple movie player without extra features
Preview

<iframe 
  src="https://www.vidking.net/embed/movie/1078605" 
  width="100%" 
  height="600" 
  frameborder="0" 
  allowfullscreen>
</iframe>

TV Series with All Features

TV player with custom color and all features enabled
Preview

<iframe 
  src="https://www.vidking.net/embed/tv/119051/1/8?color=e50914&autoPlay=true&nextEpisode=true&episodeSelector=true" 
  width="100%" 
  height="600" 
  frameborder="0" 
  allowfullscreen>
</iframe>

Custom Branded Player

Player with custom brand colors and autoplay
Preview

<iframe 
  src="https://www.vidking.net/embed/movie/1078605?color=9146ff&autoPlay=true" 
  width="100%" 
  height="600" 
  frameborder="0" 
  allowfullscreen>
</iframe>

Player with Start Time

Start video at 2 minutes (120 seconds) with custom color
Preview

<iframe 
  src="https://www.vidking.net/embed/movie/1078605?color=e50914&progress=120&autoPlay=true" 
  width="100%" 
  height="600" 
  frameborder="0" 
  allowfullscreen>
</iframe>

© 2025 Vidking Player. Built for seamless video streaming integration.