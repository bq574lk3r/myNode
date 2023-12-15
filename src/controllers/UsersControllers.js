const { UsersServices } = require('../services/UsersServices');
const { validationResult } = require("express-validator");

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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id, username, email } = await UsersServices.getUserById(req.params.id);
        const user = {
            id: id,
            username: username,
            email: email,
        };

        res.status(200).send(user);
    }

    async createUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, email, password } = req.body;
        const newUser = await UsersServices.createUser(username, email, password)
        res.status(201).send(newUser)
    }

    async updateUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const updatedUser = await UsersServices.updateUser(req.params.id, req.body);
        res.status(200).send(updatedUser)
    }

    async changeUserPassword(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { password } = req.body;
        res.status(200).send(await UsersServices.changeUserPassword(req.params.id, password));

    }

    async deleteUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        res.send(await UsersServices.deleteUser(req.params.id));
    }

}

module.exports = new UsersControllers();