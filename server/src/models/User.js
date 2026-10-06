const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true,
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
  trim: true,
  match: [
    /^[6-9]\d{9}$/,
    "Please enter a valid 10-digit mobile number"
  ],
},

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["owner", "employee"],
      default: "owner",
    },
    companyId:{

type:mongoose.Schema.Types.ObjectId,

ref:"Company",

default:null

},
    isActive: {
      type: Boolean,
      default: true,
    },
    trialStart: {
  type: Date,
  default: Date.now,
},

trialEnd: {
  type: Date,
  default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
},

subscriptionActive: {
  type: Boolean,
  default: false,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);