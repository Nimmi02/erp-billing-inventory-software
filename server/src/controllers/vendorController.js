const Vendor = require("../models/Vendor");

const addVendor = async (req, res) => {

    try {

        const {

            vendorName,
            email,
            phone,
            gstNumber,
            address

        } = req.body;

        if (

            !vendorName?.trim() ||
            !email ||
            !phone

        ) {

            return res.status(400).json({

                success: false,
                message: "Please fill all required fields"

            });

        }
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email.trim())) {

    return res.status(400).json({

        success: false,
        message: "Please enter a valid email address"

    });

}
if (!/^[6-9]\d{9}$/.test(phone)) {

    return res.status(400).json({

        success: false,
        message: "Please enter a valid 10-digit mobile number"

    });

}
        const existingVendor = await Vendor.findOne({

    email,
    companyId: req.user.companyId

});

        if (existingVendor) {

            return res.status(400).json({

                success: false,
                message: "Vendor already exists"

            });

        }

        const vendor = await Vendor.create({
            companyId: req.user.companyId,
            vendorName,
            email: email.trim(),
            phone,
            gstNumber,
            address

        });

        res.status(201).json({

            success: true,
            message: "Vendor Added Successfully",
            vendor

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

const getVendors = async (req, res) => {

    try {

        const vendors = await Vendor.find({

    companyId: req.user.companyId

}).sort({

    createdAt: -1

});

        res.status(200).json({

            success: true,
            count: vendors.length,
            vendors

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

    addVendor,
    getVendors

};