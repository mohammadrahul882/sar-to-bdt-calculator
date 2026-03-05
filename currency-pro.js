let currenciesData = {};

async function loadCurrencies(){

const from = document.getElementById("fromCurrency");
const to = document.getElementById("toCurrency");

try{

let res = await fetch("https://open.er-api.com/v6/latest/USD");
let data = await res.json();

currenciesData = data.rates;

let currencies = Object.keys(currenciesData).sort();

currencies.forEach(code => {

let option1 = document.createElement("option");
option1.value = code;
option1.text = code;

let option2 = document.createElement("option");
option2.value = code;
option2.text = code;

from.appendChild(option1);
to.appendChild(option2);

});

from.value = "SAR";
to.value = "BDT";

}catch(e){

console.log("Currency load failed");

}

}

async function convertCurrency(){

let amount = document.getElementById("amount").value;
let from = document.getElementById("fromCurrency").value;
let to = document.getElementById("toCurrency").value;

let resultBox = document.getElementById("result");

if(amount === "" || amount <= 0){

resultBox.innerText = "Enter amount";
return;

}

resultBox.innerHTML = "Loading live rate...";

try{

let res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
let data = await res.json();

let rate = data.rates[to];

let result = amount * rate;

resultBox.innerHTML = `
<div style="font-size:22px">
<b>${amount}</b> ${from}
=
<b>${result.toFixed(2)}</b> ${to}
</div>

<div style="font-size:14px;color:gray">
Live Rate: 1 ${from} = ${rate} ${to}
</div>
`;

}catch(e){

resultBox.innerText = "Rate fetch failed";

}

}

function swapCurrency(){

let from = document.getElementById("fromCurrency");
let to = document.getElementById("toCurrency");

let temp = from.value;

from.value = to.value;
to.value = temp;

convertCurrency();

}

function searchCurrency(){

let input = document.getElementById("currencySearch").value.toUpperCase();
let selects = document.querySelectorAll("select option");

selects.forEach(option => {

if(option.value.includes(input)){

option.style.display = "block";

}else{

option.style.display = "none";

}

});

}

document.getElementById("amount").addEventListener("input", convertCurrency);

window.onload = loadCurrencies;
