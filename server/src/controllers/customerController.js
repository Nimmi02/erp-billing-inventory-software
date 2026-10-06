const Customer = require("../models/Customer");

const addCustomer = async (req, res) => {

    try {

        const {

            customerName,
            email,
            phone,
            gstNumber,
            address

        } = req.body;

        if (

            !customerName?.trim() ||
            !phone

        ) {

            return res.status(400).json({

                success: false,
                message: "Customer Name and Phone are required"

            });

        }
if (!/^[6-9]\d{9}$/.test(phone)) {

    return res.status(400).json({

        success: false,
        message: "Please enter a valid 10-digit mobile number"

    });

}
        const existingCustomer = await Customer.findOne({

    phone,
    companyId: req.user.companyId

});

        if (existingCustomer) {

            return res.status(400).json({

                success: false,
                message: "Customer already exists"

            });

        }

        const customer = await Customer.create({
            companyId: req.user.companyId,
            customerName: customerName.trim(),
            email,
            phone,
            gstNumber,
            address

        });

        res.status(201).json({

            success: true,
            message: "Customer Added Successfully",
            customer

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

const getCustomers = async (req, res) => {

    try {

        const customers = await Customer.find({

    companyId: req.user.companyId

}).sort({

    createdAt: -1

});

        res.status(200).json({

            success: true,
            count: customers.length,
            customers

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

    addCustomer,
    getCustomers

};