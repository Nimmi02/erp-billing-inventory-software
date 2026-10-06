const Purchase = require("../models/Purchase");
const Product = require("../models/Product");
const addPurchase = async (req, res) => {

    try {

        const {

            productName,
            productCode,
            vendorName,
            quantity,
            purchasePrice

        } = req.body;

        if (

            !productName?.trim() ||
            !productCode ||
            !vendorName?.trim() ||
            quantity == null ||
            purchasePrice == null

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
if (purchasePrice < 0) {

    return res.status(400).json({

        success: false,
        message: "Purchase Price cannot be negative"

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

const totalAmount = quantity * purchasePrice;

const purchase = await Purchase.create({

    companyId: req.user.companyId,

    productName: product.productName,
    productCode: product.productCode,
    vendorName: vendorName.trim(),
    quantity,
    purchasePrice,
    totalAmount

});
        product.stock += quantity;

await product.save();
        res.status(201).json({

            success: true,
            message: "Purchase Added Successfully",
            purchase

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

const getPurchases = async (req, res) => {

    try {

        const purchases = await Purchase.find({

    companyId: req.user.companyId

}).sort({

    createdAt: -1

});

        res.status(200).json({

            success: true,
            count: purchases.length,
            purchases

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

    addPurchase,
    getPurchases

};