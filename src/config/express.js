const express = require('express');
const load = require('express-load');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

load('models', { cwd: 'src/app' })
    .then('controllers')
    .then('routes')
    .into(app);

module.exports = () => app;