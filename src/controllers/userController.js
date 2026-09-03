const userController = {
    login: (req, res) => {
        res.render('users/login', { title: "Iniciar sesión | ConstruMarket" });
    },
    register: (req, res) => {
        res.render('users/register', { title: "Crear cuenta | ConstruMarket" })
    }
}


module.exports = userController;