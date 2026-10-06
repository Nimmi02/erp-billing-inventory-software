const express = require("express");

const router = express.Router();

const {

    addCustomer,
    getCustomers

} = require("../controllers/customerController");

const {

    protect

} = require("../middleware/authMiddleware");

router.post("/", protect, addCustomer);

router.get("/", protect, getCustomers);

module.exports = router;