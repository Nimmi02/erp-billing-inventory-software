const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
    {
        vendorName: {
    type: String,
    required: true,
    trim: true
},

        email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
        validator: function (value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Please enter a valid email address"
    }
},

        phone: {
    type: String,
    required: true,
    match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"]
},

        gstNumber: {
    type: String,
    trim: true,
    uppercase: true,
    default: "",
    validate: {
        validator: function (value) {
            return value === "" || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/.test(value);
        },
        message: "Please enter a valid GST number"
    }
},

        address: {
            type: String
        },

        status: {
            type: Boolean,
            default: true
        },
        companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
}
    },
    {
        timestamps: true
    }
);
vendorSchema.index(
    { companyId: 1, email: 1 },
    { unique: true }
);
module.exports = mongoose.model("Vendor", vendorSchema);