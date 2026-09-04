const User = require('../models/User');

function rememberUserMiddleware(req, res, next) {
    if (!req.session.userId && req.signedCookies.rememberUser) {
        const user = User.findByEmail(req.signedCookies.rememberUser);

        if (user) {
            req.session.userId = user.id;
        } else {
            res.clearCookie('rememberUser');
        }
    }

    const loggedUser = req.session.userId ? User.findById(req.session.userId) : null;

    if (req.session.userId && !loggedUser) {
        delete req.session.userId;
    }

    res.locals.loggedUser = loggedUser || null;
    return next();
}

module.exports = rememberUserMiddleware;
