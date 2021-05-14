const validate = require('../../infra/middlewares/joiValidationMiddleware');
const { newCity, query } = require('../../domain/schemas/City');

module.exports = app => {
    const cityController = app.controllers.city;

    app.post('/cities',
        validate(newCity), 
        cityController.createCity);
    app.get('/cities', 
        validate(query),
        cityController.getCity);
    
}