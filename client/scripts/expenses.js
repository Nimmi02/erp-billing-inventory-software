const token = localStorage.getItem("token");

const saveExpenseBtn =
document.getElementById("saveExpenseBtn");

if(saveExpenseBtn){

saveExpenseBtn.addEventListener("click",addExpense);

}

window.addEventListener("load",loadExpenses);

async function addExpense(){

const expenseName =
document.getElementById("expenseName").value.trim();

const category =
document.getElementById("category").value;

const amount =
Number(document.getElementById("amount").value);

const expenseDate =
document.getElementById("expenseDate").value;

const paymentMethod =
document.getElementById("paymentMethod").value;

const notes =
document.getElementById("notes").value.trim();

if(

!expenseName ||

!category ||

amount<=0 ||

!expenseDate

){

alert("Please fill all required fields.");

return;

}

const response = await fetch(

"http://localhost:5000/api/expenses",

{

method:"POST",

headers:{

"Content-Type":"application/json",

Authorization:`Bearer ${token}`

},

body:JSON.stringify({

expenseName,

category,

amount,

expenseDate,

paymentMethod,

notes

})

}

);

const data =
await response.json();

if(data.success){

alert("Expense Added Successfully");

loadExpenses();

clearForm();

}

else{

alert(data.message);

}

}

async function loadExpenses(){

const response = await fetch(

"http://localhost:5000/api/expenses",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

const data =
await response.json();

if(!data.success){

return;

}

const table =
document.getElementById("expenseTable");

table.innerHTML="";

let totalExpense=0;

let todayExpense=0;

let monthlyExpense=0;

let highestExpense=0;

let cashExpense=0;

let onlineExpense=0;

const today =
new Date().toDateString();

const currentMonth =
new Date().getMonth();

const currentYear =
new Date().getFullYear();

data.expenses.forEach(expense=>{

const expenseDate =
new Date(expense.expenseDate);

totalExpense += expense.amount;

if(expense.amount>highestExpense){

highestExpense = expense.amount;

}

if(expense.paymentMethod==="Cash"){

cashExpense += expense.amount;

}

else{

onlineExpense += expense.amount;

}

if(expenseDate.toDateString()===today){

todayExpense += expense.amount;

}

if(

expenseDate.getMonth()===currentMonth &&

expenseDate.getFullYear()===currentYear

){

monthlyExpense += expense.amount;

}

table.innerHTML += `

<tr>

<td>${expense.expenseName}</td>

<td>${expense.category}</td>

<td>₹${expense.amount}</td>

<td>${expenseDate.toLocaleDateString()}</td>

<td>${expense.paymentMethod}</td>

</tr>

`;

});

document.getElementById("todayExpense").innerText =
"₹"+todayExpense;

document.getElementById("monthlyExpense").innerText =
"₹"+monthlyExpense;

document.getElementById("totalExpense").innerText =
"₹"+totalExpense;

document.getElementById("highestExpense").innerText =
"₹"+highestExpense;

document.getElementById("summaryTotalExpense").innerText =
"₹"+totalExpense;

document.getElementById("summaryMonthlyExpense").innerText =
"₹"+monthlyExpense;

document.getElementById("cashExpense").innerText =
"₹"+cashExpense;

document.getElementById("onlineExpense").innerText =
"₹"+onlineExpense;

}

function clearForm(){

document.getElementById("expenseName").value="";

document.getElementById("amount").value="";

document.getElementById("expenseDate").value="";

document.getElementById("notes").value="";

document.getElementById("category").selectedIndex=0;

document.getElementById("paymentMethod").selectedIndex=0;

}