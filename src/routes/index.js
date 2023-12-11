const express = require('express');

const UsersRoutes = require('./UsersRoutes');

const router = express.Router();

router.use('/users', UsersRoutes);

module.exports = router;