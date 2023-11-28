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

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});