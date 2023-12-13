const User = require('../models/User');
const testUsers = require('../../seeders/seederData');
const fileHelpers = require('../helpers/FileHelpers');
const userDataFile = 'dataUser.json'

async function userDataIsEmpty(){
    const data = await fileHelpers.readFile(userDataFile);
    if(data.length === 0){
  
        testUsers.forEach(el => data.push(new User(el.username, el.email, el.password)))
        fileHelpers.writeFile(userDataFile, data)
    }
};
userDataIsEmpty();


class UsersServices {
    async getUsers() {
        try {
            return await fileHelpers.readFile(userDataFile);
        } catch (error) {
            return err;
        }

    }

    async getUserById(userId) {
        try {
            const data = await fileHelpers.readFile(userDataFile);
            return data.find(el => el.id == userId)
        } catch (error) {
            return err;
        }

    }

    async createUser(username, email, password) {
        try {
            const currentUser = new User(username, email, password);
            const data = await fileHelpers.readFile(userDataFile);
            data.push(currentUser);
            await fileHelpers.writeFile(userDataFile, data)
            return currentUser
        } catch (err) {
            return err;
        }
    }

    async updateUser(id, body) {
        try {
            const data = await fileHelpers.readFile(userDataFile);
            const userById = data.find(el => el.id == id);
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
            const userById = data.find(el => el.id == id);
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
            const userIndex = data.findIndex(el => el.id == id);
            data.splice(userIndex, 1);
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