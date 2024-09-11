const express = require("express");
const { getAllReportedProducts, reportAProduct } = require("../../controllers/products.controller");
const router = express.Router();

// router.route("/file-upload").post(productsControllers.fileUpload);

router.get("/reportedProducts", getAllReportedProducts);

router.put("/reportedProducts/:id", reportAProduct);

// router
//     .route("/")
//     .get(productsControllers.getProductsByEmail)
//     .post(productsControllers.createAProduct);

// router
//     .route("/:id")
//     .patch(productsControllers.updateAProduct)
//     .delete(productsControllers.deleteAProduct);

module.exports = router;
