const City = require('../models/City');
const logger = require('../../infra/loggers/logger')

module.exports = {

    createCity: async (city) => {
        city = await City.create(city);
        logger.info(`A city was created with id ${city._id}`);
        return city;
    },

    getCities: async ({ query, skip, limit }) => {
        const cities = await City.find(query).skip(skip).limit(limit);
        return cities;
    }

};