let count = 0;

document.getElementById("incrementButton").onclick = function () {
  count += 1;
  document.getElementById("counterLabel").innerHTML = count;
};

document.getElementById("resetButton").onclick = function () {
  count = 0;
  document.getElementById("counterLabel").innerHTML = count;
};

document.getElementById("decrementButton").onclick = function () {
  count -= 1;
  document.getElementById("counterLabel").innerHTML = count;
};
