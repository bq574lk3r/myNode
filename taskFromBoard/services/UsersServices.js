const User = require('../models/User');
const fileHelpers = require('../helpers/FileHelpers');
const userDataFile = 'taskFromBoard/dataTask.json';

class UsersServices {
    async getUsers() {
        try {
            const data = await fileHelpers.readFile(userDataFile)
            return data
        } catch (error) {
            return err;
        }
    }
    async getUsersByGender(gender) {
        try {
            const data = await fileHelpers.readFile(userDataFile)
            const result = data.filter(el => {
                let currentGender
                switch (gender) {
                    case 'm':
                        currentGender = el.isMan;
                        break;
                    case 'f':
                        currentGender = !el.isMan;
                        break
                    default:
                        currentGender = false;
                }
                return currentGender;
            })
            return result
        } catch (error) {
            return err;
        }
    }

    async getFiltredAge(min, max) {
        const data = await fileHelpers.readFile(userDataFile)
        return data.filter(el => min <= el.age && max >= el.age);
    }

    async createUser(name, isMan, age) {
        try {
            const currentUser = new User(name, isMan, age);
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

    async changeData(id, body) {
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