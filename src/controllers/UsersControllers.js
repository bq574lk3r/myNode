const { UsersServices } = require('../services/UsersServices')

class UsersControllers {
    getUsers(req, res) {
        res.status(200).send(UsersServices.getUsers())
    }
    getUserById(req, res) {
        res.status(200).send(UsersServices.getUserById(req.params.id));
    }
    createUser(req, res) {
        const { username, email, password } = req.body;
        const newUser = UsersServices.createUser(username, email, password)
        res.status(201).send(newUser)
    }
    updateUser(req, res) {
        const updatedUser = UsersServices.updateUser(req.params.id, req.body);
        res.status(200).send(updatedUser)
    }
    changeUserPassword(req, res) {
        const { password } = req.body;
        res.status(200).send(UsersServices.changeUserPassword(req.params.id, password));

    }
    deleteUser(req, res) {
        res.send( UsersServices.deleteUser(req.params.id));
    }

}

module.exports = new UsersControllers();