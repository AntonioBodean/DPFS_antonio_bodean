const bcrypt = require('bcryptjs');
const fs = require('fs');
const User = require('../models/User');

function registerErrors(body) {
    const errors = {};
    const firstName = (body.firstName || '').trim();
    const lastName = (body.lastName || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password || '';

    if (firstName.length < 2) errors.firstName = 'El nombre debe contener al menos 2 caracteres.';
    if (lastName.length < 2) errors.lastName = 'El apellido debe contener al menos 2 caracteres.';
    if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Ingresá un correo electrónico válido.';
    if (User.findByEmail(email)) errors.email = 'Ya existe una cuenta con ese correo electrónico.';
    if (password.length < 8) errors.password = 'La contraseña debe contener al menos 8 caracteres.';
    if (password !== body.confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden.';
    if (!body.terms) errors.terms = 'Debés aceptar los términos y condiciones.';

    return errors;
}

function publicUser(user) {
    const { password, ...safeUser } = user;
    return safeUser;
}

const userController = {
    login: (req, res) => {
        res.render('users/login', {
            title: 'Iniciar sesión | ConstruMarket',
            errors: {},
            oldData: {}
        });
    },

    processLogin: (req, res) => {
        const email = (req.body.email || '').trim().toLowerCase();
        const user = User.findByEmail(email);
        const validPassword = user && user.password.startsWith('$2') && bcrypt.compareSync(req.body.password || '', user.password);

        if (!validPassword) {
            return res.status(401).render('users/login', {
                title: 'Iniciar sesión | ConstruMarket',
                errors: { credentials: 'El correo electrónico o la contraseña son incorrectos.' },
                oldData: { email }
            });
        }

        req.session.userId = user.id;

        if (req.body.remember) {
            res.cookie('rememberUser', user.email, {
                signed: true,
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60 * 24 * 30
            });
        }

        return res.redirect('/users/profile');
    },

    register: (req, res) => {
        res.render('users/register', {
            title: 'Crear cuenta | ConstruMarket',
            errors: {},
            oldData: {}
        });
    },

    processRegister: (req, res) => {
        const errors = registerErrors(req.body);

        if (!req.file) errors.image = 'Seleccioná una imagen de perfil.';

        if (Object.keys(errors).length) {
            if (req.file) fs.unlinkSync(req.file.path);

            return res.status(422).render('users/register', {
                title: 'Crear cuenta | ConstruMarket',
                errors,
                oldData: req.body
            });
        }

        const user = User.create({
            firstName: req.body.firstName.trim(),
            lastName: req.body.lastName.trim(),
            email: req.body.email.trim().toLowerCase(),
            phone: (req.body.phone || '').trim(),
            password: bcrypt.hashSync(req.body.password, 10),
            category: 'Customer',
            image: `/images/users/${req.file.filename}`
        });

        req.session.userId = user.id;
        return res.redirect('/users/profile');
    },

    profile: (req, res) => {
        const user = User.findById(req.session.userId);

        return res.render('users/profile', {
            title: 'Mi perfil | ConstruMarket',
            user: publicUser(user)
        });
    },

    logout: (req, res) => {
        res.clearCookie('rememberUser');
        req.session.destroy(() => res.redirect('/'));
    }
};


module.exports = userController;
