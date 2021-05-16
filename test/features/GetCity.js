const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../../src/server");
const DataFaker = require('../DataFaker');

chai.use(chaiHttp);

describe("GET /cities - Get cities by parameters", () => {
  let city = DataFaker.generateCity();

  before(async () => {
    await chai
      .request(app)
      .post("/cities")
      .send(city);
  });

  beforeEach(async () => {
    for (const city of DataFaker.generateCities(2)) {
      await chai
        .request(app)
        .post("/cities")
        .send(city);
    }
  });

  context('When sent name', () => {
    it("Should return a city with the informed name", async () => {
      
      let res = await chai
        .request(app)
        .get("/cities")
        .query({ name: city.name })
        .send();
  
      expect(res.status).to.equal(200);
      for (const city of res.body) {
        expect(city.name).to.be.equal(city.name); 
      }
    });
  });

  context('When sent state', () => {
    
    it("Should return a city with the informed state", async () => {
    
      let res = await chai
        .request(app)
        .get("/cities")
        .query({ state: city.state })
        .send();

      expect(res.status).to.equal(200);
      for (const city of res.body) {
        expect(city.state).to.be.equal(city.state); 
      }
    });
  });

  context('When sent name and state', () => {
  
    it("Should return a city with the informed name name and state", async () => {
    
      let res = await chai
        .request(app)
        .get("/cities")
        .query({ name: city.name, state: city.state  })
        .send();

      expect(res.status).to.equal(200);
      for (const {name, state} of res.body) {
        expect(name).to.be.equal(city.name);
        expect(state).to.be.equal(city.state); 
      }
    });
  });
});

