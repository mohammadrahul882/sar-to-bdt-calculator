function calculate(){

const salary = Number(document.getElementById("salary").value);

const rate = Number(document.getElementById("exchangeRate").value);

const expense = Number(document.getElementById("expense").value);

const goal = Number(document.getElementById("goal").value);

const fee = Number(document.getElementById("fee").value);

const incomeBDT = salary * rate;

const feeAmount = incomeBDT * (fee/100);

const finalIncome = incomeBDT - feeAmount;

const savings = finalIncome - expense;

document.getElementById("output").innerText =
"Income BDT: "+finalIncome+" | Savings: "+savings;

saveHistory({
salary,
expense,
savings
});

updateChart();

}
