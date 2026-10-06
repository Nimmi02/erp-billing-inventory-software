const Product = require("../models/Product");

const addProduct = async (req, res) => {

    try {

        const {

            productName,
            productCode,
            category,
            purchasePrice,
            sellingPrice,
            stock,
            gst,
            unit

        } = req.body;

        if (

            !productName ||
            !productCode ||
            !category ||
            purchasePrice == null ||
            sellingPrice == null

        ) {

            return res.status(400).json({

                success: false,
                message: "Please fill all required fields"

            });

        }
        if (stock != null && stock < 0) {

    return res.status(400).json({

        success: false,
        message: "Stock cannot be negative"

    });

}

if (purchasePrice < 0 || sellingPrice < 0) {

    return res.status(400).json({

        success: false,
        message: "Price cannot be negative"

    });

}
        const existingProduct = await Product.findOne({

    productCode,
    companyId: req.user.companyId

});

        if (existingProduct) {

            return res.status(400).json({

                success: false,
                message: "Product code already exists"

            });

        }

        const product = await Product.create({

    companyId: req.user.companyId,

    productName,
    productCode,
    category,
    purchasePrice,
    sellingPrice,
    stock,
    gst,
    unit

});

        res.status(201).json({

            success: true,
            message: "Product Added Successfully",
            product

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

const getProducts = async (req, res) => {

    try {

        const products = await Product.find({

    companyId: req.user.companyId

}).sort({

    createdAt: -1

});

        res.status(200).json({

            success: true,
            count: products.length,
            products

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
    addProduct,
    getProducts

};