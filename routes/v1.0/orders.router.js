const express = require("express");
const router = express.Router();
const ordersControllers = require("./../../controllers/orders.controller");

router
    .route("/")
    .get(ordersControllers.getOrderByEmail)
    .post(ordersControllers.placeAOrder);

router.route("/:id").get(ordersControllers.getOrderByOrderId);

module.exports = router;
