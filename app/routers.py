from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/classify', methods=['POST'])
def classify_mood():
    # Handles the incoming audio data
    audio_data = request.files['audio']
    
    # Performs mood classification using your existing code or libraries
    predicted_mood = classify_emotion(audio_data)
    
    recommended_songs = get_song_recommendations(predicted_mood)
    
    # Prepare the response
    response = {
            'mood': predicted_mood,
            'songs': recommended_songs
            }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(0.0.0.0, 5000)
