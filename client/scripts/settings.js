const saveSettingsBtn =
document.getElementById("saveSettingsBtn");

if(saveSettingsBtn){

saveSettingsBtn.addEventListener(
"click",
saveSettings
);

}

async function saveSettings(){

const token =
localStorage.getItem("token");

const companyName =
document.getElementById("companyName").value.trim();

const businessEmail =
document.getElementById("businessEmail").value.trim();

const businessPhone =
document.getElementById("businessPhone").value.trim();

const gstNumber =
document.getElementById("gstNumber").value.trim();

const businessAddress =
document.getElementById("businessAddress").value.trim();

const website =
document.getElementById("website").value.trim();

const invoicePrefix =
document.getElementById("invoicePrefix").value.trim();

const currency =
document.getElementById("currency").value.trim();

const financialYear =
document.getElementById("financialYear").value.trim();

const defaultGST =
Number(
document.getElementById("defaultGST").value
);

const invoiceTheme =
document.getElementById("invoiceTheme").value;

if(

companyName==="" ||

businessEmail===""

){

alert("Please fill all required fields.");

return;

}

const response =
await fetch(

"http://localhost:5000/api/settings",

{

method:"POST",

headers:{

"Content-Type":"application/json",

Authorization:`Bearer ${token}`

},

body:JSON.stringify({

companyName,

businessEmail,

businessPhone,

gstNumber,

businessAddress,

website,

invoicePrefix,

currency,

financialYear,

defaultGST,

invoiceTheme

})

}

);

const data =
await response.json();

if(data.success){

alert("Settings Saved Successfully");

}else{

alert(data.message);

}

}

window.addEventListener(
"load",
loadSettings
);

async function loadSettings(){

const token =
localStorage.getItem("token");

const response =
await fetch(

"http://localhost:5000/api/settings",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

const data =
await response.json();

if(

!data.success ||

!data.settings

){

return;

}

const settings =
data.settings;

document.getElementById("companyName").value =
settings.companyName || "";

document.getElementById("businessEmail").value =
settings.businessEmail || "";

document.getElementById("businessPhone").value =
settings.businessPhone || "";

document.getElementById("gstNumber").value =
settings.gstNumber || "";

document.getElementById("businessAddress").value =
settings.businessAddress || "";

document.getElementById("website").value =
settings.website || "";

document.getElementById("invoicePrefix").value =
settings.invoicePrefix || "";

document.getElementById("currency").value =
settings.currency || "";

document.getElementById("financialYear").value =
settings.financialYear || "";

document.getElementById("defaultGST").value =
settings.defaultGST || "";

document.getElementById("invoiceTheme").value =
settings.invoiceTheme || "Professional";

}