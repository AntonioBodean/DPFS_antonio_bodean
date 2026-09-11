const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const productController = require('../controllers/productController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const { productCreateValidations, productUpdateValidations } = require('../middlewares/validations/productValidations');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../../public/images'));
    },
    filename: (req, file, callback) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        callback(null, `${uniqueName}${path.extname(file.originalname).toLowerCase()}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, callback) => callback(null, true)
});

router.get('/', productController.list);
router.get('/create', adminMiddleware, productController.create);
router.get('/cart', productController.cart);
router.post('/', adminMiddleware, upload.single('image'), productCreateValidations, productController.store);
router.get('/:id/edit', adminMiddleware, productController.edit);
router.get('/:id', productController.detail);
router.put('/:id', adminMiddleware, upload.single('image'), productUpdateValidations, productController.update);
router.delete('/:id', adminMiddleware, productController.destroy);

module.exports = router;
