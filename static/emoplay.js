document.addEventListener('DOMContentLoaded', function() {
	window.onSpotifyWebPlaybackSDKReady = () => {
		const player = new Spotify.Player({
			name: 'Web Playback SDK Quick Start Player',
			getOAuthToken: cb => {
				const urlParams = new URLSearchParams(window.location.search);
				const access_token = urlParams.get('access_token');
				cb(access_token);
			},
			volume: 0.5
		});
		
		player.addListener('ready', ({ device_id }) => {
			console.log('Ready with Device ID', device_id);
		});
		player.addListener('not_ready', ({ device_id }) => {
			console.log('Device ID has gone offline', device_id);
		});
		player.connect().then(success => {
			if (success) {
				console.log('The Web Playback SDK successfully connected to Spotify!');
			} else {
				console.error('Failed to connect to Spotify.');
			}
		}).catch(error => {
			console.error('Failed to connect to Spotify:', error);
		});
		
		const playControls = document.querySelector('.play-controls');
		const access_token = playControls.getAttribute('data-access-token');
				
		const playPlaylist = (playlistId) => {
			player.pause().then(() => {
				player.setVolume(0.5).then(() => {
					player.resume().then(() => {
						player._options.getOAuthToken(access_token => {
							fetch(`https://api.spotify.com/v1/me/player/play?device_id=${player._options.id}`, {
								method: 'PUT',
								headers: {
									'Content-Type': 'application/json',
									'Authorization': 'Bearer ' + access_token
								},
								body: JSON.stringify({
									context_uri: `spotify:playlist:${playlistId}`
								})
							}).then(response => {
								console.log(`Playing playlist: ${playlistId}`);
							}).catch(error => {
								console.error('Failed to play playlist:', error);
							});
						});
					});
				});
			});
		};
		
		const buttons = document.querySelectorAll('.emotion-buttons button');
		buttons.forEach(button => {
			button.addEventListener('click', function () {
				const playlistId = this.getAttribute('data-playlist-id');
				
				buttons.forEach(btn => {
					if (btn !== this) {
						btn.classList.add('fade');
					}
				});
				
				const musicPlayer = document.querySelector('.music-player');
				musicPlayer.style.display = 'block';
				
				playPlaylist(playlistId);
			});
		});
	};
});
