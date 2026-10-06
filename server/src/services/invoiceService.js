const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const {
    createInvoiceTemplate
} = require("../templates/invoiceTemplate");
const generateInvoice = async (saleData) => {

    const doc = new PDFDocument({

        size: "A4",

        margin: 50

    });
    createInvoiceTemplate(doc, saleData);
    const invoiceDirectory = path.join(__dirname, "../../invoices");

if (!fs.existsSync(invoiceDirectory)) {

    fs.mkdirSync(invoiceDirectory, { recursive: true });

}
const invoicePath = path.join(

    invoiceDirectory,

    `invoice-${Date.now()}.pdf`

);

const stream = fs.createWriteStream(invoicePath);

doc.pipe(stream);

doc.end();
await new Promise((resolve, reject) => {

    stream.on("finish", resolve);

    stream.on("error", reject);

});

return invoicePath;
};

module.exports = {

    generateInvoice

};