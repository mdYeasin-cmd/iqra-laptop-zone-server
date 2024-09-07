const express = require("express");
const { addABrand, getAllBrands } = require("../../controllers/brands.controller");


const router = express.Router();

router.post("/", addABrand);

router.get("/", getAllBrands);

// router.route("/:id").get(categoriesControllers.getACategory);

module.exports = router;
