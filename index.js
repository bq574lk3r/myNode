const express = require('express');
const app = express();
const PORT = 3000;

//const main = require('./main');//Import custom module
//main.sum(1,4)//use custom module

const users = [
    { name: 'Pavel' },
    { name: 'nePavel' }
];

app.get('/', (req, res) => {
    res.send(users);
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});