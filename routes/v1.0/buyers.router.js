const express = require('express');
const router = express.Router();
const buyersControllers = require('../../controllers/buyers.controller');

router
    .route('/')
    .get(buyersControllers.getAllBuyers);

router
    .route('/:id')
    .delete(buyersControllers.deleteABuyer);

module.exports = router;