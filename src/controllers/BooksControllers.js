const { BooksServices } = require('../services/BooksServices');
const { validationResult } = require("express-validator");
const Sentry = require("@sentry/node");

class BooksControllers {

    async getBooks(req, res) {
        try {
            res.status(200).send(await BooksServices.getBooks())
        } catch (error) {
            Sentry.captureException(error);
        }

    }

    async getBookById(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            res.status(200).send(await BooksServices.getBookById(req.params.id));
        } catch (error) {
            Sentry.captureException(error);
        }
    }

    async createBook(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { title, author, genre } = req.body;
            const newBook = await BooksServices.createBook(title, author, genre);
            res.status(201).send(newBook);
        } catch (error) {
            Sentry.captureException(error);
        }
    }

    async updateBook(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const updatedBook = await BooksServices.updateBook(req.params.id, req.body);
            res.status(200).send(updatedBook)
        } catch (error) {
            Sentry.captureException(error);
        }
    }

    async deleteBook(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            res.send(await BooksServices.deleteBook(req.params.id));
        } catch (error) {
            Sentry.captureException(error);
        }

    }

}

module.exports = new BooksControllers();