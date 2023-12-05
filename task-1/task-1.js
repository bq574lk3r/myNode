const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const User = require("./User.js")

app.use(express.json());


const usersExample = [
    {
        name: "Pasha",
        isMan: true,
        age: 27
    },
    {
        name: "Katya",
        isMan: false,
        age: 25
    }
]
const users = usersExample.map(el => new User(el.name, el.isMan, el.age));

app.get('/users', (req, res) => {
    res.status(200).send(users);
});

app.get('/users/:gender', (req, res) => {
    res.status(200).send(users.filter(el => {
        let currentGender
        switch (req.params.gender.toLowerCase()) {
            case 'm':
                currentGender = el.isMan;
                break;
            case 'f':
                currentGender = !el.isMan;
                break
            default:
                currentGender = false;
        }
        return currentGender;
    }))
})


app.get('/filtredUsers', (req, res) => {
    let { min, max } = req.query;
    min = min ?? 0;
    max = max ?? Infinity;
    res.status(200).send(users.filter(el => min <= el.age && max >= el.age));
})

function checkUserData(req, res, next) {
    const { name, isMan, age } = req.body;
    if (!name) {
        res.status(400).send('некорректное поле name')
        return;
    }

    if (!isMan) {
        res.status(400).send('некорректное поле isMan')
        return;
    }

    if (!age || age < 0) {
        res.status(400).send('некорректное поле age')
        return;
    }
    next()
};


function filterReqData(req, res, next) {
    const { name, isMan, age } = req.body;
    req.body = {
        name: name,
        isMan: isMan,
        age: age,
    };
    next();
}

function checkUser(req, res, next) {
    const userById = users.find(el => el.id == req.params.id)
    if (userById) {
        next();
    } else {
        res.status(404).send('пользователь с таким id не найден')
        return;
    }
}

app.post('/users', checkUserData, (req, res) => {
    const { name, isMan, age } = req.body;
    const newUser = new User(name, isMan, age)
    users.push(newUser);
    res.status(201).send(newUser);
})


app.put('/user/:id', filterReqData, checkUser, checkUserData, (req, res) => {
    const userById = users.find(el => el.id == req.params.id)
    if (userById) {
        Object.assign(userById, req.body)
        res.status(200).send(userById);
    };

})



app.patch('/user/:id', filterReqData, checkUser, (req, res) => {
    const userById = users.find(el => el.id == req.params.id);
    Object.keys(req.body).forEach(key => {
        if (req.body[key] != undefined && req.body[key] != null) {
            userById[key] = req.body[key]
        }
    })
    res.status(200).send(userById);
})


app.delete('/user/:id', checkUser, (req, res) => {
    users.splice(users.findIndex(el => el.id == req.params.id), 1);
    res.status(200).send(true);
})



app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
})