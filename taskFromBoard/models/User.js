const { v4: uuidv4 } = require('uuid');

class User {
    constructor(name, isMan, age, id) {
        try {
            this.id = id ?? uuidv4();
            this.name = name;
            this.isMan = isMan;
            if (age > 0) {
                this.age = age;
            } else {
                this.age = 0
            }
        } catch (error) {
            return error
        }
    }
}

module.exports = User;