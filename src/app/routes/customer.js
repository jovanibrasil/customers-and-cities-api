const validate = require('../../config/joiValidationMiddleware');
const { 
    newCustomer, 
    patchCustomerName, 
    query, 
    params 
} = require('../../domain/entities/Customer');

module.exports = app => {
    const customerController = app.controllers.customer;

    app.post('/customers', 
        validate(newCustomer), 
        customerController.createCustomer);
    app.get('/customers', 
        validate(query), 
        customerController.getCustomer);
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