/* globals describe, it, api expect beforeEach */

const Animal = require('../../../models/animal');
const testIds = [
  '5b91752666708bc8b1622705', '5b91752666708bc8b1622706', '5b91752666708bc8b1622707', '5b91752666708bc8b1622708'
];

const animalData = [
  {
    _id: testIds[0],
    type: 'cow',
    methodOfRemoval: 'sale',
    saleRevenue: 10000,
    revenueCurrency: 'ZAR',
    saleWeight: 400,
    weightUnit: 'kgs'
  },{
    _id: testIds[1],
    type: 'cow',
    methodOfRemoval: 'sale',
    saleRevenue: 7000,
    revenueCurrency: 'ZAR',
    saleWeight: 300,
    weightUnit: 'kgs',
    weights: [{weight: 500, unit: 'kgs'}]
  }
];

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
