const express = require("express");

const router = express.Router();

const {

saveSettings,
getSettings

} = require("../controllers/settingsController");

const {

protect

} = require("../middleware/authMiddleware");

router.post(
"/",
protect,
saveSettings
);

router.get(
"/",
protect,
getSettings
);

module.exports = router;