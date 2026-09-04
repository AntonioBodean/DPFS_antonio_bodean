function authMiddleware(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/users/login');
    }

    return next();
}

module.exports = authMiddleware;
