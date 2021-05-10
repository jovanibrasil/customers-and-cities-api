module.exports = app => {
    const customerController = app.controllers.customer;

    app.post('/customers', customerController.createCustomer);
    app.get('/customers', customerController.getCustomer);
    app.patch('/customers/:customer_id/name', customerController.patchCustomerName);
    app.delete('/customers/:customer_id', customerController.deleteCustomer);
    
}