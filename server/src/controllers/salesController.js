const Sale = require("../models/Sale");
const Product = require("../models/Product");
const {

    generateInvoice

} = require("../services/invoiceService");
const addSale = async (req, res) => {

    try {

        const {

            customerName,
            customerPhone,
            productName,
            productCode,
            quantity,
            sellingPrice,
            gst,
            paymentMethod

        } = req.body;

        if (

            !customerName?.trim() ||
            !customerPhone ||
            !productName?.trim() ||
            !productCode ||
            quantity == null 

        ) {

            return res.status(400).json({

                success: false,
                message: "Please fill all required fields"

            });

        }
if (quantity <= 0) {

    return res.status(400).json({

        success: false,
        message: "Quantity must be greater than 0"

    });

}
if (!/^[6-9]\d{9}$/.test(customerPhone)) {

    return res.status(400).json({

        success: false,
        message: "Please enter a valid 10-digit mobile number"

    });

}
        const product = await Product.findOne({

    productCode,
    companyId: req.user.companyId

});

if (!product) {

    return res.status(404).json({

        success: false,
        message: "Product not found"

    });

}
if (product.stock < quantity) {

    return res.status(400).json({

        success: false,
        message: "Insufficient Stock"

    });

}

const finalSellingPrice = product.sellingPrice;

const totalAmount = quantity * finalSellingPrice;

const invoiceNumber =
    "INV-" + Date.now();
const existingInvoice = await Sale.findOne({

    invoiceNumber,
    companyId: req.user.companyId

});

if (existingInvoice) {

    return res.status(400).json({

        success: false,
        message: "Invoice number already exists"

    });

}
        const sale = await Sale.create({

    companyId: req.user.companyId,

    customerName,
    customerPhone,
    productName: product.productName,
    productCode: product.productCode,
    quantity,
    sellingPrice: finalSellingPrice,
    gst,
    totalAmount,
    invoiceNumber,
    paymentMethod

});
        product.stock -= quantity;

await product.save();
let invoicePath = null;

try {

    invoicePath = await generateInvoice(sale);

} catch (error) {

    console.error("Invoice generation failed:", error.message);

}

res.status(201).json({

    success: true,
    message: "Sale Added Successfully",
    sale,
    invoicePath

});

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

const getSales = async (req, res) => {

    try {

        const sales = await Sale.find({

    companyId: req.user.companyId

}).sort({

    createdAt: -1

});

        res.status(200).json({

            success: true,
            count: sales.length,
            sales

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {

    addSale,
    getSales

};