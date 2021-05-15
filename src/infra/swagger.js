const swaggerUi = require('swagger-ui-express');

module.exports = app => {
    const docFile = require('../../doc/swagger.json');
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(docFile));
}