const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

const User = {
    findAll() {
        return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    },

    findById(id) {
        return this.findAll().find(user => user.id === Number(id));
    },

    findByEmail(email = '') {
        const normalizedEmail = email.trim().toLowerCase();
        return this.findAll().find(user => user.email.toLowerCase() === normalizedEmail);
    },

    generateId() {
        return this.findAll().reduce((highestId, user) => Math.max(highestId, user.id), 0) + 1;
    },

    writeAll(users) {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    },

    create(userData) {
        const users = this.findAll();
        const newUser = {
            id: this.generateId(),
            ...userData
        };

        users.push(newUser);
        this.writeAll(users);
        return newUser;
    }
};

module.exports = User;
