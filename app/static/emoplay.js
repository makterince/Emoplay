document.addEventListener("DOMContentLoaded", function() {
  const recordButton = document.getElementById("recordButton");
  const playButton = document.getElementById("playButton");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const shuffleButton = document.getElementById("shuffleButton");
  const recordAnimation = document.getElementById("recordAnimation");
  const emotionButtons = document.querySelectorAll(".emotion-buttons button");

  let audioChunks = [];

  // Add event listeners to the emotion buttons
  emotionButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      const selectedEmotion = button.dataset.emotion;
      getPlaylist(selectedEmotion);
    });
  });

  // Function to get the playlist based on the selected emotion
  function getPlaylist(emotion) {
    fetch("/get-playlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emotion: emotion }),
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Handle the received playlist data
        const playlist = data.playlist;
        console.log("Received playlist:", playlist);
      })
      .catch(function(error) {
        console.error("Error retrieving playlist:", error);
      });
  }

  // Add event listeners to the control buttons
  recordButton.addEventListener("click", function() {
    // TODO: Handle audio recording logic
    console.log("Recording audio...");
  });

  playButton.addEventListener("click", function() {
    // TODO: Handle music playback logic
    console.log("Playing music...");
  });

  prevButton.addEventListener("click", function() {
    // TODO: Handle previous song logic
    console.log("Playing previous song...");
  });

  nextButton.addEventListener("click", function() {
    // TODO: Handle next song logic
    console.log("Playing next song...");
  });

  shuffleButton.addEventListener("click", function() {
    // TODO: Handle shuffle song logic
    console.log("Shuffling songs...");
  });
});
