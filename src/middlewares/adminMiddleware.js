function adminMiddleware(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/users/login');
    }

    if (res.locals.loggedUser?.category !== 'Admin') {
        return res.status(403).render('errors/403', {
            title: 'Acceso restringido | ConstruMarket'
        });
    }

    return next();
}

module.exports = adminMiddleware;
