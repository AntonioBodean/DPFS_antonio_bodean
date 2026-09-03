const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.list);
router.get('/create', productController.create);
router.get('/edit/:id', productController.edit);
router.get('/detail', productController.detail);
router.get('/cart', productController.cart);

module.exports = router;