const { body } = require('express-validator');
const path = require('path');
const { Category } = require('../../../database/models');

const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

const productValidations = (imageRequired = false) => [
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio.')
        .bail()
        .isLength({ min: 5 }).withMessage('El nombre debe contener al menos 5 caracteres.'),
    body('description')
        .trim()
        .isLength({ min: 20 }).withMessage('La descripción debe contener al menos 20 caracteres.'),
    body('categoryId')
        .notEmpty().withMessage('Seleccioná una categoría.')
        .bail()
        .isInt({ min: 1 }).withMessage('Seleccioná una categoría válida.')
        .bail()
        .custom(async categoryId => {
            if (!await Category.findByPk(categoryId)) {
                throw new Error('La categoría seleccionada no existe.');
            }
            return true;
        }),
    body('brand').trim().notEmpty().withMessage('La marca es obligatoria.'),
    body('price')
        .notEmpty().withMessage('El precio es obligatorio.')
        .bail()
        .isFloat({ min: 0 }).withMessage('El precio debe ser un número mayor o igual a cero.'),
    body('stock')
        .notEmpty().withMessage('El stock es obligatorio.')
        .bail()
        .isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a cero.'),
    body('image').custom((value, { req }) => {
        if (imageRequired && !req.file) throw new Error('Seleccioná una imagen del producto.');
        if (req.file && (!allowedImageTypes.includes(req.file.mimetype)
            || !allowedImageExtensions.includes(path.extname(req.file.originalname).toLowerCase()))) {
            throw new Error('La imagen debe ser JPG, JPEG, PNG o GIF.');
        }
        return true;
    })
];

module.exports = { productCreateValidations: productValidations(true), productUpdateValidations: productValidations() };
