const apiFeatures = require('../utils/apiFeatures');

module.exports = app => ({

    createCity: async (req, res) => {
        
        let city = req.body;
        
        const CityModel = app.models.City;
        city = await CityModel.create(city);
        
        res.status(201).json({ city });
    },

    getCity: async (req, res) => {

        const query = {},
            { name, state } = req.query,
            CityModel = app.models.City;

        name && (query.name = name);
        state && (query.state = state);

        const { limit, skip } = apiFeatures.extractPagination(req.query);
        const cities = await CityModel.find(query).skip(skip).limit(limit);

        res.status(200).json(cities);
    }

});