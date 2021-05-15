const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../../src/server");
const DataFaker = require('../DataFaker')

chai.use(chaiHttp);

describe("POST /cities - Create a city", () => {
  context('When sent all data valid', () => {  
    it("Should return a city with an id", async () => {
      let city = DataFaker.generateCity();
  
      let res = await chai
        .request(app)
        .post("/cities")
        .send(city);
  
      expect(res.status).to.equal(201);
      const { name, state, _id } = res.body.city;
      expect(name).to.be.equal(city.name);
      expect(state).to.be.equal(city.state);
      expect(_id).to.be.not.undefined;
    });
  });

  context('When sent name and state combination that already exists', () => {
    let city = DataFaker.generateCity();
    
    beforeEach(async () => {
      await chai
        .request(app)
        .post("/cities")
        .send(city);
    });

    it("Should return a 422 error", async () => {
    
      let res = await chai
        .request(app)
        .post("/cities")
        .send(city);
  
      expect(res.status).to.equal(422);
    });

  });

  context('When not sent required fields', () => {  
    it("Should return a 400 error", async () => {
    
      let res = await chai
        .request(app)
        .post("/cities")
        .send({});
  
      expect(res.status).to.equal(400);
    });
  });
});
