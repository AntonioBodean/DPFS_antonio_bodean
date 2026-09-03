const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', mainRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
    console.log(`ConstruMarket está funcionando en http://localhost:${port}`);
});