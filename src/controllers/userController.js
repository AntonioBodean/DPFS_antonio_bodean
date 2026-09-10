const bcrypt = require('bcryptjs');
const fs = require('fs');
const { Op } = require('sequelize');
const { User, UserRole } = require('../../database/models');

async function registerErrors(body, currentUserId = null, requireTerms = true) {
    const errors = {};
    const firstName = (body.firstName || '').trim();
    const lastName = (body.lastName || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password || '';
    const duplicate = await User.findOne({
        where: { email, ...(currentUserId ? { id: { [Op.ne]: currentUserId } } : {}) }
    });

    if (firstName.length < 2) errors.firstName = 'El nombre debe contener al menos 2 caracteres.';
    if (lastName.length < 2) errors.lastName = 'El apellido debe contener al menos 2 caracteres.';
    if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Ingresá un correo electrónico válido.';
    if (duplicate) errors.email = 'Ya existe una cuenta con ese correo electrónico.';
    if (!currentUserId && password.length < 8) errors.password = 'La contraseña debe contener al menos 8 caracteres.';
    if (password && password.length < 8) errors.password = 'La contraseña debe contener al menos 8 caracteres.';
    if (password !== (body.confirmPassword || '')) errors.confirmPassword = 'Las contraseñas no coinciden.';
    if (requireTerms && !body.terms) errors.terms = 'Debés aceptar los términos y condiciones.';
    return errors;
}

function presentUser(instance) {
    const user = instance.get({ plain: true });
    delete user.password;
    return { ...user, category: user.role?.name || 'Customer' };
}

async function findUser(id) {
    return User.findByPk(id, { include: [{ model: UserRole, as: 'role' }] });
}

function renderUserNotFound(res) {
    return res.status(404).render('errors/404', {
        title: 'Usuario no encontrado | ConstruMarket',
        heading: 'Usuario no encontrado',
        message: 'El usuario que buscás no existe o fue eliminado.',
        backUrl: '/users',
        backLabel: 'Volver a usuarios'
    });
}

const userController = {
    login: (req, res) => res.render('users/login', {
        title: 'Iniciar sesión | ConstruMarket', errors: {}, oldData: {}
    }),

    processLogin: async (req, res) => {
        const email = (req.body.email || '').trim().toLowerCase();
        const user = await User.findOne({ where: { email } });
        const validPassword = user && bcrypt.compareSync(req.body.password || '', user.password);
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
                signed: true, httpOnly: true, sameSite: 'lax', maxAge: 1000 * 60 * 60 * 24 * 30
            });
        }
        return res.redirect('/users/profile');
    },

    register: (req, res) => res.render('users/register', {
        title: 'Crear cuenta | ConstruMarket', errors: {}, oldData: {},
        isAdminCreate: false, roles: []
    }),

    processRegister: async (req, res) => {
        const errors = await registerErrors(req.body);
        if (!req.file) errors.image = 'Seleccioná una imagen de perfil.';
        if (Object.keys(errors).length) {
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(422).render('users/register', {
                title: 'Crear cuenta | ConstruMarket', errors, oldData: req.body,
                isAdminCreate: false, roles: []
            });
        }
        const [role] = await UserRole.findOrCreate({ where: { name: 'Customer' } });
        const user = await User.create({
            firstName: req.body.firstName.trim(),
            lastName: req.body.lastName.trim(),
            email: req.body.email.trim().toLowerCase(),
            phone: (req.body.phone || '').trim() || null,
            password: bcrypt.hashSync(req.body.password, 10),
            roleId: role.id,
            image: `/images/users/${req.file.filename}`
        });
        req.session.userId = user.id;
        return res.redirect('/users/profile');
    },

    create: async (req, res) => {
        const roles = await UserRole.findAll({ order: [['name', 'ASC']] });
        return res.render('users/register', {
            title: 'Crear usuario | ConstruMarket', errors: {}, oldData: {},
            isAdminCreate: true, roles
        });
    },

    store: async (req, res) => {
        const roles = await UserRole.findAll({ order: [['name', 'ASC']] });
        const errors = await registerErrors(req.body, null, false);
        const roleId = Number(req.body.roleId);

        if (!roles.some(role => role.id === roleId)) errors.roleId = 'Seleccioná un tipo de cuenta válido.';
        if (!req.file) errors.image = 'Seleccioná una imagen de perfil.';

        if (Object.keys(errors).length) {
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(422).render('users/register', {
                title: 'Crear usuario | ConstruMarket', errors, oldData: req.body,
                isAdminCreate: true, roles
            });
        }

        const user = await User.create({
            firstName: req.body.firstName.trim(),
            lastName: req.body.lastName.trim(),
            email: req.body.email.trim().toLowerCase(),
            phone: (req.body.phone || '').trim() || null,
            password: bcrypt.hashSync(req.body.password, 10),
            roleId,
            image: `/images/users/${req.file.filename}`
        });

        return res.redirect(`/users/${user.id}`);
    },

    list: async (req, res) => {
        const q = (req.query.q || '').trim();
        const where = q ? { [Op.or]: [
            { firstName: { [Op.like]: `%${q}%` } },
            { lastName: { [Op.like]: `%${q}%` } },
            { email: { [Op.like]: `%${q}%` } }
        ] } : {};
        const users = await User.findAll({
            where, include: [{ model: UserRole, as: 'role' }], order: [['lastName', 'ASC'], ['firstName', 'ASC']]
        });
        res.render('users/list', { title: 'Usuarios | ConstruMarket', users: users.map(presentUser), q });
    },

    profile: async (req, res) => {
        const user = await findUser(req.session.userId);
        if (!user) return res.redirect('/users/login');
        return res.render('users/profile', { title: 'Mi perfil | ConstruMarket', user: presentUser(user) });
    },

    detail: async (req, res) => {
        const user = await findUser(req.params.id);
        if (!user) return renderUserNotFound(res);
        return res.render('users/detail', { title: 'Detalle de usuario | ConstruMarket', user: presentUser(user) });
    },

    edit: async (req, res) => {
        const user = await findUser(req.params.id);
        if (!user) return renderUserNotFound(res);
        const roles = await UserRole.findAll({ order: [['name', 'ASC']] });
        return res.render('users/edit', {
            title: 'Editar usuario | ConstruMarket', user: presentUser(user), roles, errors: {}
        });
    },

    update: async (req, res) => {
        const user = await User.findByPk(req.params.id);
        if (!user) return renderUserNotFound(res);
        const errors = await registerErrors(req.body, user.id, false);
        if (Object.keys(errors).length) {
            const roles = await UserRole.findAll({ order: [['name', 'ASC']] });
            return res.status(422).render('users/edit', {
                title: 'Editar usuario | ConstruMarket',
                user: { ...user.get({ plain: true }), ...req.body }, roles, errors
            });
        }
        await user.update({
            firstName: req.body.firstName.trim(),
            lastName: req.body.lastName.trim(),
            email: req.body.email.trim().toLowerCase(),
            phone: (req.body.phone || '').trim() || null,
            roleId: Number(req.body.roleId),
            ...(req.body.password ? { password: bcrypt.hashSync(req.body.password, 10) } : {}),
            ...(req.file ? { image: `/images/users/${req.file.filename}` } : {})
        });
        return res.redirect(`/users/${user.id}`);
    },

    destroy: async (req, res) => {
        if (Number(req.params.id) === Number(req.session.userId)) {
            return res.status(400).send('No podés eliminar tu propia cuenta mientras está activa.');
        }
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (!deleted) return renderUserNotFound(res);
        return res.redirect('/users');
    },

    logout: (req, res) => {
        res.clearCookie('rememberUser');
        req.session.destroy(() => res.redirect('/'));
    }
};

module.exports = userController;
