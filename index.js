const express = require('express');
const app = express();
const PORT = 3000;

//Маршруты (Роуты)
app.get('/api/hello', (req, res) => {
    res.send('Привет, Redev!');
});

app.use(express.json());

app.post('/api/echo', (req, res) => {
    res.send(req.body.message)
})

const users = [
    {
        id:0,
        username: 'testUser',
        email: 'test@MediaList.com',
        _password: 'testPass',
    }
];

class User {
    static count = 1;
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
        this._password = value;
    }
}

app.post('/api/users', (req, res) => {
    const { username, email, password } = req.body;

    if (!!users.find(el => el.username === username || el.email === email)) {
        res.status(400)
        res.send('пользватель с таким username или почтовым ящиком зарегестрирован')
        return;
    }
    
    const currentUser = new User(username, email, password)
    users.push(currentUser)
    res.status(201)
    res.send(currentUser)
})

app.get('/api/users', (req, res) => {
    res.send(users.reduce((result, item) => {
        const { id, username, email } = item
        result.push({
            id: id,
            username: username,
            email: email,
        })
        return result;
    }, []))

})

app.get('/api/users/:id', (req, res) => {
    const { id, username, email } = users.find(el => el.id == req.params.id)
    const userById = {
        id: id,
        username: username,
        email: email,
    }
    res.send(userById);
})

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});