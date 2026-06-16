here the code for future purpose

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


