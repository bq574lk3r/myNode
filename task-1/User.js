module.exports = class User {
    static count = 0;
    constructor(name, isMan, age) {
        try {
            this.id = User.count;
            this.name = name;
            this.isMan = isMan;
            if (age > 0) {
                this._age = age;
            } else {
                this._age = 0
            }
            User.count++;
        } catch (error) {
            return error
        }
    }
    get age() {
        return this._age
    }
    set age(value) {
        if (value > 0) {
            this._age = value;
        } else {
            this._age = 0;
        }

    }
}