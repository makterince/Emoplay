import os
import random
import shutil

# Define the dataset directory and the paths for the training and testing directories
dataset_dir = './data_test/Actor_01/'
train_dir = './training_dir'
test_dir = './testing_dir'

# Create the training and testing directories
os.makedirs(train_dir, exist_ok=True)
os.makedirs(test_dir, exist_ok=True)

# Loop through the audio files in the dataset directory and randomly assign them to the training or testing directory
for file in os.listdir(dataset_dir):
    if file.endswith('.wav'):
        audio_path = os.path.join(dataset_dir, file)
        # Randomly assign the file to either the training or testing directory
        if random.random() < 0.8:  # Adjust the split ratio as needed
            destination = os.path.join(train_dir, file)
        else:
            destination = os.path.join(test_dir, file)
        # Move the file to the appropriate directory
        shutil.move(audio_path, destination)
        
print("Dataset split successful.")
