const token =
localStorage.getItem("token");

const saveCategoryBtn =
document.getElementById("saveCategoryBtn");

if(saveCategoryBtn){

saveCategoryBtn.addEventListener(

"click",

saveCategory

);

}

window.addEventListener(

"load",

loadCategories

);
async function saveCategory(){

const categoryName =
document.getElementById("categoryName").value.trim();

const description =
document.getElementById("categoryDescription").value.trim();

if(categoryName===""){

alert("Enter Category Name");

return;

}

const response =
await fetch(

"http://localhost:5000/api/categories",

{

method:"POST",

headers:{

"Content-Type":"application/json",

Authorization:`Bearer ${token}`

},

body:JSON.stringify({

categoryName,

description

})

}

);

const data =
await response.json();

if(data.success){

alert(data.message);

document.getElementById("categoryName").value="";

document.getElementById("categoryDescription").value="";

loadCategories();

}else{

alert(data.message);

}

}
async function loadCategories(){

const response =
await fetch(

"http://localhost:5000/api/categories",

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
document.getElementById("categoryTable");

table.innerHTML="";

if(data.categories.length===0){

table.innerHTML=`

<tr>

<td colspan="4">

No Categories Available

</td>

</tr>

`;

return;

}

data.categories.forEach(category=>{

table.innerHTML += `

<tr>

<td>

${category.categoryName}

</td>

<td>

${category.description || "-"}

</td>

<td>

0

</td>

<td>

<button
class="delete-btn"
onclick="deleteCategory('${category._id}')">

Delete

</button>

</td>

</tr>

`;

});

}
async function deleteCategory(id){

const confirmDelete =
confirm(

"Are you sure you want to delete this category?"

);

if(!confirmDelete){

return;

}

const response =
await fetch(

`http://localhost:5000/api/categories/${id}`,

{

method:"DELETE",

headers:{

Authorization:`Bearer ${token}`

}

}

);

const data =
await response.json();

if(data.success){

alert(data.message);

loadCategories();

}else{

alert(data.message);

}

}