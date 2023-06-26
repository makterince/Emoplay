from flask import Flask, request, jsonify, render_template
import librosa
import numpy as np
import tensorflow as tf

app = Flask(__name__)

# Load the pre-trained emotion detection model
#model = tf.keras.models.load_model('model.h5')

@app.route('/')
def index():
    return render_template('emoplay.html')

@app.route('/audio', methods=['POST'])
def save_audio():
    audio_file = request.files['audio']
    audio_path = 'recorded_audio.wav'
    audio_file.save(audio_path)
    return jsonify({'message': 'Audio file saved successfully.'})

@app.route('/detect-emotion', methods=['POST'])
def detect_emotion():
    audio_path = 'recorded_audio.wav'
    predicted_emotion = classify_emotion(audio_path)
    return jsonify({'emotion': predicted_emotion})

def classify_emotion(audio_path):
    audio, sr = librosa.load(audio_path, duration=3)  # Load audio file (adjust duration if needed)
    features = extract_features(audio)  # Extract audio features
    features = np.expand_dims(features, axis=0)  # Add batch dimension
    prediction = model.predict(features)[0]  # Make prediction
    emotion_moods = ['Neutral', 'Calm', 'Happy', 'Sad', 'Angry', 'Fearful', 'Disgust', 'Surprised']
    predicted_emotion = emotion_moods[np.argmax(prediction)]
    return predicted_emotion

def extract_features(audio):
    chroma_stft = librosa.feature.chroma_stft(y=audio, sr=sr)
    mfcc = librosa.feature.mfcc(y=audio, sr=sr)
    features = np.concatenate((chroma_stft.mean(axis=1), mfcc.mean(axis=1)))  # Combine features
    return features

if __name__ == '__main__':
    app.run()

