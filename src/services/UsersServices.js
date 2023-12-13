const User = require('../models/User');
const { testUsers } = require('../../seeders/seederData');
const fileHelpers = require('../helpers/FileHelpers');
const userDataFile = 'data.json'

async function userDataIsEmpty() {
    const data = await fileHelpers.readFile(userDataFile);
    if (data.users.length === 0) {
        testUsers.forEach(el => data.users.push(new User(el.username, el.email, el.password)))
        fileHelpers.writeFile(userDataFile, data)
    }
};
userDataIsEmpty();


class UsersServices {
    async getUsers() {
        try {
            const data = await fileHelpers.readFile(userDataFile)
            return data.users
        } catch (error) {
            return err;
        }

    }

    async getUserById(userId) {
        try {
            const data = await fileHelpers.readFile(userDataFile);
            return data.users.find(el => el.id == userId)
        } catch (error) {
            return err;
        }

    }

    async createUser(username, email, password) {
        try {
            const currentUser = new User(username, email, password);
            const data = await fileHelpers.readFile(userDataFile);
            data.users.push(currentUser);
            await fileHelpers.writeFile(userDataFile, data)
            return currentUser
        } catch (err) {
            return err;
        }
    }

    async updateUser(id, body) {
        try {
            const data = await fileHelpers.readFile(userDataFile);
            const userById = data.users.find(el => el.id == id);
            Object.keys(userById).forEach(key => {
                if (body[key] != undefined && body[key] != null) {
                    userById[key] = body[key]
                }
            })
            await fileHelpers.writeFile(userDataFile, data);
            return userById;

        } catch (err) {
            return err;
        }
    }

    async changeUserPassword(id, newPassword) {
        try {
            const data = await fileHelpers.readFile(userDataFile);
            const userById = data.users.find(el => el.id == id);
            userById.password = newPassword ?? userById.password;
            await fileHelpers.writeFile(userDataFile, data);
            return userById;
        } catch (err) {
            return err;
        }
    }

    async deleteUser(id) {
        try {
            const data = await fileHelpers.readFile(userDataFile);
            const userIndex = data.users.findIndex(el => el.id == id);
            data.books.splice(userIndex, 1);
            await fileHelpers.writeFile(userDataFile, data);
            return 'deleted'
        } catch (err) {
            return err;
        }

    }
}

module.exports = {
    UsersServices: new UsersServices()
}