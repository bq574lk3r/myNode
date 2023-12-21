const { UsersServices } = require('../services/UsersServices');
const { validationResult } = require("express-validator");
const Sentry = require("@sentry/node");

class UsersControllers {
    async getUsers(req, res) {
        try {
            const data = await UsersServices.getUsers();
            const result = data.map(el => {
                const { id, username, email } = el;
                return {
                    id: id,
                    username: username,
                    email: email,
                }
            })
            res.status(200).send(result);
        } catch (error) {
            Sentry.captureException(error);
        }

    }

    async getUserById(req, res) {
        try {
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
        } catch (error) {
            Sentry.captureException(error);
        }

    }

    async createUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { username, email, password } = req.body;
            const newUser = await UsersServices.createUser(username, email, password)
            res.status(201).send(newUser)
        } catch (error) {
            Sentry.captureException(error);
        }

    }

    async updateUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const updatedUser = await UsersServices.updateUser(req.params.id, req.body);
            res.status(200).send(updatedUser)
        } catch (error) {
            Sentry.captureException(error);
        }

    }

    async changeUserPassword(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { password } = req.body;
            res.status(200).send(await UsersServices.changeUserPassword(req.params.id, password));
        } catch (error) {
            Sentry.captureException(error);
        }
    }

    async deleteUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            res.send(await UsersServices.deleteUser(req.params.id));
        } catch (error) {
            Sentry.captureException(error);
        }
    }

}

module.exports = new UsersControllers();