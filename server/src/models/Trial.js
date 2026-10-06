const mongoose = require("mongoose");

const trialSchema = new mongoose.Schema({

    companyName: {

        type: String,
        required: true

    },

    adminName: {

        type: String,
        required: true

    },

    email: {

    type: String,

    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
        validator: function (value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Please enter a valid email address"
    }

},

    trialStart: {

        type: Date,
        default: Date.now

    },

    trialEnd: {

        type: Date,
        required: true

    },

    subscriptionActive: {

        type: Boolean,
        default: false

    }

}, {

    timestamps: true

});

module.exports = mongoose.model("Trial", trialSchema);