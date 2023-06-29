document.addEventListener("DOMContentLoaded", function() {
  const sadButton = document.getElementById("sadButton");
  const happyButton = document.getElementById("happyButton");
  const excitedButton = document.getElementById("excitedButton");
  const indifferentButton = document.getElementById("indifferentButton");
  const playButton = document.getElementById("playButton");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  let currentPlaylistId = "";

  // Initialize Spotify Web Playback SDK
  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb('<YOUR_SPOTIFY_ACCESS_TOKEN>'); },
      volume: 0.5
    });

    // Connect to the Spotify player
    player.connect().then(success => {
      if (success) {
        console.log('The Web Playback SDK successfully connected to Spotify!');
      }
    }).catch(error => {
      console.error('Failed to connect to Spotify:', error);
    });

    // Toggle play/pause button
    playButton.addEventListener("click", () => {
      player.togglePlay().then(() => {
        console.log('Toggle playback');
      }).catch(error => {
        console.error('Failed to toggle playback:', error);
      });
    });

    // Play the next track in the playlist
    nextButton.addEventListener("click", () => {
      player.nextTrack().then(() => {
        console.log('Next track');
      }).catch(error => {
        console.error('Failed to play next track:', error);
      });
    });

    // Play the previous track in the playlist
    prevButton.addEventListener("click", () => {
      player.previousTrack().then(() => {
        console.log('Previous track');
      }).catch(error => {
        console.error('Failed to play previous track:', error);
      });
    });

    // Play the selected playlist based on the emotion
    const playPlaylist = (playlistId) => {
      if (currentPlaylistId !== playlistId) {
        currentPlaylistId = playlistId;
        player.pause().then(() => {
          player.setVolume(0.5).then(() => {
            player.resume().then(() => {
              player.play({
                context_uri: `spotify:playlist:${playlistId}`
              }).then(() => {
                console.log(`Playing playlist: ${playlistId}`);
              }).catch(error => {
                console.error('Failed to play playlist:', error);
              });
            });
          });
        });
      }
    };

    // Event listeners for emotion buttons
    sadButton.addEventListener("click", () => {
      playPlaylist('37i9dQZF1DX7qK8ma5wgG1');
    });

    happyButton.addEventListener("click", () => {
      playPlaylist('7s09coXLGbofhNrwSusr4G');
    });

    excitedButton.addEventListener("click", () => {
      playPlaylist('3gIG7djN9Kn8l06ZDpn5iP');
    });

    indifferentButton.addEventListener("click", () => {
      playPlaylist('5KvnL7siSa0tb6ZXFrqVih');
    });
  };
});
