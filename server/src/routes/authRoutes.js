const express = require("express");

const router = express.Router();

const {
    register,
    sendEmailOTP,
    verifyEmailOTP,
    login
} = require("../controllers/authController");

router.post("/register", register);
router.post("/send-email-otp", sendEmailOTP);
router.post("/verify-email-otp", verifyEmailOTP);
router.post("/login", login);

module.exports = router;