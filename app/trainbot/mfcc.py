import librosa

# Path to the audio file
audio_file = './data_test/Actor_02/03-01-01-01-01-01-02.wav'

# Load the audio file
audio, sr = librosa.load(audio_file, sr=None)

# Calculate the MFCC features
mfcc_features = librosa.feature.mfcc(y=audio, sr=sr)

# Print the shape of the MFCC features
print("MFCC shape:", mfcc_features.shape)

