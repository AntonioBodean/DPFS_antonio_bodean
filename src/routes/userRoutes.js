const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

const usersImagesDirectory = path.join(__dirname, '../../public/images/users');
fs.mkdirSync(usersImagesDirectory, { recursive: true });

const imageExtensions = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, usersImagesDirectory),
    filename: (req, file, callback) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        callback(null, `${uniqueName}${imageExtensions[file.mimetype]}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, callback) => callback(null, Boolean(imageExtensions[file.mimetype]))
});

router.get('/login', guestMiddleware, userController.login);
router.post('/login', guestMiddleware, userController.processLogin);
router.get('/register', guestMiddleware, userController.register);
router.post('/register', guestMiddleware, upload.single('image'), userController.processRegister);
router.get('/profile', authMiddleware, userController.profile);
router.post('/logout', authMiddleware, userController.logout);
router.get('/create', authMiddleware, userController.create);
router.post('/', authMiddleware, upload.single('image'), userController.store);
router.get('/', authMiddleware, userController.list);
router.get('/:id/edit', authMiddleware, userController.edit);
router.get('/:id', authMiddleware, userController.detail);
router.put('/:id', authMiddleware, upload.single('image'), userController.update);
router.delete('/:id', authMiddleware, userController.destroy);

module.exports = router;
