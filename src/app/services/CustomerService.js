const CustomerModel = require('../models/Customer');
const CityModel = require('../models/City');
const Errors = require('../../infra/errors/Errors');

module.exports = {

    createCustomer: async ({ customer }) => {
        const { city_id } = customer;
        const city = await CityModel.findById(city_id);

        if(!city) 
            throw Errors.BUSINESS_ERROR({ message: `City ${ city_id } not found.` });

        customer = await CustomerModel.create(customer);
        return customer;
    },

    getCustomerById: async ({ customer_id }) => {
        const customer = await CustomerModel.findById(customer_id);

        if(!customer) 
            throw Errors.NOT_FOUND_ERROR({ message: `Customer ${ customer_id } not found.` });

        return customer;
    },
    
    patchCustomerName: async ({ customer_id, name }) => {
        
        let customer = await CustomerModel.findById(customer_id);
        
        if(!customer) 
            throw Errors.NOT_FOUND_ERROR({ message: `Customer ${ customer_id } not found.` });

        customer = await CustomerModel.findByIdAndUpdate(customer_id, { name });
        return customer;
    },

    deleteCustomer: async ({ customer_id }) => {
        const customer = await CustomerModel.findById(customer_id);
        
        if(!customer) 
            throw Errors.NOT_FOUND_ERROR({ message: `Customer ${ customer_id } not found.` });

        await CustomerModel.deleteOne({ _id: customer_id });
    },

    getCustomers: async ({ query, skip, limit }) => {
        const customers = await CustomerModel.find(query).skip(skip).limit(limit);
        return customers;
    }

};