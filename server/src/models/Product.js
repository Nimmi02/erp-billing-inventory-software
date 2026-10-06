const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
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

        category: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        purchasePrice: {
    type: Number,
    required: true,
    min: [0, "Purchase price cannot be negative"]
},

        sellingPrice: {
    type: Number,
    required: true,
    min: [0, "Selling price cannot be negative"]
},

        stock: {
    type: Number,
    default: 0,
    min: [0, "Stock cannot be negative"]
},
       gst: {
    type: Number,
    default: 18,
    min: [0, "GST cannot be negative"],
    max: [100, "GST cannot exceed 100%"]
},

        unit: {
    type: String,
    enum: {
        values: ["pcs", "kg", "g", "ltr", "ml", "box", "pack"],
        message: "Invalid unit"
    },
    default: "pcs"
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
productSchema.index(
    { companyId: 1, productCode: 1 },
    { unique: true }
);
module.exports = mongoose.model("Product", productSchema);