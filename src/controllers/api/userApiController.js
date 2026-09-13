const { User } = require('../../../database/models');
const {
    sendApiError,
    buildAbsoluteUrl,
    parsePositiveInteger
} = require('../../utils/apiResponse');

const userApiController = {
    list: async (req, res) => {
        const { count, rows } = await User.findAndCountAll({
            attributes: ['id', 'firstName', 'lastName', 'email'],
            order: [['id', 'ASC']]
        });

        return res.json({
            count,
            users: rows.map(user => ({
                id: user.id,
                name: `${user.firstName} ${user.lastName}`.trim(),
                email: user.email,
                detail: buildAbsoluteUrl(req, `/api/users/${user.id}`)
            }))
        });
    },

    detail: async (req, res) => {
        const id = parsePositiveInteger(req.params.id);
        if (!id) {
            return sendApiError(
                res,
                400,
                'INVALID_ID',
                'El identificador debe ser un número entero positivo.'
            );
        }

        const user = await User.findByPk(id, {
            attributes: [
                'id',
                'firstName',
                'lastName',
                'email',
                'phone',
                'image',
                'createdAt',
                'updatedAt'
            ]
        });

        if (!user) {
            return sendApiError(
                res,
                404,
                'USER_NOT_FOUND',
                'El usuario solicitado no existe.'
            );
        }

        return res.json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            image: buildAbsoluteUrl(req, user.image),
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    }
};

module.exports = userApiController;
