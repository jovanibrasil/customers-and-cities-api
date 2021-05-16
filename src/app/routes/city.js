const validate = require('../../infra/middlewares/joiValidationMiddleware');
const { newCity, query } = require('../../domain/schemas/City');
const { createCity, getCity } = require('../controllers/city');

module.exports = router => {
    
    router.route('/cities')
        .post(validate(newCity), createCity)
        .get(validate(query), getCity);
    
}