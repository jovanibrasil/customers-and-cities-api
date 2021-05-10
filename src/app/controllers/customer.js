const customers = [];

module.exports = app => ({

    createCustomer: async (req, res) => {
        const customer = req.body;
        console.log(customer);
        res.status(201).json(customer);
    },

    getCustomer: async (req, res) => {
        res.status(200).json(customers);
    },

    patchCustomerName: async (req, res) => {
        const customer_id = req.params.customer_id;
        const { name } = req.body;

        // TODO find register with customer_id and change name

        res.status(200).send({
            customer_id, name
        });
    },

    deleteCustomer: async (req, res) => {
        const customer_id = req.params.customer_id;
        
        // TODO find and delete register with customer_id 

        res.status(204).send({ customer_id });
    }

});