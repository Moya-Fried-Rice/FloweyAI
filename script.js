let badCount = 0;
let goodCount = 1;
let currentAudio = null;  // Variable to hold the current audio instance

function startGame() {
    // Hide the "BEGIN" button and show the game content
    document.getElementById("beginButton").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";

    // Play intro animation
    playIntroAnimation();

    // Start playing the music
    playBackgroundMusic("normal");
}

function playBackgroundMusic(type) {
    // Stop the current audio if it's playing
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0; // Reset the audio to the beginning
    }

    // Play the appropriate music based on the 'type' argument
    if (type === "scary") {
        currentAudio = new Audio("assets/audio/Scary.mp3");
    } else {
        currentAudio = new Audio("assets/audio/Your best friend.mp3");
    }

    currentAudio.loop = true;
    currentAudio.play();
}

function playIntroAnimation() {
    const img = document.getElementById("image");
    let startImages = [
        "assets/image/start/1.png",
        "assets/image/start/2.png",
        "assets/image/start/3.png",
        "assets/image/start/4.png",
        "assets/image/start/5.png",
        "assets/image/start/6.png",
        "assets/image/start/7.png",
        "assets/image/start/8.png",
        "assets/image/start/9.png",
        "assets/image/positive/1.png",
    ];
    let index = 0;
    let startInterval = setInterval(() => {
        img.src = startImages[index];
        index++;
        if (index >= startImages.length) {
            clearInterval(startInterval);
        }
    }, 70);
}

function handleClick() {
    const input = document.getElementById("userInput").value.toLowerCase().trim();
    const img = document.getElementById("image");

    if (input === "bad") {
        badCount++;
        if (badCount === 2) {
            // Stop the normal music and play the scary music when badCount is 2
            playBackgroundMusic("scary");
    
            // Start shaking the image quickly when badCount reaches 2
            startShaking(img);
        }
    
        if (badCount % 3 === 0) {
            let glitchImages = [
                "assets/image/corrupted/1.png",
                "assets/image/corrupted/2.png",
                "assets/image/corrupted/3.png",
                "assets/image/corrupted/4.png",
                "assets/image/corrupted/5.png",
                "assets/image/corrupted/5.png",
            ];
    
            let index = 0;
            let glitchInterval = setInterval(() => {
                // Show the current glitch image
                img.src = glitchImages[index];
                index++;
    
                // Random number of glitches to show before the next image
                let numGlitches = Math.floor(Math.random() * 5) + 2; // Random number between 1 and 5
    
                // Show glitches before moving to the next image
                let glitchCount = 0;
                let showGlitchesInterval = setInterval(() => {
                    if (Math.random() < 0.3) { // 30% chance to show the corrupted 6 image
                        let glitchImageElement = document.createElement("img");
                        glitchImageElement.src = "assets/image/corrupted/6.png";
                        glitchImageElement.style.position = "absolute";
                        glitchImageElement.style.top = "50%";
                        glitchImageElement.style.left = "50%";
                        glitchImageElement.style.transform = "translate(-50%, -50%) scale(10)";
                        glitchImageElement.style.zIndex = "9999"; // Ensure it's on top of other elements
                        document.body.appendChild(glitchImageElement);
    
                        // Remove the glitch image after a short time
                        setTimeout(() => {
                            glitchImageElement.remove();
                        }, 50); // Remove after 50ms
                    }
                    glitchCount++;
                    if (glitchCount >= numGlitches) {
                        clearInterval(showGlitchesInterval); // Stop showing glitches after the random number
                    }
                }, 100); // Glitches shown every 100ms
    
                // Stop the glitch image interval when all glitch images have been shown
                if (index >= glitchImages.length) {
                    clearInterval(glitchInterval);
    
                    // Show the "6" image for a longer duration after all glitches
                    let finalGlitchImage = document.createElement("img");
                    finalGlitchImage.src = "assets/image/corrupted/6.png";
                    finalGlitchImage.style.position = "absolute";
                    finalGlitchImage.style.top = "50%";
                    finalGlitchImage.style.left = "50%";
                    finalGlitchImage.style.transform = "translate(-50%, -50%) scale(10)";
                    finalGlitchImage.style.zIndex = "9999"; // Ensure it's on top of other elements
                    document.body.appendChild(finalGlitchImage);
    
                    // Keep the final "6" image on the screen for a longer time
                    setTimeout(() => {
                        finalGlitchImage.remove();
                        resetGame(); // Reset everything after the glitch image is removed
                    }, 1000); // Keep it on screen for 1 second
                }
            }, 1000); // Slow down the change between glitch images (600ms)
        } else {
            if (badCount === 2 && !window.shownCorrupted6) {
                img.src = "assets/image/negative/2.png";
                // Show the corrupted 6 image only once when badCount is 2
                let glitchImageElement = document.createElement("img");
                glitchImageElement.src = "assets/image/corrupted/6.png";
                glitchImageElement.style.position = "absolute";
                glitchImageElement.style.top = "50%";
                glitchImageElement.style.left = "50%";
                glitchImageElement.style.transform = "translate(-50%, -50%) scale(10)";
                glitchImageElement.style.zIndex = "9999"; // Ensure it's on top of other elements
                document.body.appendChild(glitchImageElement);
    
                // Remove the glitch image after a short time
                setTimeout(() => {
                    glitchImageElement.remove();
                }, 50); // Remove after 50ms
    
                // Set a flag so the "6" image is shown only once
                window.shownCorrupted6 = true;
            } else {
                img.src = badCount % 2 === 1 ? "assets/image/negative/1.png" : "assets/image/negative/2.png";
            }
        }
    }
    else if (input === "good") {
        goodCount++;
        img.src = goodCount % 2 === 1 ? "assets/image/positive/1.png" : "assets/image/positive/2.png";
    } else {
        img.src = Math.random() < 0.5 ? "assets/image/neutral/1.png" : "assets/image/1.png";
    }
}

function resetGame() {
    // Reset badCount and any other variables or elements you want to reset
    badCount = 0;
    goodCount = 0;
    window.shownCorrupted6 = false; // Reset the flag for showing the "6" image

    // Reset the shaking animation (but don't remove it)
    const img = document.getElementById("image");
    img.style.animation = ""; // Remove the shaking animation

    // Remove any corruption images that might still be visible
    const glitchImages = document.querySelectorAll("img[src='assets/image/corrupted/6.png']");
    glitchImages.forEach(image => image.remove());

    // Reset image source or do any other resetting
    img.src = "assets/image/1.png"; // You can set this to any default image or leave it blank
    img.classList.remove("shake");
    // Stop the scary music and return to normal music
    playBackgroundMusic("normal");
    document.getElementById("userInput").value = "";
}

// Function to start shaking the image when badCount is 2
function startShaking(img) {
    img.classList.add("shake"); // Add the shake class to trigger the shaking animation
}

let typingAudio = new Audio("assets/audio/Keyboard.mp3");
let isTyping = false;
let typingTimeout;

// Function to start playing the typing sound
function handleTyping() {
    // If it's not already playing, start playing the typing sound
    if (!isTyping) {
        typingAudio.play();
        isTyping = true;
    }

    // Clear the previous timeout (if any)
    clearTimeout(typingTimeout);

    // Set a timeout to stop the audio if the user stops typing for 500ms
    typingTimeout = setTimeout(() => {
        typingAudio.pause();
        typingAudio.currentTime = 0;  // Reset the audio to the beginning
        isTyping = false;
    }, 500); // 500ms delay after the last keystroke before stopping the audio
}

// Add event listener to the input field to handle typing
document.getElementById("userInput").addEventListener("input", handleTyping);

