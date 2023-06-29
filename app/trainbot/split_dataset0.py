import librosa
import numpy as np
import os
from sklearn.model_selection import train_test_split

def extract_mfcc(audio_path):
    audio, sr = librosa.load(audio_path, sr=None)
    mfcc = librosa.feature.mfcc(y=audio, sr=sr)
    return mfcc

# Path to the directory containing the audio files
current_dir = os.getcwd()
dataset_rel_path = './data_test/Actor_02/'
dataset_dir = os.path.join(current_dir, dataset_rel_path)

# List to store the MFCC features and labels
features = []
labels = []

for file in os.listdir(dataset_dir):
    if file.endswith('.wav'):
        audio_path = os.path.join(dataset_dir, file)
        mfcc = extract_mfcc(audio_path)
        features.append(mfcc)
        labels.append(actor_label)
        
# Convert the lists to numpy arrays
features = np.array(features)
labels = np.array(labels)

# Split the dataset into training and validation sets
train_features, val_features, train_labels, val_labels = train_test_split(features, labels, test_size=0.2, random_state=42)
