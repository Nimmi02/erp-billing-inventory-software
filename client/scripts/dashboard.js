const menuBtn =
document.getElementById("menuBtn");

const sidebar =
document.querySelector(".sidebar");

const overlay =
document.getElementById("sidebarOverlay");

const closeSidebar =
document.getElementById("closeSidebar");

const logoutBtn =
document.getElementById("logoutBtn");

if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        sidebar.classList.add("active");

        overlay.classList.add("active");

    });

}

if(closeSidebar){

    closeSidebar.addEventListener("click",()=>{

        sidebar.classList.remove("active");

        overlay.classList.remove("active");

    });

}

if(overlay){

    overlay.addEventListener("click",()=>{

        sidebar.classList.remove("active");

        overlay.classList.remove("active");

    });

}

if(logoutBtn){

    logoutBtn.addEventListener("click",()=>{

        localStorage.removeItem("erpRole");
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "../index.html";

    });

}
loadDashboard();

async function loadDashboard() {

    const token = localStorage.getItem("token");

    if (!token) {

        window.location.href = "./login.html";

        return;

    }

    try {

        const response = await fetch(

            "http://localhost:5000/api/dashboard",

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        const dashboard = data.dashboard;
if(!dashboard){

return;

}
const todaySales =
document.getElementById("todaySales");

if(todaySales){

todaySales.innerText =
"₹"+dashboard.totalSales;

}

const monthlySales =
document.getElementById("monthlySales");

if(monthlySales){

monthlySales.innerText =
"₹"+dashboard.monthlySalesAmount;

}

const profit =
document.getElementById("profit");

if(profit){

profit.innerText =
"₹"+dashboard.profit;

}

const expense =
document.getElementById("expense");

if(expense){

expense.innerText =
"₹"+dashboard.totalExpenses;

}

const purchaseAmount =
document.getElementById("purchaseAmount");

if(purchaseAmount){

purchaseAmount.innerText =
"₹"+dashboard.totalPurchase;

}

const customerCount =
document.getElementById("customerCount");

if(customerCount){

customerCount.innerText =
dashboard.totalCustomers;

}

const vendorCount =
document.getElementById("vendorCount");

if(vendorCount){

vendorCount.innerText =
dashboard.totalVendors;

}


const summarySales =
document.getElementById("summarySales");

if(summarySales){

summarySales.innerText =
"₹"+dashboard.monthlySalesAmount;

}

const summaryPurchase =
document.getElementById("summaryPurchase");

if(summaryPurchase){

summaryPurchase.innerText =
"₹"+dashboard.monthlyPurchaseAmount;

}

const summaryProfit =
document.getElementById("summaryProfit");

if(summaryProfit){

summaryProfit.innerText =
"₹"+dashboard.profit;

}

const summaryExpense =
document.getElementById("summaryExpense");

if(summaryExpense){

summaryExpense.innerText =
"₹"+dashboard.monthlyExpenseAmount;

}

const summaryReports =
document.getElementById("summaryReports");

if(summaryReports){

summaryReports.innerText =
dashboard.recentSales.length;

}
if(document.getElementById("activityTableBody")){

loadActivities(dashboard);

}

if(document.getElementById("lowStockNotification")){

loadNotifications(dashboard);

}

if(document.getElementById("topCustomer")){

loadInsights(dashboard);

}
    }

    catch(error){

        console.log(error);

    }

}
function loadActivities(dashboard){

const table =
document.getElementById("activityTableBody");

table.innerHTML="";

dashboard.recentSales.forEach(sale=>{

table.innerHTML += `

<tr>

<td>${new Date(sale.saleDate).toLocaleDateString()}</td>

<td>
Sale - ${sale.customerName}
</td>

<td>
Completed
</td>

</tr>

`;

});

dashboard.recentPurchases.forEach(purchase=>{

table.innerHTML += `

<tr>

<td>${new Date(purchase.purchaseDate).toLocaleDateString()}</td>

<td>
Purchase - ${purchase.vendorName}
</td>

<td>
Completed
</td>

</tr>

`;

});

if(table.innerHTML===""){

table.innerHTML=`

<tr>

<td colspan="3">

No activity records available.

</td>

</tr>

`;

}

}
function loadNotifications(dashboard){

const lowStock =
dashboard.lowStockProducts;

if(lowStock.length===0){

document.getElementById("lowStockNotification").innerText =
"Low Stock Alert : No low stock items found";

}
else{

const names =
lowStock.map(product=>product.productName);

document.getElementById("lowStockNotification").innerText =
"Low Stock Alert : " + names.join(", ");

}

document.getElementById("expiryNotification").innerText =
"Expiring Products : Feature Coming Soon";

document.getElementById("paymentNotification").innerText =
"Pending Payments : Feature Coming Soon";

document.getElementById("backupNotification").innerText =
"Backup Status : Database Connected";

}
function loadInsights(dashboard){

if(dashboard.recentSales.length>0){

document.getElementById("topCustomer").innerText =
dashboard.recentSales[0].customerName;

document.getElementById("fastMoving").innerText =
dashboard.recentSales[0].productName;

}else{

document.getElementById("topCustomer").innerText =
"No Sales";

document.getElementById("fastMoving").innerText =
"No Sales";

}

if(dashboard.recentPurchases.length>0){

document.getElementById("topVendor").innerText =
dashboard.recentPurchases[0].vendorName;

document.getElementById("topProduct").innerText =
dashboard.recentPurchases[0].productName;

}else{

document.getElementById("topVendor").innerText =
"No Purchases";

document.getElementById("topProduct").innerText =
"No Purchases";

}

}