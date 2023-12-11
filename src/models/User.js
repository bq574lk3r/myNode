const { v4: uuidv4 } = require('uuid');

class User {
    constructor(username, email, password, id) {
        try {
            this.id = id ?? uuidv4();
            this.username = username;
            this.email = email;
            this._password = password;
        } catch (error) {
            return error
        }
    }

    get password() {
        return this._password;
    }

    set password(value) {
        if (value.length < 4) {
            return;
        }
        this._password = value;
    }
}

module.exports = User;