const CustomerModel = require('../models/Customer');
const CityModel = require('../models/City');
const Errors = require('../../infra/errors/Errors');
const logger = require('../../infra/loggers/logger')

module.exports = {

    createCustomer: async ({ customer }) => {
        const { city_id } = customer;
        const city = await CityModel.findOne({ city_id });

        if(!city) 
            throw Errors.BUSINESS_ERROR({ message: `City ${ city_id } not found.` });

        customer = await CustomerModel.create(customer);
        logger.info(`A customer was created with id ${customer.customer_id}`)
        return customer;
    },

    getCustomerById: async ({ customer_id }) => {
        const customer = await CustomerModel.findOne({ customer_id });

        if(!customer) 
            throw Errors.NOT_FOUND_ERROR({ message: `Customer ${ customer_id } not found.` });

        return customer;
    },
    
    patchCustomerName: async ({ customer_id, name }) => {
        
        let customer = await CustomerModel.findOne({ customer_id });
        
        if(!customer) 
            throw Errors.NOT_FOUND_ERROR({ message: `Customer ${ customer_id } not found.` });

        customer = await CustomerModel.findOneAndUpdate({ customer_id }, { name });
        logger.info(`The client with id ${customer.customer_id} had its name changed successfully`);
        return customer;
    },

    deleteCustomer: async ({ customer_id }) => {
        const customer = await CustomerModel.findOne({ customer_id });
        
        if(!customer) 
            throw Errors.NOT_FOUND_ERROR({ message: `Customer ${ customer_id } not found.` });

        await CustomerModel.deleteOne({ customer_id });
        logger.info(`The customer with id ${customer.customer_id} was successfully deleted`);
    },

    getCustomers: async ({ query, skip, limit }) => {
        const customers = await CustomerModel.find(query).skip(skip).limit(limit);
        return customers;
    }

};