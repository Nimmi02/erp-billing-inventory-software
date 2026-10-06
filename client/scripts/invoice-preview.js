const invoiceData =
JSON.parse(
    localStorage.getItem("invoiceData")
);
document.getElementById("invoiceType")
.textContent ="Sales / Purchase Invoice";
if (!invoiceData) {

    alert("No invoice data found.");

    window.location.href =
        "./billing.html";

}

document.getElementById(
    "previewCustomerName"
).textContent =
invoiceData.customerName;

document.getElementById(
    "previewInvoiceNumber"
).textContent =
invoiceData.invoiceNumber;

document.getElementById(
    "previewInvoiceDate"
).textContent =
invoiceData.invoiceDate;

document.getElementById(
    "previewCustomerMobile"
).textContent =
invoiceData.customerMobile;
document.getElementById(
    "previewGSTNumber"
).textContent =
invoiceData.gstNumber || "-";

document.getElementById(
    "previewAddress"
).textContent =
invoiceData.address || "-";

document.getElementById(
    "previewPaymentMethod"
).textContent =
invoiceData.paymentMethod || "-";

document.getElementById(
    "previewInvoiceStatus"
).textContent =
invoiceData.invoiceStatus || "-";
document.getElementById(
    "previewSubtotal"
).textContent =
"₹" + invoiceData.subtotal.toFixed(2);

document.getElementById(
    "previewGST"
).textContent =
"₹" + invoiceData.gst.toFixed(2);

document.getElementById(
    "previewTotal"
).textContent =
"₹" + invoiceData.total.toFixed(2);
document.getElementById(
    "invoiceType"
).textContent =
invoiceData.billingType || "Invoice";
const invoiceTableBody =
document.getElementById(
    "invoiceTableBody"
);

invoiceData.items.forEach(function(item){

    const row =
    document.createElement("tr");

    row.innerHTML = `
        <td>${item.product}</td>
        <td>${item.quantity}</td>
        <td>₹${item.rate}</td>
        <td>${item.gst}%</td>
        <td>₹${item.amount.toFixed(2)}</td>
    `;

    invoiceTableBody.appendChild(row);

});

document
.getElementById("printInvoiceBtn")
.addEventListener("click", function(){

    window.print();

});