const express = require('express');

const UsersRoutes = require('./UsersRoutes');
const BooksRoutes = require('./BooksRoutes');

const router = express.Router();

router.use('/users', UsersRoutes);
router.use('/books', BooksRoutes);

module.exports = router;