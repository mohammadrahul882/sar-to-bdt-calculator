async function getLiveRate(currency) {

const response = await fetch("https://open.er-api.com/v6/latest/" + currency);

const data = await response.json();

return data.rates.BDT;

}

async function updateRate() {

const currency = document.getElementById("currency").value;

const rate = await getLiveRate(currency);

document.getElementById("rate").innerText = rate.toFixed(2);

document.getElementById("exchangeRate").value = rate.toFixed(2);

}

document.getElementById("currency").addEventListener("change", updateRate);

updateRate();
