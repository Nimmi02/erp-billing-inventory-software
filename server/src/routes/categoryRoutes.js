const express = require("express");

const router = express.Router();

const {

addCategory,

getCategories,

deleteCategory

} = require("../controllers/categoryController");

const {

protect

} = require("../middleware/authMiddleware");

router.post(

"/",

protect,

addCategory

);

router.get(

"/",

protect,

getCategories

);

router.delete(

"/:id",

protect,

deleteCategory

);

module.exports = router;