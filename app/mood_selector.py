import librosa
import tensorflow as tf
import numpy as np
import sounddevice as sd
import pandas as pd

"""here would contain functions to:
    record audio on the platform
    extract the audio and convert
    classify emotions based on the audio
"""

model = tf.keras.models.load_model('model.h5')


def record_audio(duration):
    fs = 22050  # Sample rate
    print("Recording...")
    audio = sd.rec(int(duration * fs), samplerate=fs, channels=1, dtype=np.float32)
    sd.wait()  # Wait until recording is finished
    return audio.flatten()

def extract_features(audio):
    chroma_stft = librosa.feature.chroma_stft(y=audio, sr=fs)
    mfcc = librosa.feature.mfcc(y=audio, sr=fs)
    features = np.concatenate((chroma_stft.mean(axis=1), mfcc.mean(axis=1)))  # Combine features
    return features

def classify_emotion(audio):
    features = extract_features(audio)  # Extract audio features
    features = np.expand_dims(features, axis=0)  # Add batch dimension
    prediction = model.predict(features)[0]  # Make prediction
    emotion_moods = ['Neutral', 'Calm', 'Happy', 'Sad', 'Angry', 'Fearful', 'Disgust', 'Surprised']
    predicted_mood = emotion_moods[np.argmax(prediction)]
    return predicted_mood
