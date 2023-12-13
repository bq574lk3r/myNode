const { BooksServices } = require('../services/BooksServices')

class BooksControllers {
    async getBooks(req, res) {
        res.status(200).send(await BooksServices.getBooks())
    }
    async getBookById(req, res) {
        res.status(200).send(await BooksServices.getBookById(req.params.id));
    }
    async createBook(req, res) {
        const { title, author, genre } = req.body;
        const newBook = await BooksServices.createBook(title, author, genre)
        res.status(201).send(newBook)
    }
    async updateBook(req, res) {
        const updatedBook = await BooksServices.updateBook(req.params.id, req.body);
        res.status(200).send(updatedBook)
    }

    async deleteBook(req, res) {
        res.send(await BooksServices.deleteBook(req.params.id));
    }

}

module.exports = new BooksControllers();