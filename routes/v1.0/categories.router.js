const express = require("express");
const router = express.Router();
const categoriesControllers = require("./../../controllers/categories.controller");

router.route("/").get(categoriesControllers.getAllCategories);

router.route("/:id").get(categoriesControllers.getACategory);

module.exports = router;
