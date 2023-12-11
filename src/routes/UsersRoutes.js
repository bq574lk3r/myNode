const express = require('express');
const router = express.Router();
const UsersControllers = require('../controllers/UsersControllers');
const UsersHelpers = require('../helpers/UsersHelpers')

router.use('/:id', UsersHelpers.checkUserId)

router.get('/', UsersControllers.getUsers)

router.get('/:id', UsersControllers.getUserById)

router.post('/', UsersHelpers.dataIsEmpty, UsersHelpers.checkUserData, UsersControllers.createUser);

router.put('/:id', UsersHelpers.dataIsEmpty, UsersHelpers.checkUserUpdate, UsersControllers.updateUser);

router.patch('/:id', UsersControllers.changeUserPassword);

router.delete('/:id', UsersControllers.deleteUser);

module.exports = router;