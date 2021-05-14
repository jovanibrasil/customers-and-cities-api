const express = require('express');
const load = require('express-load');
const app = express();
const errorHandlerMiddleware = require('../middlewares/ErrorValidationMiddleware');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

load('controllers', { cwd: 'src/app' })
.then('routes')
.into(app);

app.use(errorHandlerMiddleware);

module.exports = () => app;