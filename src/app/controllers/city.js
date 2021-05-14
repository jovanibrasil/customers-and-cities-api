const { extractPagination } = require('../utils/apiFeatures');
const { createCity, getCities } = require('../services/CityService');
const asyncHandler = require('../../infra/errors/AsyncErrorHandler');

module.exports = () => ({

    createCity: asyncHandler(async (req, res) => {
        let city = await createCity(req.body);
        res.status(201).json({ city });
    }),

    getCity: asyncHandler(async (req, res) => {

        const query = {},
            { name, state } = req.query;

        name && (query.name = name);
        state && (query.state = state);

        const { limit, skip } = extractPagination(req.query);
        const cities = await getCities(query, limit, skip);

        res.status(200).json(cities);
    })

});