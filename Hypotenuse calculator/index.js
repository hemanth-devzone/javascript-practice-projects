let a;
let b;
let result;

document.getElementById("button").onclick = function () {
  a = document.getElementById("sideA").value;
  b = document.getElementById("sideB").value;

  result = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
  // Display result rounded to 2 decimal places
  document.getElementById(
    "result"
  ).innerHTML = `The hypotenuse is: ${result.toFixed(2)}`;
};
