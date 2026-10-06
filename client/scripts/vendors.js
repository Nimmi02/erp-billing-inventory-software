const saveBtn =
document.getElementById("saveVendorBtn");

if(saveBtn){

saveBtn.addEventListener("click",addVendor);

}

async function addVendor(){

const token =
localStorage.getItem("token");

const vendorName =
document.getElementById("vendorName").value.trim();

const phone =
document.getElementById("phone").value.trim();

const email =
document.getElementById("email").value.trim();

const gstNumber =
document.getElementById("gstNumber").value.trim();

const address =
document.getElementById("address").value.trim();

if(

!vendorName ||

!phone ||

!email

){

alert("Please fill all required fields.");

return;

}

saveBtn.disabled=true;

saveBtn.innerText="Saving...";

try{

const response = await fetch(

"http://localhost:5000/api/vendors",

{

method:"POST",

headers:{

"Content-Type":"application/json",

Authorization:`Bearer ${token}`

},

body:JSON.stringify({

vendorName,

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

alert("Vendor Added Successfully");

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

saveBtn.innerText="Save Vendor";

}

}

window.addEventListener("load",loadVendors);

async function loadVendors(){

const token =
localStorage.getItem("token");

try{

const response = await fetch(

"http://localhost:5000/api/vendors",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

const data =
await response.json();

const table =
document.getElementById("vendorTable");

table.innerHTML="";

if(data.vendors.length===0){

table.innerHTML=`

<tr>

<td colspan="7">

No vendor records available.

</td>

</tr>

`;

return;

}

let active=0;
let inactive=0;

data.vendors.forEach(vendor=>{

if(vendor.status){

active++;

}

else{

inactive++;

}

table.innerHTML+=`

<tr>

<td>${vendor.vendorName}</td>

<td>${vendor.phone}</td>

<td>${vendor.email}</td>

<td>${vendor.gstNumber || "-"}</td>

<td>${vendor.status ? "Active" : "Inactive"}</td>

<td>General</td>

<td>General</td>

</tr>

`;

});

document.getElementById("totalVendors").innerText =
data.vendors.length;

document.getElementById("activeVendors").innerText =
active;

document.getElementById("inactiveVendors").innerText =
inactive;

document.getElementById("creditVendors").innerText =
0;

}

catch(error){

console.log(error);

alert("Unable to load vendors.");

}

}