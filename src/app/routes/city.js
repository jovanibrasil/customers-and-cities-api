const validate = require('../../infra/middlewares/joiValidationMiddleware');
const { newCity, query } = require('../../domain/schemas/City');

module.exports = app => {
    const { createCity, getCity } = app.controllers.city;
    
    app.route('/cities')
        .post(validate(newCity), createCity)
        .get(validate(query), getCity);
    
}