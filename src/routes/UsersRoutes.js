const express = require('express');
const router = express.Router();
const UsersControllers = require('../controllers/UsersControllers');
const UsersHelpers = require('../helpers/UsersHelpers')
const ValidationHelpers = require('../helpers/ValidationHelpers');


router.use('/:id', ValidationHelpers.validateParamId, UsersHelpers.checkUserId)

router.get('/', UsersControllers.getUsers)

router.get('/:id', UsersControllers.getUserById)

router.post('/', ValidationHelpers.validateDataUser, UsersHelpers.checkUserData, UsersControllers.createUser);

router.put('/:id', ValidationHelpers.validateDataUser, UsersHelpers.checkUserUpdate, UsersControllers.updateUser);

router.patch('/:id', ValidationHelpers.validatePassword, UsersControllers.changeUserPassword);

router.delete('/:id', UsersControllers.deleteUser);

module.exports = router;