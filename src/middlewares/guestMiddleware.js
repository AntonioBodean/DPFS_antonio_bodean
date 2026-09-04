function guestMiddleware(req, res, next) {
    if (req.session.userId) {
        return res.redirect('/users/profile');
    }

    return next();
}

module.exports = guestMiddleware;
