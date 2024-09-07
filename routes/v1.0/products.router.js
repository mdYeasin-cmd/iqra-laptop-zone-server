const express = require("express");
const router = express.Router();
const productsControllers = require("./../../controllers/products.controller");

router
    .route("/file-upload")
    .post(productsControllers.fileUpload);

router
    .route("/reportedProducts")
    .get(productsControllers.getAllReportedProducts);

router.route("/reportedProducts/:id").put(productsControllers.reportAProduct);

router
    .route("/")
    .get(productsControllers.getProductsByEmail)
    .post(productsControllers.createAProduct);

router
    .route("/:id")
    .patch(productsControllers.updateAProduct)
    .delete(productsControllers.deleteAProduct);

module.exports = router;
