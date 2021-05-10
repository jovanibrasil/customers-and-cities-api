const cities = []

module.exports = app => ({

    createCity: async (req, res) => {
        console.log("Creating city");

        const city = req.body;
        console.log(city);

        cities.push(city);
        res.status(201).json(city);
    },

    getCity: async (req, res) => {

        // TODO manage possible parameters

        res.status(200).json(cities);
    }

});