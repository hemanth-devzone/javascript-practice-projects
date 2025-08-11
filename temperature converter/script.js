document.getElementById("convertBtn").onclick = function () {
  let temp;
  let temperature = document.getElementById("tempInput").value;

  if (document.getElementById("celsius").checked) {
    temp = document.getElementById("tempInput").value;
    temp = Number(temp);
    temp = tocelsius(temp);
    document.getElementById("result").innerHTML = `${temperature}°F is ${temp.toFixed(2)}°C`;
    console.log(`${temperature}°F is ${temp.toFixed(2)}°C`);
  } 
  
  else if (document.getElementById("fahrenheit").checked) {
    temp = document.getElementById("tempInput").value;
    temp = Number(temp);
    temp = tofahrenheit(temp);
    document.getElementById("result").innerHTML = `${temperature}°C is ${temp.toFixed(2)}°F`;
    console.log(`${temperature}°C is ${temp.toFixed(2)}°F`);
  } 
  
  else {
    document.getElementById("result").innerHTML ="Please select a conversion option.";
  }
};

function tocelsius(temp) {
  return ((temp - 32) * 5) / 9;
}

function tofahrenheit(temp) {
  return (temp * 9) / 5 + 32;
}
