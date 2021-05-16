const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../../src/server");
const DataFaker = require('../DataFaker');

chai.use(chaiHttp);

describe("POST /customers - Create a customer", () => {
  context('When sent all data valid', () => {  
    it("Should return a customer with an id", async () => {
      
      let cityBody = await chai
        .request(app)
        .post("/cities")
        .send(DataFaker.generateCity());
  
      let customer = DataFaker.generateCustomer();
      customer.city_id = cityBody.body.city.city_id;

      let res = await chai
        .request(app)
        .post("/customers")
        .send(customer);
  
      expect(res.status).to.equal(201);
      const { name, customer_id, genre, birth_date } = res.body.customer;
      expect(name).to.be.equal(customer.name);
      expect(genre).to.be.equal(customer.genre);
      expect(birth_date).to.be.equal(customer.birth_date);
      expect(customer_id).to.be.not.undefined;
    });
  });

  context('When not sent required fields', () => {
    it("Should return a 400 error", async () => {
    
      let res = await chai
        .request(app)
        .post("/customers")
        .send({});
  
      expect(res.status).to.equal(400);
    });
  });
});