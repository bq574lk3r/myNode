const express = require('express');
const router = express.Router();
const UsersControllers = require('../controllers/UsersControllers');
const UsersHelpers = require('../helpers/UsersHelpers');

router.use('/user/:id', UsersHelpers.checkUser);

router.get('/users', UsersControllers.getUsers);

router.get('/users/:gender', UsersControllers.getUsersByGender);

router.get('/filtredUsers', UsersControllers.getFiltredAge);

router.post('/users', UsersHelpers.checkUserData, UsersControllers.createUser);

router.put('/user/:id', UsersHelpers.filterReqData, UsersHelpers.checkUserData, UsersControllers.updateUser);

router.patch('/user/:id', UsersHelpers.filterReqData, UsersControllers.changeData);

router.delete('/user/:id', UsersControllers.deleteUser)

module.exports = router;