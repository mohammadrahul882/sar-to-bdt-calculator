async function getRate() {

const rateElement = document.getElementById("rate");

try {

rateElement.innerText = "Loading...";

const response = await fetch("https://open.er-api.com/v6/latest/SAR");

const data = await response.json();

const rate = data.rates.BDT;

rateElement.innerText = rate.toFixed(2);

}

catch(error){

rateElement.innerText = "Rate unavailable";

}

}

getRate();
