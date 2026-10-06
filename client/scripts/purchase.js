const generatePurchaseBtn =
document.getElementById(
"generatePurchaseBtn"
);
const vendorDropdown =
document.getElementById("vendorName");

const productDropdown =
document.getElementById("productName");
if(generatePurchaseBtn){

generatePurchaseBtn.addEventListener(
"click",
async function(){

const supplierName =
document.querySelector(
'input[placeholder="Supplier name"]'
).value;

const supplierMobile =
document.querySelector(
'input[placeholder="Supplier mobile number"]'
).value;

const invoiceNumber =
document.querySelector(
'input[placeholder="Invoice number"]'
).value;

const purchaseAmount =
document.querySelector(
'input[placeholder="Purchase amount"]'
).value;

const purchaseDate =
document.querySelector(
'input[type="date"]'
).value;

if(
supplierName === "" ||
supplierMobile === "" ||
invoiceNumber === "" ||
purchaseDate === ""
){
alert(
"Please complete purchase details."
);
return;
}

const product = document.getElementById("productName");

const productCode = document.getElementById("productCode");

const quantity = document.getElementById("quantity");

const purchaseData = {

customerName: supplierName,

customerMobile: supplierMobile,

invoiceNumber: invoiceNumber,

invoiceDate: purchaseDate,

gstNumber: document.getElementById("vendorGST").value,

address: document.getElementById("vendorAddress").value,

paymentMethod: document.getElementById("paymentMethod").value,

invoiceStatus: document.getElementById("purchaseStatus").value,

billingType: "Purchase Invoice",

subtotal: Number(purchaseAmount),

gst: 0,

total: Number(purchaseAmount),

items:[

{

product:product.value,

quantity:Number(quantity.value),

rate:Number(purchaseAmount),

gst:0,

amount:Number(purchaseAmount)

}

]

};
const token =
localStorage.getItem("token");

const response =
await fetch(

"http://localhost:5000/api/purchases",

{

method:"POST",

headers:{

"Content-Type":"application/json",

Authorization:`Bearer ${token}`

},

body:JSON.stringify({

productName:product.value,

productCode:productCode.value,

vendorName:supplierName,

quantity:Number(quantity.value),

purchasePrice:Number(purchaseAmount)

})

}

);

const data =
await response.json();

if(!data.success){

alert(data.message);

return;

}

localStorage.setItem(

"invoiceData",

JSON.stringify(purchaseData)

);

window.location.href=

"./invoice-preview.html";

});
}
window.addEventListener("load", () => {

loadVendors();

loadProducts();

loadPurchaseHistory();

});
async function loadVendors(){

const token =
localStorage.getItem("token");

const response =
await fetch(

"http://localhost:5000/api/vendors",

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

data.vendors.forEach(vendor=>{

vendorDropdown.innerHTML += `

<option value="${vendor.vendorName}">

${vendor.vendorName}

</option>

`;

});

vendorDropdown.addEventListener(

"change",

function(){

const vendor =

data.vendors.find(

v=>v.vendorName===this.value

);

if(!vendor){

return;

}

document.getElementById("vendorPhone").value =
vendor.phone;

document.getElementById("vendorGST").value =
vendor.gstNumber;

document.getElementById("vendorAddress").value =
vendor.address;

}

);

}
async function loadProducts(){

const token =
localStorage.getItem("token");

const response =
await fetch(

"http://localhost:5000/api/products",

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

data.products.forEach(product=>{

productDropdown.innerHTML += `

<option value="${product.productName}">

${product.productName}

</option>

`;

});

productDropdown.addEventListener(

"change",

function(){

const product =

data.products.find(

p=>p.productName===this.value

);

if(!product){

return;

}

document.getElementById("productCode").value =
product.productCode;

document.getElementById("purchasePrice").value =
product.purchasePrice;

}

);

}
loadPurchaseHistory();

async function loadPurchaseHistory(){

const token =
localStorage.getItem("token");

const response =
await fetch(

"http://localhost:5000/api/purchases",

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
document.getElementById(
"purchaseHistoryTable"
);

table.innerHTML="";

data.purchases.forEach(purchase=>{

table.innerHTML += `

<tr>

<td>${purchase._id.slice(-6)}</td>

<td>${purchase.vendorName}</td>

<td>${new Date(purchase.purchaseDate).toLocaleDateString()}</td>

<td>₹${purchase.totalAmount}</td>

<td>-</td>

<td>

${purchase.status ? "Completed" : "Cancelled"}

</td>

</tr>

`;

});

}