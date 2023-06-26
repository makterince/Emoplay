// Script to handle button click events and animations
document.addEventListener("DOMContentLoaded", function() {
	const recordButton = document.getElementById("recordButton");
	const playButton = document.getElementById("playButton");
	const recordAnimation = document.getElementById("recordAnimation");
	const prevButton = document.getElementById("prevButton");
	const nextButton = document.getElementById("nextButton");

	let audioChunks = [];
	
	let mediaRecorder;
	navigator.mediaDevices.getUserMedia({ audio: true })
		.then(function(stream) {
			mediaRecorder = new MediaRecorder(stream);
			
			recordButton.addEventListener("click", function() {
				if (mediaRecorder.state === "inactive") {
					audioChunks = [];
					mediaRecorder.start();
				} else {
					mediaRecorder.stop();
				}
			});
			
			mediaRecorder.addEventListener("dataavailable", function(event) {
				audioChunks.push(event.data);
			});
			
			mediaRecorder.addEventListener("stop", function() {
				const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
				sendAudioToServer(audioBlob);
			});
		})
		.catch(function(error) {
			console.error("Error accessing audio media:", error);
		});
	
	function sendAudioToServer(audioBlob) {
		const formData = new FormData();
		formData.append("audio", audioBlob);
		
		fetch("/detect-emotion", { method: "POST", body: formData })
			.then(response => response.json())
			.then(data => {
				console.log("Emotion detected:", data);
			})
			.catch(error => {
				console.error("Emotion detection error:", error);
			});
	}

	recordButton.addEventListener("click", function() {
		// TODO: Handle audio recording logic
		console.log("Recording audio...");
		fetch("/record", { method: "POST" })
			.then(response => {
				// Handle the response from the server if needed
			})
			.catch(error => {
				// handle any errors that occur during the request
			});
	});
	
	playButton.addEventListener("click", function() {
		// TODO: Handle music playback logic
		console.log("Playing music...");
		fetch("/play", { method: "POST" })
			.then(response => {
				// Handle the response from the server if needed
			})
			.catch(error => {
				// Handle any errors that occur during the request
			});
	});

	prevButton.addEventListener("click", function() {
		// TODO: Handle previous song logic
		console.log("Playing previous song...");
		fetch("/previous", { method: "POST" })
			.then(response => {
				// Handle the response from the server if needed
			})
			.catch(error => {
				        // Handle any errors that occur during the request
			});
	});

	nextButton.addEventListener("click", function() {
		// TODO: Handle next song logic
		console.log("Playing next song...");
		fetch("/next", { method: "POST" })
			.then(response => {
				// Handle the response from the server if needed
			})
			.catch(error => {
				        // Handle any errors that occur during the request
			});
	});
});
