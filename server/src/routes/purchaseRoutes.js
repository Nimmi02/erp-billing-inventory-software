const express = require("express");

const router = express.Router();

const {

    addPurchase,
    getPurchases

} = require("../controllers/purchaseController");

const {

    protect

} = require("../middleware/authMiddleware");

router.post("/", protect, addPurchase);

router.get("/", protect, getPurchases);

module.exports = router;