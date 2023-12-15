const express = require('express');
const router = express.Router();
const BooksControllers = require('../controllers/BooksControllers');
const BooksHelpers = require('../helpers/BooksHelpers')
const ValidationHelpers = require('../helpers/ValidationHelpers');

router.use('/:id', ValidationHelpers.validateParamId, BooksHelpers.checkBookId)

router.get('/', BooksControllers.getBooks)

router.get('/:id', BooksControllers.getBookById)

router.post('/', ValidationHelpers.validateDataBook, BooksControllers.createBook);

router.put('/:id', ValidationHelpers.validateDataBook, BooksControllers.updateBook);

router.delete('/:id', BooksControllers.deleteBook);

module.exports = router;