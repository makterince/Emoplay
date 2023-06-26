import tekore as tk
def authorize():
    CLIENT_ID = "6b39c5ac11d84059b461372141789b59"
    CLIENT_SECRET = "29ffe2e6aaca4bda8738bf60faaaf8c3"
    app_token = tk.request_client_token(CLIENT_ID, CLIENT_SECRET)
    return tk.Spotify(app_token)
