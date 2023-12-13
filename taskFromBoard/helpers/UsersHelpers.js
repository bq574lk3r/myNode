const fileHelpers = require('./FileHelpers');
const userDataFile = 'taskFromBoard/dataTask.json';

class UsersHelpers {
    checkUserData(req, res, next) {
        const { name, isMan, age } = req.body;
        if (!name) {
            res.status(400).send('некорректное поле name')
            return;
        }
    
        if (!isMan) {
            res.status(400).send('некорректное поле isMan')
            return;
        }
    
        if (!age || age < 0) {
            res.status(400).send('некорректное поле age')
            return;
        }
        next()
    };
    filterReqData(req, res, next) {
        const { name, isMan, age } = req.body;
        req.body = {
            name: name,
            isMan: isMan,
            age: age,
        };
        next();
    }
    async checkUser(req, res, next) {
        const users = await fileHelpers.readFile(userDataFile);
        const userById = users.find(el => el.id == req.params.id)
        if (userById) {
            next();
        } else {
            res.status(404).send('пользователь с таким id не найден')
            return;
        }
    }    
}

module.exports = new UsersHelpers()