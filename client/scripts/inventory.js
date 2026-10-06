const saveBtn =
document.getElementById("saveProductBtn");

if(saveBtn){

saveBtn.addEventListener("click",addProduct);

}

async function addProduct(){

const token =
localStorage.getItem("token");

const productName =
document.getElementById("productName").value.trim();

const productCode =
document.getElementById("productCode").value.trim();

const category =
document.getElementById("category").value;

const purchasePrice =
Number(document.getElementById("purchasePrice").value);

const sellingPrice =
Number(document.getElementById("sellingPrice").value);

const stock =
Number(document.getElementById("stock").value);

if(

!productName ||

!productCode ||

!category ||

purchasePrice<=0 ||

sellingPrice<=0

){

alert("Please fill all required fields.");

return;

}
saveBtn.disabled = true;

saveBtn.innerText = "Saving...";
const response = await fetch(

"http://localhost:5000/api/products",

{

method:"POST",

headers:{

"Content-Type":"application/json",

Authorization:`Bearer ${token}`

},

body:JSON.stringify({

productName,

productCode,

category,

purchasePrice,

sellingPrice,

stock

})

}

);

const data =
await response.json();

if(data.success){

alert("Product Added Successfully");

saveBtn.disabled = false;

saveBtn.innerText = "Save Product";

location.reload();

}

else{

saveBtn.disabled = false;

saveBtn.innerText = "Save Product";

alert(data.message);

}

}
window.addEventListener("load", loadProducts);

async function loadProducts(){

try{

const token = localStorage.getItem("token");

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

const table =
document.getElementById("productTable");

table.innerHTML="";

let lowStock=0;
let outStock=0;
let inventoryValue=0;

data.products.forEach(product=>{

inventoryValue +=
product.stock * product.purchasePrice;

if(

product.stock>0 &&

product.stock<=10

){

lowStock++;

}

if(product.stock===0){

outStock++;

}

table.innerHTML += `

<tr>

<td>${product.productName}</td>

<td>${product.category}</td>

<td>₹${product.purchasePrice}</td>

<td>₹${product.sellingPrice}</td>

<td>${product.stock}</td>

<td>${product.status ? "Active" : "Inactive"}</td>

</tr>

`;

});

document.getElementById("totalProducts").innerText =
data.products.length;

document.getElementById("lowStock").innerText =
lowStock;

document.getElementById("outOfStock").innerText =
outStock;

document.getElementById("inventoryValue").innerText =
"₹"+inventoryValue;

document.getElementById("summaryProducts").innerText =
data.products.length;

document.getElementById("summaryLowStock").innerText =
lowStock;

document.getElementById("summaryValue").innerText =
"₹"+inventoryValue;

}

catch(error){

console.log(error);

alert("Unable to load products.");

}
}