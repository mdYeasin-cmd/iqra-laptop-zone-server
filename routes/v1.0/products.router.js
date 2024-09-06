const express = require("express");
const router = express.Router();
const productsControllers = require("./../../controllers/products.controller");
const uploader = require("../../middlewares/uploader");

router
    .route("/file-upload")
    .post(uploader.array("picture"), productsControllers.fileUpload);

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
