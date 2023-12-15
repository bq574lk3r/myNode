const { body, param } = require('express-validator');

const customFunctions = {
    validatePassMsg: 'пароль должен содержать 6-16 символов, латинские буквы в верхнем и нижнем регистре и спецсимволы',
    validatePass(value) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z](?=.*[\W])).{6,16}$/.test(String(value));
    },
    validateUsernameMsg: 'username должен быть длинной 2-16 символов и латиницей',
    validateUsername(value) {
        return !/[^0-9a-zA-Z].{2,16}$/.test(String(value));
    }
};


class ValidationHelpers {
    validateDataUser = [
        body(['username', 'email', 'password']).notEmpty().withMessage('все поля должны быть заполнены'),
        body('username').custom(customFunctions.validateUsername)
            .withMessage(customFunctions.validateUsernameMsg),
        body('email').isEmail().withMessage('используйте корректный email'),
        body('password').custom(customFunctions.validatePass)
            .withMessage(customFunctions.validatePassMsg),
    ]
    validatePassword = [
        body('password').notEmpty().custom(customFunctions.validatePass)
            .withMessage(customFunctions.validatePassMsg),]
    validateParamId = [
        param().notEmpty()
    ]

    validateDataBook = [
        body(['title','author', 'genre']).notEmpty().withMessage('все поля должны быть заполнены'),
        body('genre').isArray().withMessage('жанр(жанры) должен передаваться в виде массива')
    ]
};

module.exports = new ValidationHelpers();