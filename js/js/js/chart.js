function updateChart(){

const history = JSON.parse(localStorage.getItem("financeHistory")) || [];

const labels = history.map((h,i)=>"Entry "+(i+1));

const savings = history.map(h=>h.savings);

const ctx = document.getElementById("financeChart");

new Chart(ctx,{

type:"line",

data:{
labels:labels,
datasets:[{
label:"Savings",
data:savings,
borderColor:"green",
fill:false
}]
}

});

}
