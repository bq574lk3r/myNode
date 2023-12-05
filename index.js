const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

//Маршруты (Роуты)
app.get('/api/hello', (req, res) => {
    res.send('Привет, Redev!');
});

app.use(express.json());

app.post('/api/echo', (req, res) => {
    res.send(req.body.message)
})

const users = [];

class User {
    static count = 0;
    constructor(username, email, password) {
        try {
            this.id = User.count;
            this.username = username;
            this.email = email;
            this._password = password;
            User.count++;
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

users.push(new User('testUser', 'test@MediaList.com', 'testPass'))


function checkUser(req, res, next) {
    const { username, email } = req.body;
    if (!!users.find(el => el.username === username || el.email === email)) {
        res.status(400).send('пользватель с таким username или почтовым ящиком зарегестрирован');
        return;
    } else {
        next();
    }
}

function checkUserUpdate(req, res, next) {
    const { username, email } = req.body;
    const findUser = users.find(el => el.username === username || el.email === email);
    if (!!findUser && findUser?.id != req.params.id) {
        res.status(400).send('пользватель с таким username или почтовым ящиком уже зарегестрирован');
        return;
    } else {
        next();
    }
}

function dataIsEmpty(req, res, next) {
    const { username, email, password } = req.body;
    if (username && email && password) {
        next()
    } else {
        res.status(400).send('все поля должны быть заполнены');
    }
}

app.post('/api/users', dataIsEmpty, checkUser, (req, res) => {
    const { username, email, password } = req.body;

    const currentUser = new User(username, email, password)
    users.push(currentUser)
    res.status(201)
    res.send(currentUser)
})

app.get('/api/users', (req, res) => {
    res.send(users.map((item) => {
        const { id, username, email } = item
        return {
            id: id,
            username: username,
            email: email,
        }
    }))

})

app.get('/api/user/:id', (req, res) => {
    const { id, username, email } = users.find(el => el.id == req.params.id)
    const userById = {
        id: id,
        username: username,
        email: email,
    }
    res.send(userById);
})

app.put('/api/user/:id', dataIsEmpty, checkUserUpdate, (req, res) => {
    const { username, email, password } = req.body;
    const userById = users.find(el => el.id == req.params.id);
    if (!userById) {
        const newUser = new User(username, email, password);
        users.push(newUser)
        res.status(201).send(newUser)
        return;
    } else {
        Object.keys(userById).forEach(key => {
            key = key.replace('_','');
            if (req.body[key] != undefined && req.body[key] != null) {
                userById[key] = req.body[key]
            }
        })

        res.status(200).send(userById)
    }
});

app.patch('/api/user/:id', (req, res) => {
    const { password } = req.body;
    const userById = users.find(el => el.id == req.params.id);
    userById.password = password ?? userById.password;
    res.status(200);
    res.send(userById);
});

app.delete('/api/user/:id', (req, res) => {
    const userIndex = users.findIndex(el => el.id == req.params.id);
    users.splice(userIndex, 1)
    res.send('userById');
});


app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});