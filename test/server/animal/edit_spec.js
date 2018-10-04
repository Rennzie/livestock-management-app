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

const updateData = {
  type: 'cow',
  methodOfRemoval: 'death',
  saleRevenue: null,
  revenueCurrency: 'ZAR',
  saleWeight: null,
  weightUnit: 'kgs'
};

describe('PUT /animals/:id', () => {
  beforeEach(done => {
    Animal.deleteMany({})
      .then(() => Animal.create(animalData))
      .then(() => done());
  });

  it('should return a 201 response', done => {
    api.put(`/api/animals/${testIds[0]}`)
      .send(updateData)
      .end(( err, res ) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return an object', done => {
    api.put(`/api/animals/${testIds[0]}`)
      .send(updateData)
      .end(( err, res ) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.put(`/api/animals/${testIds[0]}`)
      .send(updateData)
      .end(( err, res ) => {
        expect(res.body.saleRevenue).to.eq(updateData.saleRevenue);
        expect(res.body.methodOfRemoval).to.eq(updateData.methodOfRemoval);
        expect(res.body.weight).to.eq(updateData.weight);
        done();
      });

  });
});
