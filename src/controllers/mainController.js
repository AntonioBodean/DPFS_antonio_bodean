const mainController = {
    home: (req, res) => {
        res.render('index', {
            title: 'ConstruMarket | Materiales de construcción y herramientas'
        });
    }
};

module.exports = mainController;