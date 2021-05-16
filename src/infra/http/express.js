const express = require('express');
const cors = require('cors');
const { successHandler, errorHandler } = require('../loggers/monganConfig');
const app = express();
const errorHandlerMiddleware = require('../middlewares/ErrorValidationMiddleware');


app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(successHandler);
app.use(errorHandler);

require('../../app/routes')(app);

app.use(errorHandlerMiddleware);

module.exports = () => app;