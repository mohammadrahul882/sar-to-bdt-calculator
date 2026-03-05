const CurrencyProSystem = {

rates:{},
history:[],

async init(){

await this.loadRates();
this.populateCurrencies();
this.bindEvents();
this.autoRefresh();

},

async loadRates(){

try{

let res = await fetch("https://open.er-api.com/v6/latest/USD");
let data = await res.json();

this.rates = data.rates;

localStorage.setItem("ratesCache",JSON.stringify(this.rates));

}catch(e){

let cache = localStorage.getItem("ratesCache");

if(cache){
this.rates = JSON.parse(cache);
}

}

},

populateCurrencies(){

const from=document.getElementById("fromCurrency");
const to=document.getElementById("toCurrency");

let currencies = Object.keys(this.rates).sort();

currencies.forEach(code=>{

let label=this.flag(code)+" "+code;

from.appendChild(new Option(label,code));
to.appendChild(new Option(label,code));

});

from.value="SAR";
to.value="BDT";

},

convert(){

let amount=document.getElementById("amount").value;
let from=document.getElementById("fromCurrency").value;
let to=document.getElementById("toCurrency").value;

let resultBox=document.getElementById("result");

if(amount<=0){

resultBox.innerText="Enter amount";
return;

}

let rate=this.rates[to]/this.rates[from];
let result=amount*rate;

resultBox.innerHTML=
`${amount} ${this.flag(from)} ${from}
=
${result.toFixed(2)} ${this.flag(to)} ${to}
<br>
Rate: 1 ${from} = ${rate.toFixed(4)} ${to}`;

this.addHistory(amount,from,to,result);

},

swap(){

let from=document.getElementById("fromCurrency");
let to=document.getElementById("toCurrency");

let temp=from.value;

from.value=to.value;
to.value=temp;

this.convert();

},

search(){

let input=document.getElementById("currencySearch").value.toUpperCase();

document.querySelectorAll("select option").forEach(o=>{

o.style.display=o.text.includes(input)?"block":"none";

});

},

flag(code){

const flags={
USD:"🇺🇸",EUR:"🇪🇺",SAR:"🇸🇦",AED:"🇦🇪",QAR:"🇶🇦",
KWD:"🇰🇼",BDT:"🇧🇩",INR:"🇮🇳",PKR:"🇵🇰",TRY:"🇹🇷",
GBP:"🇬🇧",JPY:"🇯🇵",CNY:"🇨🇳",MYR:"🇲🇾",IDR:"🇮🇩",
CAD:"🇨🇦",AUD:"🇦🇺",CHF:"🇨🇭",SGD:"🇸🇬"
};

return flags[code] || "🌍";

},

addHistory(a,f,t,r){

this.history.unshift(`${a} ${f} → ${r.toFixed(2)} ${t}`);

if(this.history.length>5){
this.history.pop();
}

let box=document.getElementById("history");

if(box){
box.innerHTML="<b>Recent:</b><br>"+this.history.join("<br>");
}

},

autoRefresh(){

setInterval(()=>{

this.loadRates();

},600000);

},

bindEvents(){

document.getElementById("amount")
.addEventListener("input",()=>this.convert());

}

};

window.onload = ()=> CurrencyProSystem.init();
