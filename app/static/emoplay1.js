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
	
	player.connect().then(success => {
		if (success) {
			console.log('The Web Playback SDK successfully connected to Spotify!');
		}
	}).catch(error => {
		console.error('Failed to connect to Spotify:', error);
	});
	
	const playButton = document.getElementById('playButton');
	playButton.addEventListener('click', () => {
		player.togglePlay().then(() => {
			console.log('Toggle playback');
		}).catch(error => {
			console.error('Failed to toggle playback:', error);
		});
	});
	
	const nextButton = document.getElementById('nextButton');
	nextButton.addEventListener('click', () => {
		player.nextTrack().then(() => {
			console.log('Next track');
		}).catch(error => {
			console.error('Failed to play next track:', error);
		});
	});
	
	const prevButton = document.getElementById('prevButton');
	prevButton.addEventListener('click', () => {
		player.previousTrack().then(() => {
			console.log('Previous track');
		}).catch(error => {
			console.error('Failed to play previous track:', error);
		});
	});
	
	const playPlaylist = (playlistId) => {
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
	};
	
	const sadButton = document.getElementById('sadButton');
	sadButton.addEventListener('click', () => {
		playPlaylist('37i9dQZF1DX7qK8ma5wgG1');
	});
	
	const happyButton = document.getElementById('happyButton');
	happyButton.addEventListener('click', () => {
		playPlaylist('7s09coXLGbofhNrwSusr4G');
	});
	
	const excitedButton = document.getElementById('excitedButton');
	excitedButton.addEventListener('click', () => {
		playPlaylist('3gIG7djN9Kn8l06ZDpn5iP');
	});
	
	const indifferentButton = document.getElementById('indifferentButton');
	indifferentButton.addEventListener('click', () => {
		playPlaylist('5KvnL7siSa0tb6ZXFrqVih');
	});
};
