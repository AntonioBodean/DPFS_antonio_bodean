const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = require('../src/app');

const usersFilePath = path.join(__dirname, '../src/data/users.json');
const usersImagesPath = path.join(__dirname, '../public/images/users');

function sessionCookie(response) {
    const setCookie = response.headers.get('set-cookie');
    return setCookie ? setCookie.split(';')[0] : '';
}

function namedCookie(response, name) {
    const cookies = response.headers.getSetCookie ? response.headers.getSetCookie() : [response.headers.get('set-cookie')];
    const cookie = cookies.find(value => value && value.startsWith(`${name}=`));
    return cookie ? cookie.split(';')[0] : '';
}

test('el flujo JSON del Sprint 5 (reemplazado por Sequelize en Sprint 6)', { skip: 'Prueba histórica: depende de la persistencia JSON eliminada en Sprint 6.' }, async () => {
    const originalUsers = fs.readFileSync(usersFilePath, 'utf-8');
    const originalImages = new Set(fs.readdirSync(usersImagesPath));
    const server = app.listen(0);
    const baseUrl = `http://127.0.0.1:${server.address().port}`;
    const email = 'sprint5@construmarket.test';
    const password = 'ClaveSegura123';

    try {
        const guestProfile = await fetch(`${baseUrl}/users/profile`, { redirect: 'manual' });
        assert.equal(guestProfile.status, 302);
        assert.equal(guestProfile.headers.get('location'), '/users/login');

        const form = new FormData();
        form.set('firstName', 'Ana');
        form.set('lastName', 'Martínez');
        form.set('email', email);
        form.set('phone', '11 2345 6789');
        form.set('password', password);
        form.set('confirmPassword', password);
        form.set('terms', 'on');
        form.set('image', new Blob(['fake-image'], { type: 'image/png' }), 'avatar.png');

        const registerResponse = await fetch(`${baseUrl}/users/register`, {
            method: 'POST',
            body: form,
            redirect: 'manual'
        });
        assert.equal(registerResponse.status, 302);
        assert.equal(registerResponse.headers.get('location'), '/users/profile');

        const createdUser = User.findByEmail(email);
        assert.ok(createdUser);
        assert.notEqual(createdUser.password, password);
        assert.equal(bcrypt.compareSync(password, createdUser.password), true);
        assert.match(createdUser.image, /^\/images\/users\//);

        const cookie = sessionCookie(registerResponse);
        const profileResponse = await fetch(`${baseUrl}/users/profile`, {
            headers: { cookie },
            redirect: 'manual'
        });
        assert.equal(profileResponse.status, 200);
        assert.match(await profileResponse.text(), /Ana Martínez/);

        const guestOnlyResponse = await fetch(`${baseUrl}/users/login`, {
            headers: { cookie },
            redirect: 'manual'
        });
        assert.equal(guestOnlyResponse.status, 302);
        assert.equal(guestOnlyResponse.headers.get('location'), '/users/profile');

        const logoutResponse = await fetch(`${baseUrl}/users/logout`, {
            method: 'POST',
            headers: { cookie },
            redirect: 'manual'
        });
        assert.equal(logoutResponse.status, 302);
        assert.equal(logoutResponse.headers.get('location'), '/');

        const loggedOutProfile = await fetch(`${baseUrl}/users/profile`, {
            headers: { cookie },
            redirect: 'manual'
        });
        assert.equal(loggedOutProfile.headers.get('location'), '/users/login');

        const loginResponse = await fetch(`${baseUrl}/users/login`, {
            method: 'POST',
            body: new URLSearchParams({ email, password, remember: 'on' }),
            redirect: 'manual'
        });
        assert.equal(loginResponse.status, 302);
        assert.match(loginResponse.headers.get('set-cookie'), /rememberUser=/);

        const rememberedProfile = await fetch(`${baseUrl}/users/profile`, {
            headers: { cookie: namedCookie(loginResponse, 'rememberUser') },
            redirect: 'manual'
        });
        assert.equal(rememberedProfile.status, 200);

        const invalidLoginResponse = await fetch(`${baseUrl}/users/login`, {
            method: 'POST',
            body: new URLSearchParams({ email, password: 'incorrecta' }),
            redirect: 'manual'
        });
        assert.equal(invalidLoginResponse.status, 401);
        assert.match(await invalidLoginResponse.text(), /son incorrectos/);
    } finally {
        fs.writeFileSync(usersFilePath, originalUsers);
        for (const image of fs.readdirSync(usersImagesPath)) {
            if (!originalImages.has(image)) fs.unlinkSync(path.join(usersImagesPath, image));
        }
        await new Promise(resolve => server.close(resolve));
    }
});
