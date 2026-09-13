const express = require('express');
const userApiRoutes = require('./userApiRoutes');
const productApiRoutes = require('./productApiRoutes');
const { sendApiError } = require('../../utils/apiResponse');

const router = express.Router();

router.use('/users', userApiRoutes);
router.use('/products', productApiRoutes);

router.use((req, res) => sendApiError(
    res,
    404,
    'API_ROUTE_NOT_FOUND',
    'La ruta solicitada no existe en la API.'
));

module.exports = router;
