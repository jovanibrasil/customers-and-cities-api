const validate = require('../../infra/middlewares/joiValidationMiddleware');
const { 
    newCustomerBody, 
    patchCustomerNameBody, 
    query, 
    params 
} = require('../../domain/schemas/Customer');
const { 
    createCustomer, 
    getCustomers, 
    getCustomerById, 
    deleteCustomer,
    patchCustomerName
} = require('../controllers/customer');

module.exports = router => {

    router.route('/customers')
       .post(validate(newCustomerBody), createCustomer)
       .get(validate(query), getCustomers);
    router.route('/customers/:customer_id')
       .get(validate(params), getCustomerById)
       .delete(validate(params), deleteCustomer);
    router.route('/customers/:customer_id/name')
       .patch(validate(params), validate(patchCustomerNameBody), patchCustomerName);
    
}