const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../../src/server");
const DataFaker = require('../DataFaker');
const { v4: uuidv4 } = require('uuid');

chai.use(chaiHttp);

describe("GET /customers", () => {
  context('Get customers by parameters', async () => {
    context('When sent name', async () => {
      let customer;

      beforeEach(async () => {
        let { body : { city: { _id } } } = await chai
          .request(app)
          .post("/cities")
          .send(DataFaker.generateCity());
    
        const customers = DataFaker.generateCustomers(2);
        for (const customer of customers) {
          customer.city_id = _id;
          await chai
            .request(app)
            .post("/customers")
            .send(customer);
        }
        customer = customers[0];
      });
      
      it("Should return a customer with the informed name", async () => {
        
        let res = await chai
          .request(app)
          .get("/customers")
          .query({ name: customer.name })
          .send();
    
        expect(res.status).to.equal(200);
        for (const customer of res.body) {
          expect(customer.name).to.be.equal(customer.name); 
        }
      });
    });
  });
  context("Get customerby customer_id", async () => {
    context('When sent a valid customer_id', () => {
      it("Should return a customer with the informed customer_id", async () => {
    
        let customer = DataFaker.generateCustomer();
  
        let { body : { city } } = await chai
          .request(app)
          .post("/cities")
          .send(DataFaker.generateCity());
  
        const city_id = city._id;
        customer.city_id = city_id;
  
        const { body: { customer: createdCustomer } } = await chai
          .request(app)
          .post("/customers")
          .send(customer);
  
        let res = await chai
          .request(app)
          .get(`/customers/${createdCustomer._id}`)
          .send();
    
        expect(res.status).to.equal(200);
        
      });
    });
    context('When sent a customer_id that does not exist', () => {
      it("Should return a 404 error", async () => {
    
        let res = await chai
          .request(app)
          .get(`/customers/${uuidv4()}`)
          .send();
    
        expect(res.status).to.equal(404);
        
      });
    });
  });
});

