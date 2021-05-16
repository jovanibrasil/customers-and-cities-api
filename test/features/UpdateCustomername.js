const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../../src/server");
const DataFaker = require('../DataFaker');
const { v4: uuidv4 } = require('uuid');

chai.use(chaiHttp);

describe("PATCH /customers/{customer_id}/customer", () => {
  context('When sent a valid customer_id and data', () => {
    it("Should return a customer with the informed customer_id with the name updated", async () => {
  
      let customer = DataFaker.generateCustomer();

      let { body : { city } } = await chai
        .request(app)
        .post("/cities")
        .send(DataFaker.generateCity());

      customer.city_id = city.city_id;

      const { body: { customer: createdCustomer } } = await chai
        .request(app)
        .post("/customers")
        .send(customer);

      const { name } = DataFaker.generateCustomer();

      const res = await chai
        .request(app)
        .patch(`/customers/${createdCustomer.customer_id}/name`)
        .send({ name });
      
      expect(res.status).to.equal(200);
      expect(res.body.name).to.be.equal(name);
      
    });
  });
  context('When sent a customer_id that does not exist', () => {
    it("Should return a 404 error", async () => {
      let { name } = DataFaker.generateCustomer();
  
      let res = await chai
        .request(app)
        .patch(`/customers/${uuidv4()}/name`)
        .send({ name });
  
      expect(res.status).to.equal(404);
      
    });
  });
});

