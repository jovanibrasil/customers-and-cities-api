const City = require('../models/City');
const logger = require('../../infra/loggers/logger');
const Errors = require('../../infra/errors/Errors');

module.exports = {

    createCity: async (city) => {

        const { name, state } = city;
        const existentCity = await City.find({ $and: [ { name }, { state } ] });

        if(existentCity.length) 
            throw Errors.BUSINESS_ERROR({ message: `City ${name} alread exists on state ${state}.` });

        city = await City.create(city);
        logger.info(`A city was created with id ${city._id}`);
        return city;
    },

    getCities: async ({ query, skip, limit }) => {
        const cities = await City.find(query).skip(skip).limit(limit);
        return cities;
    }

};