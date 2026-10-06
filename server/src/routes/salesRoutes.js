const express = require("express");

const router = express.Router();

const {

    addSale,
    getSales

} = require("../controllers/salesController");

const {

    protect

} = require("../middleware/authMiddleware");

router.post("/", protect, addSale);

router.get("/", protect, getSales);

module.exports = router;