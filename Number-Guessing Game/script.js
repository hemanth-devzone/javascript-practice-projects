const number = Math.floor(Math.random() * 10 + 1);

let guesses = 0;

document.getElementById("submit").onclick = function () {
  let guess = Number(document.getElementById("guess").value);
  guesses++;
  if (!guess || guess < 1 || guess > 10) {
    document.getElementById("result").innerHTML =
      "Please enter a valid number between 1 and 10.";
  } else if (guess == number) {
    document.getElementById(
      "result"
    ).innerHTML = `Congratulations! You guessed the number ${number} in ${guesses} tries.`;
    guesses = 0; // Reset guesses for a new game
    document.getElementById("guess").value = ""; // Clear input field
  } else if (guess < number) {
    document.getElementById("result").innerHTML = "Too low! Try again.";
  } else if (guess > number) {
    document.getElementById("result").innerHTML = "Too high! Try again.";
  }
};
