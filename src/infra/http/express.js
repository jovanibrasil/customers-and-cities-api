const express = require('express');
const cors = require('cors');
const { successHandler, errorHandler } = require('../loggers/monganConfig')
const load = require('express-load');
const app = express();
const errorHandlerMiddleware = require('../middlewares/ErrorValidationMiddleware');

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(successHandler);
app.use(errorHandler);

load('controllers', { cwd: 'src/app' })
.then('routes')
.into(app);

app.use(errorHandlerMiddleware);

module.exports = () => app;