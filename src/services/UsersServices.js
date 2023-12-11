const User = require('../models/User');
const testUsers = require('../../seeders/seederData');

const users = [];
testUsers.forEach(el => users.push(new User(el.username, el.email, el.password)))

class UsersServices {
    getUsers() {
        return users.map((item) => {
            const { id, username, email } = item
            return {
                id: id,
                username: username,
                email: email,
            }
        })
    }

    getUserById(userId) {
        const { id, username, email } = users.find(el => el.id == userId)
        return {
            id: id,
            username: username,
            email: email,
        }

    }

    createUser(username, email, password) {
        const currentUser = new User(username, email, password)
        users.push(currentUser)
        return currentUser
    }

    updateUser(id, body) {
        const userById = users.find(el => el.id == id);
        Object.keys(userById).forEach(key => {
            key = key.replace('_', '');
            if (body[key] != undefined && body[key] != null) {
                userById[key] = body[key]
            }
        })
        return userById;
    }

    changeUserPassword(id, newPassword) {
        const userById = users.find(el => el.id == id);
        userById.password = newPassword ?? userById.password;
        return userById;
    }

    deleteUser(id) {
        const userIndex = users.findIndex(el => el.id == id);
        users.splice(userIndex, 1);
        return 'deleted'
    }
}

module.exports = {
    users : users,
    UsersServices: new UsersServices()
}