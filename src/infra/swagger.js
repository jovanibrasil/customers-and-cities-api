const swaggerUi = require('swagger-ui-express');

module.exports = app => {
    const docFile = require('../../doc/swagger.json');
    docFile.host = process.env.BASE_URL;
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(docFile));
}