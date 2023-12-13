const fileHelpers = require('../helpers/FileHelpers');
const userDataFile = 'dataUser.json';

class UsersHelpers {
    async checkUserId(req, res, next) {
        const users = await fileHelpers.readFile(userDataFile);
        const userById = users.find(el => el.id == req.params.id)
        if (userById) {
            next();
        } else {
            res.status(404).send('пользователь с таким id не найден')
            return;
        }
    }

    async checkUserData(req, res, next) {
        const users = await fileHelpers.readFile(userDataFile);
        const { username, email } = req.body;
        if (!!users.find(el => el.username === username || el.email === email)) {
            res.status(400).send('пользватель с таким username или почтовым ящиком зарегестрирован');
            return;
        } else {
            next();
        }
    }

    async checkUserUpdate(req, res, next) {
        const users = await fileHelpers.readFile(userDataFile);
        const { username, email } = req.body;
        const findUser = users.find(el => el.username === username || el.email === email);
        if (!!findUser && findUser?.id != req.params.id) {
            res.status(400).send('пользватель с таким username или почтовым ящиком уже зарегестрирован');
            return;
        } else {
            next();
        }
    }

    dataIsEmpty(req, res, next) {
        const { username, email, password } = req.body;
        if (username && email && password) {
            next()
        } else {
            res.status(400).send('все поля должны быть заполнены');
        }
    }

}

module.exports = new UsersHelpers()