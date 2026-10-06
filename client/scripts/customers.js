const saveBtn =
document.getElementById("saveCustomerBtn");

if(saveBtn){

saveBtn.addEventListener("click",addCustomer);

}

async function addCustomer(){

const token =
localStorage.getItem("token");

const customerName =
document.getElementById("customerName").value.trim();

const phone =
document.getElementById("phone").value.trim();

const email =
document.getElementById("email").value.trim();

const gstNumber =
document.getElementById("gstNumber").value.trim();

const address =
document.getElementById("address").value.trim();

if(

!customerName ||

!phone

){

alert("Customer Name and Mobile are required.");

return;

}

saveBtn.disabled=true;

saveBtn.innerText="Saving...";

try{

const response = await fetch(

"http://localhost:5000/api/customers",

{

method:"POST",

headers:{

"Content-Type":"application/json",

Authorization:`Bearer ${token}`

},

body:JSON.stringify({

customerName,

phone,

email,

gstNumber,

address

})

}

);

const data =
await response.json();

if(data.success){

alert("Customer Added Successfully");

location.reload();

}

else{

alert(data.message);

}

}

catch(error){

console.log(error);

alert("Server Error");

}

finally{

saveBtn.disabled=false;

saveBtn.innerText="Save Customer";

}

}
window.addEventListener("load",loadCustomers);

async function loadCustomers(){

const token =
localStorage.getItem("token");

try{

const response = await fetch(

"http://localhost:5000/api/customers",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

const data =
await response.json();

const table =
document.getElementById("customerTable");

table.innerHTML="";

if(data.customers.length===0){

table.innerHTML=`

<tr>

<td colspan="6">

No customer records available.

</td>

</tr>

`;

return;

}

let active=0;

data.customers.forEach(customer=>{

if(customer.status){

active++;

}

table.innerHTML+=`

<tr>

<td>${customer.customerName}</td>

<td>${customer.phone}</td>

<td>${customer.email}</td>

<td>${customer.gstNumber}</td>

<td>${customer.status?"Active":"Inactive"}</td>

<td>Regular</td>

</tr>

`;

});

document.getElementById("totalCustomers").innerText =
data.customers.length;

document.getElementById("activeCustomers").innerText =
active;

document.getElementById("summaryCustomers").innerText =
data.customers.length;

document.getElementById("summaryActiveCustomers").innerText =
active;

document.getElementById("summaryWholesaleCustomers").innerText =
0;

document.getElementById("creditCustomers").innerText =
0;

document.getElementById("outstandingBalance").innerText =
"₹0";

}

catch(error){

console.log(error);

}
}