const express = require('express');
const app = express();
const Sentry = require("@sentry/node");

require('dotenv').config();
const PORT = process.env.PORT;
const SENTRY_DSN = process.env.SENTRY_DSN;

const router = require('./routes/');

Sentry.init({
    dsn: SENTRY_DSN,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});