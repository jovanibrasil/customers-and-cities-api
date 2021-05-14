const apiFeatures = require('../utils/apiFeatures');
const customerService = require('../services/CustomerService');
const asyncHandler = require('../../infra/errors/AsyncErrorHandler');

module.exports = () => ({

    createCustomer: asyncHandler(async (req, res) => {
        let customer = req.body;
        customer = await customerService.createCustomer({ customer });
        res.status(201).json({ customer });
    }),

    getCustomerById: asyncHandler(async (req, res) => {
        const { customer_id } = req.params;
        const customer = await customerService.getCustomerById({ customer_id });
        res.status(200).json(customer);
    }),
    
    patchCustomerName: asyncHandler(async (req, res) => {
        const { customer_id } = req.params;
        const { name } = req.body;
   
        const updatedCustomer = await customerService.patchCustomerName({
            customer_id, name
        })
        
        res.status(200).send(updatedCustomer);
    }),
    
    deleteCustomer: asyncHandler(async (req, res) => {
        const { customer_id } = req.params;
        await customerService.deleteCustomer({ customer_id });
        res.status(204).json();
    }),
    
    getCustomers: asyncHandler(async (req, res) => {
        const query = {};
        req.name && (query.name = req.name);
        const { limit, skip } = apiFeatures.extractPagination(req.query);
        const customers = await customerService.getCustomers({
            query, skip, limit
        });

        res.status(200).json(customers);
    })
    
});