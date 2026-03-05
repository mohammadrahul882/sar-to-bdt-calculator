function saveHistory(data){

let history = JSON.parse(localStorage.getItem("financeHistory")) || [];

history.push(data);

localStorage.setItem("financeHistory", JSON.stringify(history));

}

function getHistory(){

return JSON.parse(localStorage.getItem("financeHistory")) || [];

}
