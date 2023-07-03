from flask import redirect, request, session, url_for
import requesti

# Spotify API credentials
CLIENT_ID = '6b39c5ac11d84059b461372141789b5'
CLIENT_SECRET = '29ffe2e6aaca4bda8738bf60faaaf8c3'
REDIRECT_URI = 'https://127.0.0.1:5000/spotify_callback'

# Spotify API endpoints
TOKEN_URL = 'https://accounts.spotify.com/api/token'
AUTH_URL = 'https://accounts.spotify.com/authorize'

# Flask route to initiate the Spotify authorization flow
@app.route('/spotify_auth')
def spotify_auth():
    # Define the authorization scopes
    scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public']
    
    # Generate the authorization URL
    auth_url = f'{AUTH_URL}?response_type=code&client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope={"%20".join(scopes)}'
    
    # Redirect the user to Spotify's authorization page
    return redirect(auth_url)


# Flask route to handle the Spotify authorization callback
@app.route('/spotify_callback')
def spotify_callback():
    # Authorization code received from Spotify
    auth_code = request.args.get('code')
    
    # Exchange the authorization code for an access token
    data = {
            'grant_type': 'authorization_code',
            'code': auth_code,
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET
            }
    response = requests.post(TOKEN_URL, data=data)
    
    # Extract the access token from the response
    access_token = response.json().get('access_token')
    
    # Store the access token in the session
    session['access_token'] = access_token
    
    # Redirect to the main page              
    return redirect(url_for('index'))
