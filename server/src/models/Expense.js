const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
        expenseName: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        amount: {
            type: Number,
            required: true,
            min: 0
        },

        paymentMethod: {
            type: String,
            enum: ["Cash", "UPI", "Card", "Bank Transfer"],
            default: "Cash"
        },

        expenseDate: {
            type: Date,
            default: Date.now
        },

        notes: {
            type: String,
            trim: true
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

module.exports = mongoose.model("Expense", expenseSchema);