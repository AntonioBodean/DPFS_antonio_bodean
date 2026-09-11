const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const {
    registrationValidations,
    adminCreateValidations,
    userUpdateValidations,
    loginValidations
} = require('../middlewares/validations/userValidations');

const usersImagesDirectory = path.join(__dirname, '../../public/images/users');
fs.mkdirSync(usersImagesDirectory, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, usersImagesDirectory),
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

router.get('/login', guestMiddleware, userController.login);
router.post('/login', guestMiddleware, loginValidations, userController.processLogin);
router.get('/register', guestMiddleware, userController.register);
router.post('/register', guestMiddleware, upload.single('image'), registrationValidations, userController.processRegister);
router.get('/profile', authMiddleware, userController.profile);
router.post('/logout', authMiddleware, userController.logout);
router.get('/create', adminMiddleware, userController.create);
router.post('/', adminMiddleware, upload.single('image'), adminCreateValidations, userController.store);
router.get('/', adminMiddleware, userController.list);
router.get('/:id/edit', adminMiddleware, userController.edit);
router.get('/:id', adminMiddleware, userController.detail);
router.put('/:id', adminMiddleware, upload.single('image'), userUpdateValidations, userController.update);
router.delete('/:id', adminMiddleware, userController.destroy);

module.exports = router;
