from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('emoplay.html')

@app.route('/get-playlist', methods=['POST'])
def get_playlist():
    data = request.get_json()
    emotion = data.get('emotion')

    # Retrieve the playlist based on the selected emotion
    playlist = get_playlist_by_emotion(emotion)

    # You can customize the playlist response based on your requirements
    return jsonify({'playlist': playlist})

def get_playlist_by_emotion(emotion):
    # Add your logic here to determine the playlist based on the emotion
    # You can use conditionals or any other method to select the appropriate playlist
    if emotion == 'sad':
        return ['Song 1', 'Song 2', 'Song 3']
    elif emotion == 'happy':
        return ['Song 4', 'Song 5', 'Song 6']
    elif emotion == 'excited':
        return ['Song 7', 'Song 8', 'Song 9']
    elif emotion == 'indifferent':
        return ['Song 10', 'Song 11', 'Song 12']
    else:
        return []

if __name__ == '__main__':
    app.run()
