const validate = require('../../infra/middlewares/joiValidationMiddleware');
const { 
    newCustomerBody, 
    patchCustomerNameBody, 
    query, 
    params 
} = require('../../domain/schemas/Customer');

module.exports = app => {
    const { 
        createCustomer, 
        getCustomers, 
        getCustomerById, 
        deleteCustomer,
        patchCustomerName
    } = app.controllers.customer;

    app.route('/customers')
       .post(validate(newCustomerBody), createCustomer)
       .get(validate(query), getCustomers);
    app.route('/customers/:customer_id')
       .get(validate(params), getCustomerById)
       .delete(validate(params), deleteCustomer);
    app.route('/customers/:customer_id/name')
       .patch(validate(params), validate(patchCustomerNameBody), patchCustomerName);
    
}