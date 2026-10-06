const addItemBtn = document.getElementById("addItemBtn");

const productName = document.getElementById("productName");
const quantity = document.getElementById("quantity");
const rate = document.getElementById("rate");
const gst = document.getElementById("gst");

const productTableBody = document.getElementById("productTableBody");

const subtotalAmount = document.getElementById("subtotalAmount");
const gstAmount = document.getElementById("gstAmount");
const totalAmount = document.getElementById("totalAmount");
const generateInvoiceBtn = document.getElementById("generateInvoiceBtn");
const customerName = document.getElementById("customerName");
const invoiceNumber = document.getElementById("invoiceNumber");
const invoiceDate = document.getElementById("invoiceDate");
const customerMobile = document.getElementById("customerMobile");
let subtotal = 0;
let totalGST = 0;
let invoiceItems = [];
addItemBtn.addEventListener("click", function () {

    const product = productName.value.trim();

    const qty = Number(quantity.value);

    const productRate = Number(rate.value);

    const gstPercent = Number(gst.value);

    if (
        product === "" ||
        qty <= 0 ||
        productRate <= 0 ||
        gstPercent < 0
    ) {
        alert("Please enter valid product details.");
        return;
    }

    const amount = qty * productRate;

    const gstValue = (amount * gstPercent) / 100;

    const finalAmount = amount + gstValue;
    invoiceItems.push({
        product: product,
        quantity: qty,
        rate: productRate,
        gst: gstPercent,
        amount: finalAmount
    });
    const emptyRow = document.getElementById("emptyRow");

    if (emptyRow) {
        emptyRow.remove();
    }

    const row = document.createElement("tr");

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
        "₹" + subtotal.toFixed(2);

    gstAmount.textContent =
        "₹" + totalGST.toFixed(2);

    totalAmount.textContent =
        "₹" + (subtotal + totalGST).toFixed(2);

    productName.value = "";
    quantity.value = "";
    rate.value = "";
    gst.value = "";

});
generateInvoiceBtn.addEventListener("click", function () {
    if (
        customerName.value.trim() === "" ||
        invoiceNumber.value.trim() === "" ||
        invoiceDate.value === "" ||
        customerMobile.value.trim() === ""
    ) 
    {
        alert("Please complete customer details.");
        return;
    }
    if (invoiceItems.length === 0) {
        alert("Please add at least one product.");
        return;
    }

    const invoiceData = {

    customerName: customerName.value,

    invoiceNumber: invoiceNumber.value,

    invoiceDate: invoiceDate.value,

    customerMobile: customerMobile.value,

    gstNumber:
    document.getElementById("gstNumber").value,

    address:
    document.getElementById("customerAddress").value,

    paymentMethod:
    document.getElementById("paymentMethod").value,

    invoiceStatus:
    document.getElementById("invoiceStatus").value,

    billingType:
    document.getElementById("billingType").value,

    items: invoiceItems,

    subtotal: subtotal,

    gst: totalGST,

    total: subtotal + totalGST

};

    localStorage.setItem(
        "invoiceData",
        JSON.stringify(invoiceData)
    );

    window.location.href =
        "./invoice-preview.html";

});