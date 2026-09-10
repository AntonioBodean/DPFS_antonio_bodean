const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const rememberUserMiddleware = require('./middlewares/rememberUserMiddleware');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser(process.env.COOKIE_SECRET || 'construmarket-cookie-secret'));
app.use(session({
    secret: process.env.SESSION_SECRET || 'construmarket-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax'
    }
}));
app.use((req, res, next) => {
    res.locals.loggedUser = null;
    next();
});
app.use(rememberUserMiddleware);

app.use('/', mainRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.use((req, res) => {
    res.status(404).render('errors/404', {
        title: 'Página no encontrada | ConstruMarket',
        heading: 'Página no encontrada',
        message: 'La dirección que ingresaste no existe o cambió de ubicación.',
        backUrl: '/',
        backLabel: 'Volver al inicio'
    });
});

app.use((error, req, res, next) => {
    console.error(error);
    if (res.headersSent) return next(error);
    const databaseUnavailable = ['ECONNREFUSED', 'ER_BAD_DB_ERROR', 'ER_ACCESS_DENIED_ERROR'].includes(error.original?.code || error.code);
    return res.status(500).render('errors/500', {
        title: 'Error del servidor | ConstruMarket',
        message: databaseUnavailable
            ? 'No pudimos conectarnos a la base de datos. Revisá la configuración del archivo .env y ejecutá database/structure.sql y database/data.sql.'
            : 'Ocurrió un error inesperado. Intentá nuevamente en unos minutos.'
    });
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`ConstruMarket está funcionando en http://localhost:${port}`);
    });
}

module.exports = app;
