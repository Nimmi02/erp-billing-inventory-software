const token =
localStorage.getItem("token");

let products = [];
let customers = [];
const addItemBtn =
document.getElementById("addItemBtn");

const productName =
document.getElementById("productName");

const quantity =
document.getElementById("quantity");

const rate =
document.getElementById("rate");

const gst =
document.getElementById("gst");

const productTableBody =
document.getElementById("productTableBody");

const subtotalAmount =
document.getElementById("subtotalAmount");

const gstAmount =
document.getElementById("gstAmount");

const totalAmount =
document.getElementById("totalAmount");

let subtotal = 0;
let totalGST = 0;
let invoiceItems = [];

addItemBtn.addEventListener("click",()=>{

const product =
productName.value.trim();

const qty =
Number(quantity.value);

const productRate =
Number(rate.value);

const gstPercent =
Number(gst.value);

if(
product === "" ||
qty <= 0 ||
productRate <= 0
){
alert("Enter valid product details");
return;
}

const amount =
qty * productRate;

const gstValue =
(amount * gstPercent) / 100;

const finalAmount =
amount + gstValue;

const emptyRow =
document.getElementById("emptyRow");

if(emptyRow){
emptyRow.remove();
}

invoiceItems.push({
product,
quantity:qty,
rate:productRate,
gst:gstPercent,
amount:finalAmount
});

const row =
document.createElement("tr");

row.innerHTML = `
<td>${product}</td>
<td>${qty}</td>
<td>₹${productRate}</td>
<td>${gstPercent}%</td>
<td>₹${finalAmount.toFixed(2)}</td>
`;

productTableBody.appendChild(row);

subtotal += amount;
totalGST += gstValue;

subtotalAmount.textContent =
"₹"+subtotal.toFixed(2);

gstAmount.textContent =
"₹"+totalGST.toFixed(2);

totalAmount.textContent =
"₹"+(subtotal+totalGST).toFixed(2);

productName.value="";
quantity.value="";
rate.value="";
gst.value="";

});
const saveSaleBtn =
document.getElementById("saveSaleBtn");

saveSaleBtn.addEventListener("click",saveSale);
const generateInvoiceBtn =
document.getElementById(
"generateInvoiceBtn"
);

generateInvoiceBtn
.addEventListener("click",()=>{

const invoiceData = {

customerName:
document.getElementById(
"customerName"
).value,

invoiceNumber:
document.getElementById(
"invoiceNumber"
).value,

invoiceDate:
document.getElementById(
"invoiceDate"
).value,

customerMobile:
document.getElementById(
"customerMobile"
).value,

gstNumber:
document.getElementById(
"gstNumber"
).value,

address:
document.getElementById(
"customerAddress"
).value,

paymentMethod:
document.getElementById(
"paymentMethod"
).value,

invoiceStatus:
document.getElementById(
"invoiceStatus"
).value,

billingType:
document.getElementById(
"billingType"
).value,

items:invoiceItems,

subtotal:subtotal,

gst:totalGST,

total:subtotal + totalGST

};

localStorage.setItem(
"invoiceData",
JSON.stringify(invoiceData)
);

window.location.href =
"./invoice-preview.html";

});
window.addEventListener("load", loadInitialData);

async function loadInitialData(){

await loadCustomers();

await loadProducts();

}

async function loadCustomers(){

const response = await fetch(

"http://localhost:5000/api/customers",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

const data = await response.json();

if(!data.success){

return;

}

customers = data.customers;

const customerSelect =
document.getElementById("customerName");

customers.forEach(customer=>{

customerSelect.innerHTML += `

<option value="${customer.customerName}">
${customer.customerName}
</option>

`;

});

}
async function loadProducts(){

const response = await fetch(

"http://localhost:5000/api/products",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

const data = await response.json();

if(!data.success){

return;

}

products = data.products;

const productSelect =
document.getElementById("productName");

products.forEach(product=>{

productSelect.innerHTML += `

<option value="${product.productName}">
${product.productName}
</option>

`;

});

}
document
.getElementById("productName")
.addEventListener("change",function(){

const product = products.find(

p=>p.productName===this.value

);

if(!product){

return;

}

document.getElementById("productCode").value =
product.productCode;

document.getElementById("rate").value =
product.sellingPrice;

document.getElementById("gst").value =
product.gst;

});
document
.getElementById("customerName")
.addEventListener("change",function(){

const customer = customers.find(

c=>c.customerName===this.value

);

if(!customer){

return;

}

document.getElementById("customerMobile").value =
customer.phone;

document.getElementById("gstNumber").value =
customer.gstNumber;

document.getElementById("customerAddress").value =
customer.address;

});
async function saveSale(){

const product = products.find(

p=>p.productName===
document.getElementById("productName").value

);

if(!product){

alert("Select Product");

return;

}

const response = await fetch(

"http://localhost:5000/api/sales",

{

method:"POST",

headers:{

"Content-Type":"application/json",

Authorization:`Bearer ${token}`

},

body:JSON.stringify({

customerName:
document.getElementById("customerName").value,

customerPhone:
document.getElementById("customerMobile").value,

productName:
product.productName,

productCode:
product.productCode,

quantity:
Number(document.getElementById("quantity").value),

sellingPrice:
Number(document.getElementById("rate").value),

gst:
Number(document.getElementById("gst").value),

paymentMethod:
document.getElementById("paymentMethod").value

})

}

);

const data =
await response.json();

if(data.success){

alert("Sale Saved Successfully");

location.reload();

}

else{

alert(data.message);

}

}
async function saveSale(){

const product = products.find(

p=>p.productName===
document.getElementById("productName").value

);

if(!product){

alert("Select Product");

return;

}

const response = await fetch(

"http://localhost:5000/api/sales",

{

method:"POST",

headers:{

"Content-Type":"application/json",

Authorization:`Bearer ${token}`

},

body:JSON.stringify({

customerName:
document.getElementById("customerName").value,

customerPhone:
document.getElementById("customerMobile").value,

productName:
product.productName,

productCode:
product.productCode,

quantity:
Number(document.getElementById("quantity").value),

sellingPrice:
Number(document.getElementById("rate").value),

gst:
Number(document.getElementById("gst").value),

paymentMethod:
document.getElementById("paymentMethod").value

})

}

);

const data =
await response.json();

if(data.success){

alert("Sale Saved Successfully");

loadSales();

}

else{

alert(data.message);

}

}
function displaySales(sales){

const table =
document.getElementById("salesTableBody");

table.innerHTML="";

if(sales.length===0){

table.innerHTML=`

<tr>

<td colspan="7">

No sales records available.

</td>

</tr>

`;

return;

}

sales.forEach(sale=>{

table.innerHTML+=`

<tr>

<td>${sale.invoiceNumber}</td>

<td>${sale.customerName}</td>

<td>${sale.customerPhone}</td>

<td>${new Date(sale.saleDate).toLocaleDateString()}</td>

<td>₹${sale.totalAmount}</td>

<td>${sale.paymentStatus}</td>

<td>${sale.paymentMethod}</td>

</tr>

`;

});

}