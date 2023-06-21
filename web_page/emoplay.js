// Script to handle button click events and animations
document.addEventListener("DOMContentLoaded", function() {
	const recordButton = document.getElementById("recordButton");
	const playButton = document.getElementById("playButton");
	const recordAnimation = document.getElementById("recordAnimation");
	const prevButton = document.getElementById("prevButton");
	const nextButton = document.getElementById("nextButton");

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
