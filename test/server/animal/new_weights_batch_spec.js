/* globals describe, it, api expect beforeEach */

const Animal = require('../../../models/animal');
const animalTestData = require('../testData/animalsData');

//--- TEST DATA ---//
const animalData = animalTestData.currentMulit;
const newWeights = animalTestData;

describe('POST /animals/weights', () => {
  beforeEach(done => {
    Animal.deleteMany({})
      .then(() => Animal.create(animalData))
      .then(() => done());
  });

  it('should return a 201 response', done => {

  });

  it('should return an array of animals', done => {

  });

  it('should increase all the weights array by one', done => {

  });

  it('should increase all the weights by the correct data', done => {

  });
});
