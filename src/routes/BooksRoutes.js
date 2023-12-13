const express = require('express');
const router = express.Router();
const BooksControllers = require('../controllers/BooksControllers');
const BooksHelpers = require('../helpers/BooksHelpers')

router.use('/:id', BooksHelpers.checkBookId)

router.get('/', BooksControllers.getBooks)

router.get('/:id', BooksControllers.getBookById)

router.post('/', BooksHelpers.checkReqData, BooksControllers.createBook);

router.put('/:id', BooksHelpers.checkReqData, BooksControllers.updateBook);

router.delete('/:id', BooksControllers.deleteBook);

module.exports = router;