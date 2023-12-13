const fileHelpers = require('./FileHelpers');
const bookDataFile = 'data.json';

class BooksHelpers {
    async checkBookId(req, res, next) {
        const { books } = await fileHelpers.readFile(bookDataFile);
        const bookById = books.find(el => el.id == req.params.id)
        if (bookById) {
            next();
        } else {
            res.status(404).send('книга с таким id не найдена')
            return;
        }
    }

    checkReqData(req, res, next) {
        const { title, author, genre } = req.body;
        if (title && author && !Array.isArray(genre)) {
            res.status(400).send('жанр(жанры) должен передаваться в виде массива');
        } else if (title && author && genre) {
            next()
        } else {
            res.status(400).send('все поля должны быть заполнены');
        }
    }

}

module.exports = new BooksHelpers()