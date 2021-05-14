const apiFeatures = require('../utils/apiFeatures');

module.exports = app => ({

    createCustomer: async (req, res) => {
        let customer = req.body;

        const CityModel = app.models.City;
        const city = await CityModel.findById(customer.city_id);

        if(!city) {
            res.status(422).json({ message: 'City not found.' })
        }

        const CustomerModel = app.models.Customer;
        customer = await CustomerModel.create(customer);
        
        res.status(201).json({ customer });
    },

    getCustomerById: async (req, res) => {
        const { customer_id } = req.params;

        const CustomerModel = app.models.Customer;
        const customer = await CustomerModel.findById(customer_id);

        if(!customer) res.status(404).json({ message: "Customer not found." });

        res.status(200).json(customer);
    },
    
    patchCustomerName: async (req, res) => {
        const { customer_id } = req.params;
        const { name } = req.body;
        
        const CustomerModel = app.models.Customer;
        const customer = await CustomerModel.findById(customer_id);
        
        if(!customer) res.status(404).json({ message: "Customer not found." });
        
        customer = await CustomerModel.findByIdAndUpdate(customer_id, { name });
        
        res.status(200).send(customer);
    },
    
    deleteCustomer: async (req, res) => {
        
        const { customer_id } = req.params;
        
        const CustomerModel = app.models.Customer;
        const customer = await CustomerModel.findById(customer_id);
        
        if(!customer) res.status(404).json({ message: "Customer not found." });
        
        await CustomerModel.remove({ _id: customer_id });
        
        res.status(204);
    },
    
    getCustomers: async (req, res) => {
        const CustomerModel = app.models.Customer;
        const query = {};
        req.name && (query.name = req.name);
        const { limit, skip } = apiFeatures.extractPagination(req.query);
        const customers = await CustomerModel.find(query).skip(skip).limit(limit);

        res.status(200).json(customers);
    }
    
});