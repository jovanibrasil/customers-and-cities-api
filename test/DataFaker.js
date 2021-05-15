const Chance = require('chance');
const chance = new Chance();
const Genre = require('../src/domain/enums/Genre');

module.exports = {
    generateCity: function() {
        return {
            name: chance.string(),
            state: chance.string()
        };
    },
    generateCities: function(numberOfItems) {
        const cities = [];
        for (let index = 0; index < numberOfItems; index++) {
            const city = this.generateCity();
            cities.push(city);
        }
        return cities;
    },
    generateCustomer: function() {
        return {
            name: chance.string(),
            genre: chance.pickone([...Object.values(Genre)]),
            birth_date: chance.date({year: chance.integer(
                { min: 1500, max: 2020 })
            }).toISOString()
        };
    },
    generateCustomers: function(numberOfItems) {
        const customers = [];
        for (let index = 0; index < numberOfItems; index++) {
            const customer = this.generateCustomer();
            customers.push(customer);
        }
        return customers;
    }
}