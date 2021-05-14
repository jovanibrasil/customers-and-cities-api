const City = require('../models/City');

module.exports = {

    createCity: async (city) => {
        city = await City.create(city);
        return city;
    },

    getCities: async ({ query, skip, limit }) => {
        const cities = await City.find(query).skip(skip).limit(limit);
        return cities;
    }

};