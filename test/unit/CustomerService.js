const { expect } = require('chai');
const CustomerService = require('../../src/app/services/CustomerService');
const DataFaker = require('../DataFaker');
const { v4: uuidv4 } = require('uuid');
const sandbox = require('sinon').createSandbox();
const Customer = require('../../src/app/models/Customer');
const City = require('../../src/app/models/City');

describe('CustomerService', () => {
    
    context('Create customer', () => {  
      afterEach(() => {
        sandbox.restore()
      })
      
      it('When data is valid, should return the saved customer', async () => {
        const customer = DataFaker.generateCustomer();
        const city = DataFaker.generateCity();
        customer.city_id = uuidv4();
        
        sandbox.stub(City, 'findOne').returns(city); 
        sandbox.stub(Customer, 'create').returns({ ...customer, id: uuidv4() });

        const savedCustomer = await CustomerService.createCustomer({ customer });
        sandbox.assert.calledOnce(City.findOne);
        sandbox.assert.calledOnce(Customer.create);

        expect(savedCustomer.id).not.to.be.undefined;
        expect(savedCustomer.name).to.be.equal(customer.name);

      });

      it('When city does not exist, should thrown an error', async () => {
        const customer = DataFaker.generateCustomer();
        sandbox.stub(City, 'findOne').returns([ customer ]);
        
        let returnedError;
        try {
            await cityService.createCustomer(customer)
        } catch (error) {
            returnedError = error;
        }

        expect(returnedError).not.to.be.undefined;

      });

    });

    context('Get customer by customer_id', () => {  
        afterEach(() => {
          sandbox.restore()
        })
        
        it('When customer exists, should return the saved customer', async () => {
          const customer = DataFaker.generateCustomer();
          const customer_id = uuidv4();

          sandbox.stub(Customer, 'findOne').returns({ 
              ...customer, 
              id: customer_id,
              city_id: uuidv4() 
          });
  
          const savedCustomer = await CustomerService.getCustomerById({ customer_id });
          sandbox.assert.calledOnce(Customer.findOne);
  
          expect(savedCustomer.id).not.to.be.undefined;
          expect(savedCustomer.name).to.be.equal(customer.name);
  
        });
  
        it('When customer does not exist, should thrown an error', async () => {
          const customer = DataFaker.generateCustomer();
          sandbox.stub(Customer, 'findOne').returns(undefined);
          
          let returnedError;
          try {
              await cityService.createCustomer(customer)
          } catch (error) {
              returnedError = error;
          }
  
          expect(returnedError).not.to.be.undefined;
  
        });
  
    });

    context('Delete customer by customer_id', () => {  
        afterEach(() => {
          sandbox.restore()
        })
        
        it('When customer exists, should delete the saved customer', async () => {
          const customer = DataFaker.generateCustomer();
          const customer_id = uuidv4();

          sandbox.stub(Customer, 'findOne').returns({ 
              ...customer, 
              id: customer_id,
              city_id: uuidv4() 
          });
          sandbox.stub(Customer, 'deleteOne');
  
          await CustomerService.deleteCustomer({ customer_id });
          sandbox.assert.calledOnce(Customer.findOne);
          sandbox.assert.calledOnce(Customer.deleteOne);
  
        });
  
        it('When customer does not exist, should thrown an error', async () => {
          const customer = DataFaker.generateCustomer();
          sandbox.stub(Customer, 'findOne').returns(undefined);
          
          let returnedError;
          try {
              await cityService.deleteCustomer(customer)
          } catch (error) {
              returnedError = error;
          }
  
          expect(returnedError).not.to.be.undefined;
  
        });
  
    });
  
    context('Get Customer by params', () => {  
      it('When params are informed, should return a list of cities', async () => {
        const customer = DataFaker.generateCustomer();      
        sandbox.stub(Customer, 'find').returns({ skip: () => ({ limit: () => 
            [customer, customer, customer]  
        })});
        const cities = await CustomerService.getCustomers({ query: {}, skip: 2, limit: 2 });

        expect(cities.length).to.be.equal(3);
      });
    });

});
  