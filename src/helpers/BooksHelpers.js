const fileHelpers = require('./FileHelpers');
const bookDataFile = 'data.json';

class BooksHelpers {
    async checkBookId(req, res, next) {
        const { books } = await fileHelpers.readFile(bookDataFile);
        const bookById = books.find(el => el.id == req.params.id);
        if (bookById) {
            next();
        } else {
            res.status(404).send('книга с таким id не найдена');
            return;
        }
    }
};

module.exports = new BooksHelpers();