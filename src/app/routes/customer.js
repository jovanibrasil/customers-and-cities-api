const validate = require('../../infra/middlewares/joiValidationMiddleware');
const { 
    newCustomer, 
    patchCustomerName, 
    query, 
    params 
} = require('../../domain/schemas/Customer');

module.exports = app => {
    const customerController = app.controllers.customer;

    app.post('/customers', 
        validate(newCustomer), 
        customerController.createCustomer);
    app.get('/customers', 
        validate(query), 
        customerController.getCustomers);
    app.get('/customers/:customer_id', 
        validate(params), 
        customerController.getCustomerById);
    app.patch('/customers/:customer_id/name', 
        validate(params), validate(patchCustomerName), 
        customerController.patchCustomerName);
    app.delete('/customers/:customer_id', 
        validate(params), 
        customerController.deleteCustomer);
    
}