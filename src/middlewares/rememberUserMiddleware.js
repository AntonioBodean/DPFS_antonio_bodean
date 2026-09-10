const { User, UserRole } = require('../../database/models');

async function rememberUserMiddleware(req, res, next) {
    try {
        if (!req.session.userId && req.signedCookies.rememberUser) {
            const user = await User.findOne({ where: { email: req.signedCookies.rememberUser } });
            if (user) req.session.userId = user.id;
            else res.clearCookie('rememberUser');
        }
        const loggedUser = req.session.userId
            ? await User.findByPk(req.session.userId, { include: [{ model: UserRole, as: 'role' }] })
            : null;
        if (req.session.userId && !loggedUser) delete req.session.userId;
        res.locals.loggedUser = loggedUser ? {
            ...loggedUser.get({ plain: true }),
            category: loggedUser.role?.name
        } : null;
        return next();
    } catch (error) {
        return next(error);
    }
}

module.exports = rememberUserMiddleware;
