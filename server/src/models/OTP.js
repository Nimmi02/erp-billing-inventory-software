const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
{
    email: {
        type: String,
        trim: true,
        lowercase: true
    },

    phone: {
        type: String,
        trim: true
    },

    otp: {
        type: String,
        required: true
    },

    purpose: {
        type: String,
        enum: [
            "EMAIL_VERIFICATION",
            "PHONE_VERIFICATION",
            "FORGOT_PASSWORD",
            "EMPLOYEE_INVITE"
        ],
        required: true
    },

    attempts: {
        type: Number,
        default: 0
    },

    expiresAt: {
        type: Date,
        required: true
    }
},
{
    timestamps: true
});
otpSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);
module.exports = mongoose.model("OTP", otpSchema);