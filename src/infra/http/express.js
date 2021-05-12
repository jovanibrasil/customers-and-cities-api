const express = require('express');
const load = require('express-load');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

load('models', { cwd: 'src/app' })
    .then('controllers')
    .then('routes')
    .into(app);

module.exports = () => app;