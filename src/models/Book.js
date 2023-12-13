const { v4: uuidv4 } = require('uuid');

class Book {
    constructor(title, author, genre, id) {
        try {
            this.id = id ?? uuidv4();
            this.title = title;
            this.author = author;
            this.genre = genre;
        } catch (error) {
            return error
        }
    }
}

module.exports = Book;