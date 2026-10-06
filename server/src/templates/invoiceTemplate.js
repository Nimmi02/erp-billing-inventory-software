const createInvoiceTemplate = (doc, saleData) => {

    doc
        .fontSize(22)
        .font("Helvetica-Bold")
        .text("ERP Billing & Inventory", {

            align: "center"

        });

    doc.moveDown();

    doc
        .fontSize(16)
        .font("Helvetica")
        .text("TAX INVOICE", {

            align: "center"

        });

    doc.moveDown(2);
    doc
    .fontSize(12)
    .font("Helvetica");

doc.text(`Invoice No : ${saleData.invoiceNumber}`);

doc.text(`Customer : ${saleData.customerName}`);

doc.text(`Phone : ${saleData.customerPhone}`);

doc.moveDown();

doc.text(`Product : ${saleData.productName}`);

doc.text(`Quantity : ${saleData.quantity}`);

doc.text(`Price : ₹${saleData.sellingPrice}`);

doc.text(`Total : ₹${saleData.totalAmount}`);
};

module.exports = {

    createInvoiceTemplate

};