const bcrypt = require('bcryptjs');
const path = require('path');
const { body } = require('express-validator');
const { Op } = require('sequelize');
const { User } = require('../../../database/models');

const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

function validImage(file) {
    return allowedImageTypes.includes(file.mimetype)
        && allowedImageExtensions.includes(path.extname(file.originalname).toLowerCase());
}

const identityRules = [
    body('firstName')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio.')
        .bail()
        .isLength({ min: 2 }).withMessage('El nombre debe contener al menos 2 caracteres.'),
    body('lastName')
        .trim()
        .notEmpty().withMessage('El apellido es obligatorio.')
        .bail()
        .isLength({ min: 2 }).withMessage('El apellido debe contener al menos 2 caracteres.'),
    body('email')
        .trim()
        .notEmpty().withMessage('El correo electrónico es obligatorio.')
        .bail()
        .isEmail().withMessage('Ingresá un correo electrónico válido.')
        .bail()
        .normalizeEmail()
        .custom(async (email, { req }) => {
            const currentUserId = Number(req.params.id) || null;
            const where = { email };
            if (currentUserId) where.id = { [Op.ne]: currentUserId };
            if (await User.findOne({ where })) {
                throw new Error('Ya existe una cuenta con ese correo electrónico.');
            }
            return true;
        })
];

const passwordRules = (optional = false) => body('password')
    .custom(value => optional && !value ? true : Boolean(value))
    .withMessage('La contraseña es obligatoria.')
    .bail()
    .custom(value => optional && !value ? true : value.length >= 8)
    .withMessage('La contraseña debe contener al menos 8 caracteres.');

const confirmationRule = body('confirmPassword').custom((confirmation, { req }) => {
    if (!req.body.password && !confirmation) return true;
    if (confirmation !== req.body.password) throw new Error('Las contraseñas no coinciden.');
    return true;
});

const requiredImageRule = body('image').custom((value, { req }) => {
    if (!req.file) throw new Error('Seleccioná una imagen de perfil válida.');
    if (!validImage(req.file)) {
        throw new Error('La imagen debe ser JPG, JPEG, PNG o GIF.');
    }
    return true;
});

const optionalImageRule = body('image').custom((value, { req }) => {
    if (req.file && !validImage(req.file)) {
        throw new Error('La imagen debe ser JPG, JPEG, PNG o GIF.');
    }
    return true;
});

const registrationValidations = [
    ...identityRules,
    passwordRules(),
    confirmationRule,
    requiredImageRule,
    body('terms').custom(value => {
        if (!value) throw new Error('Debés aceptar los términos y condiciones.');
        return true;
    })
];

const adminCreateValidations = [
    ...identityRules,
    passwordRules(),
    confirmationRule,
    requiredImageRule
];

const userUpdateValidations = [
    ...identityRules,
    passwordRules(true),
    confirmationRule,
    optionalImageRule
];

const loginValidations = [
    body('email')
        .trim()
        .notEmpty().withMessage('El correo electrónico es obligatorio.')
        .bail()
        .isEmail().withMessage('Ingresá un correo electrónico válido.')
        .bail()
        .normalizeEmail()
        .custom(async email => {
            if (!await User.findOne({ where: { email } })) {
                throw new Error('No existe una cuenta con ese correo electrónico.');
            }
            return true;
        }),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria.')
        .bail()
        .custom(async (password, { req }) => {
            const email = (req.body.email || '').trim().toLowerCase();
            const user = await User.findOne({ where: { email } });
            if (!user || !bcrypt.compareSync(password, user.password)) {
                throw new Error('La contraseña es incorrecta.');
            }
            return true;
        })
];

module.exports = {
    registrationValidations,
    adminCreateValidations,
    userUpdateValidations,
    loginValidations
};
