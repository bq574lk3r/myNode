const express = require('express');

const UsersRoutes = require('./UsersRoutes');

const router = express.Router();

router.use('/', UsersRoutes);

module.exports = router;