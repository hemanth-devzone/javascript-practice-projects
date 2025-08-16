const playerText = document.querySelector("#playerText");
const computerText = document.querySelector("#computerText");
const resultText = document.querySelector("#resultText");
const choiceBtns = document.querySelectorAll(".choiceBtn");
let player;
let computer;

choiceBtns.forEach((button) =>
  button.addEventListener("click", () => {
    player = button.textContent;
    computerTurn();
    playerText.textContent = `Player: ${player}`;
    computerText.textContent = `Computer: ${computer}`;
    resultText.textContent = checkWinner();
    animateResult();
  })
);

function computerTurn() {
  const choices = ["ROCK", "PAPER", "SCISSORS"];
  computer = choices[Math.floor(Math.random() * choices.length)];
}

function checkWinner() {
  if (player === computer) {
    return "Draw!";
  } else if (
    (player === "ROCK" && computer === "SCISSORS") ||
    (player === "PAPER" && computer === "ROCK") ||
    (player === "SCISSORS" && computer === "PAPER")
  ) {
    return "You Win! 🎉";
  } else {
    return "You Lose! 😢";
  }
}

// Add a simple animation to the result text
function animateResult() {
  resultText.style.transform = "scale(1.2)";
  resultText.style.transition = "transform 0.2s";
  setTimeout(() => {
    resultText.style.transform = "scale(1)";
  }, 200);
}
