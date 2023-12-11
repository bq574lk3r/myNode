const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const router = require('./routes/');

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});