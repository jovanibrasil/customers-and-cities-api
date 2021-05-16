const { expect } = require('chai');
const cityService = require('../../src/app/services/CityService');
const DataFaker = require('../DataFaker');
const { v4: uuidv4 } = require('uuid');
const sandbox = require('sinon').createSandbox();

const City = require('../../src/app/models/City');

describe('CityService', () => {
    context('Create city', () => {  
      afterEach(() => {
        sandbox.restore()
      })
      
      it('When name and state is unique, should return the saved city', async () => {
        const city = DataFaker.generateCity();
        
        sandbox.stub(City, 'find').returns([]); 
        sandbox.stub(City, 'create').returns({ ...city, id: uuidv4() });

        const savedCity = await cityService.createCity(city);
        sandbox.assert.calledOnce(City.find);
        sandbox.assert.calledOnce(City.create);

        expect(savedCity.id).not.to.be.undefined;
        expect(savedCity.name).to.be.equal(city.name);
        expect(savedCity.state).to.be.equal(city.state);

      });

      it('When name and state is not unique, should thrown an error', async () => {
        const city = DataFaker.generateCity();
        sandbox.stub(City, 'find').returns([ city ]);
        
        let returnedError;
        try {
            await cityService.createCity(city)
        } catch (error) {
            returnedError = error;
        }

        expect(returnedError).not.to.be.undefined;

      });
    });
  
    context('Get city by params', () => {  
      it('When params are informed, should return a list of cities', async () => {
        const city = DataFaker.generateCity();      
        sandbox.stub(City, 'find').returns({ skip: () => ({ limit: () => 
            [city, city, city]  
        })});
        const cities = await cityService.getCities({ query: {}, skip: 2, limit: 2 });

        expect(cities.length).to.be.equal(3);
      });
    });
});
  