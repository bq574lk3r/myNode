const Book = require('../models/Book');
const { testBooks } = require('../../seeders/seederData');
const fileHelpers = require('../helpers/FileHelpers');
const bookDataFile = 'data.json';

async function bookDataIsEmpty() {
    const data = await fileHelpers.readFile(bookDataFile);
    if (data.books.length === 0) {
        testBooks.forEach(el => data.books.push(new Book(el.title, el.author, el.genre)));
        fileHelpers.writeFile(bookDataFile, data);
    }
};
bookDataIsEmpty();


class BooksServices {
    async getBooks() {
        try {
            const data = await fileHelpers.readFile(bookDataFile);
            return data.books;
        } catch (error) {
            return err;
        }

    }

    async getBookById(bookId) {
        try {
            const data = await fileHelpers.readFile(bookDataFile);
            return data.books.find(el => el.id == bookId);
        } catch (error) {
            return err;
        }

    }

    async createBook(title, author, genre) {
        try {
            const currentBook = new Book(title, author, genre);
            const data = await fileHelpers.readFile(bookDataFile);
            data.books.push(currentBook);
            await fileHelpers.writeFile(bookDataFile, data);
            return currentBook;
        } catch (err) {
            return err;
        }
    }

    async updateBook(id, body) {
        try {
            const data = await fileHelpers.readFile(bookDataFile);
            const bookById = data.books.find(el => el.id == id);
            Object.keys(bookById).forEach(key => {
                if (body[key] != undefined && body[key] != null) {
                    bookById[key] = body[key]
                }
            })
            await fileHelpers.writeFile(bookDataFile, data);
            return bookById;

        } catch (err) {
            return err;
        }
    }

    async deleteBook(id) {
        try {
            const data = await fileHelpers.readFile(bookDataFile);
            const bookIndex = data.books.findIndex(el => el.id == id);
            data.books.splice(bookIndex, 1);
            await fileHelpers.writeFile(bookDataFile, data);
            return 'deleted'
        } catch (err) {
            return err;
        }

    }
}

module.exports = {
    BooksServices: new BooksServices()
}