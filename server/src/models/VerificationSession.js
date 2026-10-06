const mongoose = require("mongoose");

const verificationSessionSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        purpose: {
            type: String,
            enum: [
                "EMAIL_VERIFICATION",
                "FORGOT_PASSWORD",
                "EMPLOYEE_INVITE"
            ],
            required: true
        },

        expiresAt: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);
verificationSessionSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);
module.exports = mongoose.model(
    "VerificationSession",
    verificationSessionSchema
);