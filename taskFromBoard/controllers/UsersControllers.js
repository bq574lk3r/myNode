const { UsersServices } = require('../services/UsersServices')

class UsersControllers {
    async getUsers(req, res) {
        const data = await UsersServices.getUsers();
        console.log(res)
        res.status(200).send(data)
    }

    async getUsersByGender(req, res) {
        const data = await UsersServices.getUsersByGender(req.params.gender.toLowerCase())
        res.status(200).send(data)
    }

    async getFiltredAge(req, res) {
        let { min, max } = req.query;
        min = min ?? 0;
        max = max ?? Infinity;
        const data = await UsersServices.getFiltredAge(min, max)
        res.status(200).send(data)
    }

    async createUser(req, res) {
        const { name, isMan, age } = req.body;
        const newUser = await UsersServices.createUser(name, isMan, age)
        res.status(201).send(newUser)
    }

    async updateUser(req, res) {
        const userById = await UsersServices.updateUser(req.params.id, req.body)
        res.status(200).send(userById)
    }

    async changeData(req, res) {
        const userById = await UsersServices.updateUser(req.params.id, req.body)
        res.status(200).send(userById)
    }
    async deleteUser(req, res) {
        res.send(await UsersServices.deleteUser(req.params.id));
    }

}

module.exports = new UsersControllers();