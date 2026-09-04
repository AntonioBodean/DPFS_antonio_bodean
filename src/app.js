const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const port = 3000;
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../public')));

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

if (require.main === module) {
    app.listen(port, () => {
        console.log(`ConstruMarket está funcionando en http://localhost:${port}`);
    });
}

module.exports = app;
