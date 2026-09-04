const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const productController = require('../controllers/productController');

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
    fileFilter: (req, file, callback) => {
        callback(null, file.mimetype.startsWith('image/'));
    }
});

router.get('/', productController.list);
router.get('/create', productController.create);
router.get('/cart', productController.cart);
router.post('/', upload.single('image'), productController.store);
router.get('/:id/edit', productController.edit);
router.get('/:id', productController.detail);
router.put('/:id', upload.single('image'), productController.update);
router.delete('/:id', productController.destroy);

module.exports = router;
