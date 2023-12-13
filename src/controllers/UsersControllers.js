const { UsersServices } = require('../services/UsersServices')

class UsersControllers {
    async getUsers(req, res) {
        const data = await UsersServices.getUsers();
        const result = data.map(el => {
            const { id, username, email } = el;
            return {
                id: id,
                username: username,
                email: email,
            }
        })

        res.status(200).send(result)
    }
    async getUserById(req, res) {
        const { id, username, email } = await UsersServices.getUserById(req.params.id);
        const user = {
            id: id,
            username: username,
            email: email,
        };

        res.status(200).send(user);
    }
    async createUser(req, res) {
        const { username, email, password } = req.body;
        const newUser = await UsersServices.createUser(username, email, password)
        res.status(201).send(newUser)
    }
    async updateUser(req, res) {
        const updatedUser = await UsersServices.updateUser(req.params.id, req.body);
        res.status(200).send(updatedUser)
    }
    async changeUserPassword(req, res) {
        const { password } = req.body;
        res.status(200).send(await UsersServices.changeUserPassword(req.params.id, password));

    }
    async deleteUser(req, res) {
        res.send(await UsersServices.deleteUser(req.params.id));
    }

}

module.exports = new UsersControllers();