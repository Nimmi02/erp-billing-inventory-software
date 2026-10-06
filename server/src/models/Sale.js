const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(

    {

        customerName: {
            type: String,
            required: true,
            trim: true
        },

        customerPhone: {
    type: String,
    required: true,
    trim: true,
    match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"]
},

        productName: {
            type: String,
            required: true,
            trim: true
        },

        productCode: {
            type: String,
            required: true,
            trim: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        sellingPrice: {
    type: Number,
    required: true,
    min: [0, "Selling price cannot be negative"]
},

        gst: {
    type: Number,
    default: 18,
    min: [0, "GST cannot be negative"],
    max: [100, "GST cannot exceed 100%"]
},

        totalAmount: {
    type: Number,
    required: true,
    min: [0, "Total amount cannot be negative"]
},

        invoiceNumber: {
    type: String,
    required: true,
    trim: true
},

        paymentMethod: {
            type: String,
            enum: ["Cash", "UPI", "Card", "Bank Transfer"],
            default: "Cash"
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid"],
            default: "Paid"
        },

        saleDate: {
            type: Date,
            default: Date.now
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
saleSchema.index(
    { companyId: 1, invoiceNumber: 1 },
    { unique: true }
);
module.exports = mongoose.model("Sale", saleSchema);