function handleClick() {
  const input = document.getElementById("userInput").value.toLowerCase(); // Convert input to lowercase
  const img = document.getElementById("image");

  if (input === "bad") {
      img.src = "assets/image/negative/1.png";
  } else if (input === "good") {
      img.src = "assets/image/positive/1.png";
  } else if (input === "fine") {
      img.src = "assets/image/neutral/1.png";
  } else {
      alert("You entered: " + input);
  }
}
