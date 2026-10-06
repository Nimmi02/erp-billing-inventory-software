const express = require("express");

const router = express.Router();

const {

    addVendor,
    getVendors

} = require("../controllers/vendorController");

const {

    protect

} = require("../middleware/authMiddleware");

router.post("/", protect, addVendor);

router.get("/", protect, getVendors);

module.exports = router;