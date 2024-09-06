const express = require("express");
const router = express.Router();
const usersControllers = require("./../../controllers/users.controller");

router
    .route("/")
    .get(usersControllers.getAllUsers)
    .post(usersControllers.createAUser);

module.exports = router;
