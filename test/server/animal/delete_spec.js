/* globals describe, it, api expect beforeEach */

const Animal = require('../../../models/animal');
const animalTestData = require('../testData/animalsData');

const testIds = animalTestData.animalIds;
const animalData = animalTestData.archivedMulti;

describe('DELETE /animal/:id', () => {
  beforeEach(done => {
    Animal.deleteMany({})
      .then(Animal.create(animalData))
      .then(() => done());
  });

  it('should return a 204 response', done => { // NOTE: get correct
    api.delete(`/api/animals/${testIds[0]}`)
      .end(( err, res ) => {
        expect(res.status).to.eq(204);
        done();
      });
  });

  it('should remove one item from the database', done => {
    api.delete(`/api/animals/${testIds[0]}`)
      .then(() => Animal.find())
      .then(animals => {
        // console.log('the animals are: ', animals);
        expect(animals.length).to.eq(animalData.length - 1);
        done();
      });
  });

});
