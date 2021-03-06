const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../../src/server");
const DataFaker = require('../DataFaker');
const { v4: uuidv4 } = require('uuid');

chai.use(chaiHttp);

describe("DELETE /customers/{customer_id}", () => {
  context('When sent a valid customer_id', () => {
    it("Should return a customer with the informed customer_id", async () => {
  
      let customer = DataFaker.generateCustomer();

      let { body : { city } } = await chai
        .request(app)
        .post("/api/cities")
        .send(DataFaker.generateCity());

      customer.city_id = city.city_id;

      const { body: { customer: createdCustomer } } = await chai
        .request(app)
        .post("/api/customers")
        .send(customer);

      let res = await chai
        .request(app)
        .delete(`/api/customers/${createdCustomer.customer_id}`)
        .send();
  
      expect(res.status).to.equal(204);
      
    });
  });
  context('When sent a customer_id that does not exist', () => {
    it("Should return a 404 error", async () => {
  
      let res = await chai
        .request(app)
        .delete(`/api/customers/${uuidv4()}`)
        .send();
  
      expect(res.status).to.equal(404);
      
    });
  });
});

