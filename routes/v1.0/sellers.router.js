const express = require('express');
const router = express.Router();
const sellersControllers = require('./../../controllers/sellers.controller');

router
    .route('/')
    .get(sellersControllers.getAllSellers);

router
    .route('/:id')
    .put(sellersControllers.verifyASeller)
    .delete(sellersControllers.deleteASeller);

module.exports = router;