/* globals describe, it, api expect beforeEach */

const Animal = require('../../../models/animal');
const animalTestData = require('../testData/animalsData');

//--- TEST DATA ---//
const testIds = animalTestData.animalIds;
const animalData = animalTestData.currentSingle;
const newWeight = animalTestData.newWeight;

describe('POST /animal/:id/weights', () => {
  beforeEach(done => {
    Animal.deleteMany({})
      .then(() => Animal.create(animalData))
      .then(() => done());
  });

  it('should return a 201 response', done => {
    api.post(`/api/animals/${testIds[0]}/weights`)
      .send(newWeight)
      .end(( err, res ) => {
        console.log('the result is', res.body);
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return an object which contains a weights array', done => {
    api.post(`/api/animals/${testIds[0]}/weights`)
      .send(newWeight)
      .end(( err, res ) => {
        expect(res.body).to.be.an('object');
        expect(res.body.weights).to.be.an('array');
        done();
      });
  });

  it('should increase the length of the weights array by one if it exists', done => {
    api.post(`/api/animals/${testIds[0]}/weights`)
      .send(newWeight)
      .end(( err, res ) => {
        expect(res.body.weights.length).to.eq(animalData.weights.length + 1);
        done();
      });
  });

  it('should return the correct data', done => {
    api.post(`/api/animals/${testIds[0]}/weights`)
      .send(newWeight)
      .end(( err, res ) => {
        const updatedWeight = res.body.weights.filter(weight => weight._id === testIds[2])[0];
        expect(updatedWeight.weight).to.eq(newWeight.weight);
        expect(updatedWeight.units).to.eq(newWeight.units);
        done();
      });
  });

});
