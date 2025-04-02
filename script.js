function handleClick() {
  const input = document.getElementById("userInput").value.toLowerCase().trim(); // Normalize input
  const img = document.getElementById("image");

  if (input === "bad") {
      img.src = "assets/image/negative/1.png";
  } else if (input === "super bad") {
      img.src = "assets/image/negative/2.png";
  } else if (input === "good") {
      img.src = "assets/image/positive/1.png";
  } else if (input === "super good") {
      img.src = "assets/image/positive/2.png";
  } else if (input === "fine") {
      // Randomly choose between the two options
      const randomChoice = Math.random() < 0.5 ? "assets/image/neutral/1.png" : "assets/image/1.png";
      img.src = randomChoice;
  } else {
      alert("You entered: " + input);
  }
}
