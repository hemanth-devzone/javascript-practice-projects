const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let paused = true;
let intervalId;

startBtn.addEventListener("click", () => {
  if (paused) {
    paused = false;
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 10);
  }
});

pauseBtn.addEventListener("click", () => {
  if (!paused) {
    paused = true;
    elapsedTime = Date.now() - startTime;
    clearInterval(intervalId);
  }
});

resetBtn.addEventListener("click", () => {
  paused = true;
  clearInterval(intervalId);
  startTime = 0;
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00.00";
});

function updateTime() {
  elapsedTime = Date.now() - startTime;

  let hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);
  let mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
  let secs = Math.floor((elapsedTime / 1000) % 60);
  let ms = Math.floor((elapsedTime % 1000) / 10);

  timeDisplay.textContent = `${pad(hrs)}:${pad(mins)}:${pad(secs)}.${pad(ms)}`;
}

function pad(unit) {
  return unit.toString().padStart(2, "0");
}
