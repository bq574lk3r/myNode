const { BooksServices } = require('../services/BooksServices');
const { validationResult } = require("express-validator");

class BooksControllers {

    async getBooks(req, res) {
        res.status(200).send(await BooksServices.getBooks())
    }

    async getBookById(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        res.status(200).send(await BooksServices.getBookById(req.params.id));
    }

    async createBook(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, author, genre } = req.body;
        const newBook = await BooksServices.createBook(title, author, genre);
        res.status(201).send(newBook);
    }
    
    async updateBook(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const updatedBook = await BooksServices.updateBook(req.params.id, req.body);
        res.status(200).send(updatedBook)
    }

    async deleteBook(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        res.send(await BooksServices.deleteBook(req.params.id));
    }

}

module.exports = new BooksControllers();