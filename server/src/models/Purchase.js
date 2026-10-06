const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
    {
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

        vendorName: {
    type: String,
    required: true,
    trim: true
},

        quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be greater than 0"]
},

        purchasePrice: {
    type: Number,
    required: true,
    min: [0, "Purchase price cannot be negative"]
},

        totalAmount: {
    type: Number,
    required: true,
    min: [0, "Total amount cannot be negative"]
},

        purchaseDate: {
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

module.exports = mongoose.model("Purchase", purchaseSchema);