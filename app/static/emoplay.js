document.addEventListener("DOMContentLoaded", function() {
  const sadButton = document.getElementById("sadButton");
  const happyButton = document.getElementById("happyButton");
  const excitedButton = document.getElementById("excitedButton");
  const indifferentButton = document.getElementById("indifferentButton");
  const submitEmotionButton = document.getElementById("submitEmotionButton");

  sadButton.addEventListener("click", function() {
    setEmotion("sad");
  });

  happyButton.addEventListener("click", function() {
    setEmotion("happy");
  });

  excitedButton.addEventListener("click", function() {
    setEmotion("excited");
  });

  indifferentButton.addEventListener("click", function() {
    setEmotion("indifferent");
  });

  function setEmotion(emotion) {
    console.log("Selected emotion:", emotion);
  }

  submitEmotionButton.addEventListener("click", function() {
    const selectedEmotion = getSelectedEmotion();
    if (selectedEmotion) {
      sendEmotionToServer(selectedEmotion);
    }
  });

  function getSelectedEmotion() {
    const buttons = [sadButton, happyButton, excitedButton, indifferentButton];
    for (const button of buttons) {
      if (button.classList.contains("selected")) {
        return button.getAttribute("data-emotion");
      }
    }
    return null;
  }

  function sendEmotionToServer(emotion) {
    fetch("/get-playlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ emotion: emotion })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Received playlist data:", data);
      })
      .catch(error => {
        console.error("Error retrieving playlist:", error);
      });
  }
});
